import React from 'react'
import Button from '../../../components/common/Button.jsx'
import iconPenjumlahan from '../../../assets/latihan/icon-penjumlahan-perkalian.svg'
import iconDeterminan from '../../../assets/latihan/icon-determinan-invers-matriks.svg'
import iconAppEkonomi from '../../../assets/latihan/icon-app-matriks-ekonomi.svg'
import iconEvaluasi from '../../../assets/latihan/icon-evaluasi.svg'

// Ikon Meta SVG dengan fill currentColor agar dinamis mengikuti tema/button
function IconInfoSoal({ className = 'w-3.5 h-3.5 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 8.125C7.67708 8.125 7.83073 8.0599 7.96094 7.92969C8.09115 7.79948 8.15625 7.64583 8.15625 7.46875C8.15625 7.29167 8.09115 7.13802 7.96094 7.00781C7.83073 6.8776 7.67708 6.8125 7.5 6.8125C7.32292 6.8125 7.16927 6.8776 7.03906 7.00781C6.90885 7.13802 6.84375 7.29167 6.84375 7.46875C6.84375 7.64583 6.90885 7.79948 7.03906 7.92969C7.16927 8.0599 7.32292 8.125 7.5 8.125V8.125M7.03125 6.125H7.96875C7.96875 5.82292 8 5.60156 8.0625 5.46094C8.125 5.32031 8.27083 5.13542 8.5 4.90625C8.8125 4.59375 9.02083 4.34115 9.125 4.14844C9.22917 3.95573 9.28125 3.72917 9.28125 3.46875C9.28125 3 9.11719 2.61719 8.78906 2.32031C8.46094 2.02344 8.03125 1.875 7.5 1.875C7.07292 1.875 6.70052 1.99479 6.38281 2.23438C6.0651 2.47396 5.84375 2.79167 5.71875 3.1875L6.5625 3.53125C6.65625 3.27083 6.78385 3.07552 6.94531 2.94531C7.10677 2.8151 7.29167 2.75 7.5 2.75C7.75 2.75 7.95312 2.82031 8.10938 2.96094C8.26562 3.10156 8.34375 3.29167 8.34375 3.53125C8.34375 3.67708 8.30208 3.8151 8.21875 3.94531C8.13542 4.07552 7.98958 4.23958 7.78125 4.4375C7.4375 4.73958 7.22656 4.97656 7.14844 5.14844C7.07031 5.32031 7.03125 5.64583 7.03125 6.125V6.125M3.75 10C3.40625 10 3.11198 9.8776 2.86719 9.63281C2.6224 9.38802 2.5 9.09375 2.5 8.75V1.25C2.5 0.90625 2.6224 0.611979 2.86719 0.367188C3.11198 0.122396 3.40625 0 3.75 0H11.25C11.5938 0 11.888 0.122396 12.1328 0.367188C12.3776 0.611979 12.5 0.90625 12.5 1.25V8.75C12.5 9.09375 12.3776 9.38802 12.1328 9.63281C11.888 9.8776 11.5938 10 11.25 10H3.75V10M3.75 8.75H11.25V8.75V8.75V1.25V1.25V1.25H3.75V1.25V1.25V8.75V8.75V8.75V8.75M1.25 12.5C0.90625 12.5 0.611979 12.3776 0.367188 12.1328C0.122396 11.888 0 11.5938 0 11.25V2.5H1.25V11.25V11.25V11.25H10V12.5H1.25V12.5M3.75 1.25V1.25V1.25V1.25V8.75V8.75V8.75V8.75V8.75V8.75V1.25V1.25V1.25V1.25"
        fill="currentColor"
      />
    </svg>
  )
}

function IconJamKuis({ className = 'w-3.5 h-3.5 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.3125 9.1875L9.1875 8.3125L6.875 6V3.125H5.625V6.5L8.3125 9.1875V9.1875M6.25 12.5C5.38542 12.5 4.57292 12.3359 3.8125 12.0078C3.05208 11.6797 2.39062 11.2344 1.82812 10.6719C1.26562 10.1094 0.820312 9.44792 0.492188 8.6875C0.164062 7.92708 0 7.11458 0 6.25C0 5.38542 0.164062 4.57292 0.492188 3.8125C0.820312 3.05208 1.26562 2.39062 1.82812 1.82812C2.39062 1.26562 3.05208 0.820312 3.8125 0.492188C4.57292 0.164062 5.38542 0 6.25 0C7.11458 0 7.92708 0.164062 8.6875 0.492188C9.44792 0.820312 10.1094 1.26562 10.6719 1.82812C11.2344 2.39062 11.6797 3.05208 12.0078 3.8125C12.3359 4.57292 12.5 5.38542 12.5 6.25C12.5 7.11458 12.3359 7.92708 12.0078 8.6875C11.6797 9.44792 11.2344 10.1094 10.6719 10.6719C10.1094 11.2344 9.44792 11.6797 8.6875 12.0078C7.92708 12.3359 7.11458 12.5 6.25 12.5V12.5M6.25 6.25V6.25V6.25V6.25V6.25V6.25V6.25V6.25V6.25V6.25M6.25 11.25C7.63542 11.25 8.8151 10.763 9.78906 9.78906C10.763 8.8151 11.25 7.63542 11.25 6.25C11.25 4.86458 10.763 3.6849 9.78906 2.71094C8.8151 1.73698 7.63542 1.25 6.25 1.25C4.86458 1.25 3.6849 1.73698 2.71094 2.71094C1.73698 3.6849 1.25 4.86458 1.25 6.25C1.25 7.63542 1.73698 8.8151 2.71094 9.78906C3.6849 10.763 4.86458 11.25 6.25 11.25V11.25"
        fill="currentColor"
      />
    </svg>
  )
}

