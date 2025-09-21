import { NextResponse } from 'next/server'
import { getMovies, createMovie } from '../../../lib/database'

// GET /api/movies - Get all movies with optional filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {}
    
    // Extract query parameters
    if (searchParams.get('genre')) {
      filters.genre = searchParams.get('genre')
    }
    if (searchParams.get('year')) {
      filters.year = parseInt(searchParams.get('year'))
    }
    if (searchParams.get('rating')) {
      filters.rating = parseFloat(searchParams.get('rating'))
    }
    if (searchParams.get('limit')) {
      filters.limit = parseInt(searchParams.get('limit'))
    }
    if (searchParams.get('sortBy')) {
      filters.sortBy = searchParams.get('sortBy')
    }
    if (searchParams.get('sortOrder')) {
      filters.sortOrder = searchParams.get('sortOrder')
    }
    
    const movies = getMovies(filters)
    
    // Apply limit if specified
    const limitedMovies = filters.limit ? movies.slice(0, filters.limit) : movies
    
    return NextResponse.json({
      success: true,
      data: limitedMovies,
      total: movies.length
    })
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}

// POST /api/movies - Create a new movie
export async function POST(request) {
  try {
    const movieData = await request.json()
    
    // Validate required fields
    if (!movieData.title || !movieData.overview) {
      return NextResponse.json(
        { success: false, error: 'Title and overview are required' },
        { status: 400 }
      )
    }
    
    const movie = createMovie(movieData)
    
    return NextResponse.json({
      success: true,
      data: movie
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating movie:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create movie' },
      { status: 500 }
    )
  }
}
