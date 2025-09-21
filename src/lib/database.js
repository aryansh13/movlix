// Database configuration and models for CinePulse

// For development, we'll use a simple JSON-based storage
// In production, this would be replaced with a real database like PostgreSQL or MongoDB

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Database file paths
const DB_FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  movies: path.join(DATA_DIR, 'movies.json'),
  reviews: path.join(DATA_DIR, 'reviews.json'),
  watchlist: path.join(DATA_DIR, 'watchlist.json'),
  discussions: path.join(DATA_DIR, 'discussions.json'),
  analytics: path.join(DATA_DIR, 'analytics.json'),
}

// Initialize database files with default data
const initializeDatabase = () => {
  Object.entries(DB_FILES).forEach(([key, filePath]) => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(getDefaultData(key), null, 2))
    }
  })
}

// Get default data for each collection
const getDefaultData = (collection) => {
  switch (collection) {
    case 'users':
      return [
        {
          id: 1,
          username: 'admin',
          email: 'admin@cinepulse.id',
          name: 'Admin CinePulse',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          verified: true,
          followers: 0,
          following: 0,
          reviews: 0,
          averageRating: 0,
          favoriteGenres: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    case 'movies':
      return []
    case 'reviews':
      return []
    case 'watchlist':
      return []
    case 'discussions':
      return []
    case 'analytics':
      return {
        totalUsers: 0,
        totalMovies: 0,
        totalReviews: 0,
        totalWatchlistItems: 0,
        lastUpdated: new Date().toISOString()
      }
    default:
      return []
  }
}

// Database utility functions
export const readData = (collection) => {
  try {
    const filePath = DB_FILES[collection]
    if (!filePath) {
      throw new Error(`Collection ${collection} not found`)
    }
    
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${collection}:`, error)
    return getDefaultData(collection)
  }
}

export const writeData = (collection, data) => {
  try {
    const filePath = DB_FILES[collection]
    if (!filePath) {
      throw new Error(`Collection ${collection} not found`)
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${collection}:`, error)
    return false
  }
}

// CRUD operations for each collection
export const createRecord = (collection, record) => {
  const data = readData(collection)
  const newRecord = {
    ...record,
    id: data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  data.push(newRecord)
  writeData(collection, data)
  return newRecord
}

export const getRecord = (collection, id) => {
  const data = readData(collection)
  return data.find(record => record.id === parseInt(id))
}

export const getRecords = (collection, filters = {}) => {
  let data = readData(collection)
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      data = data.filter(record => record[key] === value)
    }
  })
  
  return data
}

