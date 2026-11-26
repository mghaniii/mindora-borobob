import React from 'react'

export function DiagnosticStatusBar({
  questionNumber = 1,
  totalQuestions = 15,
  topic = 'ADAPTIF MATEMATIKA DASAR',
  formattedTime = '09:40',
  progressPercent = 25,
  onOpenPalette,
}) {
  return (
    <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onOpenPalette}
            className="text-text-main text-base sm:text-lg font-bold font-rubik flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group"
            title="Klik untuk memilih nomor soal langsung"
          >
            <span>Soal {questionNumber} dari {totalQuestions}</span>
            <svg
              className="w-4 h-4 text-text-subtle group-hover:text-primary transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <span className="px-3 py-0.5 bg-primary/10 text-primary-dark text-xs font-extrabold rounded-lg uppercase tracking-wider">
            {topic}
          </span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200/70 rounded-lg self-start sm:self-auto">
          <svg
            className="w-3.5 h-3.5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 15" />
          </svg>
          <span className="text-text-muted text-xs font-medium font-mono">
            Sisa Waktu : <strong className="text-text-main font-bold">{formattedTime}</strong>
          </span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}

export default function QuestionDisplay({ question, selectedAnswer = null }) {
  if (!question) return null

  const hasAnswered = Boolean(selectedAnswer?.selectedOption)
  const selectedOption = question.options?.find(
    (option) => option.id === selectedAnswer?.selectedOption,
  )

  return (
    <div className="w-full flex flex-col gap-3.5">
      <div className="w-full bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-start gap-3">
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-extrabold tracking-wider uppercase rounded-lg font-rubik">
          {question.category || 'MATEMATIKA'}
        </span>

        <div className="my-1 select-all">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-rubik text-text-main tracking-wider">
            {question.questionText}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-xs sm:text-sm font-normal">
          <svg
            className="w-4 h-4 text-slate-400 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{question.instruction}</span>
        </div>
      </div>

      {hasAnswered ? (
        <div className="w-full p-4 rounded-2xl border border-primary/20 bg-primary/10 flex items-center gap-3.5 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold font-rubik text-primary-dark">
              Jawaban tersimpan
            </span>
            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
              Kamu memilih opsi ({selectedAnswer.selectedOption}) {selectedOption?.label}. Kamu masih bisa mengubahnya sebelum mengumpulkan tes.
            </p>
          </div>
        </div>
      ) : (
        question.alertMessage && (
          <div className="w-full p-3.5 bg-wrong/40 border border-danger/20 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-danger text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-danger font-rubik uppercase tracking-wider">
                Perhatian & Fokus
              </span>
              <p className="text-xs text-danger/80 font-medium leading-relaxed mt-0.5">
                {question.alertMessage}
              </p>
            </div>
          </div>
        )
      )}

      {!hasAnswered && (
        <div className="w-full p-6 sm:p-8 bg-white/70 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <h4 className="text-sm sm:text-base font-bold font-rubik text-slate-800">
              Pembahasan dibuka setelah tes selesai
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-normal">
              Jawab secara mandiri. Kunci jawaban dan langkah penyelesaian akan tersedia setelah tes dikumpulkan.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
