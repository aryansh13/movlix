import { NextResponse } from 'next/server'
import { getReviews, createReview } from '../../../lib/database'

// GET /api/reviews - Get all reviews with optional filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {}
    
    // Extract query parameters
    if (searchParams.get('movieId')) {
      filters.movieId = parseInt(searchParams.get('movieId'))
    }
    if (searchParams.get('userId')) {
      filters.userId = parseInt(searchParams.get('userId'))
    }
    if (searchParams.get('rating')) {
      filters.rating = parseInt(searchParams.get('rating'))
    }
    if (searchParams.get('limit')) {
      filters.limit = parseInt(searchParams.get('limit'))
    }
    
    const reviews = getReviews(filters)
    
    // Apply limit if specified
    const limitedReviews = filters.limit ? reviews.slice(0, filters.limit) : reviews
    
    return NextResponse.json({
      success: true,
      data: limitedReviews,
      total: reviews.length
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create a new review
export async function POST(request) {
  try {
    const reviewData = await request.json()
    
    // Validate required fields
    if (!reviewData.movieId || !reviewData.userId || !reviewData.rating || !reviewData.content) {
      return NextResponse.json(
        { success: false, error: 'Movie ID, User ID, rating, and content are required' },
        { status: 400 }
      )
    }
    
    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    const review = createReview(reviewData)
    
    return NextResponse.json({
      success: true,
      data: review
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
