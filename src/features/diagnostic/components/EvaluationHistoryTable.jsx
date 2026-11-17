import React, { useEffect, useRef, useState } from 'react'
import { ACTIVITY_CATEGORIES } from '../services/diagnosticService'
import iconKuisHarian from '../../../assets/riwayat-diagnotic/icon-matriks-determinan.svg'
import iconLatihanMandiri from '../../../assets/riwayat-diagnotic/icon-perkalian-skalar.svg'
import iconTesDiagnostik from '../../../assets/riwayat-diagnotic/icon-tes-diagnostic.svg'
import iconLatihanEksploratif from '../../../assets/riwayat-diagnotic/icon-buku-invers.svg'

const ROW_ICONS = {
  'kuis-harian': iconKuisHarian,
  'latihan-mandiri': iconLatihanMandiri,
  'tes-diagnostik': iconTesDiagnostik,
  'latihan-eksploratif': iconLatihanEksploratif,
}

const STATUS_TONES = {
  primary: 'bg-primary/10 text-primary',
  neutral: 'bg-surface-card text-text-muted',
}

const SCORE_TONES = {
  primary: 'text-primary-dark',
  muted: 'text-text-main',
}

const ACTION_TONES = {
  primary: 'text-primary hover:text-primary-dark',
  neutral: 'text-text-main hover:text-text-muted',
}

const PAGE_SIZE = 4

