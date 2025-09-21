// API configuration and utility functions for CinePulse

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// TMDB API endpoints
export const TMDB_ENDPOINTS = {
  // Movies
  TRENDING_MOVIES: `${TMDB_BASE_URL}/trending/movie/week`,
  POPULAR_MOVIES: `${TMDB_BASE_URL}/movie/popular`,
  TOP_RATED_MOVIES: `${TMDB_BASE_URL}/movie/top_rated`,
  UPCOMING_MOVIES: `${TMDB_BASE_URL}/movie/upcoming`,
  NOW_PLAYING: `${TMDB_BASE_URL}/movie/now_playing`,
  MOVIE_DETAILS: (id) => `${TMDB_BASE_URL}/movie/${id}`,
  MOVIE_CREDITS: (id) => `${TMDB_BASE_URL}/movie/${id}/credits`,
  MOVIE_VIDEOS: (id) => `${TMDB_BASE_URL}/movie/${id}/videos`,
  MOVIE_IMAGES: (id) => `${TMDB_BASE_URL}/movie/${id}/images`,
  SIMILAR_MOVIES: (id) => `${TMDB_BASE_URL}/movie/${id}/similar`,
  RECOMMENDATIONS: (id) => `${TMDB_BASE_URL}/movie/${id}/recommendations`,
  
  // Search
  SEARCH_MOVIES: `${TMDB_BASE_URL}/search/movie`,
  SEARCH_PEOPLE: `${TMDB_BASE_URL}/search/person`,
  SEARCH_TV: `${TMDB_BASE_URL}/search/tv`,
  
  // Genres
  MOVIE_GENRES: `${TMDB_BASE_URL}/genre/movie/list`,
  
  // People
  PERSON_DETAILS: (id) => `${TMDB_BASE_URL}/person/${id}`,
  PERSON_MOVIES: (id) => `${TMDB_BASE_URL}/person/${id}/movie_credits`,
}

// CinePulse API endpoints
export const CINEPULSE_ENDPOINTS = {
  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_PROFILE: (id) => `${API_BASE_URL}/users/${id}`,
  USER_WATCHLIST: (id) => `${API_BASE_URL}/users/${id}/watchlist`,
  USER_REVIEWS: (id) => `${API_BASE_URL}/users/${id}/reviews`,
  USER_FOLLOWERS: (id) => `${API_BASE_URL}/users/${id}/followers`,
  USER_FOLLOWING: (id) => `${API_BASE_URL}/users/${id}/following`,
  
  // Reviews
  REVIEWS: `${API_BASE_URL}/reviews`,
  REVIEW_DETAILS: (id) => `${API_BASE_URL}/reviews/${id}`,
  MOVIE_REVIEWS: (movieId) => `${API_BASE_URL}/movies/${movieId}/reviews`,
  
  // Watchlist
  WATCHLIST: `${API_BASE_URL}/watchlist`,
  WATCHLIST_ITEM: (id) => `${API_BASE_URL}/watchlist/${id}`,
  
  // Recommendations
  RECOMMENDATIONS: `${API_BASE_URL}/recommendations`,
  USER_RECOMMENDATIONS: (userId) => `${API_BASE_URL}/recommendations/user/${userId}`,
  
  // Community
  DISCUSSIONS: `${API_BASE_URL}/discussions`,
  DISCUSSION_DETAILS: (id) => `${API_BASE_URL}/discussions/${id}`,
  LEADERBOARD: `${API_BASE_URL}/leaderboard`,
  
  // Analytics
  ANALYTICS: `${API_BASE_URL}/analytics`,
  MOVIE_STATS: (movieId) => `${API_BASE_URL}/movies/${movieId}/stats`,
}

// API utility functions
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// TMDB API functions
export const tmdbRequest = async (endpoint, params = {}) => {
  const url = new URL(endpoint)
  url.searchParams.append('api_key', TMDB_API_KEY)
  url.searchParams.append('language', 'id-ID')
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return apiRequest(url.toString())
}

// Movie API functions
export const getTrendingMovies = async (timeWindow = 'week') => {
  return tmdbRequest(TMDB_ENDPOINTS.TRENDING_MOVIES, { time_window: timeWindow })
}

export const getPopularMovies = async (page = 1) => {
  return tmdbRequest(TMDB_ENDPOINTS.POPULAR_MOVIES, { page })
}

export const getTopRatedMovies = async (page = 1) => {
  return tmdbRequest(TMDB_ENDPOINTS.TOP_RATED_MOVIES, { page })
}

export const getMovieDetails = async (movieId) => {
  return tmdbRequest(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId))
}

export const getMovieCredits = async (movieId) => {
  return tmdbRequest(TMDB_ENDPOINTS.MOVIE_CREDITS(movieId))
}

export const getSimilarMovies = async (movieId) => {
  return tmdbRequest(TMDB_ENDPOINTS.SIMILAR_MOVIES(movieId))
}

export const searchMovies = async (query, page = 1) => {
  return tmdbRequest(TMDB_ENDPOINTS.SEARCH_MOVIES, { query, page })
}

export const getMovieGenres = async () => {
  return tmdbRequest(TMDB_ENDPOINTS.MOVIE_GENRES)
}

// CinePulse API functions
export const getUserWatchlist = async (userId) => {
  return apiRequest(CINEPULSE_ENDPOINTS.USER_WATCHLIST(userId))
}

export const addToWatchlist = async (movieId, status = 'want-to-watch') => {
  return apiRequest(CINEPULSE_ENDPOINTS.WATCHLIST, {
    method: 'POST',
    body: JSON.stringify({ movieId, status }),
  })
}

export const updateWatchlistItem = async (itemId, status) => {
  return apiRequest(CINEPULSE_ENDPOINTS.WATCHLIST_ITEM(itemId), {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}

export const removeFromWatchlist = async (itemId) => {
  return apiRequest(CINEPULSE_ENDPOINTS.WATCHLIST_ITEM(itemId), {
    method: 'DELETE',
  })
}

export const getMovieReviews = async (movieId) => {
  return apiRequest(CINEPULSE_ENDPOINTS.MOVIE_REVIEWS(movieId))
}

export const createReview = async (movieId, reviewData) => {
  return apiRequest(CINEPULSE_ENDPOINTS.REVIEWS, {
    method: 'POST',
    body: JSON.stringify({ movieId, ...reviewData }),
  })
}

export const getUserRecommendations = async (userId) => {
  return apiRequest(CINEPULSE_ENDPOINTS.USER_RECOMMENDATIONS(userId))
}

export const getLeaderboard = async () => {
  return apiRequest(CINEPULSE_ENDPOINTS.LEADERBOARD)
}

// Image URL helpers
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getBackdropUrl = (path, size = 'w1920_and_h800_multi_faces') => {
  if (!path) return '/placeholder-backdrop.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getProfileUrl = (path, size = 'w185') => {
  if (!path) return '/placeholder-avatar.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Utility functions
export const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString, locale = 'id-ID') => {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getYearFromDate = (dateString) => {
  return new Date(dateString).getFullYear()
}

// Error handling
export const handleApiError = (error) => {
  console.error('API Error:', error)
  
  if (error.message.includes('404')) {
    return 'Data tidak ditemukan'
  } else if (error.message.includes('500')) {
    return 'Terjadi kesalahan server'
  } else if (error.message.includes('network')) {
    return 'Koneksi internet bermasalah'
  } else {
    return 'Terjadi kesalahan yang tidak diketahui'
  }
}
