'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      description: "Setelah peristiwa yang menghancurkan di Avengers: Infinity War, alam semesta dalam keadaan reruntuhan. Dengan bantuan sekutu yang tersisa, Avengers berkumpul sekali lagi untuk membalikkan tindakan Thanos dan memulihkan keseimbangan di alam semesta.",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      rating: 8.4,
      year: 2019,
      genre: ["Action", "Adventure", "Drama"]
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      description: "Peter Parker terungkap identitasnya sebagai Spider-Man kepada dunia. Ketika Dr. Strange secara tidak sengaja membuka multiverse, Peter harus menghadapi musuh dari dunia lain.",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      rating: 8.2,
      year: 2021,
      genre: ["Action", "Adventure", "Fantasy"]
    },
    {
      id: 3,
      title: "Top Gun: Maverick",
      description: "Setelah lebih dari tiga puluh tahun melayani sebagai salah satu pilot top Angkatan Laut, Pete 'Maverick' Mitchell berada di tempat yang dia inginkan, mendorong batas sebagai pilot uji coba yang berani.",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      rating: 8.3,
      year: 2022,
      genre: ["Action", "Drama"]
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const currentMovie = heroMovies[currentSlide]

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentMovie.backdrop})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp">
            {currentMovie.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-xl font-semibold">{currentMovie.rating}</span>
            </div>
            <span className="text-gray-300 text-xl">•</span>
            <span className="text-white text-xl">{currentMovie.year}</span>
            <span className="text-gray-300 text-xl">•</span>
            <div className="flex space-x-2">
              {currentMovie.genre.map((g, index) => (
                <span key={index} className="text-purple-300 text-sm bg-purple-900/30 px-2 py-1 rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
            {currentMovie.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeInUp">
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
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
