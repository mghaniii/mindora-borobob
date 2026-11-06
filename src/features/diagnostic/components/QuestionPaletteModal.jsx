import React from 'react'

/**
 * Komponen QuestionPaletteModal
 * Modal pop-up daftar nomor soal 1-15 contoh agar siswa bisa melompat langsung ke soal yang diinginkan
 * Dilengkapi indikator warna status pengerjaan
 */
export default function QuestionPaletteModal({
  isOpen = false,
  onClose,
  totalQuestions = 15,
  currentIndex = 0,
  answers = {},
  onSelectQuestion,
}) {
  if (!isOpen) return null

  // Hitung statistik singkat
  const totalAnswered = Object.values(answers).filter((a) => a.selectedOption).length
  // Belum diterapkan
  const totalDoubtful = Object.values(answers).filter((a) => a.isDoubtful).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Kartu Modal Pop-up */}
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xl flex flex-col gap-5 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex flex-col">
            <h3 className="text-text-main text-lg font-bold font-rubik">
              Daftar Nomor Soal
            </h3>
            <span className="text-xs text-text-subtle font-medium mt-0.5">
              {totalAnswered} dari {totalQuestions} soal telah dijawab
              {totalDoubtful > 0 && ` • ${totalDoubtful} ragu-ragu`}
            </span>
          </div>

          {/* Tombol Tutup Silang */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-text-muted hover:text-text-main flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Grid Nomor Soal (5 Kolom x 3 Baris) */}
        <div className="grid grid-cols-5 gap-3 py-1">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionId = index + 1
            const answer = answers[questionId]
            const isAnswered = Boolean(answer?.selectedOption)
            const isMarkedDoubtful = Boolean(answer?.isDoubtful)
            const isActive = currentIndex === index

            // Status style
            let badgeStyle =
              'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'

            if (isActive) {
              badgeStyle =
                'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/40 font-bold scale-105'
            } else if (isMarkedDoubtful) {
              badgeStyle =
                'bg-amber-100 text-amber-900 border-amber-300 font-bold hover:bg-amber-200'
            } else if (isAnswered) {
              badgeStyle =
                'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold hover:bg-emerald-200'
            }

            return (
              <button
                key={questionId}
                type="button"
                onClick={() => {
                  onSelectQuestion && onSelectQuestion(index)
                  onClose && onClose()
                }}
                className={`h-11 rounded-xl border flex flex-col items-center justify-center font-rubik text-sm transition-all duration-150 cursor-pointer active:scale-95 ${badgeStyle}`}
              >
                <span>{questionId}</span>
              </button>
            )
          })}
        </div>

     

        {/* Tombol Tutup Bawah */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-text-main rounded-xl font-rubik text-sm font-semibold transition-colors cursor-pointer"
        >
          Kembali ke Soal
        </button>
      </div>
    </div>
  )
}
