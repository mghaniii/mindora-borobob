import React from 'react'
import { STATUS_OPTIONS, SORT_OPTIONS } from '../services/materiService'

/**
 * Komponen MateriSearchSort
 * Baris Input Pencarian dan Dropdown Status & Urutan
 * Sesuai rencana.md dan Design/halaman-materi-design-dekstop.png
 */
export function MateriSearchSort({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusChange,
  sortBy = 'rekomendasi',
  onSortChange,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-10 pt-1">
      {/* 1. Input Pencarian (rounded-xl, identik dengan Header) */}
      <div className="flex-1 max-w-md relative">
        <div className="relative flex items-center">
          {/* Ikon Kaca Pembesar Pencarian */}
          <svg
            className="w-4 h-4 text-text-subtle absolute left-3.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari materi, rumus, konsep.."
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200/80 rounded-xl text-xs font-normal text-text-main placeholder:text-text-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* 2. Dropdown Status & Urutan (rounded-full) */}
     <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
        {/* Dropdown Status */}
         <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-2xs text-xs sm:text-sm font-rubik">
          <span className="text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Urutan */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-2xs text-xs sm:text-sm font-rubik">
          <span className="text-slate-500 font-medium">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`bg-transparent font-bold focus:outline-none cursor-pointer pr-1 ${
              sortBy === 'rekomendasi' ? 'text-primary-dark' : 'text-slate-800'
            }`}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Ikon Arrow Up Down */}
          <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="7 15 12 20 17 15" />
            <polyline points="7 9 12 4 17 9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default MateriSearchSort
