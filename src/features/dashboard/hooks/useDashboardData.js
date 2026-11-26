import { useState, useEffect, useCallback } from 'react'
import {
  getDashboardSummary,
  getContinueLearning,
  getMaterialRecommendations,
  getLeaderboard,
} from '../services/dashboardService'

export function useDashboardData() {
  const [summary, setSummary] = useState(null)
  const [continueLearning, setContinueLearning] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
    refresh: fetchDashboard,
  }
}

export default useDashboardData
