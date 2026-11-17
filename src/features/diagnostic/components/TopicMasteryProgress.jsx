import React from 'react'

// Satu baris penguasaan topik: label + status + persentase + progress bar
function MasteryRow({ label, percent, status, tone }) {
  const barTone = tone === 'warning' ? 'bg-secondary' : 'bg-primary'
  const statusTone = tone === 'warning' ? 'text-warning bg-secondary/12' : 'text-primary bg-primary/10'

  return (
    <div className="flex flex-col gap-2 py-4 border-b border-surface-muted last:border-b-0">
      {/* Atas: Label kiri & status/percent kanan */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${barTone}`} />
          <span className="text-sm sm:text-base font-semibold font-sans text-text-main leading-snug">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans ${statusTone}`}>
            {status}
          </span>
          <span className="text-base font-extrabold font-rubik text-text-main tabular-nums w-10 text-right">
            {percent}%
          </span>
        </div>
      </div>
      {/* Bawah: Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-surface-card overflow-hidden">
        <div
          className={`h-full rounded-full ${barTone} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Komponen TopicMasteryProgress
 * Kartu tren penguasaan topik matematika per standar capaian pembelajaran.
 */
export function TopicMasteryProgress({ mastery, onOpenAnalysis = null }) {
  if (!mastery) return null

  return (
    <section className="w-full bg-white rounded-3xl shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col gap-2">
      {/* Header: Judul & Badge Semester */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg sm:text-xl font-bold font-rubik text-text-main">
            Tren Penguasaan Topik Matematika
          </h2>
          <p className="text-xs sm:text-sm text-text-subtle font-sans">
            {mastery.standard}
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-surface-card text-text-muted text-xs font-bold font-sans shrink-0">
          {mastery.semester}
        </span>
      </div>

      {/* Daftar Baris Penguasaan */}
      <div className="flex flex-col">
        {mastery.items.map((item) => (
          <MasteryRow
            key={item.id}
            label={item.label}
            percent={item.percent}
            status={item.status}
            tone={item.tone}
          />
        ))}
      </div>

      {/* Footer: Catatan Kalibrasi & Link Analisis Detail */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4">
        <p className="text-xs text-text-subtle font-sans">
          {mastery.calibratedNote}
        </p>
        {onOpenAnalysis && (
          <button
            type="button"
            onClick={onOpenAnalysis}
            className="self-start sm:self-auto text-primary text-xs sm:text-sm font-bold font-sans hover:text-primary-dark transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            Lihat Analisis Detail Diagnostik
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}

export default TopicMasteryProgress
