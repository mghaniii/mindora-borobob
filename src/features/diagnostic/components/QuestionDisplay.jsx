import React from 'react'

/**
 * Komponen DiagnosticStatusBar
 * Baris status pengerjaan Full-Width di bagian atas
 * Mengacu pada koordinat y: 95, w: 1216, h: 98 pada Design/soal 1-diagnostic.svg
 */
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
        {/* Sisi Kiri: Nomor Soal (Dapat Diklik untuk Quick Jump) & Badge Topik */}
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

          <span className="px-3 py-0.5 bg-[#6C5CE7]/20 text-[#07006C] text-xs font-extrabold rounded-[8px] uppercase tracking-wider">
            {topic}
          </span>
        </div>

        {/* Sisi Kanan: Stopwatch Sisa Waktu */}
        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200/70 rounded-lg self-start sm:self-auto">
          {/* Ikon Stopwatch */}
          <svg
            className="w-3.5 h-3.5 text-[#3525CD]"
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

      {/* Progress Bar Linear (Lebar penuh, tinggi 8px) */}
      <div className="w-full h-2 bg-[#ECEEF0] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Komponen QuestionDisplay
 * Kolom Kiri: Menampilkan Kartu Soal Utama, Alert / Feedback Banner, 3 Langkah Bersusun, Hasil Akhir Terpisah, dan Trik Mental
 * Mengacu presisi pada Design/Section - LeftColumnContent-soal-dan step.png
 */
