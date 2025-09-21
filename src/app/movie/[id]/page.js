'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MovieCard from '../../components/MovieCard'
import RatingStars from '../../components/RatingStars'
import ReviewCard from '../../components/ReviewCard'
import ReviewForm from '../../components/ReviewForm'

export default function MovieDetail() {
  const params = useParams()
  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockMovie = {
          id: parseInt(params.id),
          title: "Avengers: Endgame",
          overview: "Setelah peristiwa yang menghancurkan di Avengers: Infinity War, alam semesta dalam keadaan reruntuhan. Dengan bantuan sekutu yang tersisa, Avengers berkumpul sekali lagi untuk membalikkan tindakan Thanos dan memulihkan keseimbangan di alam semesta.",
          poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
          backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
          rating: 8.4,
          voteCount: 25000,
          year: 2019,
          runtime: 181,
          genre: ["Action", "Adventure", "Drama"],
          director: "Anthony Russo, Joe Russo",
          cast: [
            { name: "Robert Downey Jr.", character: "Tony Stark / Iron Man" },
            { name: "Chris Evans", character: "Steve Rogers / Captain America" },
            { name: "Mark Ruffalo", character: "Bruce Banner / Hulk" },
            { name: "Chris Hemsworth", character: "Thor" },
            { name: "Scarlett Johansson", character: "Natasha Romanoff / Black Widow" }
          ],
          budget: 356000000,
          revenue: 2797800564,
          status: "Released",
          originalLanguage: "en",
          productionCompanies: ["Marvel Studios", "Walt Disney Pictures"]
        }

        const mockReviews = [
          {
            id: 1,
            user: {
              name: "John Doe",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              verified: true
            },
            rating: 5,
            date: "2023-12-01",
            content: "Film yang luar biasa! Plot yang kompleks tapi mudah diikuti, karakter yang berkembang dengan baik, dan aksi yang menegangkan. Marvel benar-benar mengakhiri saga ini dengan sempurna.",
            helpful: 24,
            spoiler: false
          },
          {
            id: 2,
            user: {
              name: "Sarah Wilson",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
              verified: false
            },
            rating: 4,
            date: "2023-11-28",
            content: "Sangat mengharukan dan memuaskan. Akhir yang sempurna untuk saga Avengers. Beberapa momen yang benar-benar membuat saya menangis.",
            helpful: 18,
            spoiler: false
          },
          {
            id: 3,
            user: {
              name: "Mike Chen",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              verified: true
            },
            rating: 5,
            date: "2023-11-25",
            content: "Masterpiece! Setiap detik film ini bernilai. Visual effects yang luar biasa, soundtrack yang epik, dan ending yang tidak akan pernah saya lupakan.",
            helpful: 32,
            spoiler: false
          }
        ]

        const mockSimilarMovies = [
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
          }
        ]

        setMovie(mockMovie)
        setReviews(mockReviews)
        setSimilarMovies(mockSimilarMovies)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movie data:', error)
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Film tidak ditemukan</h1>
          <p className="text-gray-400">Film yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${movie.backdrop})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Movie Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <RatingStars rating={movie.rating} size="lg" />
                  <span className="text-xl font-semibold">{movie.rating}</span>
                  <span className="text-gray-300">({movie.voteCount.toLocaleString()} votes)</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Tonton Trailer</span>
                </button>
                
                <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Tambah ke Watchlist</span>
                </button>

                <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
              { id: 'cast', label: 'Cast & Crew' },
              { id: 'details', label: 'Details' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>
              
              <h2 className="text-2xl font-bold text-white mb-4">Review Terbaru</h2>
              <div className="space-y-6">
                {reviews.slice(0, 3).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white">{movie.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bahasa</span>
                    <span className="text-white">{movie.originalLanguage.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget</span>
                    <span className="text-white">{formatCurrency(movie.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue</span>
                    <span className="text-white">{formatCurrency(movie.revenue)}</span>
                  </div>
                </div>
              </div>

              {/* Cast */}
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
                <div className="space-y-3">
                  {movie.cast.slice(0, 5).map((actor, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="text-white font-medium">{actor.name}</p>
                        <p className="text-gray-400 text-sm">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Reviews ({reviews.length})</h2>
              <button className="btn-primary">Tulis Review</button>
            </div>
            
            <ReviewForm movieId={movie.id} />
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Cast & Crew</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movie.cast.map((actor, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {actor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{actor.name}</h3>
                      <p className="text-gray-400 text-sm">{actor.character}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Production Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Director</span>
                  <span className="text-white">{movie.director}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Production Companies</span>
                  <span className="text-white">{movie.productionCompanies.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget</span>
                  <span className="text-white">{formatCurrency(movie.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-white">{formatCurrency(movie.revenue)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Runtime</span>
                  <span className="text-white">{formatRuntime(movie.runtime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white">{movie.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Language</span>
                  <span className="text-white">{movie.originalLanguage.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{movie.year}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Similar Movies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Film Serupa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
