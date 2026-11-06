import React from 'react'

/**
 * Komponen QuestionOptions (Model A: Instant Feedback)
 * Ditempatkan di Kolom Kanan Bagian Atas (y: 217, w: 492.667, h: 526, rx: 12)
 * Ketika siswa mengeklik opsi:
 * - Opsi yang salah langsung berwarna merah muda (border #FF6B6B, lingkaran merah #BA1A1A, icon silang)
 * - Opsi yang benar langsung berwarna hijau (border #10B981, lingkaran hijau #005522, icon centang)
 * Mengacu pada tata letak Design/soal 1-diagnostic.svg
 */
export default function QuestionOptions({
  options = [],
  selectedOption = null,
  correctOption = 'B',
  onSelect,
}) {
  const hasAnswered = Boolean(selectedOption)
  const isSelectedCorrect = selectedOption === correctOption

  return (
    <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-text-main text-sm sm:text-base font-bold font-rubik">
          Pilihan Jawaban
        </h3>

        {/* Badge Status Pengerjaan Real-time */}
        {hasAnswered ? (
          isSelectedCorrect ? (
            <span className="px-2.5 py-0.5 bg-[#ECFDF5] text-[#005522] border border-[#10B981]/40 text-xs font-bold rounded-full flex items-center gap-1.5 animate-in fade-in duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Jawaban Tepat!
            </span>
          ) : (
            <span className="px-2.5 py-0.5 bg-[#FFF1F2] text-[#BA1A1A] border border-[#FF6B6B]/40 text-xs font-bold rounded-full flex items-center gap-1.5 animate-in fade-in duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
              Kurang Tepat
            </span>
          )
        ) : (
          <span className="px-2.5 py-0.5 bg-[#ECEEF0] text-text-muted text-xs font-bold rounded-full">
            Pilih 1 Jawaban
          </span>
        )}
      </div>

      {/* Daftar 4 Opsi (A, B, C, D) dengan tinggi proporsional h-[52px] */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id
          const isThisCorrect = opt.id === correctOption

          // Styling dinamis sesuai Model A Figma
          let cardStyle =
            'bg-[#F8FAFC]/70 border-[#E2E8F0] hover:bg-white hover:border-primary/40 active:scale-[0.99]'
          let circleStyle =
            'bg-white border border-slate-300 text-text-muted group-hover:border-primary group-hover:text-primary'
          let textStyle = 'text-text-main'
          let badgeStatus = null

          if (hasAnswered) {
            if (isThisCorrect) {
              // Gaya Opsi Benar
              cardStyle = 'bg-[#ECFDF5]/80 border-[#10B981] shadow-xs'
              circleStyle = 'bg-[#005522] text-white shadow-xs'
              textStyle = 'text-[#005522]'
              badgeStatus = (
                <span className="px-2 py-0.5 bg-[#A7F3D0] text-[#005522] text-[11px] font-extrabold rounded-full">
                  Benar
                </span>
              )
            } else if (isSelected) {
              // Gaya Opsi Salah yang dipilih siswa
              cardStyle = 'bg-[#FFF1F2]/80 border-[#FF6B6B] shadow-xs'
              circleStyle = 'bg-[#BA1A1A] text-white shadow-xs'
              textStyle = 'text-[#BA1A1A]'
              badgeStatus = (
                <span className="px-2 py-0.5 bg-[#FF6B6B]/20 text-[#BA1A1A] text-[11px] font-extrabold rounded-full">
                  Kurang Tepat
                </span>
              )
            } else {
              // Opsi lain yang tidak dipilih saat sudah dinilai
              cardStyle = 'bg-[#F8FAFC]/40 border-slate-200/50 opacity-60'
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelect && onSelect(opt.id)}
              className={`w-full h-[52px] px-4 py-2 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-3 text-left ${
                hasAnswered ? 'cursor-default' : 'cursor-pointer group'
              } ${cardStyle}`}
            >
              {/* Sisi Kiri: Lingkaran Huruf Opsi & Angka Jawaban */}
              <div className="flex items-center gap-3">
                {/* Lingkaran Huruf (w: 32, h: 32) */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-rubik text-xs shrink-0 transition-colors ${circleStyle}`}
                >
                  {opt.id}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-base font-bold font-rubik tracking-wide ${textStyle}`}>
                    {opt.label}
                  </span>
                  {badgeStatus}
                </div>
              </div>

              {/* Sisi Kanan: Ikon Centang Hijau / Silang Merah / Lingkaran Kosong */}
              <div className="shrink-0">
                {hasAnswered && isThisCorrect ? (
                  <div className="w-6 h-6 rounded-full bg-[#005522] text-white flex items-center justify-center shadow-xs">
                    <svg
                      className="w-3.5 h-3.5 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                ) : hasAnswered && isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#BA1A1A] text-white flex items-center justify-center shadow-xs">
                    <svg
                      className="w-3.5 h-3.5 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-slate-400" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Catatan / Panduan Interaktif di Bawah Opsi */}
      <div className="w-full py-2.5 px-3.5 bg-[#ECEEF0] rounded-lg flex items-center gap-2.5 text-xs leading-snug">
        <svg
          className="w-4 h-4 text-text-subtle shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>

        <div className="flex flex-col text-text-muted">
          {!hasAnswered && (
            <span>Pilih salah satu jawaban di atas untuk melihat penilaian langsung.</span>
          )}
          {hasAnswered && isSelectedCorrect && (
            <span className="text-[#005522] font-semibold">
              Jawaban tepat! Silakan klik tombol <strong>Lanjut</strong>.
            </span>
          )}
          {hasAnswered && !isSelectedCorrect && (
            <span className="text-[#93000A] font-semibold">
              Kurang tepat. Cek langkah di kiri, lalu klik <strong>Coba Ulang</strong>.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