// Modal detail aktivitas: rekap data baris yang dipilih
function ActivityDetailModal({ activity, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!activity) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim (tombol agar klik area kosong menutup, tanpa memicu warning a11y) */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Tutup detail aktivitas"
        onClick={onClose}
        className="absolute inset-0 bg-shadow/40 backdrop-blur-sm cursor-default"
      />
      {/* Dialog (native <dialog> menihilkan warning a11y role=dialog) */}
      <dialog
        open
        aria-modal="true"
        aria-label={`Detail ${activity.title}`}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col gap-5 animate-fade-up"
      >
        <div className="flex items-start gap-4">
          <img
            src={ROW_ICONS[activity.iconType]}
            alt=""
            className="w-12 h-12 shrink-0 object-contain"
          />
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-lg font-bold font-rubik text-text-main leading-snug">
              {activity.title}
            </h3>
            <p className="text-sm text-text-muted font-sans">{activity.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-surface-muted">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-text-subtle">
              Kategori
            </span>
            <span className="text-sm font-semibold font-sans text-text-main">
              {activity.category}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-text-subtle">
              Skor / Hasil
            </span>
            <span className="text-sm font-bold font-sans text-primary-dark">
              {activity.scoreLabel}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-text-subtle">
              Waktu Selesai
            </span>
            <span className="text-sm font-semibold font-sans text-text-main">
              {activity.finishedAt}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-text-subtle">
              Status
            </span>
            <span
              className={`self-start px-2.5 py-1 rounded-full text-xs font-bold font-sans ${STATUS_TONES[activity.statusTone]}`}
            >
              {activity.statusLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          className="self-end px-6 py-2.5 rounded-[32px] bg-primary text-white text-sm font-semibold font-sans hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer"
        >
          Tutup
        </button>
      </dialog>
    </div>
  )
}

/**
 * Komponen EvaluationHistoryTable
 * Tabel riwayat aktivitas & evaluasi dengan filter kategori, paginasi, dan
 * modal detail per baris. Aksi dengan variant 'ulangi' diteruskan ke parent.
 */
export function EvaluationHistoryTable({
  activities,
  activeCategory,
  onCategoryChange,
  page,
  totalItems,
  onPageChange = null,
  onRowAction = null,
}) {
  const [selected, setSelected] = useState(null)
  const [overflow, setOverflow] = useState({ visible: false, atStart: true, atEnd: true })
  const tabsRef = useRef(null)
  const dragState = useRef({ startX: null, startLeft: 0, moved: false })
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))

  // Geser baris tab dengan mouse (drag) & roda mouse: container overflow-x
  // tidak bisa digulir mouse secara native, jadi kita terjemahkan manual.
  useEffect(() => {
    const el = tabsRef.current
    if (!el) return undefined

    const onPointerDown = (event) => {
      if (event.pointerType !== 'mouse') return
      dragState.current = { startX: event.clientX, startLeft: el.scrollLeft, moved: false }
      el.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse' || dragState.current.startX === null) return
      const dx = event.clientX - dragState.current.startX
      if (Math.abs(dx) > 4) dragState.current.moved = true
      el.scrollLeft = dragState.current.startLeft - dx
    }
    const onPointerUp = (event) => {
      if (event.pointerType !== 'mouse') return
      dragState.current.startX = null
    }
    // Setelah drag, klik tombol di-suppress supaya filter tidak ikut berubah
    const onClickCapture = (event) => {
      if (!dragState.current.moved) return
      event.preventDefault()
      event.stopPropagation()
      dragState.current.moved = false
    }
    // Roda mouse vertikal menggulir baris tab (hanya saat benar-benar overflow)
    const onWheel = (event) => {
      if (el.scrollWidth <= el.clientWidth + 1) return
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        el.scrollLeft += event.deltaY
        event.preventDefault()
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  // Deteksi apakah baris tab overflow (butuh kontrol geser) & posisi scroll-nya,
  // dipantau ulang setiap kali container di-resize atau digulir.
  useEffect(() => {
    const el = tabsRef.current
    if (!el) return undefined

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setOverflow({
        visible: max > 1,
        atStart: el.scrollLeft <= 1,
        atEnd: el.scrollLeft >= max - 1,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', update)
    }
  }, [])

  // Tombol panah: geser satu "halaman" baris tab (kontrol andal untuk mouse)
  const scrollTabs = (direction) => {
    const el = tabsRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const handleRowClick = (activity) => {
    // Aksi 'Ulangi' menavigasi ke kuis terkait; sisanya buka modal detail
    if (activity.actionLabel === 'Ulangi') {
      onRowAction?.(activity)
      return
    }
    setSelected(activity)
  }

  return (
    <section className="w-full bg-white rounded-3xl shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col gap-5">
      {/* Header: Judul + Tab Filter */}
      <div className="flex flex-col wide:flex-row wide:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 wide:shrink-0">
          <h2 className="text-lg sm:text-xl font-bold font-rubik text-text-main">
            Riwayat Aktivitas & Evaluasi
          </h2>
          <p className="text-xs sm:text-sm text-text-subtle font-sans">
            Daftar pengerjaan tugas, latihan terarah, dan rekap diagnostik siswa
          </p>
        </div>
        {/* Panah berada di slot flex tersendiri (bukan overlay) agar tidak menutupi label tab */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {overflow.visible && (
            <button
              type="button"
              aria-label="Geser tab sebelumnya"
              onClick={() => scrollTabs(-1)}
              disabled={overflow.atStart}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-surface-card text-text-muted hover:bg-surface-muted hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
          )}
          <div
            ref={tabsRef}
            className={`flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none flex-1 min-w-0 ${
              overflow.visible ? '' : 'wide:justify-end'
            }`}
          >
            {ACTIVITY_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? 'bg-primary text-white shadow-[0px_2px_8px_0px_rgba(108,92,231,0.35)]'
                      : 'bg-surface-card text-text-muted hover:bg-surface-muted'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Kontrol panah untuk mouse: muncul hanya saat baris tab overflow */}
          {overflow.visible && (
            <button
              type="button"
              aria-label="Geser tab berikutnya"
              onClick={() => scrollTabs(1)}
              disabled={overflow.atEnd}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-surface-card text-text-muted hover:bg-surface-muted hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabel */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b-2 border-surface-muted">
              <th className="py-3 px-3 sm:px-4 text-left text-xs font-bold font-sans text-text-subtle uppercase tracking-wide">
                Nama Aktivitas / Modul
              </th>
              <th className="py-3 px-3 sm:px-4 text-left text-xs font-bold font-sans text-text-subtle uppercase tracking-wide hidden md:table-cell">
                Kategori
              </th>
              <th className="py-3 px-3 sm:px-4 text-left text-xs font-bold font-sans text-text-subtle uppercase tracking-wide whitespace-nowrap">
                Skor / Hasil
              </th>
              <th className="py-3 px-3 sm:px-4 text-left text-xs font-bold font-sans text-text-subtle uppercase tracking-wide hidden lg:table-cell whitespace-nowrap">
                Waktu Selesai
              </th>
              <th className="py-3 px-3 sm:px-4 text-left text-xs font-bold font-sans text-text-subtle uppercase tracking-wide">
                Status
              </th>
              <th className="py-3 px-3 sm:px-4 text-right text-xs font-bold font-sans text-text-subtle uppercase tracking-wide">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-surface-muted last:border-b-0 hover:bg-surface/50 transition-colors"
              >
                {/* Nama Aktivitas / Modul (th scope=row: identifier baris & menihilkan rule a11y) */}
                <th
                  scope="row"
                  aria-label={activity.title}
                  className="py-4 px-3 sm:px-4 align-middle text-left font-normal"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={ROW_ICONS[activity.iconType]}
                      alt=""
                      className="w-9 h-9 shrink-0 object-contain"
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-bold font-sans text-text-main leading-snug truncate">
                        {activity.title}
                      </span>
                      <span className="text-xs text-text-subtle font-sans truncate">
                        {activity.subtitle}
                      </span>
                    </div>
                  </div>
                </th>
                {/* Kategori */}
                <td className="py-4 px-3 sm:px-4 align-middle hidden md:table-cell">
                  <span className="text-sm font-medium font-sans text-text-muted">
                    {activity.category}
                  </span>
                </td>
                {/* Skor / Hasil */}
                <td className="py-4 px-3 sm:px-4 align-middle whitespace-nowrap">
                  <span
                    className={`text-sm font-bold font-sans ${SCORE_TONES[activity.scoreTone]}`}
                  >
                    {activity.scoreLabel}
                  </span>
                </td>
                {/* Waktu Selesai */}
                <td className="py-4 px-3 sm:px-4 align-middle hidden lg:table-cell whitespace-nowrap">
                  <span className="text-sm font-normal font-sans text-text-muted">
                    {activity.finishedAt}
                  </span>
                </td>
                {/* Status */}
                <td className="py-4 px-3 sm:px-4 align-middle whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-sans ${STATUS_TONES[activity.statusTone]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {activity.statusLabel}
                  </span>
                </td>
                {/* Aksi */}
                <td className="py-4 px-3 sm:px-4 align-middle whitespace-nowrap text-right">
                  <button
                    type="button"
                    onClick={() => handleRowClick(activity)}
                    className={`text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer inline-flex items-center gap-1 ${ACTION_TONES[activity.actionVariant]}`}
                  >
                    {activity.actionLabel}
                    {activity.actionLabel === 'Ulangi' ? (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M17.65 6.35A7.958 7.958 0 0012 4a8 8 0 108 8h-2a6 6 0 11-6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: Jumlah & Paginasi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <p className="text-xs text-text-subtle font-sans">
          Menampilkan {activities.length} dari {totalItems} aktivitas pembelajaran
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-card disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <span className="text-sm font-medium font-sans text-text-main tabular-nums">
            Halaman {page} dari {totalPages}
          </span>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-card disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Detail Aktivitas */}
      <ActivityDetailModal activity={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default EvaluationHistoryTable
