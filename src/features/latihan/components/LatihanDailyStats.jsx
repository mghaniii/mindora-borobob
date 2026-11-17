import React from 'react'
import Button from '../../../components/common/Button.jsx'
import iconCeklis from '../../../assets/latihan/icon-ceklis-latihan.svg'
import iconStreak from '../../../assets/latihan/icon-api-streak.svg'
import iconPetir from '../../../assets/latihan/icon-petir-poin-day.svg'
import iconJamMulai from '../../../assets/latihan/icon-jam-mulai.svg'

/**
 * Komponen LatihanDailyStats
 * Bar ringkasan statistik harian di bagian atas halaman Latihan & Kuis
 */
export function LatihanDailyStats({
  targetCompleted = 5,
  targetTotal = 8,
  streakDays = 3,
  todayXp = 80,
  onStartSelfPractice,
}) {
  return (
    <div className="w-full bg-white  p-4 sm:px-6 sm:py-3.5 border border-slate-200/70 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* 3 Metrik Statistik (Kiri) */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
        {/* Metrik 1: Target Harian */}
        <div className="flex items-center gap-3">
          <img src={iconCeklis} alt="Target Harian" className="w-10 h-10 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              Target Harian
            </span>
            <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
              {targetCompleted} / {targetTotal} Soal
            </span>
          </div>
        </div>

        {/* Pemisah Garis Vertikal */}
        <div className="hidden sm:block w-px h-8 bg-slate-200/80" />

        {/* Metrik 2: Streak Latihan */}
        <div className="flex items-center gap-3">
          <img src={iconStreak} alt="Streak Latihan" className="w-10 h-10 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              Streak Latihan
            </span>
            <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
              {streakDays} Hari
            </span>
          </div>
        </div>

        {/* Pemisah Garis Vertikal */}
        <div className="hidden sm:block w-px h-8 bg-slate-200/80" />

        {/* Metrik 3: Poin Hari Ini */}
        <div className="flex items-center gap-3">
          <img src={iconPetir} alt="Poin Hari Ini" className="w-10 h-10 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 font-sans leading-tight">
              Poin Hari Ini
            </span>
            <span className="text-sm sm:text-base font-bold text-primary font-sans">
              +{todayXp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Kanan: Mulai Latihan Mandiri (10m) menggunakan komponen Button */}
      <Button
        variant="secondary"
        size="sm"
        shape="pill"
        onClick={onStartSelfPractice}
        iconLeft={
          <img src={iconJamMulai} alt="Waktu" className="w-3.5 h-4 shrink-0" />
        }
        className="font-sans text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98]"
      >
        Mulai Latihan Mandiri (10m)
      </Button>
    </div>
  )
}

export default LatihanDailyStats

