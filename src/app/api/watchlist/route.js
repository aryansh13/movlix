import { NextResponse } from 'next/server'
import { getUserWatchlist, addToWatchlist } from '../../../lib/database'

// GET /api/watchlist - Get user's watchlist
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const watchlist = getUserWatchlist(parseInt(userId))
    
    return NextResponse.json({
      success: true,
      data: watchlist
    })
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch watchlist' },
      { status: 500 }
    )
  }
}

// POST /api/watchlist - Add movie to watchlist
export async function POST(request) {
  try {
    const { userId, movieId, status } = await request.json()
    
    if (!userId || !movieId) {
      return NextResponse.json(
        { success: false, error: 'User ID and Movie ID are required' },
        { status: 400 }
      )
    }
    
    const watchlistItem = addToWatchlist(parseInt(userId), parseInt(movieId), status)
    
    return NextResponse.json({
      success: true,
      data: watchlistItem
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to watchlist' },
      { status: 500 }
    )
  }
}
