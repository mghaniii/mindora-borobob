import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import {
  LatihanDailyStats,
  LatihanFilter,
  LatihanGrid,
  KuisHarianBanner,
  PerformaMatriksCard,
  DAILY_STATS,
  LATIHAN_ITEMS,
  KUIS_HARIAN,
  KUIS_HARIAN_ID,
  PERFORMA_MATRIKS,
} from '../features/latihan'

/**
 * Halaman Utama Latihan & Kuis
 */
export default function Latihan() {
  const navigate = useNavigate()
  const [activeTopik, setActiveTopik] = useState('all')
  const [sortBy, setSortBy] = useState('rekomendasi')

  // Filter daftar latihan berdasarkan topik aktif
  const filteredLatihan = LATIHAN_ITEMS.filter((item) => {
    if (activeTopik === 'all') return true
    return item.topikId === activeTopik
  })

  // Penanganan aksi tombol latihan: buka kuis sesuai modul yang dipilih
  const handleAction = (item) => {
    navigate(`/latihan/${item.id}`)
  }

  // Mulai kuis harian adaptif
  const handleStartDailyQuiz = () => {
    navigate(`/latihan/${KUIS_HARIAN_ID}`)
  }

  // Mulai latihan mandiri 10m
  const handleStartSelfPractice = () => {
    navigate('/latihan/lat-1')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      {/* 1. Sidebar Navigasi Kiri (State Aktif: Latihan & Kuis) */}
      <Sidebar />

      {/* 2. Konten Utama (Scroll Mandiri) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header Baris Atas */}
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-4 sm:pt-0 pb-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* A. Baris Statistik Harian (Top Bar) */}
          <LatihanDailyStats
            targetCompleted={DAILY_STATS.targetCompleted}
            targetTotal={DAILY_STATS.targetTotal}
            streakDays={DAILY_STATS.streakDays}
            todayXp={DAILY_STATS.todayXp}
            onStartSelfPractice={handleStartSelfPractice}
          />

          {/* B. Header Bab, Sortir, & Tab Filter Topik */}
          <LatihanFilter
            activeTopik={activeTopik}
            onSelectTopik={setActiveTopik}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* C. Grid 4 Kartu Latihan Konsep (2 Kolom x 2 Baris) */}
          <LatihanGrid
            items={filteredLatihan}
            onAction={handleAction}
          />

          {/* D. Banner Kuis Adaptif Harian */}
          <KuisHarianBanner
            badge={KUIS_HARIAN.badge}
            meta={KUIS_HARIAN.meta}
            title={KUIS_HARIAN.title}
            actionLabel={KUIS_HARIAN.actionLabel}
            onStartQuiz={handleStartDailyQuiz}
          />

          {/* E. Widget Statistik Performa Matriks (Bawah) */}
          <PerformaMatriksCard
            accuracy={PERFORMA_MATRIKS.accuracy}
            speed={PERFORMA_MATRIKS.speed}
            readiness={PERFORMA_MATRIKS.readiness}
          />

          {/* F. Footer Keamanan Data */}
          <footer className="w-full pt-6 pb-4 flex items-center justify-center gap-2 text-xs font-sans text-slate-500">
            <span>🔒</span>
            <span>Keamanan data belajarmu terjamin sepenuhnya.</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

