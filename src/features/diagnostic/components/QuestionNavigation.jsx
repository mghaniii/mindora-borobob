import React from 'react'

/**
 * Komponen QuestionNavigation (Konsep Baru: Inline Direct Stepper)
 * Sesuai referensi visual: Design/Action & Next Navigation-diagnostic.png
 *
 * Fitur:
 * 1. Tombol "Coba Ulang" & "Lanjut ke Soal {N} ->"
 * 2. Baris judul: "NAVIGASI LANGSUNG SOAL"
 * 3. Deretan nomor soal langsung (1, 2, 3, ...) tanpa perlu membuka modal
 * 4. Status visual instan:
 *    - Salah: latar merah muda lembut + angka dengan tanda silang (misal "1✕")
 *    - Benar: latar hijau muda + angka dengan tanda centang (misal "1✓")
 *    - Aktif: border/ring ungu fokus
 *    - Belum dijawab: latar abu-abu netral (#ECEEF0)
 */
export default function QuestionNavigation({
  currentIndex = 0,
  totalQuestions = 15,
  questions = [],
  answers = {},
  isSubmitting = false,
  onResetAnswer,
  onNext,
  onSelectQuestion,
  onSubmit,
}) {
  const isLastQuestion = currentIndex === totalQuestions - 1
  const nextQuestionNumber = currentIndex + 2

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
      {/* 1. Baris Tombol Aksi Utama: Coba Ulang & Lanjut ke Soal N */}
      <div className="grid grid-cols-2 gap-3">
        {/* Tombol Coba Ulang */}
        <button
          type="button"
          onClick={onResetAnswer}
          className="w-full h-10 px-4 bg-[#ECEEF0] text-[#191C1E] rounded-xl font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:bg-slate-300/80 active:scale-[0.98] cursor-pointer"
        >
          {/* Ikon Refresh */}
          <svg
            className="w-4 h-4 text-[#191C1E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Coba Ulang</span>
        </button>

        {/* Tombol Lanjut ke Soal N -> / Kumpulkan */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={isLastQuestion ? onSubmit : onNext}
          className="w-full h-10 px-4 bg-primary text-white rounded-xl font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:bg-primary-dark active:scale-[0.98] cursor-pointer shadow-xs disabled:opacity-50"
        >
          <span>
            {isLastQuestion ? 'Kumpulkan' : `Lanjut ke Soal ${nextQuestionNumber}`}
          </span>
          {/* Ikon Panah Kanan Sesuai Desain */}
          <svg
            className="w-4 h-4 text-white shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* 2. Bagian Navigasi Langsung Soal */}
      <div className="flex flex-col gap-2 pt-0.5">
        <span className="text-[10px] sm:text-[11px] font-extrabold font-rubik tracking-wider text-[#191C1E]/80 uppercase">
          NAVIGASI LANGSUNG SOAL
        </span>

        {/* Deretan Nomor Soal Horizontal (Scrollable jika melebihi lebar kontainer) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNumber = index + 1
            const questionData = questions[index] || {}
            const questionId = questionData.id || questionNumber
            const answer = answers[questionId]
            const isAnswered = Boolean(answer?.selectedOption)

            
            // Cek apakah jawaban benar / salah
            const correctOption = questionData.correctOption || 'B'
            const isCorrect = isAnswered && answer.selectedOption === correctOption
            const isWrong = isAnswered && answer.selectedOption !== correctOption
            const isCurrent = currentIndex === index

            // Tentukan style badge nomor berdasarkan state
            let buttonStyle = 'bg-[#ECEEF0] text-[#191C1E] hover:bg-slate-300/80'

            if (isWrong) {
              buttonStyle = 'bg-wrong text-[#D92D20] font-bold hover:bg-[#FFDFDF]'
            } else if (isCorrect) {
              buttonStyle = 'bg-correct-light text-[#191C1E] font-bold hover:bg-[#D1FAE5]'
            }

            return (
              <button
                key={questionNumber}
                type="button"
                onClick={() => onSelectQuestion && onSelectQuestion(index)}
                className={`h-9.5 min-w-[56px] sm:min-w-[64px] flex-1 px-2.5 rounded-lg font-rubik text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-all duration-150 cursor-pointer active:scale-95 ${buttonStyle} ${
                  isCurrent ? 'bg-slate-300/80 shadow-xs' : ''
                }`}
                title={`Pilih Soal Nomor ${questionNumber}`}
              >
                <span>{questionNumber}</span>
                {isWrong && <span className="text-[11px] font-black">✕</span>}
                {isCorrect && <span className="text-[11px] font-black">✓</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// =========================================================================================
// KODE LAMA QUESTION NAVIGATION (DISIMPAN SEBAGAI ARSIP / BACKUP, JANGAN DIHAPUS)
// Konsep: Tombol Pop-up Modal Palet Soal & Tombol Tandai Ragu-ragu
// -----------------------------------------------------------------------------------------
// export function QuestionNavigationLegacy({
//   currentIndex = 0,
//   totalQuestions = 15,
//   isDoubtful = false,
//   isSubmitting = false,
//   onResetAnswer,
//   onNext,
//   onToggleDoubtful,
//   onOpenPalette,
//   onSubmit,
// }) {
//   const isLastQuestion = currentIndex === totalQuestions - 1
// 
//   return (
//     <div className="w-full bg-white rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col gap-4">
//       {/* 1. Baris Tombol Utama: Coba Ulang & Lanjut */}
//       <div className="grid grid-cols-2 gap-3.5">
//         <button
//           type="button"
//           onClick={onResetAnswer}
//           className="w-full h-11 px-4 bg-[#ECEEF0] text-[#191C1E] rounded-lg font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:bg-slate-300/80 active:scale-[0.98] cursor-pointer"
//         >
//           <svg
//             className="w-4 h-4 text-text-muted"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2.2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//             />
//           </svg>
//           <span>Coba Ulang</span>
//         </button>
// 
//         <button
//           type="button"
//           disabled={isSubmitting}
//           onClick={isLastQuestion ? onSubmit : onNext}
//           className="w-full h-11 px-4 bg-primary text-white rounded-lg font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:bg-primary-dark active:scale-[0.98] cursor-pointer shadow-xs disabled:opacity-50"
//         >
//           <span>{isLastQuestion ? 'Kumpulkan' : 'Lanjut'}</span>
//           <svg
//             className="w-4 h-4 text-white shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="5" y1="12" x2="19" y2="12" />
//             <polyline points="12 5 19 12 12 19" />
//           </svg>
//         </button>
//       </div>
// 
//       {/* 2. Baris Tombol Aksi Tambahan: Ragu-ragu & Buka Daftar Soal */}
//       <div className="grid grid-cols-3 gap-2.5 pt-1">
//         <button
//           type="button"
//           onClick={onToggleDoubtful}
//           className={`h-10 px-2 rounded-lg text-xs font-bold font-rubik flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
//             isDoubtful
//               ? 'bg-[#BA1A1A] text-white shadow-xs'
//               : 'bg-[#FF6B6B]/20 text-[#BA1A1A] hover:bg-[#FF6B6B]/30'
//           }`}
//           title="Tandai ragu-ragu untuk soal ini"
//         >
//           <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
//             <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
//           </svg>
//           <span>{isDoubtful ? 'Batal Ragu' : 'Ragu'}</span>
//         </button>
// 
//         <button
//           type="button"
//           onClick={onOpenPalette}
//           className="col-span-2 h-10 px-3 rounded-lg bg-[#ECEEF0] hover:bg-slate-300/80 text-text-main text-xs font-bold font-rubik flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
//           title="Buka daftar nomor soal untuk memilih langsung"
//         >
//           <svg
//             className="w-4 h-4 text-primary"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2.2"
//           >
//             <rect x="3" y="3" width="7" height="7" rx="1.5" />
//             <rect x="14" y="3" width="7" height="7" rx="1.5" />
//             <rect x="3" y="14" width="7" height="7" rx="1.5" />
//             <rect x="14" y="14" width="7" height="7" rx="1.5" />
//           </svg>
//           <span>Pilih Nomor Soal ({currentIndex + 1}/{totalQuestions})</span>
//         </button>
//       </div>
//     </div>
//   )
// }
// =========================================================================================
