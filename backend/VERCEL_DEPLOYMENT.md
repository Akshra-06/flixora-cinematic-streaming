# Flixora Backend - Vercel Deployment Guide

## Prerequisites

- ✅ Vercel account (connected to GitHub)
- ✅ MongoDB Atlas account with cloud database
- ✅ Backend code pushed to GitHub repository

## Step-by-Step Deployment

### 1. Prepare MongoDB Atlas Connection String

1. Go to **MongoDB Atlas** → Your cluster
2. Click **"Connect"** button
3. Select **"Drivers"**
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/flixora?retryWrites=true&w=majority`)
5. Replace `<password>` with your actual password
6. Replace database name if needed (after `/`: `flixora`)

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Navigate to your project root
cd /Users/apple/Downloads/flixora-cinematic-streaming-main

# Deploy
vercel
```

Follow the prompts:

- Link to your GitHub project
- Select your Vercel account
- Accept defaults for project settings

#### Option B: Using Vercel Dashboard

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework**: Node.js
   - **Root Directory**: `backend`
5. Click **"Deploy"**

### 3. Configure Environment Variables

In **Vercel Dashboard**:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/flixora?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-jwt-key-change-this
JWT_EXPIRE = 7d
CORS_ORIGIN = https://your-frontend-domain.vercel.app
NODE_ENV = production
```

Replace the values with your actual credentials.

### 4. Update Frontend API Base URL

In your React frontend (e.g., in environment or API config):

```javascript
// Before (local development)
const API_BASE = "http://localhost:5001/api";

// After (production)
const API_BASE = "https://your-backend-project-name.vercel.app/api";
```

### 5. Test Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-backend.vercel.app/api/health

# Register
curl -X POST https://your-backend.vercel.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Important Notes

### ⚠️ MongoDB Connection Pooling

Vercel serverless functions require connection pooling. The current setup using Mongoose is compatible, but consider:

- Use **MongoDB Atlas** (not local MongoDB)
- Mongoose handles connection pooling automatically
- Ensure connection reuse across invocations

### 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Don't commit `.env` files to GitHub
- [ ] Use environment variables for all secrets
- [ ] Enable IP whitelist in MongoDB Atlas (or set to 0.0.0.0 for Vercel)

### 📝 Update CORS Origin

Update `CORS_ORIGIN` environment variable to match your frontend URL:

```
https://your-frontend-vercel-app.vercel.app
```

### 🌐 MongoDB Atlas IP Whitelist

To allow Vercel to connect:

1. MongoDB Atlas Dashboard
2. **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (or add Vercel's IPs if known)
5. Save

## Troubleshooting

### ❌ "ECONNREFUSED" or MongoDB Connection Error

**Solution**:

- Verify `MONGODB_URI` is correct in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes Vercel
- Ensure password doesn't contain special characters requiring URL encoding

### ❌ CORS Errors

**Solution**:

- Update `CORS_ORIGIN` in environment variables
- Make sure frontend and backend URLs match exactly

### ❌ 500 Internal Server Error

**Solution**:

- Check Vercel deployment logs
- Verify all environment variables are set
- Check MongoDB connection string format

### ❌ Function Timeout

**Solution**:

- Check if MongoDB operations are timing out
- Verify database connection is working
- Optimize slow queries

## View Deployment Logs

```bash
# Using Vercel CLI
vercel logs your-project-name

# Or in Vercel Dashboard:
# Project → Deployments → Click deployment → Function Logs
```

## Redeploy After Changes

```bash
# Using CLI
vercel --prod

# Or push to GitHub and Vercel auto-deploys
git push origin main
```

## Update from Local to Production

Your Vercel backend URL will look like:

```
https://flixora-backend.vercel.app/api
```

Update these in your code:

**React Frontend (.env or config file):**

```javascript
REACT_APP_API_URL=https://flixora-backend.vercel.app/api
```

**Axios/Fetch Setup:**

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
});

export default API;
```

## Production Deployment Checklist

- [ ] MongoDB Atlas setup complete
- [ ] Environment variables configured in Vercel
- [ ] `vercel.json` configured
- [ ] CORS_ORIGIN set to frontend URL
- [ ] All dependencies installed (`npm install` in backend)
- [ ] Backend pushed to GitHub
- [ ] Frontend API URL updated
- [ ] Deployment successful (curl health check works)
- [ ] Test user registration and login
- [ ] Database operations working (create/read operations)

## Useful Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [project-name]

# Remove a deployment
vercel rm [deployment-url]
```

## Next Steps

1. ✅ Deploy backend to Vercel
2. ✅ Deploy frontend to Vercel (or Netlify)
3. ✅ Connect frontend and backend with correct URLs
4. ✅ Test end-to-end flow
5. ✅ Monitor logs and errors

## Support Resources

- [Vercel Node.js Documentation](https://vercel.com/docs/concepts/functions/serverless-functions/node.js)
- [MongoDB Atlas Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Need Help?**

Check Vercel deployment logs for specific error messages. Most issues are related to:

1. Incorrect MongoDB connection string
2. Missing environment variables
3. CORS configuration
4. IP whitelist in MongoDB Atlas
