// app/search/page.js

import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchContent from './SearchContent' // Impor komponen baru kita

// Komponen untuk tampilan loading
function SearchLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center py-40">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <Suspense fallback={<SearchLoadingSkeleton />}>
          <SearchContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}