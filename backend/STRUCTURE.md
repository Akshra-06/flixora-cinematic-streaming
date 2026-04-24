# Backend Project Structure Overview

## Complete File Tree

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js                      # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── userController.js          # User auth & profile management
│   │   ├── movieController.js         # Movie CRUD operations
│   │   ├── myListController.js        # My List (watchlist) operations
│   │   ├── favoritesController.js     # Favorites management
│   │   ├── watchHistoryController.js  # Watch history & progress tracking
│   │   ├── notificationController.js  # Notification management
│   │   └── reactionController.js      # Likes, dislikes, favorites
│   │
│   ├── middleware/
│   │   └── authenticate.js            # JWT verification middleware
│   │
│   ├── models/
│   │   ├── User.js                    # User schema with subdocuments
│   │   ├── Movie.js                   # Movie schema
│   │   ├── Notification.js            # Notification schema with TTL
│   │   └── Reaction.js                # Reaction schema with compound index
│   │
│   ├── routes/
│   │   ├── userRoutes.js              # /api/users endpoints
│   │   ├── movieRoutes.js             # /api/movies endpoints
│   │   ├── myListRoutes.js            # /api/my-list endpoints
│   │   ├── favoritesRoutes.js         # /api/favorites endpoints
│   │   ├── watchHistoryRoutes.js      # /api/watch-history endpoints
│   │   ├── notificationRoutes.js      # /api/notifications endpoints
│   │   └── reactionRoutes.js          # /api/reactions endpoints
│   │
│   ├── utils/
│   │   ├── auth.js                    # JWT token generation & verification
│   │   └── response.js                # Standardized response helpers
│   │
│   └── server.js                      # Main Express server (entry point)
│
├── node_modules/                      # 139 installed packages
├── .env                               # Environment variables (configured)
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Dependency lock file
├── README.md                          # Comprehensive documentation
├── API_USAGE.md                       # API endpoint examples
└── STRUCTURE.md                       # This file
```

## What Each File Does

### Core Files

**src/server.js**

- Express app initialization
- Middleware setup (cors, body-parser)
- Route mounting
- Error handling
- Server startup on port 5001

**src/config/db.js**

- MongoDB connection with Mongoose
- Connection error handling
- Called during server startup

### Controllers (Business Logic)

Each controller exports functions that handle specific operations:

**userController.js**

- `register` - Create new user account
- `login` - Authenticate user
- `getProfile` - Get user details
- `createProfile` - Create new profile for user
- `updateProfile` - Modify profile
- `deleteProfile` - Remove profile
- `getAllProfiles` - Get all user profiles

**movieController.js**

- `getAllMovies` - List movies with pagination & filtering
- `getMovieById` - Get single movie details
- `createMovie` - Add new movie (admin)
- `updateMovie` - Modify movie details (admin)
- `deleteMovie` - Remove movie (admin)

**myListController.js**

- `addToMyList` - Add movie to watchlist
- `removeFromMyList` - Remove from watchlist
- `getMyList` - Retrieve watchlist

**favoritesController.js**

- `addToFavorites` - Add to favorites
- `removeFromFavorites` - Remove from favorites
- `getFavorites` - Get all favorites

**watchHistoryController.js**

- `addToWatchHistory` - Start watching movie
- `updateWatchProgress` - Save watch position
- `getWatchHistory` - Get all watched movies
- `getWatchProgress` - Get progress for specific movie
- `clearWatchHistory` - Clear all history

**notificationController.js**

- `createNotification` - Send notification
- `getUserNotifications` - Get user's notifications
- `markAsRead` - Mark single notification as read
- `markAllAsRead` - Mark all as read
- `deleteNotification` - Remove notification
- `getUnreadCount` - Unread count

**reactionController.js**

- `addReaction` - Like/dislike/favorite movie
- `getUserReaction` - Get user's reaction to movie
- `getMovieReactions` - Get reaction summary for movie
- `removeReaction` - Remove reaction
- `getUserReactions` - Get paginated user reactions

### Models (Database Schemas)

**User.js**

- Subdocuments: profiles[], myList[], favorites[], watchHistory[]
- Methods: matchPassword(), toJSON()
- Pre-hook: Password hashing before save

**Movie.js**

- Core fields: movieId, title, description, thumbnail, videoUrl
- Metadata: genre, duration, rating, releaseDate, director, cast

**Notification.js**

- Relationship: userId reference to User
- Features: type field, isRead flag, TTL auto-deletion after 30 days

**Reaction.js**

- Compound unique index on (userId, movieId, reaction)
- Prevents duplicate reactions

### Routes (API Endpoints)

Each route file defines REST endpoints mapped to controllers:

**userRoutes.js**

- POST /register
- POST /login
- GET /profile (protected)
- POST /profiles (protected)
- GET /profiles (protected)
- PUT /profiles/:profileId (protected)
- DELETE /profiles/:profileId (protected)

**movieRoutes.js**

- GET / (paginated, searchable)
- GET /:movieId
- POST / (create)
- PUT /:movieId (update)
- DELETE /:movieId (delete)

(Similar structure for other route files)

### Middleware

**authenticate.js**

- Verifies JWT token from Authorization header
- Extracts userId and attaches User object to request
- Returns 401 if token invalid/missing

### Utils

**auth.js**

- `generateToken(userId)` - Create JWT
- `verifyToken(token)` - Validate JWT

**response.js**

- `sendSuccess(res, statusCode, message, data)` - Standardized success response
- `sendError(res, statusCode, message)` - Standardized error response

## Dependencies Installed

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT auth
- **cors**: Cross-origin support
- **validator**: Input validation
- **nodemon**: Development auto-reload

## Configuration Files

**.env** (Git ignored, configured)

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/flixora
JWT_SECRET=flixora_super_secret_key_...
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:8080
```

**.gitignore**

- node_modules/
- .env (secrets not committed)
- .DS_Store
- \*.log files

## How It Works

1. **Request arrives** → Express middleware processes it
2. **Routes forward** to appropriate controller
3. **Controller** calls model methods via Mongoose
4. **MongoDB** stores/retrieves data
5. **Response** formatted by utils/response.js
6. **Client receives** JSON with success/error

## Getting Your Frontend Connected

Update your frontend's API configuration:

```javascript
// API base URL for all requests
const API_BASE = "http://localhost:5001/api";

// Store token from login response
const token = response.data.token;
localStorage.setItem("authToken", token);

// Use token in authenticated requests
fetch(`${API_BASE}/my-list`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Production Deployment Notes

Before deploying:

1. Change JWT_SECRET to strong random value
2. Use MongoDB Atlas or managed MongoDB service
3. Set NODE_ENV=production
4. Configure CORS_ORIGIN to your production frontend URL
5. Use environment-specific .env files
6. Enable HTTPS
7. Add rate limiting
8. Add request validation
9. Add logging
10. Set up monitoring
