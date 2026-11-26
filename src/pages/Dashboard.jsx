import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import Button from '../components/common/Button.jsx'
import { useAuth } from '../features/auth'
import {
  WelcomeBanner,
  DashboardStats,
  ContinueLearningCard,
  MaterialRecommendation,
  LeaderboardWidget,
  useDashboardData,
} from '../features/dashboard'

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Memuat dashboard">
      <div className="h-40 rounded-3xl bg-slate-200 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-24 rounded-2xl bg-slate-200 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 rounded-2xl bg-slate-200 animate-pulse" />
        <div className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
      </div>
    </div>
  )
}

function DashboardError({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-start gap-3">
      <h1 className="text-lg font-bold text-zinc-900">Dashboard belum dapat dimuat</h1>
      <p className="text-sm text-gray-600">{message}</p>
      <Button variant="primary" size="sm" onClick={onRetry}>
        Coba lagi
      </Button>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const {
    summary,
    continueLearning,
    recommendations,
    leaderboard,
    isLoading,
    error,
    refresh,
  } = useDashboardData()

  useEffect(() => {
    if (error?.status === 401) {
      logout()
      navigate('/login', { replace: true })
    }
  }, [error, logout, navigate])

  const openMaterials = () => navigate('/materi')
  const openMaterial = (materialId) => navigate(`/materi/${encodeURIComponent(materialId)}`)

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />

        <main className="flex-1 px-6 sm:px-8 pt-4 sm:pt-0 pb-8 max-w-7xl w-full mx-auto flex flex-col gap-6">
          {isLoading && <DashboardSkeleton />}

          {!isLoading && error && (
            <DashboardError
              message={error.data?.message || error.message || 'Terjadi kesalahan saat memuat data.'}
              onRetry={refresh}
            />
          )}

          {!isLoading && !error && summary && (
            <>
              <WelcomeBanner
                name={summary.name}
                currentTopic={summary.currentTopic || 'Belum ada topik aktif'}
                targetPercentage={summary.targetPercentage}
                spentMinutes={summary.spentMinutes}
                totalTargetMinutes={summary.totalTargetMinutes}
                onContinue={openMaterials}
              />

              <DashboardStats
                streakDays={summary.streakDays}
                totalXp={summary.totalXp}
                completedModules={summary.completedModules}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {continueLearning ? (
                    <ContinueLearningCard
                      chapter={continueLearning.chapter}
                      title={continueLearning.title}
                      completedSubtopics={continueLearning.completedSubtopics}
                      totalSubtopics={continueLearning.totalSubtopics}
                      progressPercentage={continueLearning.progressPercentage}
                      onContinue={() => continueLearning.materialId
                        ? openMaterial(continueLearning.materialId)
                        : openMaterials()}
                    />
                  ) : (
                    <div className="w-full p-6 bg-white rounded-2xl border border-slate-100 flex flex-col items-start gap-3">
                      <h2 className="text-zinc-900 text-lg font-bold">Lanjutkan Pembelajaran</h2>
                      <p className="text-sm text-gray-500">Belum ada materi aktif. Pilih materi untuk mulai belajar.</p>
                      <Button variant="outline-primary" size="sm" onClick={openMaterials}>
                        Pilih Materi
                      </Button>
                    </div>
                  )}

                  <MaterialRecommendation
                    items={recommendations}
                    onSeeAll={openMaterials}
                    onSelectMaterial={(material) => openMaterial(material.id)}
                  />
                </div>

                <div className="lg:col-span-1">
                  <LeaderboardWidget items={leaderboard} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
