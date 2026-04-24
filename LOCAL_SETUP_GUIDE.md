# 🚀 Local Development Setup - Running Guide

## ✅ What's Running

| Component                 | Port  | Status     | URL                   |
| ------------------------- | ----- | ---------- | --------------------- |
| **Frontend (Vite React)** | 8081  | ✅ Running | http://localhost:8081 |
| **Backend (Express API)** | 5001  | ✅ Running | http://localhost:5001 |
| **MongoDB**               | 27017 | ✅ Running | localhost:27017       |

> **Note**: Frontend auto-adjusted to port 8081 (8080 was in use). The Vite config has a proxy that routes `/api` calls to `http://localhost:5001`

---

## 🌐 Access Your App

Open your browser:

```
http://localhost:8081
```

The app is now fully functional with:

- ✅ Trailer loading from your fixed Watch.tsx
- ✅ Backend API at localhost:5001
- ✅ MongoDB database
- ✅ Hot reload enabled (changes auto-refresh)

---

## 🧪 Test the Trailer Fix

1. **Open** http://localhost:8081
2. **Navigate** to a movie (Browse/Favorites page)
3. **Click** to watch a movie
4. **Open DevTools** (F12) and check the **Console** tab
5. **Look for** logs starting with `[Trailer]`:
   - Success: `[Trailer] Iframe onLoad fired`
   - Error: `[Trailer] Iframe onError fired → using fallback`
   - Timeout: `[Trailer] Iframe did not load within timeout (5s) → using fallback`

Example successful console output:

```
[Trailer] Fetching from: https://flixora-cinematic-streaming.onrender.com/api/movies/trailer/...
[Trailer] Response status: 200 Body: {data: {youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/..."}}
[Trailer] Valid YouTube URL found: https://www.youtube-nocookie.com/embed/...
[Trailer] Iframe onLoad fired
```

---

## 📁 Backend Configuration

**Location**: `/backend/.env`

Current settings:

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/flixora
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:8081
FRONTEND_URL=http://localhost:8081
TMDB_API_KEY=your_tmdb_api_key
```

**To enable trailer fetching**, add your TMDB API key:

```
TMDB_API_KEY=your_actual_tmdb_api_key_here
```

(Get free key at: https://www.themoviedb.org/settings/api)

---

## 🔧 Backend Development

The backend runs with **nodemon** (auto-restarts on changes):

```bash
cd backend
npm run dev    # Development with hot-reload
npm start      # Production mode
```

Backend files are in `/backend/src/`:

- `controllers/` - Business logic
- `routes/` - API endpoints
- `models/` - MongoDB schemas
- `middleware/` - Authentication, etc.
- `server.js` - Main entry point

---

## 🎨 Frontend Development

Frontend runs with **Vite** (hot module replacement):

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Check code quality
npm run test   # Run tests
```

### File Structure:

- `src/pages/Watch.tsx` - Your trailer player (FIXED! ✅)
- `src/components/` - Reusable components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities (includes `authFetch` for API calls)

---

## 🐛 Debugging Trailer Issues

### **Console Logs**

Filter console for `[Trailer]` to see all trailer-related logs.

### **Network Tab** (DevTools)

1. Open DevTools → Network tab
2. Look for requests to `/api/movies/trailer/`
3. Check response body for the YouTube URL

### **Backend Logs**

Watch the backend terminal output for any API errors:

```bash
# Backend terminal shows
TMDB KEY: your_tmdb_api_key
Server running on port 5001
✅ MongoDB Connected
```

---

## 🛑 Stop/Restart

### Stop All Services:

```bash
# Press Ctrl+C in each terminal
# Or kill processes:
pkill -f "npm run dev"
pkill mongod
```

### Restart:

```bash
# Start MongoDB first (if needed)
mongod --dbpath ~/mongodb_data &

# Then backend
cd backend && npm run dev

# Then frontend (in another terminal)
npm run dev
```

---

## 📊 API Endpoints (for testing)

The backend provides these endpoints:

### Movies

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `GET /api/movies/trailer/:tmdbId?mediaType=movie` - Get trailer URL (Your Fix!)

### Users

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/user/profile` - Get user profile

### Watch History

- `GET /api/watch-history` - Get watch history
- `POST /api/watch-history` - Save progress

### Other

- `GET /api/favorites` - User favorites
- `GET /api/my-list` - User watchlist
- `GET /api/notifications` - User notifications

---

## 🚨 Common Issues

### Port 8080 already in use?

✅ Frontend auto-adjusted to **8081**. Update proxy if needed in `vite.config.ts`

### MongoDB connection error?

```
# Check if MongoDB is running
pgrep mongod

# If not, start it
mongod --dbpath ~/mongodb_data &
```

### Backend can't connect to MongoDB?

1. Ensure MongoDB is running: `pgrep mongod`
2. Check `.env` has correct `MONGODB_URI=mongodb://localhost:27017/flixora`
3. Check backend terminal for connection error

### Frontend can't reach backend API?

1. Verify backend is running on port 5001
2. Check Vite proxy in `vite.config.ts` points to `:5001`
3. Check backend CORS_ORIGIN matches frontend URL

### Trailer still not loading?

1. Check console for `[Trailer]` logs
2. Verify TMDB_API_KEY is set in `.env` (backend needs to restart)
3. Check Network tab for API response
4. See [TRAILER_FIX_GUIDE.md](./TRAILER_FIX_GUIDE.md) for detailed debugging

---

## 📝 Next Steps

1. ✅ Test the trailer fix by watching a movie
2. 📊 Check console logs for troubleshooting
3. 🔑 Add TMDB API key to `.env` for real trailers
4. 🛠️ Make changes to files and see hot-reload in action
5. 📚 Refer to [TRAILER_FIX_GUIDE.md](./TRAILER_FIX_GUIDE.md) for detailed trailer debugging

---

## 📞 Terminal Commands Reference

```bash
# Navigate to project
cd "/Users/apple/Downloads/flixora-cinematic-streaming-main 2"

# Frontend only
npm run dev

# Backend only
cd backend && npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm run test

# MongoDB (if needed to restart)
mongod --dbpath ~/mongodb_data &
```

**Happy coding! 🎬**
