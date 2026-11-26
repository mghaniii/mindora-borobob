import React from 'react'
import Button from '../../../../components/common/Button.jsx'

export default function KuisActionBar({
  currentIndex,
  totalQuestions,
  isDoubtful,
  isSubmitting = false,
  submitError = '',
  onPrev,
  onToggleDoubtful,
  onNext,
  onRetrySubmit,
}) {
  const isLast = currentIndex >= totalQuestions - 1

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-2xl shadow-md px-4 py-3 flex items-center justify-between gap-3 flex-wrap animate-fade-up" style={{ animationDelay: '240ms' }}>
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0 || isSubmitting}
          className="bg-surface-card rounded-full px-6 py-3 flex items-center gap-2 text-sm font-bold font-rubik text-text-main hover:bg-surface-muted active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m6 6l-6-6 6-6" />
          </svg>
          Soal Sebelumnya
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <label className={`bg-surface-card rounded-full px-4 py-2.5 flex items-center gap-2.5 select-none text-sm font-semibold font-rubik text-text-main transition-colors ${isSubmitting ? 'opacity-50' : 'cursor-pointer hover:bg-surface-muted'}`}>
            <input
              type="checkbox"
              checked={isDoubtful}
              onChange={onToggleDoubtful}
              disabled={isSubmitting}
              className="w-4 h-4 accent-primary cursor-pointer disabled:cursor-not-allowed"
            />
            Tandai ragu-ragu
          </label>

          <Button
            variant="secondary"
            size="md"
            shape="pill"
            onClick={onNext}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            iconRight={
              !isSubmitting && (isLast ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              ))
            }
            className="font-bold shadow-xs"
          >
            {isSubmitting ? 'Mengirim Jawaban' : isLast ? 'Selesaikan Kuis' : 'Simpan & Lanjut'}
          </Button>
        </div>
      </div>

      {submitError && (
        <div className="rounded-2xl bg-wrong p-4 flex items-center justify-between gap-3 text-sm text-danger" role="alert">
          <span>{submitError}</span>
          <button
            type="button"
            onClick={onRetrySubmit}
            disabled={isSubmitting}
            className="shrink-0 font-bold text-primary hover:text-primary-dark cursor-pointer disabled:opacity-50"
          >
            Kirim ulang
          </button>
        </div>
      )}
    </div>
  )
}
