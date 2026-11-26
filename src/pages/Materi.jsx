import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import {
  MateriFilter,
  MateriSearchSort,
  KatalogMateriGrid,
  getFilteredMateri,
  useMateriData,
} from '../features/materi'
import { useAuth } from '../features/auth'

export default function Materi() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const materi = useMateriData()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rekomendasi')

  useEffect(() => {
    if (materi.error?.status === 401) {
      logout()
      navigate('/login', { replace: true })
    }
  }, [materi.error, logout, navigate])

  const filteredMateri = getFilteredMateri({
    items: materi.items,
    activeTab,
    searchQuery,
    statusFilter,
    sortBy,
  })

  const handleAction = (item) => {
    if (!item.statusType?.startsWith('locked')) {
      navigate(`/materi/${encodeURIComponent(item.id)}`)
    }
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setActiveTab('all')
    setStatusFilter('all')
    setSortBy('rekomendasi')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-6 pb-12 max-w-7xl w-full mx-auto flex flex-col gap-6">
          <nav className="flex items-center gap-2 text-xs font-rubik text-slate-500">
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <polyline points="9 22 9 12 15 22 15 12" />
              </svg>
              <span>Beranda</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-semibold">Materi Pembelajaran</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-zinc-900 text-2xl sm:text-3xl font-extrabold font-rubik tracking-tight">
                Katalog Materi Matematika
              </h1>
              <p className="text-slate-500 text-sm font-normal">
                Pelajari konsep matematika tahap demi tahap sesuai ritme dan hasil diagnostik adaptifmu.
              </p>
            </div>

            <div className="self-start sm:self-auto px-4 py-2 bg-white rounded-full border border-slate-200/90 shadow-2xs flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="text-xs font-bold font-rubik text-slate-800">
                Kurikulum Merdeka • Kelas 2 SMA
              </span>
            </div>
          </div>

          <MateriSearchSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <MateriFilter activeTab={activeTab} onSelectTab={setActiveTab} />

          {materi.status === 'loading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2" aria-label="Memuat materi">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="h-72 rounded-3xl bg-white border border-slate-200/70 animate-pulse" />
              ))}
            </div>
          )}

          {materi.status === 'error' && (
            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 flex flex-col items-center gap-4 text-center" role="alert">
              <h2 className="text-lg font-bold font-rubik text-text-main">Materi gagal dimuat</h2>
              <p className="text-sm text-text-muted">
                {materi.error?.data?.message || materi.error?.message || 'Silakan coba lagi.'}
              </p>
              <button
                type="button"
                onClick={materi.retry}
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold font-rubik hover:bg-primary-dark cursor-pointer"
              >
                Coba Muat Lagi
              </button>
            </div>
          )}

          {materi.status === 'ready' && (
            <KatalogMateriGrid
              items={filteredMateri}
              onAction={handleAction}
              onReset={handleResetFilters}
            />
          )}

          <footer className="w-full pt-10 pb-4 flex items-center justify-center gap-2 text-xs font-rubik text-slate-500">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span>Keamanan data belajarmu terjamin sepenuhnya.</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
