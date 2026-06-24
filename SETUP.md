# PTP-102 Visual Aid - Setup Instructions

## GitHub Repository
- **URL**: https://github.com/DRDSP2/PTP-102-Visual-Aid
- **Live Site**: https://drdsp2.github.io/PTP-102-Visual-Aid/

## Supabase Setup (Required)

### 1. Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Name: `PTP-102 Visual Aid`
4. Region: Choose closest to your location (EU West for Ireland)
5. Database Password: Generate a strong password
6. Plan: Free tier

### 2. Run Database Migrations
1. In your Supabase dashboard, go to SQL Editor
2. Create a "New query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run"

### 3. Create Storage Bucket
1. Go to Storage in the left sidebar
2. Click "New bucket"
3. Name: `xray-images`
4. Check "Public bucket"
5. Click "Save"
6. Click on the bucket, then "Policies"
7. Add policy: `Allow all operations for authenticated users`

### 4. Create Admin User
1. Go to Authentication > Users
2. Click "Add user"
3. Email: `drdsp@pm.me`
4. Password: `123456`
5. Click "Create user"

### 5. Get API Credentials
1. Go to Project Settings > API
2. Copy the "URL" and "anon public" key
3. Open your deployed app: https://drdsp2.github.io/PTP-102-Visual-Aid/
4. Enter these credentials in the config screen

## Features

### Reference X-ray Panel (Left)
- Severity selector: Normal / Mild / Moderate / Severe
- 10 clickable pins with anatomical tooltips
- Pin filters: All / Rotation / Sinking / Chronic
- SVG overlays showing progressive laminitis changes

### Patient X-ray Panel (Right)
- Horse selector dropdown
- Hoof selector: FL / FR / HL / HR
- Date navigation with timeline
- Image controls: Zoom, brightness, reset
- Upload zone for new X-rays

### Severity System
- **Normal**: Green pins, normal anatomy
- **Mild**: Yellow pins, early changes
- **Moderate**: Orange pins, obvious pathology
- **Severe**: Red pins, advanced disease

## Tech Stack
- HTML/CSS/JS (vanilla, no build step)
- Supabase (Auth, Database, Storage)
- GitHub Pages (hosting)

## Next Steps
1. Replace `public/images/reference-xray.jpg` with actual equine hoof X-ray
2. Upload patient X-rays via the app
3. Add more horses to the database
4. Customize pin positions for your specific X-ray views

## Support
For issues or questions, check the GitHub repository or contact Byrock Technologies.
