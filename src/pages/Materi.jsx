import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import {
  MateriFilter,
  MateriSearchSort,
  KatalogMateriGrid,
  getFilteredMateri,
  KATALOG_MATERI,
} from '../features/materi'

/**
 * Halaman Katalog Materi Matematika (Desktop)
 * Mengacu presisi 1:1 pada Design/halaman-materi-design-dekstop.png
 * dan struktur rencana.md
 */
export default function Materi() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rekomendasi')

  // Dapatkan daftar materi terfilter
  const filteredMateri = getFilteredMateri({
    items: KATALOG_MATERI,
    activeTab,
    searchQuery,
    statusFilter,
    sortBy,
  })

  // Penanganan klik tombol aksi materi
  const handleAction = (item) => {
    if (item.statusType === 'in_progress' || item.statusType === 'ready') {
      navigate('/diagnostic')
    } else if (item.statusType === 'completed') {
      navigate('/diagnostic')
    }
  }

  // Reset semua filter
  const handleResetFilters = () => {
    setSearchQuery('')
    setActiveTab('all')
    setStatusFilter('all')
    setSortBy('rekomendasi')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      {/* 1. Sidebar Navigasi Kiri (State Aktif: Materi) */}
      <Sidebar />

      {/* 2. Konten Utama (Scroll Mandiri) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header Baris Atas */}
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-6 pb-12 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* A. Breadcrumb Navigasi */}
          <nav className="flex items-center gap-2 text-xs font-rubik text-slate-500">
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Beranda</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary font-semibold">Materi Pembelajaran</span>
          </nav>

          {/* B. Judul Halaman & Badge Kurikulum */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-zinc-900 text-2xl sm:text-3xl font-extrabold font-rubik tracking-tight">
                Katalog Materi Matematika
              </h1>
              <p className="text-slate-500 text-sm font-normal">
                Pelajari konsep matematika tahap demi tahap sesuai ritme dan hasil diagnostik adaptifmu.
              </p>
            </div>

            {/* Badge Kurikulum Merdeka */}
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

          {/* C. Baris Input Pencarian Kapsul & Dropdown Filter */}
          <MateriSearchSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* D. Tab Kategori Filter Pills */}
          <MateriFilter
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* E. Grid 6 Kartu Materi */}
          <KatalogMateriGrid
            items={filteredMateri}
            onAction={handleAction}
            onReset={handleResetFilters}
          />

          {/* F. Footer Keamanan Data */}
          <footer className="w-full pt-10 pb-4 flex items-center justify-center gap-2 text-xs font-rubik text-slate-500">
            <span>🔒</span>
            <span>Keamanan data belajarmu terjamin sepenuhnya.</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
