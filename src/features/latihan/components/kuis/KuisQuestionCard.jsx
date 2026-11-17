import React from 'react'

const DIFFICULTY = {
  mudah: { label: 'Tingkat Mudah', className: 'text-primary' },
  menengah: { label: 'Tingkat Menengah', className: 'text-warning' },
  sulit: { label: 'Tingkat Sulit', className: 'text-danger' },
}

/** Teks soal dengan sorotan variabel: {ungu} dan ~oranye~. */
function RichText({ text }) {
  const parts = String(text).split(/(\{[^}]*\}|~[^~]*~)/g)
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span key={i} className="font-semibold text-primary">
          {part.slice(1, -1)}
        </span>
      )
    }
    if (part.startsWith('~') && part.endsWith('~')) {
      return (
        <span key={i} className="font-semibold text-warning">
          {part.slice(1, -1)}
        </span>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function MatrixBlock({ label, rows }) {
  const cols = rows[0]?.length ?? 2
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="font-rubik text-lg font-bold italic text-text-main">{label} =</span>
      )}
      <div className="flex items-stretch">
        <span className="w-2.5 rounded-l-sm border-y-[3px] border-l-[3px] border-text-main" />
        <div
          className="grid gap-x-7 gap-y-2 px-3 py-2 font-rubik text-lg font-bold text-text-main tabular-nums"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(1.5rem, auto))` }}
        >
          {rows.flat().map((value, i) => (
            <span key={i} className="text-center">
              {value}
            </span>
          ))}
        </div>
        <span className="w-2.5 rounded-r-sm border-y-[3px] border-r-[3px] border-text-main" />
      </div>
    </div>
  )
}

function MatrixVisual({ visual }) {
  if (!visual?.matrices?.length) return null
  return (
    <div className="mt-6 bg-surface-card rounded-2xl px-6 py-8 flex items-center justify-center gap-5 sm:gap-7 flex-wrap">
      {visual.matrices.map((matrix, i) => (
        <React.Fragment key={matrix.label ?? i}>
          {i > 0 && visual.operator && (
            <span className="text-2xl font-bold text-text-subtle font-rubik">{visual.operator}</span>
          )}
          <MatrixBlock label={matrix.label} rows={matrix.rows} />
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * Kartu soal: nomor, tingkat kesulitan, bobot, teks soal, visual matriks,
 * dan pilihan jawaban A-D inline (sesuai Design/kuis-design-dekstop.png).
 */
export default function KuisQuestionCard({ question, questionNumber, selectedOption, onSelect }) {
  const difficulty = DIFFICULTY[question.difficulty] ?? DIFFICULTY.menengah

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-up" style={{ animationDelay: '60ms' }}>
      <div className="flex items-center gap-4 flex-wrap">
        <span className="bg-primary text-white text-xs font-bold font-rubik tracking-wider px-4 py-2 rounded-full">
          NOMOR {String(questionNumber).padStart(2, '0')}
        </span>
        <span className={`text-xs sm:text-sm font-bold font-rubik tracking-wide uppercase ${difficulty.className}`}>
          {difficulty.label}
        </span>
        <span className="ml-auto text-xs sm:text-sm text-text-subtle font-rubik">
          Bobot: {question.points} Poin
        </span>
      </div>

      <div className="border-b border-surface-border mt-5 mb-6" />

      <p className="text-base sm:text-lg text-text-main leading-relaxed font-sans">
        <RichText text={question.text} />
      </p>

      <MatrixVisual visual={question.visual} />

      <p className="mt-7 text-xs font-bold font-rubik tracking-widest text-text-muted uppercase">
        Pilih salah satu jawaban:
      </p>

      <div className="mt-3 flex flex-col gap-3.5">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option.id)}
              className={`w-full rounded-2xl border px-5 py-4 flex items-center gap-4 text-left transition-all duration-150 cursor-pointer active:scale-[0.99] ${
                isSelected
                  ? 'bg-primary-light border-primary shadow-xs'
                  : 'bg-surface-card border-transparent hover:bg-surface-muted/60'
              }`}
            >
              <span
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-rubik font-bold text-base transition-colors ${
                  isSelected ? 'bg-primary text-white' : 'bg-white text-text-main shadow-2xs'
                }`}
              >
                {option.id}
              </span>
              <span
                className={`flex-1 font-rubik font-bold text-base ${
                  isSelected ? 'text-primary-dark' : 'text-text-main'
                }`}
              >
                {option.label}
              </span>
              {isSelected ? (
                <span className="w-7 h-7 shrink-0 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              ) : (
                <span className="w-6 h-6 shrink-0 rounded-full bg-surface-muted" />
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}