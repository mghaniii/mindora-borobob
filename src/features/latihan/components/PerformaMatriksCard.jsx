import React from 'react'

/**
 * Komponen PerformaMatriksCard
 * Widget statistik performa materi matriks di bagian bawah halaman
 */
export function PerformaMatriksCard({
  accuracy = { label: 'Rata-Rata Akurasi', value: '88%', growth: '+6%' },
  speed = { label: 'Kecepatan Rata-Rata', value: '1m 15s', unit: '/ soal' },
  readiness = { label: 'Kesiapan Bab', value: '82%', statusBadge: 'Siap' },
}) {
  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/70 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-left">
      {/* Sisi Kiri: Ikon & Label Performa */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-violet-100 text-primary flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <h3 className="text-zinc-900 text-base font-bold font-sans tracking-tight">
          Performa Matriks
        </h3>
      </div>

      {/* Sisi Kanan: 3 Indikator Statistik */}
      <div className="flex items-center gap-6 sm:gap-10 flex-wrap">
        {/* Indikator 1: Rata-Rata Akurasi */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 text-primary flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              {accuracy.label}
            </span>
            <div className="flex items-baseline gap-1 font-sans">
              <span className="text-sm sm:text-base font-bold text-zinc-900">
                {accuracy.value}
              </span>
              {accuracy.growth && (
                <span className="text-xs font-bold text-emerald-600">
                  ({accuracy.growth})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Indikator 2: Kecepatan Rata-Rata */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 14 10" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              {speed.label}
            </span>
            <div className="flex items-baseline gap-1 font-sans">
              <span className="text-sm sm:text-base font-bold text-zinc-900">
                {speed.value}
              </span>
              {speed.unit && (
                <span className="text-xs font-normal text-slate-500">
                  {speed.unit}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Indikator 3: Kesiapan Bab */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 text-primary flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              {readiness.label}
            </span>
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-sm sm:text-base font-bold text-primary">
                {readiness.value}
              </span>
              {readiness.statusBadge && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-violet-100 text-primary">
                  {readiness.statusBadge}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformaMatriksCard

