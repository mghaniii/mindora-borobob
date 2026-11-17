import React from 'react'
import Button from '../../../components/common/Button.jsx'
import iconSiapEvaluasiDefault from '../../../assets/latihan/icon-siap-evaluasi-pemahaman.svg'

/**
 * Komponen KuisHarianBanner
 * Banner ajakan pengerjaan Kuis Harian Adaptif
 */
export function KuisHarianBanner({
  badge = 'Kuis Adaptif Harian',
  meta = '10 Soal • Estimasi 15 Menit',
  title = 'Siap Evaluasi Pemahaman? Lanjut ke Kuis Harian: Matriks & Determinan 2×2',
  actionLabel = 'Mulai Kuis Sekarang',
  icon = iconSiapEvaluasiDefault,
  onStartQuiz,
}) {
  return (
    <div className="w-full bg-white p-5 sm:p-6 border border-slate-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left">
      {/* Sisi Kiri: Ikon Bohlam Oranye & Teks Judul */}
      <div className="flex items-start sm:items-center gap-4">
        {/* Ikon Box Bohlam Oranye */}
        {typeof icon === 'string' ? (
          <img
            src={icon}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12  overflow-hidden shrink-0 object-contain shadow-xs"
          />
        ) : (
          <div className="shrink-0">{icon}</div>
        )}

        {/* Teks Informasi */}
        <div className="flex flex-col gap-1">
          {/* Baris Meta Badge */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-sans">
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-orange-100 text-orange-700">
              {badge}
            </span>
            <span className="text-slate-400 font-bold">•</span>
            <span className="text-slate-500 font-medium">
              {meta}
            </span>
          </div>

          {/* Judul Besar */}
          <h3 className="text-zinc-900 text-base sm:text-lg font-bold font-sans leading-snug">
            {title}
          </h3>
        </div>
      </div>

      {/* Sisi Kanan: Tombol Aksi Kapsul Oranye menggunakan komponen Button */}
      <Button
        variant="secondary"
        size="md"
        shape="pill"
        withArrow={true}
        onClick={onStartQuiz}
        className="w-full md:w-auto font-sans text-sm font-bold shadow-xs active:scale-[0.98] shrink-0"
      >
        {actionLabel}
      </Button>
    </div>
  )
}

export default KuisHarianBanner

