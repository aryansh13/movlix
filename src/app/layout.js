import './globals.css'

export const metadata = {
  title: 'CinePulse - Platform Film Indonesia Terlengkap',
  description: 'Temukan, review, dan bagikan film favorit Anda. Platform komunitas film Indonesia dengan rating, review, dan rekomendasi terbaik.',
  keywords: 'film indonesia, review film, rating film, movie database, cinema, film review',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {children}
      </body>
    </html>
  )
}
