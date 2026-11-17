import { useState, useEffect, useCallback } from 'react'
import {
  getDashboardSummary,
  getContinueLearning,
  getMaterialRecommendations,
  getLeaderboard,
  MOCK_SUMMARY,
  MOCK_CONTINUE_LEARNING,
  MOCK_RECOMMENDATIONS,
  MOCK_LEADERBOARD,
} from '../services/dashboardService'

/**
 * Custom Hook: useDashboardData
 * Mengambil seluruh data dashboard dari backend dan mengelola status
 * pemuatannya. Data contoh dipakai sebagai nilai awal agar tampilan
 * tidak kosong selama permintaan pertama belum selesai / gagal.
 */
export function useDashboardData() {
  const [summary, setSummary] = useState(MOCK_SUMMARY)
  const [continueLearning, setContinueLearning] = useState(MOCK_CONTINUE_LEARNING)
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS)
  const [leaderboard, setLeaderboard] = useState(MOCK_LEADERBOARD)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Memuat ulang seluruh data dashboard dari backend
  const fetchDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [
        summaryData,
        continueLearningData,
        recommendationData,
        leaderboardData,
      ] = await Promise.all([
        getDashboardSummary(),
        getContinueLearning(),
        getMaterialRecommendations(),
        getLeaderboard(),
      ])

      setSummary(summaryData)
      setContinueLearning(continueLearningData)
      setRecommendations(recommendationData)
      setLeaderboard(leaderboardData)
    } catch (fetchError) {
      setError(fetchError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return {
    summary,
    continueLearning,
    recommendations,
    leaderboard,
    isLoading,
    error,
    // Aksi
    refresh: fetchDashboard,
  }
}

export default useDashboardData
