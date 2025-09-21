'use client'

import { useState } from 'react'
import RatingStars from './RatingStars'

export default function ReviewForm({ movieId, onReviewSubmit = null }) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isSpoiler, setIsSpoiler] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Silakan berikan rating terlebih dahulu')
      return
    }

    if (reviewText.trim().length < 10) {
      alert('Review harus minimal 10 karakter')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReview = {
        id: Date.now(),
        user: {
          name: "User Anda",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          verified: false
        },
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        content: reviewText,
        helpful: 0,
        spoiler: isSpoiler
      }

      if (onReviewSubmit) {
        onReviewSubmit(newReview)
      }

      // Reset form
      setRating(0)
      setReviewText('')
      setIsSpoiler(false)
      setShowForm(false)
      
      alert('Review berhasil dikirim!')
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Terjadi kesalahan saat mengirim review')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showForm) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Bagikan Pendapat Anda</h3>
          <p className="text-gray-400 mb-4">
            Tulis review dan berikan rating untuk film ini
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Tulis Review
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-6">Tulis Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-white font-medium mb-3">
            Rating *
          </label>
          <RatingStars
            rating={rating}
            interactive={true}
            onRatingChange={handleRatingChange}
            showValue={true}
            size="lg"
          />
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review-text" className="block text-white font-medium mb-3">
            Review *
          </label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Bagikan pendapat Anda tentang film ini..."
            className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-sm">
              {reviewText.length}/1000 karakter
            </span>
            <span className="text-gray-400 text-sm">
              Minimal 10 karakter
            </span>
          </div>
        </div>

        {/* Spoiler Warning */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="spoiler"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
          <label htmlFor="spoiler" className="text-white text-sm">
            Review ini mengandung spoiler
          </label>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-2">Panduan Review</h4>
          <ul className="text-blue-300 text-sm space-y-1">
            <li>• Berikan pendapat yang konstruktif dan objektif</li>
            <li>• Hindari spoiler tanpa peringatan</li>
            <li>• Gunakan bahasa yang sopan dan menghormati</li>
            <li>• Fokus pada aspek film, bukan personal</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || rating === 0 || reviewText.trim().length < 10}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Mengirim...</span>
              </div>
            ) : (
              'Kirim Review'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
