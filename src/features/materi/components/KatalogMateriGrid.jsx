import React from 'react'
import { KatalogMateriCard } from './KatalogMateriCard.jsx'

/**
 * Komponen KatalogMateriGrid
 * Grid penampung 6 kartu materi
 * Sesuai rencana.md dan Design/halaman-materi-design-dekstop.png
 */
export function KatalogMateriGrid({ items = [], onAction, onReset }) {
  if (items.length === 0) {
    return (
      <div className="w-full py-16 bg-white rounded-3xl border border-slate-200/80 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl">
          🔍
        </div>
        <h3 className="text-base font-bold font-rubik text-slate-800">
          Tidak ada materi yang cocok
        </h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Coba ubah kata kunci pencarian atau ganti filter status untuk melihat materi lainnya.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-2 px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full text-xs font-bold font-rubik transition-colors cursor-pointer"
          >
            Reset Filter
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-2">
      {items.map((mat) => (
        <KatalogMateriCard
          key={mat.id}
          category={mat.category}
          categoryColor={mat.categoryColor}
          title={mat.title}
          description={mat.description}
          statusType={mat.statusType}
          statusLabel={mat.statusLabel}
          statusValue={mat.statusValue}
          progressPercent={mat.progressPercent}
          lockMessage={mat.lockMessage}
          lockHighlight={mat.lockHighlight}
          exercisesCount={mat.exercisesCount}
          durationMinutes={mat.durationMinutes}
          score={mat.score}
          actionButton={mat.actionButton}
          onAction={() => onAction && onAction(mat)}
        />
      ))}
    </div>
  )
}

export default KatalogMateriGrid