const ICON_MAP = {
  'matrix-grid': iconPenjumlahan,
  'penjumlahan-perkalian': iconPenjumlahan,
  'matrix-determinant': iconDeterminan,
  'determinan-invers': iconDeterminan,
  'chart-trend': iconAppEkonomi,
  'app-matriks-ekonomi': iconAppEkonomi,
  'warning-refresh': iconEvaluasi,
  'evaluasi': iconEvaluasi,
}

/**
 * Komponen LatihanCard
 * Kartu item latihan modular
 */
export function LatihanCard({
  title = 'Judul Latihan',
  description = 'Deskripsi latihan konsep...',
  questionsCount = 6,
  questionsLabel = null,
  durationMinutes = 8,
  xpReward = 40,
  tag = null,
  icon = null,
  iconType = 'matrix-grid',
  actionButton = {
    label: 'Kerjakan',
    variant: 'primary',
    icon: 'arrow-right',
  },
  onAction,
}) {
  const resolvedIcon = icon || ICON_MAP[iconType] || iconPenjumlahan

  // Kondisi materi aplikasi matriks / button challenge: ikon meta & badge serasi warna tombol (kuning/oranye #FFA048)
  const isChallenge =
    actionButton?.variant === 'challenge' ||
    iconType === 'chart-trend' ||
    iconType === 'app-matriks-ekonomi'

  const metaIconClass = isChallenge ? 'text-secondary' : 'text-[#5341CD]'

  return (
    <div className="w-full bg-white p-6 sm:p-7 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between gap-6 text-left">
      {/* 1. Bagian Atas: Ikon + Judul & Deskripsi */}
      <div className="flex items-start gap-4">
        {/* Ikon Box */}
        <div className="shrink-0">
          {typeof resolvedIcon === 'string' ? (
            <img
              src={resolvedIcon}
              alt={title}
              className="w-10 h-10 rounded-xl overflow-hidden object-contain"
            />
          ) : (
            resolvedIcon
          )}
        </div>

        {/* Judul & Deskripsi */}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-zinc-900 text-base sm:text-lg font-bold font-sans leading-snug">
            {title}
          </h3>
          <p className="text-[#474554] text-xs font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* 2. Bagian Bawah: Meta Soal, Durasi, Badge XP / Tag & Tombol Aksi */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Meta Kiri */}
        <div className="flex items-center gap-2.5 flex-wrap text-xs font-sans text-slate-600 font-medium">
          {/* Jumlah Soal */}
          <div className="flex items-center gap-1.5">
            <IconInfoSoal className={`w-3.5 h-3.5 shrink-0 ${metaIconClass}`} />
            <span>{questionsLabel || `${questionsCount} Soal`}</span>
          </div>

          <span className="text-slate-300 font-bold">•</span>

          {/* Estimasi Durasi */}
          <div className="flex items-center gap-1.5">
            <IconJamKuis className={`w-3.5 h-3.5 shrink-0 ${metaIconClass}`} />
            <span>{durationMinutes} Menit</span>
          </div>

          {/* Badge XP atau Tag Remediasi */}
          {xpReward && (
            <span
              className={`px-2.5 py-0.5  text-xs font-bold font-sans ${
                isChallenge
                  ? 'bg-orange-100 text-[#904D00]'
                  : 'bg-violet-100 text-primary'
              }`}
            >
              +{xpReward} XP
            </span>
          )}

          {tag && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-sans bg-rose-100 text-rose-600">
              {tag.label}
            </span>
          )}
        </div>

        {/* Tombol Aksi Kanan menggunakan komponen Button */}
        <div>
          {actionButton.variant === 'primary' && (
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              withArrow={true}
              onClick={onAction}
              className="w-full sm:w-auto font-sans text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98]"
            >
              {actionButton.label}
            </Button>
          )}

          {actionButton.variant === 'drill' && (
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              onClick={onAction}
              iconRight={
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              }
              className="w-full sm:w-auto !bg-[#5B4CD9] hover:!bg-indigo-700 font-sans text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98]"
            >
              {actionButton.label}
            </Button>
          )}

          {actionButton.variant === 'challenge' && (
            <Button
              variant="secondary"
              size="sm"
              shape="pill"
              onClick={onAction}
              iconRight={
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              }
              className="w-full sm:w-auto font-sans text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98]"
            >
              {actionButton.label}
            </Button>
          )}

          {actionButton.variant === 'neutral' && (
            <Button
              variant="ghost"
              size="sm"
              shape="pill"
              onClick={onAction}
              iconRight={
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              }
              className="w-full sm:w-auto !bg-slate-100 hover:!bg-slate-200 !text-slate-800 font-sans text-xs sm:text-sm font-bold active:scale-[0.98]"
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LatihanCard

