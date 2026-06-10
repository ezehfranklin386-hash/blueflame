# Blue Flame Gas Supply LTD — Agent Guide

## Architecture: dual-version (critical)

Two independent front-ends coexist. **Know which you're editing:**

- **React SPA**: `src/` — Vite + React 18, builds via `npm run build` → `dist/`
- **Static HTML** (root): `index.html` (966 lines, inline `<style>` + `<script>`) and `admin.html` (1107 lines, admin dashboard, no React equivalent)
- `dist/index.html` is currently a copy of static `index.html`, NOT React build output. Verify before editing.

| Aspect | React app (`src/`) | Static HTML (root) |
|--------|-------------------|-------------------|
| Data source | Hardcoded in `src/config.js` | Supabase (inline `createClient`) |
| Dependencies | `react`, `react-dom`, Vite | None (no npm deps) |
| Routing | Anchor hash navigation (`href="#section"`) | Same (scroll-based) |
| Admin panel | None | `admin.html` (standalone, Supabase CRUD) |

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server at `localhost:5173` |
| `npm run build` | Builds React app → `dist/` |
| `npm run preview` | Preview production build |

No test, lint, typecheck, or format scripts exist.

## Supabase integration

- `@supabase/supabase-js@2` loaded from CDN (`admin.html:692`) — **not** in `package.json`
- Real credentials in `.env.local` (gitignored): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`
- Template placeholder config at root `config.js` (uses `module.exports`)
- **React app (`src/`) does NOT use Supabase** — all data hardcoded
- Static HTML files (`index.html`, `admin.html`) use Supabase directly

## Database schema

4 tables in Supabase:

**gas_prices**: `id (PK)`, `price_per_kg (number)`, `updated_at (date)`, `updated_by (text)`
**products**: `id (PK)`, `name (text)`, `price (number)`, `image_url (text)`, `created_at`, `updated_at`
**sales**: `id (PK)`, `sale_date (date)`, `sale_type (text: "delivery"/"product")`, `amount (number)`, `details (text)`, `created_at`
**admin_users**: `id (PK)`, `username (text)`, `password (text)`, `email (text)`, `created_at`

## Config files

| File | Key values |
|------|-----------|
| `.env.local` | Real Supabase creds (VITE_ prefixed, gitignored) |
| `src/config.js` | WhatsApp `2348106606098`, price/kg `1800`, min order `1300`, contact info (React app) |
| `config.js` (root) | Placeholder Supabase URL/Key + `ADMIN_PASSWORD: 'blueflame2024'` |
| `admin.html:697-701` | Supabase URL/Key + `ADMIN_PASSWORD = 'blueflame2024'` hardcoded |
| `index.html:860` | `WHATSAPP_NUMBER = '2348106606098'` |
| `Products.jsx:4` | `WHATSAPP_NUMBER = '2348106606098'` |

## Entry points

- **React app**: `src/main.jsx` → `App.jsx` → 10 components (no router, `Navigation → Hero → Features → Products → About → Services → WhyChooseUs → Contact → Footer → WhatsAppButton`)
- **Static site**: `index.html` — fully self-contained
- **Admin dashboard**: `admin.html` — standalone, 5 tabs (Dashboard, Gas Price, Products, Sales, Settings)

## React app structure

```
src/
├── main.jsx            Mounts <App /> to #root
├── App.jsx             Composes 10 components in order
├── config.js           Hardcoded business config
├── components/
│   ├── Navigation.jsx  Sticky nav, scroll effect, mobile menu toggle
│   ├── Hero.jsx        Static hero + CTA buttons
│   ├── Features.jsx    4 feature cards + IntersectionObserver
│   ├── Products.jsx    5 hardcoded products, qty selector, WhatsApp order
│   ├── About.jsx       Static text + image visibility detection
│   ├── Services.jsx    6 service cards + IntersectionObserver
│   ├── WhyChooseUs.jsx 4 reasons + IntersectionObserver
│   ├── Contact.jsx     255 lines — form validation, WhatsApp, clipboard fallback, price/kg calculator
│   ├── ContactItem.jsx Reusable contact info display
│   ├── FormField.jsx   Reusable input (text/tel/number/textarea) with error display
│   ├── Card.jsx        11-line wrapper — NEVER USED anywhere
│   ├── Footer.jsx      4-column footer, copyright 2026
│   └── WhatsAppButton.jsx  Floating WhatsApp button (fixed position)
└── utils/
    └── formValidation.js  Nigerian phone regex, name/phone/amount/address validators
