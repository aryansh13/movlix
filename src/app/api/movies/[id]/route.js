import { NextResponse } from 'next/server'
import { getMovie, updateMovie, deleteMovie } from '../../../../lib/database'

// GET /api/movies/[id] - Get a specific movie
export async function GET(request, { params }) {
  try {
    const movie = getMovie(params.id)
    
    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: movie
    })
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movie' },
      { status: 500 }
    )
  }
}

// PUT /api/movies/[id] - Update a specific movie
export async function PUT(request, { params }) {
  try {
    const updates = await request.json()
    const movie = updateMovie(params.id, updates)
    
    return NextResponse.json({
      success: true,
      data: movie
    })
  } catch (error) {
    console.error('Error updating movie:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update movie' },
      { status: 500 }
    )
  }
}

// DELETE /api/movies/[id] - Delete a specific movie
export async function DELETE(request, { params }) {
  try {
    const movie = deleteMovie(params.id)
    
    return NextResponse.json({
      success: true,
      data: movie
    })
  } catch (error) {
    console.error('Error deleting movie:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete movie' },
      { status: 500 }
    )
  }
}
