# Flixora Backend

A comprehensive Node.js/Express.js backend for the Flixora cinematic streaming platform with MongoDB integration.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js     # User authentication and profile management
│   │   ├── movieController.js    # Movie CRUD operations
│   │   ├── myListController.js   # My List management
│   │   ├── favoritesController.js # Favorites management
│   │   ├── watchHistoryController.js # Watch history tracking
│   │   ├── notificationController.js # Notifications
│   │   └── reactionController.js # Likes, dislikes, favorites
│   ├── middleware/
│   │   └── authenticate.js       # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema with profiles, lists, etc.
│   │   ├── Movie.js              # Movie schema
│   │   ├── Notification.js       # Notification schema
│   │   └── Reaction.js           # Reaction schema
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── myListRoutes.js
│   │   ├── favoritesRoutes.js
│   │   ├── watchHistoryRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── reactionRoutes.js
│   ├── utils/
│   │   ├── auth.js               # JWT token generation and verification
│   │   └── response.js           # Standardized response functions
│   └── server.js                 # Main server file
├── .env.example                  # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Features

- **User Management**: Registration, login, profile creation
- **Multi-Profile Support**: Create multiple profiles per user
- **Movie Database**: Comprehensive movie information
- **My List**: Personalized watchlist
- **Favorites**: Mark favorite movies
- **Watch History**: Track viewing progress
- **Notifications**: Real-time notifications with read/unread status
- **Reactions**: Like, dislike, and favorite movies
- **JWT Authentication**: Secure token-based authentication
- **CORS Enabled**: Cross-origin requests support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Install dependencies**:

```bash
cd backend
npm install
```

2. **Create .env file**:

```bash
cp .env.example .env
```

3. **Update .env with your values**:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/flixora
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:8080
FRONTEND_URL=http://localhost:8080
```

4. **Ensure MongoDB is running**:

```bash
# If using local MongoDB
mongod
```

## Running the Server

### Development Mode (with nodemon)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Users (`/api/users`)

- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `POST /profiles` - Create new profile (protected)
- `GET /profiles` - Get all user profiles (protected)
- `PUT /profiles/:profileId` - Update profile (protected)
- `DELETE /profiles/:profileId` - Delete profile (protected)

### Movies (`/api/movies`)

- `GET /` - Get all movies (with pagination)
- `GET /:movieId` - Get specific movie
- `POST /` - Create movie (admin)
- `PUT /:movieId` - Update movie (admin)
- `DELETE /:movieId` - Delete movie (admin)

### My List (`/api/my-list`)

- `GET /` - Get my list (protected)
- `POST /` - Add movie to list (protected)
- `DELETE /:movieId` - Remove from list (protected)

### Favorites (`/api/favorites`)

- `GET /` - Get favorites (protected)
- `POST /` - Add to favorites (protected)
- `DELETE /:movieId` - Remove from favorites (protected)

### Watch History (`/api/watch-history`)

- `GET /` - Get watch history (protected)
- `POST /` - Add to watch history (protected)
- `GET /:movieId` - Get watch progress (protected)
- `PUT /:movieId` - Update watch progress (protected)
- `DELETE /` - Clear watch history (protected)

### Notifications (`/api/notifications`)

- `POST /` - Create notification
- `GET /` - Get notifications (protected)
- `GET /unread-count` - Get unread count (protected)
- `PUT /:notificationId/read` - Mark as read (protected)
- `PUT /read-all` - Mark all as read (protected)
- `DELETE /:notificationId` - Delete notification (protected)

### Reactions (`/api/reactions`)

- `GET /` - Get user reactions (protected)
- `GET /movie/:movieId` - Get movie reactions (public)
- `GET /movie/:movieId/user` - Get user reaction (protected)
- `POST /` - Add/update reaction (protected)
- `DELETE /:movieId` - Remove reaction (protected)

## Authentication

Include JWT token in request headers:

```
Authorization: Bearer <your_token_here>
```

## Database Models

### User

```javascript
{
  email: String (unique),
  password: String (hashed),
  profiles: [
    {
      name: String,
      avatar: String,
      isKids: Boolean
    }
  ],
  myList: [
    {
      movieId: String,
      title: String,
      thumbnail: String,
      addedAt: Date
    }
  ],
  favorites: [
    {
      movieId: String,
      title: String,
      thumbnail: String,
      favoritedAt: Date
    }
  ],
  watchHistory: [
    {
      movieId: String,
      title: String,
      thumbnail: String,
      watchedAt: Date,
      progress: Number (seconds)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Movie

```javascript
{
  movieId: String (unique),
  title: String,
  description: String,
  thumbnail: String,
  videoUrl: String,
  genre: [String],
  duration: Number,
  rating: Number (0-10),
  releaseDate: Date,
  director: String,
  cast: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Notification

```javascript
{
  userId: ObjectId,
  message: String,
  movieId: String,
  movieTitle: String,
  type: String (info|warning|success|error|movie-update),
  isRead: Boolean,
  createdAt: Date,
  expiresAt: Date
}
```

### Reaction

```javascript
{
  userId: ObjectId,
  movieId: String,
  reaction: String (like|dislike|favorite),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: Token expiration time (default: 7d)
- `CORS_ORIGIN`: Allowed CORS origin
- `FRONTEND_URL`: Frontend application URL

## Testing the API

You can test the API using tools like:

- Postman
- cURL
- Thunder Client
- REST Client VS Code extension

Example with cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- CORS is configured to allow only specific origins
- Environment variables should never be committed
- In production, use HTTPS and secure JWT secrets

## Future Enhancements

- Email verification
- Password reset functionality
- Admin dashboard
- Advanced filtering and search
- Social features (sharing, recommendations)
- Video streaming integration
- Rate limiting
- Caching (Redis)
- Subscription management

## License

ISC
