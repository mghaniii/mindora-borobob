import { useEffect, useState } from 'react'
import {
  getDiagnosticSummary,
  getTopicMastery,
  getActivities,
} from '../services/diagnosticService'

/**
 * Hook kelola data halaman Riwayat & Hasil Diagnostik.
 *
 * Alur data: page -> hook ini -> diagnosticService -> api.js.
 * Ringkasan & tren penguasaan dimuat satu kali, sedangkan daftar aktivitas
 * dimuat ulang setiap kali halaman (paginasi) atau kategori filter berganti.
 */
export function useDiagnosticHistory() {
  const [summary, setSummary] = useState(null)
  const [mastery, setMastery] = useState(null)
  const [activities, setActivities] = useState([])
  const [totalActivities, setTotalActivities] = useState(0)
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('loading')

  // Muat ringkasan & tren penguasaan topik sekali saat halaman dibuka
  useEffect(() => {
    let cancelled = false

    const loadOverview = async () => {
      const [summaryData, masteryData] = await Promise.all([
        getDiagnosticSummary(),
        getTopicMastery(),
      ])
      if (cancelled) return
      setSummary(summaryData)
      setMastery(masteryData)
      setStatus('ready')
    }

    loadOverview()

    return () => {
      cancelled = true
    }
  }, [])

  // Muat ulang daftar aktivitas saat halaman atau kategori filter berganti
  useEffect(() => {
    let cancelled = false

    const loadActivities = async () => {
      setStatus('loading')
      const { items, total } = await getActivities({ page, category })
      if (cancelled) return
      setActivities(items)
      setTotalActivities(total)
      setStatus('ready')
    }

    loadActivities()

    return () => {
      cancelled = true
    }
  }, [page, category])

  // Ganti kategori filter selalu mulai dari halaman pertama
  const handleCategoryChange = (nextCategory) => {
    if (nextCategory === category) return
    setCategory(nextCategory)
    setPage(1)
  }

  const goToPage = (nextPage) => setPage(nextPage)
  const nextPage = () => setPage((current) => current + 1)
  const prevPage = () => setPage((current) => Math.max(1, current - 1))

  return {
    summary,
    mastery,
    activities,
    totalActivities,
    category,
    page,
    status,
    handleCategoryChange,
    goToPage,
    nextPage,
    prevPage,
  }
}

export default useDiagnosticHistory
