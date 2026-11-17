import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import {
  DiagnosticSummaryCard,
  TopicMasteryProgress,
  EvaluationHistoryTable,
  useDiagnosticHistory,
} from '../features/diagnostic'
import Button from '../components/common/Button.jsx'
import iconUnduh from '../assets/riwayat-diagnotic/icon-unduh.svg'

/**
 * Halaman Riwayat & Hasil Diagnostik
 * Menampilkan ringkasan tes diagnostik terakhir, tren penguasaan topik, dan
 * riwayat aktivitas pembelajaran siswa.
 */
export default function DiagnosticHistory() {
  const navigate = useNavigate()
  const {
    summary,
    mastery,
    activities,
    totalActivities,
    category,
    page,
    status,
    handleCategoryChange,
    goToPage,
  } = useDiagnosticHistory()

  // Ikuti tes diagnostik ulang dari awal
  const handleRetakeDiagnostic = () => {
    navigate('/diagnostic')
  }

  // Unduh ringkasan: trigger dialog cetak browser (tanpa dependency tambahan)
  const handleDownloadSummary = () => {
    window.print()
  }

  // Aksi baris tabel: 'Ulangi' menavigasi ke latihan terkait
  const handleRowAction = (activity) => {
    if (activity.actionLabel === 'Ulangi') {
      navigate('/latihan/lat-2')
    }
  }

  // Buka analisis detail: arahkan ke tes diagnostik untuk evaluasi mendalam
  const handleOpenAnalysis = () => {
    navigate('/diagnostic')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-4 sm:pt-0 pb-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* A. Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-sans text-text-subtle"
          >
            <a
              href="/dashboard"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Beranda
            </a>
            <span className="text-surface-muted">{'>'}</span>
            <span className="text-primary font-semibold">Riwayat & Diagnostik</span>
          </nav>

          {/* B. Judul + Tombol Aksi */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-rubik text-text-main">
                Riwayat & Hasil Diagnostik
              </h1>
              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed max-w-2xl">
                Pantau perkembangan kemampuan adaptif, evaluasi tes diagnostik,
                dan riwayat aktivitasmu secara terukur.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Button
                variant="outline-primary"
                size="md"
                shape="pill"
                onClick={handleDownloadSummary}
                iconLeft={<img src={iconUnduh} alt="" className="w-3 h-3 object-contain" />}
                className="shadow-xs"
              >
                Unduh Ringkasan (PDF)
              </Button>
              <Button
                variant="secondary"
                size="md"
                shape="pill"
                onClick={handleRetakeDiagnostic}
                iconLeft={
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.65 6.35A7.958 7.958 0 0012 4a8 8 0 108 8h-2a6 6 0 11-6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                  </svg>
                }
                className="shadow-xs"
              >
                Ikuti Tes Diagnostik Ulang
              </Button>
            </div>
          </div>

          {/* C. Kartu Ringkasan Hasil Diagnostik (gauge + 3 box narasi) */}
          {status === 'loading' && !summary ? (
            <div className="w-full bg-white rounded-3xl shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-8 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <DiagnosticSummaryCard summary={summary} />
          )}

          {/* D. Tren Penguasaan Topik */}
          <TopicMasteryProgress mastery={mastery} onOpenAnalysis={handleOpenAnalysis} />

          {/* E. Riwayat Aktivitas & Evaluasi */}
          <EvaluationHistoryTable
            activities={activities}
            activeCategory={category}
            onCategoryChange={handleCategoryChange}
            page={page}
            totalItems={totalActivities}
            onPageChange={goToPage}
            onRowAction={handleRowAction}
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
