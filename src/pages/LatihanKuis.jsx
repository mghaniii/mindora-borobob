import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useLatihanKuis,
  KuisHeader,
  KuisQuestionCard,
  KuisNavigasiSoal,
  KuisFormulaCard,
  KuisActionBar,
  KuisConfirmModal,
  KuisResult,
} from '../features/latihan'
import Button from '../components/common/Button'
import { useAuth } from '../features/auth'

export default function LatihanKuis() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const kuis = useLatihanKuis(itemId)

  useEffect(() => {
    if (kuis.loadError?.status === 401 || kuis.submitErrorStatus === 401) {
      logout()
      navigate('/login', { replace: true })
    }
  }, [kuis.loadError, kuis.submitErrorStatus, logout, navigate])

  if (kuis.status === 'loading') {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center font-sans">
        <div className="bg-white rounded-3xl px-10 py-8 shadow-xs flex items-center gap-4">
          <svg className="w-6 h-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="font-rubik font-bold text-text-main">Menyiapkan kuis…</span>
        </div>
      </div>
    )
  }

  if (kuis.status === 'not-found' || kuis.status === 'error') {
    const message = kuis.status === 'not-found'
      ? 'Modul latihan yang kamu tuju tidak tersedia. Kembali ke daftar latihan untuk memilih modul lain.'
      : kuis.loadError?.data?.message || kuis.loadError?.message || 'Kuis gagal dimuat.'

    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xs flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-wrong text-danger flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 8v5" />
              <path d="M12 16.5v.5" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-rubik text-xl font-extrabold text-text-main">
              {kuis.status === 'not-found' ? 'Latihan Tidak Ditemukan' : 'Kuis Gagal Dimuat'}
            </h1>
            <p className="text-sm text-text-muted leading-relaxed">{message}</p>
          </div>
          {kuis.status === 'error' && (
            <Button variant="primary" size="md" shape="pill" onClick={kuis.retry} className="w-full font-bold">
              Coba Muat Lagi
            </Button>
          )}
          <Button variant="outline-primary" size="md" shape="pill" onClick={() => navigate('/latihan')} className="w-full font-bold">
            Kembali ke Latihan
          </Button>
        </div>
      </div>
    )
  }

  if (kuis.status === 'finished') {
    return (
      <div className="min-h-screen bg-surface-bg font-sans px-4 sm:px-6 py-10 selection:bg-primary/20 selection:text-primary">
        <KuisResult
          config={kuis.config}
          result={kuis.result}
          onRestart={kuis.restart}
          onExit={() => navigate('/dashboard')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-bg font-sans selection:bg-primary/20 selection:text-primary">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5">
        <KuisHeader
          phase={kuis.config.phase}
          title={kuis.config.title}
          questionNumber={kuis.currentIndex + 1}
          totalQuestions={kuis.totalQuestions}
          formattedTime={kuis.formattedTime}
          onEnd={() => !kuis.isSubmitting && setIsConfirmOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8">
            <KuisQuestionCard
              question={kuis.currentQuestion}
              questionNumber={kuis.currentIndex + 1}
              selectedOption={kuis.currentAnswer?.selectedOption ?? null}
              onSelect={kuis.selectOption}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
            <KuisNavigasiSoal
              questions={kuis.questions}
              currentIndex={kuis.currentIndex}
              answers={kuis.answers}
              onSelectQuestion={kuis.goToQuestion}
            />
            <KuisFormulaCard formula={kuis.config.formula} />
          </div>
        </div>

        <KuisActionBar
          currentIndex={kuis.currentIndex}
          totalQuestions={kuis.totalQuestions}
          isDoubtful={kuis.currentAnswer?.isDoubtful ?? false}
          isSubmitting={kuis.isSubmitting}
          submitError={kuis.submitError}
          onPrev={kuis.prevQuestion}
          onToggleDoubtful={kuis.toggleDoubtful}
          onNext={kuis.nextQuestion}
          onRetrySubmit={kuis.submitTest}
        />
      </div>

      <KuisConfirmModal
        isOpen={isConfirmOpen}
        answeredCount={kuis.answeredCount}
        totalQuestions={kuis.totalQuestions}
        isSubmitting={kuis.isSubmitting}
        submitError={kuis.submitError}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={kuis.submitTest}
      />
    </div>
  )
}
