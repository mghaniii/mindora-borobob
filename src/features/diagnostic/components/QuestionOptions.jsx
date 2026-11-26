import React from 'react'

export default function QuestionOptions({
  options = [],
  selectedOption = null,
  onSelect,
}) {
  const hasAnswered = Boolean(selectedOption)

  return (
    <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-text-main text-sm sm:text-base font-bold font-rubik">
          Pilihan Jawaban
        </h3>
        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${hasAnswered ? 'bg-primary/10 text-primary-dark' : 'bg-slate-100 text-text-muted'}`}>
          {hasAnswered ? 'Jawaban Tersimpan' : 'Pilih 1 Jawaban'}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {options.map((option) => {
          const isSelected = selectedOption === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect && onSelect(option.id)}
              aria-pressed={isSelected}
              className={`w-full h-[52px] px-4 py-2 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.99] ${
                isSelected
                  ? 'bg-primary/10 border-primary shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-rubik text-xs shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-white border border-slate-300 text-text-muted'}`}>
                  {option.id}
                </div>
                <span className={`text-base font-bold font-rubik tracking-wide ${isSelected ? 'text-primary-dark' : 'text-text-main'}`}>
                  {option.label}
                </span>
              </div>
              <div className={`w-4 h-4 rounded-full border ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}`} />
            </button>
          )
        })}
      </div>

      <div className="w-full py-2.5 px-3.5 bg-slate-100 rounded-lg flex items-center gap-2.5 text-xs leading-snug">
        <svg className="w-4 h-4 text-text-subtle shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="text-text-muted">
          {hasAnswered
            ? 'Kamu dapat memilih opsi lain sebelum mengumpulkan tes.'
            : 'Pilih satu jawaban. Penilaian dan pembahasan muncul setelah tes selesai.'}
        </span>
      </div>
    </div>
  )
}
