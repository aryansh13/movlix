# 🎬 CinePulse API Documentation

API documentation untuk CinePulse - Platform Movie Discovery & Review Indonesia.

## Base URL
```
http://localhost:3000/api
```

## Authentication
> **Note**: Authentication akan diimplementasikan di fase selanjutnya. Saat ini API bersifat public.

## Response Format
Semua response menggunakan format JSON dengan struktur berikut:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "total": 100,
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### 🎬 Movies

#### GET /api/movies
Mendapatkan daftar film dengan filter opsional.

**Query Parameters:**
- `genre` (string): Filter berdasarkan genre
- `year` (number): Filter berdasarkan tahun
- `rating` (number): Filter berdasarkan rating minimum
- `limit` (number): Batasi jumlah hasil

**Example Request:**
```bash
GET /api/movies?genre=Action&year=2023&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Avengers: Endgame",
      "overview": "Setelah peristiwa yang menghancurkan...",
      "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      "backdrop": "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      "rating": 8.4,
      "year": 2019,
      "runtime": 181,
      "genre": ["Action", "Adventure", "Drama"],
      "director": "Anthony Russo, Joe Russo",
      "cast": [
        {
          "name": "Robert Downey Jr.",
          "character": "Tony Stark / Iron Man"
        }
      ],
      "budget": 356000000,
      "revenue": 2797800564,
      "status": "Released",
      "originalLanguage": "en",
      "productionCompanies": ["Marvel Studios", "Walt Disney Pictures"],
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### GET /api/movies/[id]
Mendapatkan detail film berdasarkan ID.

**Path Parameters:**
- `id` (number): ID film

**Example Request:**
```bash
GET /api/movies/1
```

#### POST /api/movies
Membuat film baru.

**Request Body:**
```json
{
  "title": "Film Title",
  "overview": "Film description...",
  "poster": "https://image.tmdb.org/t/p/w500/poster.jpg",
  "backdrop": "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/backdrop.jpg",
  "rating": 8.5,
  "year": 2023,
  "runtime": 120,
  "genre": ["Action", "Drama"],
  "director": "Director Name",
  "cast": [
    {
      "name": "Actor Name",
      "character": "Character Name"
    }
  ],
  "budget": 100000000,
  "revenue": 500000000,
  "status": "Released",
  "originalLanguage": "en",
  "productionCompanies": ["Studio Name"]
}
```

#### PUT /api/movies/[id]
Mengupdate film berdasarkan ID.

#### DELETE /api/movies/[id]
Menghapus film berdasarkan ID.

### ⭐ Reviews

#### GET /api/reviews
Mendapatkan daftar review dengan filter opsional.

**Query Parameters:**
- `movieId` (number): Filter berdasarkan ID film
- `userId` (number): Filter berdasarkan ID user
- `rating` (number): Filter berdasarkan rating
- `limit` (number): Batasi jumlah hasil

**Example Request:**
```bash
GET /api/reviews?movieId=1&limit=5
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "movieId": 1,
      "userId": 1,
      "rating": 5,
      "content": "Film yang luar biasa! Plot yang kompleks...",
      "helpful": 24,
      "spoiler": false,
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### POST /api/reviews
Membuat review baru.

**Request Body:**
```json
{
  "movieId": 1,
  "userId": 1,
  "rating": 5,
  "content": "Review content here...",
  "spoiler": false
}
```

### 📋 Watchlist

#### GET /api/watchlist
Mendapatkan watchlist user.

**Query Parameters:**
- `userId` (number): ID user (required)

**Example Request:**
```bash
GET /api/watchlist?userId=1
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "movieId": 1,
      "status": "want-to-watch",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/watchlist
Menambahkan film ke watchlist.

**Request Body:**
```json
{
  "userId": 1,
  "movieId": 1,
  "status": "want-to-watch"
}
```

**Status Options:**
- `want-to-watch`: Ingin ditonton
- `watching`: Sedang ditonton
- `watched`: Sudah ditonton

### 🎯 Recommendations

#### GET /api/recommendations
Mendapatkan rekomendasi film untuk user.

**Query Parameters:**
- `userId` (number): ID user (required)

**Example Request:**
```bash
GET /api/recommendations?userId=1
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "title": "Spider-Man: No Way Home",
      "overview": "Peter Parker terungkap identitasnya...",
      "poster": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "rating": 8.2,
      "year": 2021,
      "genre": ["Action", "Adventure", "Fantasy"],
      "reason": "Berdasarkan genre favorit Anda"
    }
  ]
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `404` | Not Found - Resource tidak ditemukan |
| `500` | Internal Server Error - Kesalahan server |

## Rate Limiting

> **Note**: Rate limiting akan diimplementasikan di fase selanjutnya.

## CORS

API mendukung CORS untuk semua origin dalam development mode.

## Development

Untuk menjalankan API dalam mode development:

```bash
npm run dev
```

API akan tersedia di `http://localhost:3000/api`

## Testing

Gunakan tools seperti Postman, Insomnia, atau curl untuk testing API:

```bash
# Test GET movies
curl http://localhost:3000/api/movies

# Test POST review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": 1,
    "userId": 1,
    "rating": 5,
    "content": "Great movie!",
    "spoiler": false
  }'
```

## Future Enhancements

- [ ] Authentication dengan JWT
- [ ] Rate limiting
- [ ] Caching dengan Redis
- [ ] Real-time notifications
- [ ] File upload untuk avatar dan images
- [ ] Advanced search dengan Elasticsearch
- [ ] GraphQL API
- [ ] WebSocket untuk real-time features