export const updateRecord = (collection, id, updates) => {
  const data = readData(collection)
  const index = data.findIndex(record => record.id === parseInt(id))
  
  if (index === -1) {
    throw new Error(`Record with id ${id} not found`)
  }
  
  data[index] = {
    ...data[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  writeData(collection, data)
  return data[index]
}

export const deleteRecord = (collection, id) => {
  const data = readData(collection)
  const index = data.findIndex(record => record.id === parseInt(id))
  
  if (index === -1) {
    throw new Error(`Record with id ${id} not found`)
  }
  
  const deletedRecord = data.splice(index, 1)[0]
  writeData(collection, data)
  return deletedRecord
}

// Specific database operations for CinePulse

// User operations
export const createUser = (userData) => {
  return createRecord('users', userData)
}

export const getUser = (id) => {
  return getRecord('users', id)
}

export const getUserByEmail = (email) => {
  const users = readData('users')
  return users.find(user => user.email === email)
}

export const updateUser = (id, updates) => {
  return updateRecord('users', id, updates)
}

// Movie operations
export const createMovie = (movieData) => {
  return createRecord('movies', movieData)
}

export const getMovie = (id) => {
  return getRecord('movies', id)
}

export const getMovies = (filters = {}) => {
  return getRecords('movies', filters)
}

export const updateMovie = (id, updates) => {
  return updateRecord('movies', id, updates)
}

// Review operations
export const createReview = (reviewData) => {
  const review = createRecord('reviews', reviewData)
  
  // Update user review count
  const user = getUser(reviewData.userId)
  if (user) {
    updateUser(user.id, { reviews: user.reviews + 1 })
  }
  
  return review
}

export const getReviews = (filters = {}) => {
  return getRecords('reviews', filters)
}

export const getMovieReviews = (movieId) => {
  return getRecords('reviews', { movieId: parseInt(movieId) })
}

export const getUserReviews = (userId) => {
  return getRecords('reviews', { userId: parseInt(userId) })
}

export const updateReview = (id, updates) => {
  return updateRecord('reviews', id, updates)
}

export const deleteReview = (id) => {
  const review = getRecord('reviews', id)
  if (review) {
    // Update user review count
    const user = getUser(review.userId)
    if (user) {
      updateUser(user.id, { reviews: user.reviews - 1 })
    }
  }
  
  return deleteRecord('reviews', id)
}

// Watchlist operations
export const addToWatchlist = (userId, movieId, status = 'want-to-watch') => {
  const existingItem = getRecords('watchlist', { userId: parseInt(userId), movieId: parseInt(movieId) })[0]
  
  if (existingItem) {
    return updateRecord('watchlist', existingItem.id, { status })
  }
  
  return createRecord('watchlist', { userId: parseInt(userId), movieId: parseInt(movieId), status })
}

export const getUserWatchlist = (userId) => {
  return getRecords('watchlist', { userId: parseInt(userId) })
}

export const updateWatchlistItem = (id, status) => {
  return updateRecord('watchlist', id, { status })
}

export const removeFromWatchlist = (id) => {
  return deleteRecord('watchlist', id)
}

// Discussion operations
export const createDiscussion = (discussionData) => {
  return createRecord('discussions', discussionData)
}

export const getDiscussions = (filters = {}) => {
  return getRecords('discussions', filters)
}

export const getDiscussion = (id) => {
  return getRecord('discussions', id)
}

export const updateDiscussion = (id, updates) => {
  return updateRecord('discussions', id, updates)
}

// Analytics operations
export const getAnalytics = () => {
  return readData('analytics')
}

export const updateAnalytics = (updates) => {
  const analytics = getAnalytics()
  const updatedAnalytics = {
    ...analytics,
    ...updates,
    lastUpdated: new Date().toISOString()
  }
  writeData('analytics', updatedAnalytics)
  return updatedAnalytics
}

// Search functionality
export const searchMovies = (query) => {
  const movies = readData('movies')
  const searchTerm = query.toLowerCase()
  
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.overview.toLowerCase().includes(searchTerm) ||
    movie.genre.some(g => g.toLowerCase().includes(searchTerm))
  )
}

export const searchUsers = (query) => {
  const users = readData('users')
  const searchTerm = query.toLowerCase()
  
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.username.toLowerCase().includes(searchTerm)
  )
}

// Recommendation engine
export const getUserRecommendations = (userId) => {
  const user = getUser(userId)
  if (!user) return []
  
  const userReviews = getUserReviews(userId)
  const userWatchlist = getUserWatchlist(userId)
  const allMovies = readData('movies')
  
  // Simple recommendation algorithm based on user preferences
  const userGenres = user.favoriteGenres || []
  const userRatedMovies = userReviews.map(review => review.movieId)
  const userWatchlistMovies = userWatchlist.map(item => item.movieId)
  
  // Find movies with similar genres that user hasn't rated or added to watchlist
  const recommendations = allMovies.filter(movie => {
    const hasCommonGenre = movie.genre.some(genre => userGenres.includes(genre))
    const notRated = !userRatedMovies.includes(movie.id)
    const notInWatchlist = !userWatchlistMovies.includes(movie.id)
    
    return hasCommonGenre && notRated && notInWatchlist
  })
  
  // Sort by rating and return top recommendations
  return recommendations
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
}

// Leaderboard
export const getLeaderboard = () => {
  const users = readData('users')
  
  return users
    .map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      reviews: user.reviews,
      averageRating: user.averageRating,
      followers: user.followers,
      points: (user.reviews * 10) + (user.followers * 5) + (user.averageRating * 20)
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 50)
}

// Initialize database on import
initializeDatabase()

export default {
  readData,
  writeData,
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  createUser,
  getUser,
  getUserByEmail,
  updateUser,
  createMovie,
  getMovie,
  getMovies,
  updateMovie,
  createReview,
  getReviews,
  getMovieReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  addToWatchlist,
  getUserWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
  createDiscussion,
  getDiscussions,
  getDiscussion,
  updateDiscussion,
  getAnalytics,
  updateAnalytics,
  searchMovies,
  searchUsers,
  getUserRecommendations,
  getLeaderboard
}
