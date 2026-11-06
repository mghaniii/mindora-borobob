import React from 'react'
import Button from '../../../components/common'

export function WelcomeBanner({
  name = 'Budi',
  currentTopic = 'Operasi Hitung Campuran',
  targetPercentage = 68,
  spentMinutes = 14,
  totalTargetMinutes = 20,
  onContinue,
}) {
  // Perhitungan lingkaran SVG (r = 38, keliling = 2 * PI * 38 ≈ 238.76)
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (targetPercentage / 100) * circumference

  return (
    <div className="w-full p-6 sm:p-8 bg-primary rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden relative">
      {/* Dekorasi efek cahaya latar belakang */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Teks sebelah kiri & tombol aksi */}
      <div className="flex-1 flex flex-col items-start gap-3 z-10">
        <h1 className="text-white text-2xl sm:text-3xl font-bold font-sans tracking-tight">
          Halo, {name}! 👋
        </h1>
        <p className="text-indigo-100 text-sm font-normal max-w-md leading-relaxed">
          Lanjutkan perjalanan matematikamu hari ini di topik
          <br />
          <span className="text-white font-semibold">
            {currentTopic}
          </span>
          .
        </p>
        <div className="pt-2">
          <Button
            variant="white"
            size="md"
            withArrow
            onClick={onContinue}
          >
            Lanjut Belajar
          </Button>
        </div>
      </div>

      {/* Widget pengukur progres sebelah kanan */}
      <div className="w-full sm:w-auto min-w-[180px] p-4 bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl flex flex-col items-center justify-center gap-2 z-10 self-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
            {/* Lingkaran latar belakang */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-white/20"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Lingkaran progres */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-secondary transition-all duration-700 ease-out"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Teks tengah persentase */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-white text-xl font-bold font-sans leading-none">
              {targetPercentage}%
            </span>
            <span className="text-indigo-100 text-[9px] font-normal mt-1 leading-tight">
              Target Hari Ini
            </span>
          </div>
        </div>

        {/* Info menit belajar */}

        <div className="text-white text-xs font-medium tracking-wide">
          {spentMinutes} / {totalTargetMinutes} Menit
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
