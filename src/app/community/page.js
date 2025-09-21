'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('reviews')
  const [reviews, setReviews] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'reviews', label: 'Review Terbaru' },
    { id: 'users', label: 'Pengguna Aktif' },
    { id: 'discussions', label: 'Diskusi' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ]

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        // Mock data
        const mockReviews = [
          {
            id: 1,
            user: {
              name: "John Doe",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              verified: true,
              followers: 1250
            },
            movie: {
              title: "Avengers: Endgame",
              poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
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
              verified: false,
              followers: 890
            },
            movie: {
              title: "Spider-Man: No Way Home",
              poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
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
              verified: true,
              followers: 2100
            },
            movie: {
              title: "Top Gun: Maverick",
              poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
            },
            rating: 5,
            date: "2023-11-25",
            content: "Masterpiece! Setiap detik film ini bernilai. Visual effects yang luar biasa, soundtrack yang epik, dan ending yang tidak akan pernah saya lupakan.",
            helpful: 32,
            spoiler: false
          }
        ]

        const mockUsers = [
          {
            id: 1,
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            verified: true,
            followers: 1250,
            reviews: 156,
            rating: 4.8,
            favoriteGenres: ["Action", "Drama", "Sci-Fi"],
            isFollowing: false
          },
          {
            id: 2,
            name: "Sarah Wilson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            verified: false,
            followers: 890,
            reviews: 98,
            rating: 4.6,
            favoriteGenres: ["Romance", "Drama", "Comedy"],
            isFollowing: true
          },
          {
            id: 3,
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            verified: true,
            followers: 2100,
            reviews: 234,
            rating: 4.9,
            favoriteGenres: ["Action", "Thriller", "Crime"],
            isFollowing: false
          }
        ]

        setReviews(mockReviews)
        setUsers(mockUsers)
        setLoading(false)
      } catch (error) {
        console.error('Error loading community data:', error)
        setLoading(false)
      }
    }

    loadCommunityData()
  }, [])

  const toggleFollow = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing, followers: user.isFollowing ? user.followers - 1 : user.followers + 1 }
        : user
    ))
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
              <h1 className="text-4xl font-bold text-white mb-4">Komunitas CinePulse</h1>
              <p className="text-gray-300 text-lg">
                Bergabunglah dengan komunitas penggemar film terbesar di Indonesia
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
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Review Terbaru</h2>
                  <button className="btn-primary">Tulis Review</button>
                </div>
                
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Pengguna Aktif</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{user.name}</h3>
                            {user.verified && (
                              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{user.followers} pengikut</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Review</span>
                          <span className="text-white text-sm">{user.reviews}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Rating Rata-rata</span>
                          <span className="text-white text-sm">{user.rating}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-2">Genre Favorit</p>
                        <div className="flex flex-wrap gap-1">
                          {user.favoriteGenres.map((genre, index) => (
                            <span 
                              key={index} 
                              className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleFollow(user.id)}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                            user.isFollowing
                              ? 'bg-gray-700 text-white hover:bg-gray-600'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {user.isFollowing ? 'Mengikuti' : 'Ikuti'}
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discussions' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Diskusi Populer</h2>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Film Marvel terbaik tahun 2023?",
                      author: "John Doe",
                      replies: 24,
                      views: 156,
                      lastActivity: "2 jam yang lalu"
                    },
                    {
                      id: 2,
                      title: "Rekomendasi film horror Indonesia",
                      author: "Sarah Wilson",
                      replies: 18,
                      views: 89,
                      lastActivity: "4 jam yang lalu"
                    },
                    {
                      id: 3,
                      title: "Film yang paling mengharukan yang pernah ditonton",
                      author: "Mike Chen",
                      replies: 32,
                      views: 234,
                      lastActivity: "6 jam yang lalu"
                    }
                  ].map((discussion) => (
                    <div key={discussion.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
                      <h3 className="text-white font-semibold mb-2">{discussion.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span>Oleh {discussion.author}</span>
                          <span>{discussion.replies} balasan</span>
                          <span>{discussion.views} dilihat</span>
                        </div>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="space-y-4">
                    {[
                      { rank: 1, name: "Mike Chen", reviews: 234, rating: 4.9, points: 1250 },
                      { rank: 2, name: "John Doe", reviews: 156, rating: 4.8, points: 980 },
                      { rank: 3, name: "Sarah Wilson", reviews: 98, rating: 4.6, points: 750 },
                      { rank: 4, name: "Alex Johnson", reviews: 87, rating: 4.7, points: 680 },
                      { rank: 5, name: "Emma Davis", reviews: 76, rating: 4.5, points: 620 }
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-black' :
                          user.rank === 2 ? 'bg-gray-400 text-black' :
                          user.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.reviews} review • Rating: {user.rating}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-400 font-bold">{user.points} poin</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
