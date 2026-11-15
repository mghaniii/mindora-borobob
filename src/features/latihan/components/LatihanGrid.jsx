import React from 'react'
import { LatihanCard } from './LatihanCard.jsx'

/**
 * Komponen LatihanGrid
 * Grid penampung kartu latihan (2 Kolom x 2 Baris)
 */
export function LatihanGrid({ items = [], onAction }) {
  if (items.length === 0) {
    return (
      <div className="w-full py-16 bg-white rounded-3xl border border-slate-200/80 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl">
          📝
        </div>
        <h3 className="text-base font-bold font-sans text-slate-800">
          Belum ada latihan pada topik ini
        </h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Pilih topik lainnya atau kembali ke "Semua Topik SMA 11" untuk melihat daftar lengkap.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
      {items.map((item) => (
        <LatihanCard
          key={item.id}
          title={item.title}
          description={item.description}
          questionsCount={item.questionsCount}
          questionsLabel={item.questionsLabel}
          durationMinutes={item.durationMinutes}
          xpReward={item.xpReward}
          tag={item.tag}
          icon={item.icon}
          iconType={item.iconType}
          actionButton={item.actionButton}
          onAction={() => onAction && onAction(item)}
        />
      ))}
    </div>
  )
}

export default LatihanGrid

