import React from 'react'
import { TOPIK_OPTIONS, SORT_OPTIONS } from '../services/latihanService'

/**
 * Komponen LatihanFilter
 * Bagian Header Topik, Sortir, dan Pill Filter Kategori
 */
export function LatihanFilter({
  activeTopik = 'all',
  onSelectTopik,
  sortBy = 'rekomendasi',
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Baris Badge Kurikulum & Dropdown Urutkan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Badge Fase & Kurikulum */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold font-sans bg-violet-100 text-primary">
            Fase F • Matematika Lanjut
          </span>
          <span className="text-xs font-medium text-slate-500 font-sans">
            Kurikulum Merdeka
          </span>
        </div>

        {/* Dropdown Urutan */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs text-xs font-sans">
          <span className="text-slate-500 font-medium">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* 2. Judul Utama Bab */}
      <h1 className="text-zinc-900 text-2xl sm:text-3xl font-extrabold font-sans tracking-tight">
        Latihan & Penguatan Konsep Matriks
      </h1>

      {/* 3. Tab Filter Kategori (Pill Rounded-Full) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {TOPIK_OPTIONS.map((topik) => {
          const isActive = activeTopik === topik.id
          return (
            <button
              key={topik.id}
              type="button"
              onClick={() => onSelectTopik && onSelectTopik(topik.id)}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'bg-white  text-[#474554] hover:bg-slate-50'
              }`}
            >
              {topik.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LatihanFilter

