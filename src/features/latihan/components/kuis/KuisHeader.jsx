import React from 'react'

/**
 * Header kuis: identitas fase, nomor soal, judul, timer, dan tombol akhiri.
 */
export default function KuisHeader({ phase, title, questionNumber, totalQuestions, formattedTime, onEnd }) {
  return (
    <header className="bg-white rounded-2xl px-6 sm:px-8 py-5 sm:py-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-up">
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-primary-light text-primary-dark text-xs font-bold font-rubik px-3 py-1 rounded-full">
            {phase}
          </span>
          <span className="text-xs sm:text-sm text-text-subtle font-rubik">
            Soal Nomor {questionNumber} dari {totalQuestions}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold font-rubik text-text-main leading-tight md:truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-surface-card rounded-xl px-5 py-2.5 flex items-center gap-3">
          <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2.5" />
            <path d="M9 2h6" />
          </svg>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[11px] text-text-subtle font-rubik">Sisa Waktu</span>
            <span className="text-lg font-bold font-rubik text-warning tabular-nums">{formattedTime}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEnd}
          className="bg-wrong text-danger rounded-xl px-5 py-3.5 flex items-center gap-2 text-sm font-bold font-rubik hover:brightness-95 active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Akhiri Kuis
        </button>
      </div>
    </header>
  )
}