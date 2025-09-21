'use client'

import MovieCard from './MovieCard'

export default function MovieGrid({ movies, title, showViewAll = true }) {
  if (!movies || movies.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
            <p className="text-gray-400">Tidak ada film yang tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {showViewAll && (
            <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-2">
              <span>Lihat Semua</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Load More Button */}
        {showViewAll && movies.length >= 6 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
