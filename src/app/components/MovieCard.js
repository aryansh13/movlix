'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MovieCard({ movie, showRating = true, showGenre = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageLoaded(true)
  }

  return (
    <div 
      className="movie-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden">
          {/* Movie Poster */}
          <div className="aspect-[2/3] relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-lg"></div>
            )}
            <img
              src={movie.poster}
              alt={movie.title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-105' : 'scale-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full mb-2 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="text-white text-sm">Tonton Trailer</p>
              </div>
            </div>

            {/* Rating Badge */}
            {showRating && (
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white text-xs font-medium">{movie.rating}</span>
              </div>
            )}

            {/* Watchlist Button */}
            <button className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-2 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {movie.title}
            </h3>
            
            {movie.year && (
              <p className="text-gray-400 text-sm mb-2">{movie.year}</p>
            )}

            {showGenre && movie.genre && (
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.genre.slice(0, 2).map((g, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
                {movie.genre.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{movie.genre.length - 2} more
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <span className="text-gray-400 text-sm">24</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <span className="text-gray-400 text-sm">1.2k</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
