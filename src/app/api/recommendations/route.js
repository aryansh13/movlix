import { NextResponse } from 'next/server'
import { getUserRecommendations } from '../../../lib/database'

// GET /api/recommendations - Get user recommendations
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
    
    const recommendations = getUserRecommendations(parseInt(userId))
    
    return NextResponse.json({
      success: true,
      data: recommendations
    })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}
