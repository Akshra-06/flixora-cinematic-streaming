# Flixora Backend - API Usage Guide

## Quick Start

The Flixora backend is now running on `http://localhost:5001`

## Testing the API

You can test the API endpoints using:

- **Postman** (import the requests below)
- **cURL** (examples provided)
- **REST Client VS Code Extension** (use the file below)
- **Thunder Client VS Code Extension**

## Example Requests

### 1. Register a New User

```bash
curl -X POST http://localhost:5001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "user_id_here",
      "email": "user@example.com",
      "profiles": [],
      "myList": [],
      "favorites": [],
      "watchHistory": []
    }
  }
}
```

### 2. Login User

```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Create a Profile

```bash
curl -X POST http://localhost:5001/api/users/profiles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Main Profile",
    "avatar": "https://via.placeholder.com/150",
    "isKids": false
  }'
```

### 4. Add Movie to My List

```bash
curl -X POST http://localhost:5001/api/my-list \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "movieId": "movie123",
    "title": "Inception",
    "thumbnail": "https://image-url.jpg"
  }'
```

### 5. Get My List

```bash
curl -X GET http://localhost:5001/api/my-list \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Add Movie to Favorites

```bash
curl -X POST http://localhost:5001/api/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "movieId": "movie123",
    "title": "Inception",
    "thumbnail": "https://image-url.jpg"
  }'
```

### 7. Get Favorites

```bash
curl -X GET http://localhost:5001/api/favorites \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Add to Watch History

```bash
curl -X POST http://localhost:5001/api/watch-history \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "movieId": "movie123",
    "title": "Inception",
    "thumbnail": "https://image-url.jpg",
    "progress": 3600
  }'
```

### 9. Update Watch Progress

```bash
curl -X PUT http://localhost:5001/api/watch-history/movie123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "progress": 5400
  }'
```

### 10. Get Watch History

```bash
curl -X GET http://localhost:5001/api/watch-history \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 11. Create a Movie (Admin)

```bash
curl -X POST http://localhost:5001/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": "inception2023",
    "title": "Inception: Part 2",
    "description": "A mind-bending sci-fi thriller",
    "thumbnail": "https://image-url.jpg",
    "videoUrl": "https://video-url.mp4",
    "genre": ["Sci-Fi", "Thriller", "Drama"],
    "duration": 180,
    "rating": 8.5,
    "releaseDate": "2023-07-21",
    "director": "Christopher Nolan",
    "cast": ["Leonardo DiCaprio", "Ellen Page"]
  }'
```

### 12. Get All Movies (with Pagination)

```bash
curl -X GET "http://localhost:5001/api/movies?page=1&limit=20" \
  -H "Content-Type: application/json"
```

### 13. Add Reaction (Like/Dislike/Favorite)

```bash
curl -X POST http://localhost:5001/api/reactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "movieId": "movie123",
    "reaction": "like"
  }'
```

### 14. Get Movie Reactions Summary

```bash
curl -X GET http://localhost:5001/api/reactions/movie/movie123
```

### 15. Get User Reactions

```bash
curl -X GET http://localhost:5001/api/reactions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 16. Create Notification

```bash
curl -X POST http://localhost:5001/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "message": "New movie available in Sci-Fi genre",
    "movieId": "movie123",
    "movieTitle": "Inception",
    "type": "movie-update"
  }'
```

### 17. Get User Notifications

```bash
curl -X GET http://localhost:5001/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 18. Mark Notification as Read

```bash
curl -X PUT http://localhost:5001/api/notifications/notification_id/read \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 19. Get Unread Count

```bash
curl -X GET http://localhost:5001/api/notifications/unread-count \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Key Points

1. **Authentication**: Most endpoints require a JWT token in the `Authorization: Bearer <token>` header
2. **Get Token**: From the login/register response
3. **MongoDB**: Must be running locally on port 27017
4. **CORS**: Configured to allow requests from `http://localhost:8080` (frontend)

## Common Error Responses

```json
{
  "success": false,
  "message": "Error description"
}
```

Status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

## Environment Setup

The `.env` file is already configured:

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/flixora
```

To start the backend:

```bash
cd backend
npm run dev
```

## Integration with Frontend

The frontend needs to:

1. Use `http://localhost:5001/api` as the base URL for API calls
2. Store the JWT token from login/register
3. Include the token in all authenticated requests

Example React fetch:

```javascript
const token = localStorage.getItem("authToken");

fetch("http://localhost:5001/api/my-list", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```
