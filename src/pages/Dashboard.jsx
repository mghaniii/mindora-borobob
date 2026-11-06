import React from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import {
  WelcomeBanner,
  DashboardStats,
  ContinueLearningCard,
  MaterialRecommendation,
  LeaderboardWidget,
} from '../features/dashboard'

export default function Dashboard() {
  const handleContinueLearning = () => {
    console.log('Navigasi ke modul pembelajaran saat ini...')
  }

  const handleSelectMaterial = (material) => {
    console.log('Materi yang dipilih:', material)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      {/* Menu Navigasi Samping (Sidebar) */}
      <Sidebar />

      {/* Area Konten Utama (Scroll mandiri) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header Atas (Pencarian & Profil) */}
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-4 sm:pt-0 pb-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* 1. Banner Sambutan dengan Pengukur Target Harian */}
          <WelcomeBanner onContinue={handleContinueLearning} />

          {/* 2. Tiga Kartu Metrik Ringkasan Statistik */}
          <DashboardStats />

          {/* 3. Grid Tata Letak Utama (Pembelajaran, Rekomendasi, & Peringkat) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Bagian Kiri (2 Kolom): Lanjutkan Belajar & Rekomendasi Materi */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ContinueLearningCard onContinue={handleContinueLearning} />
              <MaterialRecommendation onSelectMaterial={handleSelectMaterial} />
            </div>

            {/* Bagian Kanan (1 Kolom): Widget Peringkat Kelas */}
            <div className="lg:col-span-1">
              <LeaderboardWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

