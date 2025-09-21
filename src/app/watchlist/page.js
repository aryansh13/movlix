'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'all', label: 'Semua', count: 0 },
    { id: 'want-to-watch', label: 'Ingin Ditonton', count: 0 },
    { id: 'watching', label: 'Sedang Ditonton', count: 0 },
    { id: 'watched', label: 'Sudah Ditonton', count: 0 }
  ]

  useEffect(() => {
    // Simulate loading watchlist data
    const loadWatchlist = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockWatchlist = [
          {
            id: 1,
            title: "Avengers: Endgame",
            poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            rating: 8.4,
            year: 2019,
            genre: ["Action", "Adventure", "Drama"],
            status: "watched",
            addedDate: "2023-11-15",
            userRating: 5,
            userReview: "Film yang luar biasa! Plot yang kompleks tapi mudah diikuti."
          },
          {
            id: 2,
            title: "Spider-Man: No Way Home",
            poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            rating: 8.2,
            year: 2021,
            genre: ["Action", "Adventure", "Fantasy"],
            status: "want-to-watch",
            addedDate: "2023-12-01"
          },
          {
            id: 3,
            title: "Top Gun: Maverick",
            poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            rating: 8.3,
            year: 2022,
            genre: ["Action", "Drama"],
            status: "watching",
            addedDate: "2023-11-28",
            progress: 45
          },
          {
            id: 4,
            title: "Dune",
            poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
            rating: 8.0,
            year: 2021,
            genre: ["Adventure", "Drama", "Sci-Fi"],
            status: "want-to-watch",
            addedDate: "2023-11-20"
          },
          {
            id: 5,
            title: "The Batman",
            poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
            rating: 7.8,
            year: 2022,
            genre: ["Action", "Crime", "Drama"],
            status: "watched",
            addedDate: "2023-10-15",
            userRating: 4,
            userReview: "Batman yang gelap dan realistis. Performa Robert Pattinson sangat bagus."
          }
        ]

        setWatchlist(mockWatchlist)
        
        // Update tab counts
        const updatedTabs = tabs.map(tab => ({
          ...tab,
          count: tab.id === 'all' 
            ? mockWatchlist.length 
            : mockWatchlist.filter(item => item.status === tab.id).length
        }))
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading watchlist:', error)
        setLoading(false)
      }
    }

    loadWatchlist()
  }, [])

  const filteredWatchlist = watchlist.filter(item => 
    activeTab === 'all' || item.status === activeTab
  )

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId))
  }

  const updateStatus = (movieId, newStatus) => {
    setWatchlist(prev => prev.map(item => 
      item.id === movieId ? { ...item, status: newStatus } : item
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
              <h1 className="text-4xl font-bold text-white mb-4">Watchlist Saya</h1>
              <p className="text-gray-300 text-lg">
                Kelola film yang ingin Anda tonton
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-700 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Watchlist Content */}
            {filteredWatchlist.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeTab === 'all' ? 'Watchlist kosong' : `Tidak ada film dengan status "${tabs.find(t => t.id === activeTab)?.label}"`}
                </h3>
                <p className="text-gray-400 mb-6">
                  Mulai tambahkan film ke watchlist Anda
                </p>
                <button className="btn-primary">
                  Jelajahi Film
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredWatchlist.map((item) => (
                  <div key={item.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Movie Poster */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-32 h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Movie Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <div className="flex items-center space-x-4 text-gray-300">
                              <span>{item.year}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{item.rating}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            <select
                              value={item.status}
                              onChange={(e) => updateStatus(item.id, e.target.value)}
                              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="want-to-watch">Ingin Ditonton</option>
                              <option value="watching">Sedang Ditonton</option>
                              <option value="watched">Sudah Ditonton</option>
                            </select>
                            
                            <button
                              onClick={() => removeFromWatchlist(item.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.genre.map((g, index) => (
                            <span 
                              key={index} 
                              className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full text-xs"
                            >
                              {g}
                            </span>
                          ))}
                        </div>

                        {/* Progress Bar (for watching status) */}
                        {item.status === 'watching' && item.progress && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-300 text-sm">Progress</span>
                              <span className="text-gray-300 text-sm">{item.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* User Rating and Review */}
                        {item.status === 'watched' && item.userRating && (
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-gray-300 text-sm">Rating Anda:</span>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= item.userRating ? 'text-yellow-400' : 'text-gray-600'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            {item.userReview && (
                              <p className="text-gray-300 text-sm italic">"{item.userReview}"</p>
                            )}
                          </div>
                        )}

                        {/* Added Date */}
                        <div className="text-gray-400 text-sm">
                          Ditambahkan pada {formatDate(item.addedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
