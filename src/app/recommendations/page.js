'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState({})
  const [loading, setLoading] = useState(true)
  const [userPreferences, setUserPreferences] = useState({
    favoriteGenres: [],
    favoriteActors: [],
    favoriteDirectors: [],
    minRating: 7.0,
    preferredYears: []
  })

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
  ]

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

  const mockRecommendations = {
    'trending': [
      {
        id: 1,
        title: "Avengers: Endgame",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        rating: 8.4,
        year: 2019,
        genre: ["Action", "Adventure", "Drama"],
        reason: "Berdasarkan rating tinggi dan popularitas"
      },
      {
        id: 2,
        title: "Spider-Man: No Way Home",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        rating: 8.2,
        year: 2021,
        genre: ["Action", "Adventure", "Fantasy"],
        reason: "Film superhero terpopuler saat ini"
      }
    ],
    'similar': [
      {
        id: 3,
        title: "Top Gun: Maverick",
        poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        rating: 8.3,
        year: 2022,
        genre: ["Action", "Drama"],
        reason: "Mirip dengan film yang Anda sukai"
      },
      {
        id: 4,
        title: "Dune",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        rating: 8.0,
        year: 2021,
        genre: ["Adventure", "Drama", "Sci-Fi"],
        reason: "Berdasarkan genre favorit Anda"
      }
    ],
    'hidden-gems': [
      {
        id: 5,
        title: "The Batman",
        poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        rating: 7.8,
        year: 2022,
        genre: ["Action", "Crime", "Drama"],
        reason: "Film berkualitas tinggi yang mungkin terlewat"
      },
      {
        id: 6,
        title: "Black Widow",
        poster: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
        rating: 6.7,
        year: 2021,
        genre: ["Action", "Adventure", "Sci-Fi"],
        reason: "Film indie yang patut dicoba"
      }
    ],
    'personalized': [
      {
        id: 7,
        title: "Inception",
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: 8.8,
        year: 2010,
        genre: ["Action", "Sci-Fi", "Thriller"],
        reason: "Berdasarkan preferensi pribadi Anda"
      },
      {
        id: 8,
        title: "Interstellar",
        poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        rating: 8.6,
        year: 2014,
        genre: ["Adventure", "Drama", "Sci-Fi"],
        reason: "Film yang cocok dengan selera Anda"
      }
    ]
  }

  useEffect(() => {
    // Simulate loading recommendations
    const loadRecommendations = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRecommendations(mockRecommendations)
        setLoading(false)
      } catch (error) {
        console.error('Error loading recommendations:', error)
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  const updatePreferences = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleArrayItem = (key, item) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter(i => i !== item)
        : [...prev[key], item]
    }))
  }

  const generateNewRecommendations = () => {
    setLoading(true)
    // Simulate generating new recommendations
    setTimeout(() => {
      setLoading(false)
      alert('Rekomendasi baru telah dibuat berdasarkan preferensi Anda!')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Rekomendasi Film</h1>
              <p className="text-gray-300 text-lg">
                Temukan film terbaik yang disesuaikan dengan selera Anda
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Preferences Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-lg p-6 sticky top-24">
                <h3 className="text-white font-semibold mb-6">Preferensi Anda</h3>
                
                {/* Favorite Genres */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Genre Favorit</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {genres.map(genre => (
                      <label key={genre} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={userPreferences.favoriteGenres.includes(genre)}
                          onChange={() => toggleArrayItem('favoriteGenres', genre)}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Rating Minimum</label>
                  <select
                    value={userPreferences.minRating}
                    onChange={(e) => updatePreferences('minRating', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={5.0}>5.0+</option>
                    <option value={6.0}>6.0+</option>
                    <option value={7.0}>7.0+</option>
                    <option value={8.0}>8.0+</option>
                    <option value={9.0}>9.0+</option>
                  </select>
                </div>

                {/* Preferred Years */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Tahun Favorit</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {years.slice(0, 10).map(year => (
                      <label key={year} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={userPreferences.preferredYears.includes(year)}
                          onChange={() => toggleArrayItem('preferredYears', year)}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{year}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateNewRecommendations}
                  className="w-full btn-primary"
                >
                  Buat Rekomendasi Baru
                </button>
              </div>
            </div>

            {/* Recommendations Content */}
            <div className="lg:col-span-3">
              {/* Trending Recommendations */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Trending Saat Ini</h2>
                  <span className="text-gray-400 text-sm">Berdasarkan popularitas global</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendations.trending?.map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard movie={movie} />
                      <div className="absolute -bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs">{movie.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Similar Movies */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Film Serupa</h2>
                  <span className="text-gray-400 text-sm">Berdasarkan film yang Anda sukai</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendations.similar?.map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard movie={movie} />
                      <div className="absolute -bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs">{movie.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Hidden Gems */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Hidden Gems</h2>
                  <span className="text-gray-400 text-sm">Film berkualitas yang mungkin terlewat</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendations['hidden-gems']?.map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard movie={movie} />
                      <div className="absolute -bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs">{movie.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Personalized Recommendations */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Untuk Anda</h2>
                  <span className="text-gray-400 text-sm">Disesuaikan dengan preferensi pribadi</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {recommendations.personalized?.map((movie) => (
                    <div key={movie.id} className="relative">
                      <MovieCard movie={movie} />
                      <div className="absolute -bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs">{movie.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommendation Stats */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                <h3 className="text-white font-semibold mb-4">Statistik Rekomendasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">24</div>
                    <div className="text-gray-300 text-sm">Film Direkomendasikan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">8.2</div>
                    <div className="text-gray-300 text-sm">Rating Rata-rata</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">95%</div>
                    <div className="text-gray-300 text-sm">Tingkat Kecocokan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
