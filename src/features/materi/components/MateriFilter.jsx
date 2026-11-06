import React from 'react'
import { CATEGORIES } from '../services/materiService'

/**
 * Komponen MateriFilter (Tab Filter Kategori)
 * Sesuai rencana.md dan Design/halaman-materi-design-dekstop.png
 */
export function MateriFilter({ activeTab = 'all', onSelectTab }) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = activeTab === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectTab(cat.id)}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-rubik text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              isActive
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{cat.label}</span>
            {cat.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold leading-none ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default MateriFilter
