import React, { useState } from 'react'
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

/**
 * Halaman Utama Diagnostic (Tes Adaptif)
 * Mengatur alur: Intro -> Pengerjaan Soal (StatusBar, Kolom Kiri, Kolom Kanan, & Modal Pemilih Soal) -> Hasil Tes
 * Penempatan tata letak 100% presisi sesuai Design/soal 1-diagnostic.svg
 */
export default function Diagnostic() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('intro') // 'intro' | 'question' | 'result'
  const [submissionResult, setSubmissionResult] = useState(null)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Hook Logika Diagnostik
  const diagnostic = useDiagnosticLogic({
    totalTimeSeconds: 600, // 10 menit
    onComplete: (payload) => {
      setSubmissionResult(payload)
      setCurrentStep('result')
    },
  })

  const handleStartTest = () => {
    setCurrentStep('question')
  }

  const handleExit = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen w-full bg-[#F7F9FB] flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* 1. Header Aplikasi Paling Atas */}
      <DiagnosticHeader onExit={handleExit} />

      {/* 2. Konten Berdasarkan Tahapan */}
      <main className="flex-1 flex flex-col justify-start">
        {/* Tahap 1: Pengantar Tes (Intro) */}
        {currentStep === 'intro' && (
          <div className="flex-1 flex items-center justify-center">
            <DiagnosticIntro onStart={handleStartTest} />
          </div>
        )}

        {/* Tahap 2: Pengerjaan Soal (Sesuai Desain Asli soal 1-diagnostic.svg) */}
        {currentStep === 'question' && (
          <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col gap-3.5">
            {/* Top Bar Status Pengerjaan (Full-Width di Atas Kedua Kolom) */}
            <DiagnosticStatusBar
              questionNumber={diagnostic.currentIndex + 1}
              totalQuestions={diagnostic.totalQuestions}
              topic={diagnostic.currentQuestion.topic}
              formattedTime={diagnostic.formattedTime}
              progressPercent={diagnostic.progressPercent}
              onOpenPalette={() => setIsPaletteOpen(true)}
            />

            {/* Grid 2 Kolom: Kiri (Soal & Langkah) dan Kanan (Pilihan & Navigasi) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-7 flex flex-col gap-3.5">
                <QuestionDisplay
                  question={diagnostic.currentQuestion}
                  selectedAnswer={diagnostic.currentAnswer}
                />
              </div>

              {/* Kolom Kanan (Lebar ~42%, 5 Kolom): Pilihan Jawaban (A, B, C, D) & Tombol Aksi (Coba Ulang & Lanjut) */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 sticky top-20">
                {/* Pilihan Jawaban A, B, C, D (Model A: Instant Feedback) */}
                <QuestionOptions
                  options={diagnostic.currentQuestion.options}
                  selectedOption={diagnostic.currentAnswer?.selectedOption || null}
                  correctOption={diagnostic.currentQuestion.correctOption || 'B'}
                  onSelect={diagnostic.selectOption}
                />

                {/* Panel Navigasi Bawah: Tombol Coba Ulang, Lanjut ke Soal N, & Navigasi Langsung Soal */}
                <QuestionNavigation
                  currentIndex={diagnostic.currentIndex}
                  totalQuestions={diagnostic.totalQuestions}
                  questions={diagnostic.questions}
                  answers={diagnostic.answers}
                  isDoubtful={diagnostic.currentAnswer?.isDoubtful || false}
                  isSubmitting={diagnostic.isSubmitting}
                  onResetAnswer={diagnostic.resetCurrentAnswer}
                  onNext={diagnostic.nextQuestion}
                  onSelectQuestion={diagnostic.goToQuestion}
                  onToggleDoubtful={diagnostic.toggleDoubtful}
                  onOpenPalette={() => setIsPaletteOpen(true)}
                  onSubmit={diagnostic.submitTest}
                />
              </div>
            </div>

            {/* Modal Pop-up Daftar Nomor Soal (1-15) */}
            <QuestionPaletteModal
              isOpen={isPaletteOpen}
              onClose={() => setIsPaletteOpen(false)}
              totalQuestions={diagnostic.totalQuestions}
              currentIndex={diagnostic.currentIndex}
              answers={diagnostic.answers}
              onSelectQuestion={diagnostic.goToQuestion}
            />
          </div>
        )}

        {/* Tahap 3: Hasil / Konfirmasi Tes Selesai */}
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

              {/* Ringkasan Singkat */}
              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200/60 flex items-center justify-around">
                <div className="flex flex-col">
                  <span className="text-xs text-text-subtle font-normal font-rubik">Soal Terjawab</span>
                  <span className="text-lg font-bold text-text-main font-rubik">
                    {diagnostic.totalAnswered} / {diagnostic.totalQuestions}
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
