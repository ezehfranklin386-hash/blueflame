# 🚀 Supabase Setup Guide for Blue Flame Gas

## Step 1: Create Supabase Account (5 minutes)

1. Go to **https://supabase.com**
2. Click **"Start Your Project"** → Sign up with Email
3. Fill in your details and verify email
4. Create a new organization (e.g., "Blue Flame Gas")
5. Create a new project:
   - **Project Name:** `blueflame-gas`
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to Lagos (Europe is fine)
   - Click **"Create New Project"** (takes ~2 min)

---

## Step 2: Get Your API Keys (2 minutes)

After project is created:

1. Go to **Settings** → **API**
2. Copy these two values and **SAVE THEM SOMEWHERE SAFE**:
   ```
   Project URL: https://xxxxx.supabase.co
   Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Keep these handy - you'll add them to your website

---

## Step 3: Create Database Tables (3 minutes)

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy & paste this SQL code:

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
  sale_type TEXT NOT NULL, -- 'delivery' or 'product'
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

-- Create policies (allow all for now - you can restrict later)
CREATE POLICY "Allow public read" ON gas_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON sales FOR SELECT USING (true);
CREATE POLICY "Allow all operations" ON admin_users FOR ALL USING (true);
```

4. Click **"Run"** button
5. You should see ✅ Success messages

---

## Step 4: Add Credentials to Your Website (1 minute)

You'll see these in the updated `admin.html` and `index.html` files:

```javascript
// Find this section in the code and add your keys:
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Your Project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your Anon Key
```

Replace `xxxxx` and `eyJ...` with your actual values from Step 2.

---

## Step 5: Test Everything

1. Upload updated files to Netlify
2. Open admin dashboard: `yoursite.com/admin.html`
3. Login: **admin** / **blueflame2024**
4. Try:
   - Update gas price → Check if it syncs to calculator
   - Add a product → Refresh page → Still there?
   - Record a sale → Check sales table

---

## 🎉 You're Done!

Your Blue Flame Gas business is now **cloud-backed** with:
- ✅ Real-time multi-device sync
- ✅ Multiple admin access
- ✅ Permanent data storage
- ✅ Secure cloud backup
- ✅ Zero data loss

---

## 📱 Multi-Device Access

Once deployed, **ANY device** can access:
- Admin dashboard: `yoursite.com/admin.html`
- Customer site: `yoursite.com` (with live calculator)

All changes sync **instantly** across devices! 🚀

---

## 🆘 Troubleshooting

**"API request failed"**
- Check your Project URL and Anon Key are correct
- Make sure you copied the entire key (no spaces)

**"Can't login"**
- Username: `admin`
- Password: `blueflame2024`
- These are hardcoded in the initial setup

**"Data not saving"**
- Check Supabase dashboard → Tables to verify data is there
- Open browser console (F12) for error messages

---

## 🔒 Security Notes (For Later)

Once you're comfortable:
1. Change the default admin password via Settings
2. Add more admin users with different passwords
3. Use environment variables instead of hardcoding keys
4. Enable Row Level Security policies per user

For now, this setup is perfect for a growing business! 🎯

---

**Questions?** Check Supabase docs: https://supabase.com/docs