```

- No React Router, no state management library, no API calls
- IntersectionObserver scroll animation repeated independently in 6 components (Features, Products, About, Services, WhyChooseUs, Contact)
- `Contact.jsx` has a local `validateForm` that shadows the imported one (see bugs section)

## Admin panel (`admin.html`)

| Tab | Features |
|-----|----------|
| Dashboard | Stats (price, total sales, product count, deliveries) + recent sales table |
| Gas Price | Update `price_per_kg` in Supabase (min ₦100) |
| Products | Add/edit/delete products CRUD via Supabase. `onerror` fallback to `images/placeholder.png` (doesn't exist) |
| Sales | Record sale (date/type/amount/details) + delete. Sorted by date desc |
| Settings | Change admin password (in-memory only — resets on reload) + Danger Zone: clear all data |

- Login: password check against `ADMIN_PASSWORD`, persists via `localStorage.setItem('adminLoggedIn', 'true')`
- No token expiry, no logout timeout
- Tab switching reloads data from Supabase on each change

## Known bugs

| # | Bug | File:line | Impact |
|---|-----|-----------|--------|
| 1 | 5kg price mismatch | `index.html:638` | `data-price="9500"` but displayed price is `₦25,500` — WhatsApp order sends wrong total |
| 2 | validateForm shadowing | `src/components/Contact.jsx:55-79` | Local `validateForm` shadows import; uses undefined `phoneRegex` → `ReferenceError` at runtime |
| 3 | Missing placeholder PNG | `admin.html:917` | `onerror="this.src='images/placeholder.png'"` — file does not exist anywhere |
| 4 | Duplicate CSS rules | `index.css:290-304` | `.section-subtitle` defined twice — second wins but they're identical |
| 5 | Slow animation | `index.css:277` | `.about-image` has `animation: slideInRight 5s ease` which is extremely slow |
| 6 | Price discrepancy | `src/config.js:3` vs DB default | React hardcodes `pricePerKg: 1800`, Supabase seed value is `950` |
| 7 | Mobile menu CSS | `index.css:116` | `.mobile-menu-btn` set to `display: none` then `display: flex` on same line — never hidden on desktop |
| 8 | Password not persisted | `admin.html:670-676` | "Change Password" button only updates in-memory `ADMIN_PASSWORD` variable — resets on page reload |
| 9 | Card.jsx unused | `src/components/Card.jsx` | Exported component is never imported anywhere |

## Hardcoded values (needs deduplication)

| Value | Files |
|-------|-------|
| WhatsApp `2348106606098` | `src/config.js`, `src/components/Products.jsx`, `src/components/WhatsAppButton.jsx`, `index.html`, `admin.html` |
| Phone `08106606098` | `src/config.js`, `src/components/Hero.jsx`, `index.html` |
| Email `blueflamesgassupply@gmail.com` | `src/config.js`, `index.html` |
| Address (Ibeju-Lekki) | `src/config.js`, `index.html` |
| Hours (Mon-Sat 7AM-9PM) | `src/config.js`, `index.html` |
| Admin password `blueflame2024` | `.env.local`, `config.js`, `admin.html` |

## Phone validation

`src/utils/formValidation.js:1` — Nigerian format: `/^(?:0|234)\d{10}$/`
- Accepts: `08123456789` (11 digits) or `2348123456789` (13 digits)
- Rejects: `+234...`, short numbers, non-Nigerian prefixes

## Image asset layout (three directories, mostly duplicated)

```
/images/                     → Static HTML (5 cylinder PNGs)
/public/images/              → Vite build (same 5 PNGs + 4 SVGs)
/public/images/images/       → Nested duplicates (accidental)
/dist/images/images/         → Same nesting in build output
/file.png                    → 2.3MB duplicate of /supply.png (2.3MB)
```

## Netlify deployment

`netlify.toml`: build `npm run build`, publish `dist/`, SPA redirect `/* → /index.html` (200)

## Git history context

- 11 commits, 2 authors (`blueflame@example.com`, `ezehfranklin386@gmail.com`)
- History: static HTML initial → React Vite migration → back to static → recent React refactor (`788e1ed`, June 1 2026)
- IDE: PyCharm (seen in `.idea/`, misconfigured as `PYTHON_MODULE`)

## Other gotchas

- `admin.html:698` has `SUPABASE_URL` ending with `/rest/v1/` in `.env.local` but without it in inline code — possible endpoint mismatch
- `index.html` inline styles duplicate `index.css` — both must be kept in sync if editing CSS
- `index.html` references `index.css` via `<link>` but also has all styles inline — the inline `<style>` block is the authoritative one
- `Contact.jsx` imports `FormField` but renders form fields directly with raw `<input>`/`<textarea>` — `FormField` import is unused
- The "Clear All Data" button in admin Settings deletes all sales records from Supabase with no confirmation beyond a basic `confirm()` dialog
- `vite.config.js` is minimal — no aliases, proxy, CSS modules, or TypeScript config
