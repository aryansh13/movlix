'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
export const dynamic = 'force-dynamic';
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'relevance'
  })

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
  ]

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

  const sortOptions = [
    { value: 'relevance', label: 'Relevansi' },
    { value: 'popularity', label: 'Popularitas' },
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Tahun' },
    { value: 'title', label: 'Judul' }
  ]

  const mockMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      rating: 8.4,
      year: 2019,
      genre: ["Action", "Adventure", "Drama"]
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      rating: 8.2,
      year: 2021,
      genre: ["Action", "Adventure", "Fantasy"]
    },
    {
      id: 3,
      title: "Top Gun: Maverick",
      poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      rating: 8.3,
      year: 2022,
      genre: ["Action", "Drama"]
    },
    {
      id: 4,
      title: "Dune",
      poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      rating: 8.0,
      year: 2021,
      genre: ["Adventure", "Drama", "Sci-Fi"]
    },
    {
      id: 5,
      title: "The Batman",
      poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
      rating: 7.8,
      year: 2022,
      genre: ["Action", "Crime", "Drama"]
    },
    {
      id: 6,
      title: "Black Widow",
      poster: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
      rating: 6.7,
      year: 2021,
      genre: ["Action", "Adventure", "Sci-Fi"]
    },
    {
      id: 7,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      rating: 8.8,
      year: 2010,
      genre: ["Action", "Sci-Fi", "Thriller"]
    },
    {
      id: 8,
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      rating: 8.6,
      year: 2014,
      genre: ["Adventure", "Drama", "Sci-Fi"]
    }
  ]

  useEffect(() => {
    if (query) {
      performSearch()
    }
  }, [query, filters])

  const performSearch = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      )

      // Apply filters
      if (filters.genre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genre.includes(filters.genre)
        )
      }

      if (filters.year) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.year === parseInt(filters.year)
        )
      }

      if (filters.rating) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.rating >= parseFloat(filters.rating)
        )
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'popularity':
          filteredMovies.sort((a, b) => b.rating - a.rating)
          break
        case 'rating':
          filteredMovies.sort((a, b) => b.rating - a.rating)
          break
        case 'year':
          filteredMovies.sort((a, b) => b.year - a.year)
          break
        case 'title':
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
          break
        default:
          // Keep original order for relevance
          break
      }

      setMovies(filteredMovies)
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch()
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: '',
      rating: '',
      sortBy: 'relevance'
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Search Header */}
        <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {query ? `Hasil Pencarian untuk "${query}"` : 'Cari Film'}
              </h1>
              <p className="text-gray-300 text-lg">
                Temukan film favorit Anda dari koleksi lengkap kami
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari film, aktor, atau sutradara..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-gray-800/50 rounded-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold">Filter</h3>
                    <button
                      onClick={clearFilters}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Genre Filter */}
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-3">Genre</label>
                    <select
                      value={filters.genre}
                      onChange={(e) => handleFilterChange('genre', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option className='text-black' value="">Semua Genre</option>
                      {genres.map(genre => (
                        <option className='text-black' key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-3">Tahun</label>
                    <select
                      value={filters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option className='text-black' value="">Semua Tahun</option>
                      {years.map(year => (
                        <option className='text-black' key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-3">Rating Minimum</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option className='text-black' value="">Semua Rating</option>
                      <option className='text-black' value="9">9.0+</option>
                      <option className='text-black' value="8">8.0+</option>
                      <option className='text-black' value="7">7.0+</option>
                      <option className='text-black' value="6">6.0+</option>
                      <option className='text-black' value="5">5.0+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex-1">
                {/* Sort and Results Count */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300">
                      {loading ? 'Mencari...' : `${movies.length} hasil ditemukan`}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-300 text-sm">Urutkan:</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  </div>
                )}

                {/* No Results */}
                {!loading && movies.length === 0 && query && (
                  <div className="text-center py-16">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">Tidak ada hasil ditemukan</h3>
                    <p className="text-gray-400 mb-4">
                      Coba gunakan kata kunci yang berbeda atau sesuaikan filter Anda
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn-primary"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}

                {/* Movies Grid */}
                {!loading && movies.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}

                {/* Load More */}
                {!loading && movies.length > 0 && movies.length >= 6 && (
                  <div className="text-center mt-12">
                    <button className="btn-secondary">
                      Muat Lebih Banyak
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
