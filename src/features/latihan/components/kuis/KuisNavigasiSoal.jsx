import React from 'react'

const CIRCLE_STYLES = {
  active: 'bg-primary text-white shadow-md ring-2 ring-primary/30',
  doubtful: 'bg-secondary/20 text-warning hover:bg-secondary/30',
  answered: 'bg-surface-card text-primary-dark hover:bg-surface-muted',
  empty: 'bg-surface-card text-text-muted hover:bg-surface-muted',
}

/**
 * Palet navigasi nomor soal + legenda status (kolom kanan desain).
 */
export default function KuisNavigasiSoal({ questions, currentIndex, answers, onSelectQuestion }) {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-xs animate-fade-up" style={{ animationDelay: '120ms' }}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-rubik font-bold text-lg text-text-main">Navigasi Soal</h2>
        <span className="bg-surface-card rounded-lg px-2.5 py-1 text-xs font-bold font-mono text-text-muted">
          {questions.length} Soal
        </span>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-3 justify-items-center">
        {questions.map((question, index) => {
          const answer = answers[question.id]
          const state =
            index === currentIndex
              ? 'active'
              : answer?.isDoubtful
                ? 'doubtful'
                : answer?.selectedOption
                  ? 'answered'
                  : 'empty'
          const dotClass = answer?.isDoubtful
            ? 'bg-secondary'
            : answer?.selectedOption
              ? 'bg-primary'
              : null
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelectQuestion(index)}
              aria-label={`Soal nomor ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              className={`relative w-12 h-12 rounded-full font-rubik font-bold text-sm transition-all cursor-pointer active:scale-95 ${CIRCLE_STYLES[state]}`}
            >
              {String(index + 1).padStart(2, '0')}
              {dotClass && (
                <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${dotClass}`} />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-surface-border grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-text-muted font-rubik">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary shrink-0" /> Sedang Aktif
        </span>
        <span className="flex items-center gap-2">
          <span className="relative w-3 h-3 rounded-full bg-surface-muted shrink-0">
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </span>
          Sudah Terjawab
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary shrink-0" /> Ragu-ragu
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-surface-muted shrink-0" /> Belum Dijawab
        </span>
      </div>
    </section>
  )
}