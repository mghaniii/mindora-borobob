import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DiagnosticHeader,
  DiagnosticIntro,
  QuestionDisplay,
  DiagnosticStatusBar,
  QuestionOptions,
  QuestionNavigation,
  QuestionPaletteModal,
  useDiagnosticLogic,
} from '../features/diagnostic'
import Button from '../components/common/Button'
import { useAuth } from '../features/auth'
import { saveDiagnosticResult } from '../features/auth/authService'

export default function Diagnostic() {
  const navigate = useNavigate()
  const { markDiagnosticCompleted, logout } = useAuth()
  const [currentStep, setCurrentStep] = useState('intro')
  const [submissionResult, setSubmissionResult] = useState(null)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  const diagnostic = useDiagnosticLogic({
    totalTimeSeconds: 600,
    onComplete: (result) => {
      saveDiagnosticResult(result)
      markDiagnosticCompleted()
      setSubmissionResult(result)
      setCurrentStep('result')
    },
  })

  useEffect(() => {
    if (diagnostic.loadError?.status === 401 || diagnostic.submitErrorStatus === 401) {
      logout()
      navigate('/login', { replace: true })
    }
  }, [diagnostic.loadError, diagnostic.submitErrorStatus, logout, navigate])

  const handleStartTest = () => {
    diagnostic.startTest()
    setCurrentStep('question')
  }

  const handleExit = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const loadError = typeof diagnostic.loadError === 'string'
    ? diagnostic.loadError
    : diagnostic.loadError
      ? diagnostic.loadError.data?.message || diagnostic.loadError.message
      : ''

  return (
    <div className="min-h-screen w-full bg-surface-bg flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      <DiagnosticHeader onExit={handleExit} />

      <main className="flex-1 flex flex-col justify-start">
        {currentStep === 'intro' && (
          <div className="flex-1 flex items-center justify-center">
            <DiagnosticIntro
              onStart={handleStartTest}
              totalQuestions={diagnostic.totalQuestions}
              isLoading={diagnostic.questionsStatus === 'loading'}
              error={loadError}
              onRetry={diagnostic.retryLoadQuestions}
            />
          </div>
        )}

        {currentStep === 'question' && diagnostic.currentQuestion && (
          <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col gap-3.5">
            <DiagnosticStatusBar
              questionNumber={diagnostic.currentIndex + 1}
              totalQuestions={diagnostic.totalQuestions}
              topic={diagnostic.currentQuestion.topic}
              formattedTime={diagnostic.formattedTime}
              progressPercent={diagnostic.progressPercent}
              onOpenPalette={() => setIsPaletteOpen(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-7 flex flex-col gap-3.5">
                <QuestionDisplay
                  question={diagnostic.currentQuestion}
                  selectedAnswer={diagnostic.currentAnswer}
                />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3.5 sticky top-20">
                <QuestionOptions
                  options={diagnostic.currentQuestion.options}
                  selectedOption={diagnostic.currentAnswer?.selectedOption || null}
                  onSelect={diagnostic.selectOption}
                />

                <QuestionNavigation
                  currentIndex={diagnostic.currentIndex}
                  totalQuestions={diagnostic.totalQuestions}
                  questions={diagnostic.questions}
                  answers={diagnostic.answers}
                  isSubmitting={diagnostic.isSubmitting}
                  submitError={diagnostic.submitError}
                  onResetAnswer={diagnostic.resetCurrentAnswer}
                  onNext={diagnostic.nextQuestion}
                  onSelectQuestion={diagnostic.goToQuestion}
                  onSubmit={diagnostic.submitTest}
                />
              </div>
            </div>

            <QuestionPaletteModal
              isOpen={isPaletteOpen}
              onClose={() => setIsPaletteOpen(false)}
              totalQuestions={diagnostic.totalQuestions}
              questions={diagnostic.questions}
              currentIndex={diagnostic.currentIndex}
              answers={diagnostic.answers}
              onSelectQuestion={diagnostic.goToQuestion}
            />
          </div>
        )}

        {currentStep === 'result' && (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-xs">
                <svg
                  className="w-10 h-10 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-rubik text-text-main">
                  Tes Diagnostik Selesai!
                </h2>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                  Jawaban Anda telah berhasil direkam. Sistem adaptif akan menyusun rekomendasi materi belajar yang paling pas untuk kemampuan Anda.
                </p>
              </div>

              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200/60 flex items-center justify-around">
                <div className="flex flex-col">
                  <span className="text-xs text-text-subtle font-normal font-rubik">Soal Terjawab</span>
                  <span className="text-lg font-bold text-text-main font-rubik">
                    {submissionResult?.answeredCount ?? diagnostic.totalAnswered} / {submissionResult?.totalQuestions ?? diagnostic.totalQuestions}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-xs text-text-subtle font-normal font-rubik">Skor Diagnostik</span>
                  <span className="text-lg font-bold text-text-main font-rubik">
                    {submissionResult?.scorePercent ?? 0}%
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-xs text-text-subtle font-normal font-rubik">Waktu Pengerjaan</span>
                  <span className="text-lg font-bold text-text-main font-rubik">
                    {submissionResult
                      ? `${Math.floor(submissionResult.totalTimeSpentSeconds / 60)}m ${submissionResult.totalTimeSpentSeconds % 60}s`
                      : '-'}
                  </span>
                </div>
              </div>

              {submissionResult?.review?.length > 0 && (
                <details className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left">
                  <summary className="cursor-pointer font-rubik text-sm font-bold text-primary-dark">
                    Lihat Pembahasan
                  </summary>
                  <div className="mt-4 flex flex-col gap-3">
                    {submissionResult.review.map((item) => (
                      <div key={item.questionId} className="rounded-xl bg-slate-50 p-4 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xs font-bold text-text-main">
                            Soal {item.number} • {item.category}
                          </span>
                          <span className={`text-xs font-bold ${item.isCorrect ? 'text-emerald-700' : 'text-danger'}`}>
                            {item.isCorrect ? 'Benar' : 'Belum tepat'}
                          </span>
                        </div>
                        <p className="text-sm text-text-main">{item.questionText}</p>
                        <p className="text-xs text-text-muted">
                          Jawabanmu: {item.selectedOption || 'Tidak dijawab'} • Kunci: {item.correctOption}
                        </p>
                        {item.steps?.map((step) => (
                          <p key={step.step} className="text-xs text-text-muted leading-relaxed">
                            <strong className="text-text-main">{step.title}: </strong>
                            {step.description || step.label}
                          </p>
                        ))}
                        {item.hint && <p className="text-xs text-text-muted"><strong>Trik: </strong>{item.hint}</p>}
                      </div>
                    ))}
                  </div>
                </details>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
