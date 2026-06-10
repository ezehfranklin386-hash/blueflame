# 🚀 Complete Deployment Guide - Blue Flame Gas

This guide walks you through setting up Blue Flame Gas locally and deploying to the cloud with Supabase backend and modern security practices.

---

## 📋 Pre-Deployment Checklist

- [ ] Node.js installed (for local development)
- [ ] Project dependencies installed (`npm install`)
- [ ] Supabase account created
- [ ] Database tables created
- [ ] `.env.local` file created with credentials
- [ ] Tested on localhost
- [ ] Netlify or Vercel account ready

---

## �️ PART 1: LOCAL DEVELOPMENT SETUP (10 minutes)

### Step 2.0.1: Install Node.js (If needed)
1. Download from **https://nodejs.org** (LTS version recommended)
2. Install and verify:
   ```bash
   node --version
   npm --version
   ```

### Step 1.0.2: Install Project Dependencies
1. Open terminal in your project folder
2. Run:
   ```bash
   npm in2tall
   ```
3. This installs React, Vite, and Supabase libraries

### Step 1.0.3: Create `.env.local` File
1. In your project root folder, create a new file: `.env.local`
2. Add this template (you'll fill in actual values later):
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
   VITE_A2MIN_PASSWORD=blueflame2024
   ```
3. **⚠️ IMPORTANT:** Add `.env.local` to `.gitignore` (don't commit credentials!)

---

## 🔧 PART 2: SUPABASE SETUP (15 minutes)

### Step 1.1: Create Supabase Account
1. Go to **https://supabase.com**
2. Click **3: ADD CREDENTIALS TO `.env.local` (5 minutes)



### Step 3.1: Fill Your Environment Variables

1. Go back to your `.env.local` file
2. Get credentials from Supabase:
   - Login to **https://supabase.com**
   - Click **Settings** → **API**
   - Copy **Project URL** and **Anon Key**
3. Update `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://abc123def456.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   VITE_ADMIN_PASSWORD=blueflame2024
   ```
4. Save the file

**✅ Benefits of using `.env.local`:**
- Credentials never exposed in code
- Safe to push to GitHub (file is gitignored)
- Easy to change per environment
- Secure for team collaborationnormal)

---

## 📝 PART 2: ADD CREDENTIALS TO YOUR FILES (5 minutes)

### Step 2.1: Update admin.html

1. Open `admin.html` in VS Code
2. Find this line (around line 500):
   ```javascript
   const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
   const SUPABASE_KEY = 'YOUR_ANON_KEY';
   ```
3. Replace with YOUR actual values:
   ```javascript
   const SUPABASE_URL = 'https://abc123def456.supabase.co';  // Your Project URL
   const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Your Anon Key
   ```

### Step 2.2: Update index.html

1. Open `index.html` in VS Code
2. Find this line (around line 1170):
   ```javascript
   const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
   const SUPABASE_KEY = 'YOUR_ANON_KEY';
   ```
3. Replace with **THE SAME** values from Step 2.1

**💡 Tip:** Both files use the same Supabase project, so credentials are identical.

---

## 🌐 PART 3: DEPLOY TO NETLIFY (10 minutes)

### Step 3.1: Upload to Netlify

1. Go to **https://netlify.com**
2. 🚀 PART 4: TEST ON LOCALHOST (5 minutes)

### Step 4.1: Start Development Server

1. Open terminal in your project folder
2. Run:
   ```bash
   npm run dev
   ```
3. You'll see:
   ```
   ➜  Local:   http://localhost:5173/
   ```

### Step 4.2: Test Your App Locally

1. Open **http://localhost:5173** in your browser
2. Test the delivery calculator:
   - Enter amount: `5000`
   - Should calculate KG automatically ✅
3. Test admin dashboard:
   - Go to **http://localhost:5173/admin.html**
   - Login with password: `blueflame2024`
   - Update gas price and verify it syncs ✅

**💡 Pro Tip:** Make changes to your code, and the page will auto-refresh!

### Step 4.3: Stop Development Server
- Press `Ctrl+C` in the terminal

---
7
## 🌐 PART 5: DEPLOY TO NETLIFY (10 minutes)

### Step 5.1: Option A - Drag & Drop Deploy

1. Go to **https://netlify.com** and login
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your **entire project folder**
4. Wait for green checkmark ✅
5. Copy your site URL: `https://yoursite-name.netlify.app`

### Step 5.2: Option B - Better: Connect to GitHub (Recommended)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. In Netlify:
   - Click **"Add new site"** → **"Import an existing project"**
   - Select **GitHub**
   - Choose your repo
   - Click **"Deploy"**

3. Add environment variables in Netlify:
   - Go to **Site settings** → **Build & deploy** → **Environment**
   - Click **"Add environment variables"**
   - Add:
     ```
     VITE_SUPABASE_URL: https://abc123.supabase.co
     VITE_SUPABASE_ANON_KEY: your_anon_key_here
     VITE_ADMIN_PASSWORD: your_admin_password
     ```

### Step 5.3: Test Your Site

1. Open your Netlify URL
2. Test calculator: Enter `5000` → Should show KG ✅
3. Test admin: Go to `/admin.html` → Login with password ✅
4. Update gas price → Verify it syncs on main site ✅

---

## 🌐 PART 6: DEPLOY TO VERCEL (Alternative, 10 minutes)

### Step 6.1: Deploy to Vercel

1. Go to **https://vercel.com** and login with GitHub
2. Click **"Add New Project"**
3. Select your GitHub repo
4. Click **"Import"**

### Step 6.2: Add Environment Variables

1. In Vercel, click **"Settings"**
2. Go to **"Environment Variables"**
3. Add these:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_ADMIN_PASSWORD
   ```
4. Click **"Deploy"** again

### Step 6.3: Auto-Deploy (Bonus!)

Now every time you push to GitHub, Vercel auto-deploys! 🎉
### Customer Site Tests
- [ ] Delivery calculator loads
- [ ] Enter amount → KG calculates automatically
- [ ] "Send via WhatsApp" button works
- [ ] "📱 Order on WhatsApp" buttons work from products
- [ ] Contact form works

### Admin Dashboard Tests
- [ ] Can login with password
- [ ] Update gas price → calculator updates on main site
- [ ] Add new product → shows in grid
- [ ] Record new sale → appears in sales table
- [ ] Dashboard stats update
- [ ] Can delete products/sales
- [ ] Logout works

---

## 🔐 PART 8: SECURITY BEST PRACTICES

### ✅ Using `.env.local` (Already Secure!)
- Credentials stored locally, never in code ✅
- File is gitignored automatically ✅
- Safe for team collaboration ✅

### Change Admin Password
1. Edit `.env.local`:
   ```env
   VITE_ADMIN_PASSWORD=MySecurePass2024
   ```
2. On localhost: Changes take effect immediately
3. On Netlify/Vercel: Update environment variables and redeploy

### Protect Your Repository
1. Add to `.gitignore` (if not already):
   ```
   .env.local
   .env.*.local
   node_modules/
   dist/
   ```

2. Never commit these files:
   - `.env.local` ❌
   - `.env.production` ❌
   - Any files with credentials ❌

### Additional Security
- Change Supabase password regularly
- Rotate your Anon Key if compromised
- Use different passwords for dev/production
- Monitor Supabase activity logs

---

## 📱 MULTI-DEVICE ACCESS

Once deployed, your team can access from ANY device:

**Development:** `http://localhost:5173` (on your computer)
- Test before deploying
- Auto-refresh on code changes
- Full debugging tools

**Live Website:** `https://yoursite.netlify.app` (deployed)
- Customers view products
- Use delivery calculator
- Place orders on WhatsApp

**Admin Dashboard:** `https://yoursite.netlify.app/admin.html` (deployed)
- Update gas prices (sync immediately)
- Manage products
- View sales records
- Real-time updates ✅
Localhost Issues

**"npm: command not found"**
- Node.js not installed
- Download from https://nodejs.org and restart terminal

**"Port 5173 already in use"**
- Another app using same port
- Run: `npm run dev -- --port 3000`

**"Cannot find module"**
- Dependencies not installed
- Run: `npm install`

**"Vite error when starting dev server"**
- Check `.env.local` exists and is readable
- Try: `npm run dev` in project root

### Deployment Issues

**"Database connection failed"**
- Verify `.env.local` credentials are correct
- Check Supabase project is "Running"
- Verify SQL tables were created
- Test on localhost first

**"Admin login not working"**
- Check password in `.env.local` (or Netlify env vars)
- Clear browser cookies and try again
- Check browser console (F12) for errors

**"Environment variables not working after deploy"**
- Netlify: Check you added vars in Site Settings
- Vercel: Verify vars saved, then redeploy
- Wait 5 minutes for cache to clear

**"Calculator not calculating"**
- On localhost: Check console (F12) for errors
- On deployed: Check Netlify/Vercel logs
- Verify gas_prices table has data in Supabase
- Check your Anon Key has read permissions

**"Products not showing"**
- Login to admin dashboard
- Add a product in Products tab
- Refresh main page

**"Price not syncing after update"**
- Check Supabase dashboard - is price updated?
- Hard refresh page (Ctrl+F5)
- Wait 30 seconds for calculator to refresh

---

## 📚 Quick Command Reference

```bash
# Install dependencies (run once)
npm install

# Start local development
npm run dev

# Build for production
npm build

# Preview production build
npm run preview
```

### "Price updates not syncing"
- ✅ Check in Supabase → SQL Editor → select * from gas_prices;
- ✅ Click Refresh on page (F5)
- ✅ Calculator refreshes price every 30 seconds

---

## 📞 GETTING HELP

### Supabase Issues
- Check: https://supabase.com/docs
- Email: support@supabase.com

### Netlify Issues
- Check: https://netlify.com/support
- Email: support@netlify.com

### Your Blue Flame Gas Code
- All code is in: `admin.html` and `index.html`
- Backup these files regularly!

---

## 🎉 YOU'RE LIVE!

Your Blue Flame Gas business is now:
- ✅ Deployed globally (accessible anywhere)
- ✅ Real-time multi-device sync
- ✅ Permanent data backup
- ✅ Professional admin dashboard
- ✅ Ready to scale

---

## 🚀 NEXT STEPS (Optional)

1. **Custom Domain:** Buy domain from Godaddy/Namecheap → Connect to Netlify
2. **Email Marketing:** Add email notifications when orders come in
3. **Payment Gateway:** Add Paystack/Flutterwave for online payments
4. **Mobile App:** Convert to React Native app
5. **Analytics:** Track which products sell most

---

## 📋 QUICK REFERENCE

| Task | Location |
|------|----------|
| Update Gas Price | Admin Dashboard → 💰 Gas Price tab |
| Add Products | Admin Dashboard → 📦 Products tab |
| View Sales | Admin Dashboard → 📈 Sales Records tab |
| Delivery Calculator | Main site → "💰 Make Delivery Calculation" section |
| Check Supabase Data | Supabase → Table Editor |
| Change Site | Edit admin.html / index.html then re-deploy |

---

## 🔒 IMPORTANT REMINDERS

⚠️ **Never share your Supabase Key publicly**
⚠️ **Backup your data regularly** (export from Supabase)
⚠️ **Change default admin password** before going live
⚠️ **Monitor your Supabase usage** (free tier = 500MB storage)

---

---

## 📌 COPY THIS SQL CODE

Run this in Supabase SQL Editor to create all tables:

```sql
-- Create Gas Price table
CREATE TABLE IF NOT EXISTS gas_prices (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  price_per_kg INTEGER NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by TEXT
);

-- Create Products table
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Sales table
CREATE TABLE IF NOT EXISTS sales (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sale_date DATE NOT NULL,
  sale_type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Admin Users table
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default gas price
INSERT INTO gas_prices (price_per_kg, updated_by) 
VALUES (950, 'system');

-- Insert default admin user
INSERT INTO admin_users (username, password, email) 
VALUES ('admin', 'blueflame2024', 'admin@blueflame.com');

-- Enable Row Level Security
ALTER TABLE gas_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read" ON gas_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON sales FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON admin_users FOR ALL USING (true);
```

---

**Done! Your Blue Flame Gas business is now powered by Supabase! 🔥🚀**
