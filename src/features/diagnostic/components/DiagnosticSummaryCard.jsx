import React from 'react'
import iconKekuatan from '../../../assets/riwayat-diagnotic/icon-kekuatan-utama.svg'
import iconPerluLatihan from '../../../assets/riwayat-diagnotic/icon-perlu-latihan.svg'
import iconRekomendasi from '../../../assets/riwayat-diagnotic/icon-rekomendasi-jalur.svg'

// Lingkaran skor gauge: lingkar abu-abu sebagai track + lingkar ungu sebagai
// progres mengikuti persentase skor (stroke-dasharray dinamis)
function ScoreRing({ score, maxScore }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(100, Math.round((score / maxScore) * 100))
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative w-[136px] h-[136px] shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 136 136" fill="none">
        <circle
          cx="68"
          cy="68"
          r={radius}
          stroke="var(--color-surface-muted)"
          strokeWidth="12"
        />
        <circle
          cx="68"
          cy="68"
          r={radius}
          stroke="var(--color-primary)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold font-rubik text-text-main leading-none">
          {score}
          <span className="text-lg font-bold text-text-subtle">/{maxScore}</span>
        </span>
      </div>
    </div>
  )
}

// Box Narasi: Kekuatan Utama / Perlu Latihan / Rekomendasi Jalur
function SummaryNote({
  badge,
  label,
  value,
  icon,
  tone = 'primary',
}) {
  const toneStyles = {
    primary: 'bg-primary/8',
    warning: 'bg-secondary/12',
    neutral: 'bg-surface-card',
  }
  const valueStyles = {
    primary: 'text-primary-dark',
    warning: 'text-warning',
    neutral: 'text-text-main',
  }

  return (
    <div
      className={`flex-1 min-w-0 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 ${toneStyles[tone]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-xs font-bold font-sans tracking-wide text-text-subtle uppercase">
          {badge}
        </span>
        <img src={icon} alt="" className="w-6 h-6 shrink-0 object-contain" />
      </div>
      <span className="text-sm sm:text-base font-bold font-sans text-text-main leading-snug">
        {label}
      </span>
      <span
        className={`text-sm sm:text-base font-extrabold font-sans ${valueStyles[tone]}`}
      >
        {value}
      </span>
    </div>
  )
}

/**
 * Komponen DiagnosticSummaryCard
 * Kartu ringkasan hasil diagnostik terakhir: gauge skor, status kesiapan,
 * dan tiga box narasi (kekuatan, kelemahan, rekomendasi jalur).
 */
export function DiagnosticSummaryCard({ summary }) {
  if (!summary) return null

  return (
    <section className="w-full bg-white rounded-3xl shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Kiri: Gauge Skor */}
        <ScoreRing score={summary.score} maxScore={summary.maxScore} />

        {/* Tengah: Status Kesiapan & Level */}
        <div className="flex-1 min-w-0 flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold font-sans">
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            {summary.readiness} • {summary.phase}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-rubik text-text-main">
            {summary.levelTitle}
          </h2>
          <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
            Evaluasi adaptif terakhir diselesaikan pada {summary.lastCompletedAt}.
          </p>
        </div>
      </div>

      {/* Bawah: Tiga Box Narasi */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        <SummaryNote
          badge="Kekuatan Utama"
          label={summary.strength.label}
          value={`${summary.strength.percent}% Tingkat Penguasaan`}
          icon={iconKekuatan}
          tone="primary"
        />
        <SummaryNote
          badge="Perlu Latihan"
          label={summary.weakness.label}
          value={`${summary.weakness.percent}% Tingkat Penguasaan`}
          icon={iconPerluLatihan}
          tone="warning"
        />
        <SummaryNote
          badge="Rekomendasi Jalur"
          label={summary.recommendation.label}
          value={summary.recommendation.note}
          icon={iconRekomendasi}
          tone="neutral"
        />
      </div>
    </section>
  )
}

export default DiagnosticSummaryCard
