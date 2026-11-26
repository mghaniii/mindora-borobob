import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import { useMateriData } from '../features/materi'
import { useAuth } from '../features/auth'

export default function MateriDetail() {
  const { materialId } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const materi = useMateriData()
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    if (materi.error?.status === 401 || materi.updateError?.status === 401) {
      logout()
      navigate('/login', { replace: true })
    }
  }, [materi.error, materi.updateError, logout, navigate])

  const material = materi.items.find((item) => item.id === materialId)

  if (materi.status === 'loading') {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center font-sans">
        <div className="bg-white rounded-3xl px-10 py-8 shadow-xs flex items-center gap-4">
          <svg className="w-6 h-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="font-rubik font-bold text-text-main">Menyiapkan materi…</span>
        </div>
      </div>
    )
  }

  if (materi.status === 'error') {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xs flex flex-col items-center text-center gap-5">
          <h1 className="font-rubik text-xl font-extrabold text-text-main">Materi Gagal Dimuat</h1>
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
      </div>
    )
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xs flex flex-col items-center text-center gap-5">
          <h1 className="font-rubik text-xl font-extrabold text-text-main">Materi Tidak Ditemukan</h1>
          <Link to="/materi" className="text-primary font-bold hover:text-primary-dark">Kembali ke katalog materi</Link>
        </div>
      </div>
    )
  }

  const isLocked = material.statusType?.startsWith('locked') || material.statusType === 'prerequisite_progress'
  const isCompleted = material.statusType === 'completed'
  const isUpdating = materi.updatingId === material.id
  const nextCompletedSubtopics = Math.min(material.totalModules, material.completedSubtopics + 1)
  const progressError = actionError || materi.updateError?.data?.message || materi.updateError?.message

  const markSubtopicComplete = () => {
    setActionError('')
    materi.saveProgress(material.id, nextCompletedSubtopics).catch(() => {})
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col gap-6">
          <nav className="flex items-center gap-2 text-xs font-rubik text-slate-500">
            <Link to="/materi" className="hover:text-primary transition-colors">Materi</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{material.title}</span>
          </nav>

          <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 flex flex-col gap-5">
            <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold font-rubik ${material.categoryColor}`}>
              {material.category}
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-rubik text-text-main">{material.title}</h1>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">{material.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm font-rubik">
                <span className="text-text-muted">Progres pembelajaran</span>
                <span className="font-bold text-primary">{material.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${material.progressPercent}%` }} />
              </div>
              <span className="text-xs text-text-subtle font-rubik">
                {material.completedSubtopics} dari {material.totalModules} sub-bab selesai
              </span>
            </div>

            {isLocked && (
              <p className="rounded-2xl bg-surface-card p-4 text-sm text-text-muted">
                {material.lockMessage || 'Selesaikan prasyarat materi sebelum melanjutkan.'}
              </p>
            )}

            {progressError && (
              <div className="rounded-2xl bg-wrong p-4 flex items-center justify-between gap-3 text-sm text-danger" role="alert">
                <span>{progressError}</span>
                {!isLocked && !isCompleted && (
                  <button type="button" onClick={markSubtopicComplete} disabled={isUpdating} className="font-bold text-primary hover:text-primary-dark cursor-pointer disabled:opacity-50">
                    Coba lagi
                  </button>
                )}
              </div>
            )}
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-extrabold font-rubik text-text-main">Daftar Sub-bab</h2>
              {!isLocked && !isCompleted && (
                <button
                  type="button"
                  onClick={markSubtopicComplete}
                  disabled={isUpdating}
                  className="px-5 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-bold font-rubik hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                >
                  {isUpdating ? 'Menyimpan…' : `Selesaikan Sub-bab ${nextCompletedSubtopics}`}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {Array.from({ length: material.totalModules }, (_, index) => {
                const number = index + 1
                const completed = number <= material.completedSubtopics
                const active = number === material.completedSubtopics + 1
                return (
                  <article key={number} className={`bg-white rounded-2xl border p-5 flex items-center gap-4 ${active ? 'border-primary/40' : 'border-slate-200/80'}`}>
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold font-rubik ${completed ? 'bg-correct-light text-correct-dark' : active ? 'bg-primary/10 text-primary' : 'bg-surface-card text-text-subtle'}`}>
                      {completed ? '✓' : number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold font-rubik text-text-main">Sub-bab {number}</h3>
                      <p className="text-xs text-text-muted mt-1">
                        {completed ? 'Selesai dipelajari.' : active ? 'Sedang dipelajari.' : 'Belum dimulai.'}
                      </p>
                    </div>
                    <span className={`text-xs font-bold font-rubik ${completed ? 'text-correct-dark' : 'text-text-subtle'}`}>
                      {completed ? 'Selesai' : active ? 'Berjalan' : 'Terkunci'}
                    </span>
                  </article>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
