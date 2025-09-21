'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieGrid from './components/MovieGrid'
import FeaturedMovies from './components/FeaturedMovies'
import TrendingSection from './components/TrendingSection'
import Footer from './components/Footer'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - in real app, this would fetch from your backend
    const fetchMovies = async () => {
      try {
        // Mock data for now
        const mockTrending = [
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
          }
        ]

        const mockFeatured = [
          {
            id: 7,
            title: "Inception",
            poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            rating: 8.8,
            year: 2010,
            genre: ["Action", "Sci-Fi", "Thriller"],
            description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
          },
          {
            id: 8,
            title: "Interstellar",
            poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            rating: 8.6,
            year: 2014,
            genre: ["Adventure", "Drama", "Sci-Fi"],
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
          }
        ]

        setTrendingMovies(mockTrending)
        setFeaturedMovies(mockFeatured)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

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
      <main>
        <Hero />
        <FeaturedMovies movies={featuredMovies} />
        <TrendingSection movies={trendingMovies} />
        <MovieGrid movies={trendingMovies} title="Film Populer" />
      </main>
      <Footer />
    </div>
  )
}
