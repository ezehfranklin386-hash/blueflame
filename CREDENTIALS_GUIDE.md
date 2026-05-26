# 🔑 CREDENTIALS & ENVIRONMENT VARIABLES GUIDE

This guide shows you the **secure way** to manage credentials using `.env.local` files instead of hardcoding them in your code.

---

## 🛡️ Why Use Environment Variables?

| ❌ Old Way (Hardcoded) | ✅ New Way (.env.local) |
|---|---|
| Credentials in code | Credentials in safe file |
| Risk of pushing to GitHub | Protected by .gitignore |
| Hard to change per environment | Easy to manage per environment |
| Visible to everyone | Only on your computer |

---

## 📝 STEP 1: Create `.env.local` File

### Step 1.1: Create the File

1. Open your project folder
2. In the root (same level as `package.json`), create new file: `.env.local`
3. **Never commit this file to GitHub!**

### Step 1.2: Add Your Credentials

Copy this template and fill in your values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Admin Settings
VITE_ADMIN_PASSWORD=blueflame2024
```

---

## 🔐 How to Get Your Credentials

### Get VITE_SUPABASE_URL:

1. Go to **https://supabase.com** and login
2. Select your project
3. Click **Settings** → **API** (left sidebar)
4. Find **Project URL** section
5. Copy the URL (looks like: `https://abc123def456.supabase.co`)
6. Paste into `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://abc123def456.supabase.co
   ```

### Get VITE_SUPABASE_ANON_KEY:

1. In Supabase, stay on **Settings → API**
2. Find **Project API keys** section
3. Copy **Anon public key** (very long string starting with `eyJ...`)
4. Paste into `.env.local`:
   ```env
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Set VITE_ADMIN_PASSWORD:

- Choose your own secure password
- Default is `blueflame2024`
- Update in `.env.local`:
  ```env
  VITE_ADMIN_PASSWORD=MySecurePass2024
  ```

---

## 📍 Complete `.env.local` Example

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://abc123def456.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyM2RlZjQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjI0MDAwMDAwLCJleHAiOjE5Mjc2MDAwMDB9.1234567890abcdefghijklmnop

# Admin Settings  
VITE_ADMIN_PASSWORD=blueflame2024
```

---

## 🎯 How It Works

When you run `npm run dev`:

1. Vite loads `.env.local`
2. All `VITE_*` variables become available as `import.meta.env.*`
3. Your app accesses them safely
4. Never exposed to users

```javascript
// In your app code:
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
```

---

## 🚀 For Deployed Sites (Netlify/Vercel)

### On Netlify:

1. Go to your site dashboard
2. Click **Site settings** → **Build & deploy** → **Environment**
3. Click **"Add environment variables"**
4. Add same variables:
   ```
   VITE_SUPABASE_URL=https://abc123...supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   VITE_ADMIN_PASSWORD=your_password
   ```
5. Click **"Trigger deploy"**

### On Vercel:

1. Go to your project **Settings**
2. Click **Environment Variables**
3. Add same variables as above
4. Click **Save**
5. Click **"Redeploy"**

---

## ✅ Verification Steps

### On Localhost:

1. Create `.env.local` with credentials
2. Run `npm run dev`
3. Open `http://localhost:5173`
4. Open browser console (F12)
5. Try:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL)
   ```
6. Should show your URL ✅

### On Deployed Site:

1. Update Netlify/Vercel environment variables
2. Trigger a redeploy
3. Wait for build to complete
4. Open your site
5. Login to admin: should work ✅
6. Try calculator: should sync with Supabase ✅

---

## 🔒 Security Checklist

- [ ] `.env.local` created in project root
- [ ] `.gitignore` includes `.env.local` and `.env*.local`
- [ ] Never committed `.env.local` to GitHub
- [ ] Credentials match exactly from Supabase
- [ ] All `VITE_` prefixes are correct
- [ ] On deployed site: environment variables set in Netlify/Vercel
- [ ] No hardcoded credentials in HTML or JSX files
- [ ] Tested on localhost - works ✅
- [ ] Tested on deployed site - works ✅

---

## 🆘 Troubleshooting

### "Environment variables not loading"
- [ ] Check `.env.local` is in project root (same folder as package.json)
- [ ] Check variables start with `VITE_`
- [ ] Stop dev server and restart: `npm run dev`
- [ ] Refresh browser

### "On Netlify, variables not working"
- [ ] Check you added them in Site Settings (not Deploy settings)
- [ ] Trigger a new deploy
- [ ] Wait for build to complete
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### "Credentials appear to be wrong"
- [ ] Go to Supabase → Settings → API
- [ ] Copy URL/key again carefully (no spaces!)
- [ ] Paste into `.env.local` exactly
- [ ] Save file and restart dev server

### "Can't see admin dashboard"
- [ ] Check `VITE_ADMIN_PASSWORD` in `.env.local`
- [ ] Type password exactly as set
- [ ] Try default: `blueflame2024`
- [ ] Check browser console for errors

### "Database not connecting on deployed site"
- [ ] Verify Supabase project is "Running"
- [ ] Check environment variables set in Netlify/Vercel
- [ ] Verify SQL tables exist in Supabase
- [ ] Check Supabase URL and Key are exactly correct

---

## 📋 Quick Reference

| Variable | Where to Find | Example |
|----------|---|---|
| VITE_SUPABASE_URL | Supabase → Settings → API | https://abc123.supabase.co |
| VITE_SUPABASE_ANON_KEY | Supabase → Settings → API | eyJhbGc... (long string) |
| VITE_ADMIN_PASSWORD | You choose | blueflame2024 |

---

## 💡 Pro Tips

1. **Different passwords per environment:**
   - `.env.local` = local test password
   - Netlify env vars = production password
   
2. **Rotate credentials safely:**
   - Change in `.env.local` for testing
   - Update Supabase if key compromised
   - Redeploy to Netlify/Vercel

3. **Share with team safely:**
   - Send `.env.local` via encrypted chat/email
   - NOT via GitHub!
   - Each team member has own `.env.local`

4. **Monitor your usage:**
   - Check Supabase dashboard for API usage
   - Watch for unusual activity
   - Rotate keys quarterly for security

**DO:**
- ✅ Keep your Anon Key private
- ✅ Don't commit to public GitHub
- ✅ Change admin password before going live
- ✅ Use environment variables in production

**DON'T:**
- ❌ Share your key with anyone
- ❌ Post it in chats/forums
- ❌ Leave it in public code
- ❌ Use default password in production

---

## 📞 Getting Your Credentials

### If you forgot where to get them:

1. Go to **https://supabase.com**
2. Login with your email
3. Click on your **"blueflame-gas"** project
4. Left sidebar → **Settings**
5. Tab → **API**
6. You'll see:
   - **Project URL** (starts with `https://`)
   - **Anon Key** (long string starting with `eyJ...`)

Copy both exactly as shown (no extra spaces).

---

## 🎉 Done!

Once credentials are added:
1. Save files
2. Deploy to Netlify
3. Your website uses Supabase! 🚀

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for full walkthrough.
