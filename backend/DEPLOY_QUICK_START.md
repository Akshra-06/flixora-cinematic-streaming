# 🚀 Flixora Backend - Quick Deploy to Vercel

## 5-Minute Setup

### Step 1: Get MongoDB Atlas URL

```
mongodb+srv://username:password@cluster.mongodb.net/flixora?retryWrites=true&w=majority
```

[Get it here →](https://www.mongodb.com/cloud/atlas) (Free tier available)

### Step 2: Open Terminal & Deploy

```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Go to project directory
cd /Users/apple/Downloads/flixora-cinematic-streaming-main

# Deploy!
vercel
```

### Step 3: Add Environment Variables in Vercel Dashboard

Go to: **[vercel.com](https://vercel.com)** → Your Project → Settings → Environment Variables

Add these 4 variables:

```
MONGODB_URI = (your MongoDB Atlas URL)
JWT_SECRET = your-secret-key-here
CORS_ORIGIN = https://your-frontend.vercel.app
NODE_ENV = production
```

### Step 4: Test It Works

```bash
curl https://your-backend.vercel.app/api/health
```

Expected response:

```json
{ "message": "Flixora backend is running" }
```

✅ **You're done!** Your backend is live!

---

## Common Issues & Fixes

| Issue                    | Fix                                        |
| ------------------------ | ------------------------------------------ |
| MongoDB connection error | Check connection string in `MONGODB_URI`   |
| CORS error               | Update `CORS_ORIGIN` to match frontend URL |
| 500 Server Error         | Check Vercel logs for details              |
| "Route not found"        | Make sure you're using `/api/` prefix      |

## Your Backend URL

Once deployed, use this format for all API calls:

```
https://your-project-name.vercel.app/api
```

Examples:

```
POST   https://your-project.vercel.app/api/users/register
GET    https://your-project.vercel.app/api/movies
POST   https://your-project.vercel.app/api/my-list
```

## Update Frontend

Find where your frontend makes API calls and change:

```javascript
// OLD (local development)
const API_URL = "http://localhost:5001/api";

// NEW (production)
const API_URL = "https://your-backend.vercel.app/api";
```

Or use environment variables:

```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

## View Logs

```bash
vercel logs your-project-name
```

## Redeploy After Code Changes

```bash
git push origin main  # Auto-deploys if Vercel is linked to GitHub
# OR
vercel --prod  # Deploy manually
```

---

📖 **Full guide**: See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
