import React, { useEffect } from 'react'

/**
 * Konfirmasi sebelum mengakhiri kuis lebih awal.
 */
export default function KuisConfirmModal({ isOpen, answeredCount, totalQuestions, onCancel, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  const unanswered = totalQuestions - answeredCount

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Tutup konfirmasi"
        onClick={onCancel}
        className="absolute inset-0 bg-shadow/40 backdrop-blur-[2px] cursor-default"
      />
      <dialog
        open
        aria-modal="true"
        aria-label="Konfirmasi akhiri kuis"
        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-xl flex flex-col gap-5 animate-fade-up"
      >
        <div className="w-14 h-14 rounded-full bg-wrong text-danger flex items-center justify-center">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-rubik text-xl font-extrabold text-text-main">Akhiri Kuis Sekarang?</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Jawaban yang sudah tersimpan akan dinilai apa adanya. Kamu masih bisa mengulang kuis ini setelah melihat hasil.
          </p>
        </div>

        <div className="bg-surface-card rounded-xl px-4 py-3 flex items-center justify-between text-sm font-rubik">
          <span className="text-text-muted">Soal terjawab</span>
          <span className="font-bold text-text-main tabular-nums">
            {answeredCount} / {totalQuestions}
          </span>
        </div>
        {unanswered > 0 && (
          <p className="text-xs font-semibold text-warning -mt-2">
            {unanswered} soal belum dijawab dan akan dihitung salah.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full bg-surface-card py-3 text-sm font-bold font-rubik text-text-main hover:bg-surface-muted active:scale-[0.98] transition-all cursor-pointer"
          >
            Lanjut Mengerjakan
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-danger py-3 text-sm font-bold font-rubik text-white hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            Akhiri & Lihat Hasil
          </button>
        </div>
      </dialog>
    </div>
  )
}