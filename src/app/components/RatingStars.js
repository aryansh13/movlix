'use client'

import { useState } from 'react'

export default function RatingStars({ 
  rating, 
  size = 'md', 
  interactive = false, 
  onRatingChange = null,
  showValue = true 
}) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [userRating, setUserRating] = useState(0)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      setUserRating(starRating)
      onRatingChange(starRating)
    }
  }

  const handleStarHover = (starRating) => {
    if (interactive) {
      setHoveredRating(starRating)
    }
  }

  const handleStarLeave = () => {
    if (interactive) {
      setHoveredRating(0)
    }
  }

  const getStarFill = (starIndex) => {
    if (interactive) {
      const currentRating = hoveredRating || userRating
      return starIndex < currentRating ? 'text-yellow-400' : 'text-gray-300'
    } else {
      return starIndex < rating ? 'text-yellow-400' : 'text-gray-300'
    }
  }

  const getStarIcon = (starIndex) => {
    if (interactive) {
      const currentRating = hoveredRating || userRating
      return starIndex < currentRating ? 'fill' : 'outline'
    } else {
      return starIndex < rating ? 'fill' : 'outline'
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          disabled={!interactive}
          className={`${sizeClasses[size]} transition-colors ${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } ${getStarFill(star - 1)}`}
        >
          {getStarIcon(star - 1) === 'fill' ? (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </button>
      ))}
      
      {showValue && (
        <span className="ml-2 text-gray-300 text-sm">
          {interactive ? (userRating || rating).toFixed(1) : rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