export default function QuestionDisplay({ question, selectedAnswer = null }) {
  if (!question) return null

  const hasAnswered = Boolean(selectedAnswer?.selectedOption)
  const isCorrect = selectedAnswer?.selectedOption === question.correctOption
  const selectedOptObj = question.options?.find(
    (o) => o.id === selectedAnswer?.selectedOption
  )

  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* 1. Kartu Soal Utama */}
      <div className="w-full bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-start gap-3">
        {/* Badge Kategori */}
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-extrabold tracking-wider uppercase rounded-lg font-rubik">
          {question.category || 'PERKALIAN'}
        </span>

        {/* Persamaan Matematika Besar */}
        <div className="my-1 select-all">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-rubik text-text-main tracking-wider">
            {question.questionText}
          </h2>
        </div>

        {/* Instruksi Pengerjaan */}
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

      {/* 2. Banner Feedback Jawaban (Jika Sudah Menjawab) ATAU Alert Info Fokus (Sebelum Menjawab) */}
      {hasAnswered ? (
        <div
          className={`w-full p-4 rounded-2xl border flex items-center gap-3.5 shadow-xs transition-all ${
            isCorrect
              ? 'bg-[#ECFDF5] border-[#10B981]/50'
              : 'bg-[#FFF1F2] border-[#FF6B6B]/50'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 font-bold ${
              isCorrect ? 'bg-[#10B981]' : 'bg-[#BA1A1A]'
            }`}
          >
            {isCorrect ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xs sm:text-sm font-bold font-rubik ${
                isCorrect ? 'text-[#064E3B]' : 'text-[#881337]'
              }`}
            >
              {isCorrect
                ? 'Jawaban Tepat — Analisis Sempurna!'
                : 'Jawaban Belum Tepat'}
            </span>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {isCorrect ? (
                <>
                  Kamu memilih opsi{' '}
                  <strong className="text-slate-900 underline">
                    ({selectedAnswer.selectedOption}) {selectedOptObj?.label}
                  </strong>
                  . Pilihan kamu tepat! Simak cara penyelesaian perkalian bersusun di bawah.
                </>
              ) : (
                <>
                  Kamu memilih opsi ({selectedAnswer.selectedOption}). Simak cara penyelesaian bersusun di bawah untuk memahami langkah yang benar.
                </>
              )}
            </p>
          </div>
        </div>
      ) : (
        question.alertMessage && (
          <div className="w-full p-3.5 bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#BA1A1A] text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#93000A] font-rubik uppercase tracking-wider">
                Perhatian & Fokus
              </span>
              <p className="text-xs text-[#93000A] font-medium leading-relaxed mt-0.5">
                {question.alertMessage}
              </p>
            </div>
          </div>
        )
      )}

      {/* 3, 4, 5, 6. Langkah Penyelesaian, Hasil Akhir, dan Trik Mental (Hanya terbuka setelah pengguna menjawab) */}
      {hasAnswered ? (
        <div className="flex flex-col gap-3.5 animate-in fade-in duration-300">
          {/* Header Bagian Cara Penyelesaian Bersusun */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {/* Ikon Baris Bersusun */}
              <svg
                className="w-5 h-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <h3 className="text-text-main text-sm sm:text-base font-extrabold font-rubik tracking-tight uppercase">
                {question.stepsHeader || 'CARA PENYELESAIAN BERSUSUN'}
              </h3>
            </div>

            <span className="px-3 py-1 bg-[#F3F0FF] text-[#5341CD] text-xs font-bold rounded-lg font-rubik">
              {question.stepsBadge || 'Langkah demi Langkah'}
            </span>
          </div>

          {/* Tiga Langkah Penyelesaian (Step 1, Step 2, Step 3) */}
          <div className="flex flex-col gap-3">
            {question.steps?.map((st) => (
              <div
                key={st.step}
                className="w-full bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-slate-300"
              >
                {/* Lingkaran Nomor Langkah */}
                <div className="w-7 h-7 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center text-xs font-extrabold font-rubik shrink-0 mt-0.5">
                  {st.step}
                </div>

                {/* Konten Langkah */}
                <div className="flex-1 flex flex-col gap-1">
                  {/* Baris Judul & Formula/Subtitle */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-[#4338CA] font-rubik">
                      {st.title}
                    </span>
                    {st.formula && (
                      <>
                        <span className="text-slate-300 font-bold">•</span>
                        <span className="text-xs sm:text-sm font-medium text-slate-500 font-mono">
                          {st.formula}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Penjelasan Langkah */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {st.description || st.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* HASIL AKHIR (Terpisah Berdiri Sendiri di Bawah Langkah 3) */}
          {question.finalResult && (
            <div className="w-full bg-correct-light border border-[#10B981]/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 sm:gap-3.5">
                {/* Lingkaran Centang Hijau Tua */}
                <div className="w-8 h-8 rounded-full bg-[#005522] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                {/* Teks Hasil Akhir */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-[#005522] font-rubik uppercase tracking-wider">
                    HASIL AKHIR
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold font-rubik text-slate-900 tracking-tight">
                    {question.finalResult.equation}
                  </span>
                </div>
              </div>

              {/* Badge Jawaban Benar Opsi di Sisi Kanan */}
              <div className="px-3.5 py-1.5 bg-[#005522] text-white text-xs font-bold rounded-full shadow-xs whitespace-nowrap font-rubik">
                {question.finalResult.correctOptionLabel ||
                  `Jawaban Benar: Opsi ${question.correctOption}`}
              </div>
            </div>
          )}

          {/* Kartu Trik Mental / Hitung Cepat */}
          {question.hint && (
            <div className="w-full p-4 sm:p-4.5 bg-[#F8FAFD] border border-slate-200/80 rounded-2xl flex items-start gap-3.5 shadow-xs">
              {/* Ikon Bohlam */}
              <div className="w-8 h-8 rounded-xl bg-[#6C5CE7]/15 text-[#5341CD] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 17h4v1h-4v-1zm1-15c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 18h2v1h-2v-1z" />
                </svg>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-rubik">
                    Trik Mental / Hitung Cepat
                  </span>
                  {question.hintTag && (
                    <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[11px] font-medium rounded-md font-rubik">
                      {question.hintTag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {question.hint}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* State Terkunci: Ditampilkan sebelum pengguna memilih jawaban */
        <div className="w-full p-6 sm:p-8 bg-white/70 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {/* Ikon Gembok Rapi */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <h4 className="text-sm sm:text-base font-bold font-rubik text-slate-800">
              Langkah Penyelesaian Terkunci
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Pilih salah satu jawaban di kolom sebelah kanan terlebih dahulu untuk membuka pembahasan langkah bersusun, hasil akhir, dan trik hitung cepatnya.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-full font-rubik mt-1">
            <span>Uji kemampuanmu secara mandiri</span>
          </div>
        </div>
      )}
    </div>
  )
}
