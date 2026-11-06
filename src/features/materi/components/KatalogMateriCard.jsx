import React from 'react'
import iconList from '../../../assets/materi/Icon-list-latihan.svg'
import iconJam from '../../../assets/materi/Icon-jam-materi.svg'
import iconGembok from '../../../assets/materi/icon-gembok-materi.svg'

/**
 * Komponen KatalogMateriCard
 * Kartu pembelajaran pada Halaman Katalog Materi Matematika
 * Mengacu presisi 1:1 pada Design/halaman-materi-design-dekstop.png
 */
export function KatalogMateriCard({
  category = 'Aljabar Dasar',
  categoryColor = 'bg-slate-100 text-slate-700',
  title = 'Judul Materi',
  description = 'Deskripsi materi...',
  // Status info: 'in_progress' | 'completed' | 'ready' | 'prerequisite_progress' | 'locked_prerequisite' | 'locked_level'
  statusType = 'ready',
  statusLabel = '',
  statusValue = '',
  progressPercent = 0,
  lockMessage = '',
  lockHighlight = '',
  exercisesCount = 8,
  durationMinutes = null,
  score = null,
  actionButton = {
    label: 'Mulai Bab Ini',
    variant: 'ready', // 'primary' | 'review' | 'ready' | 'syllabus' | 'locked'
    disabled: false,
  },
  onAction,
}) {
  return (
    <div className="w-full bg-white rounded-3xl p-7 border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-6 text-left">
      {/* 1. Header Card (Badge Kategori, Judul & Deskripsi) */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center">
          <span className={`px-3.5 py-1 rounded-full text-xs font-semibold font-rubik tracking-tight ${categoryColor}`}>
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-zinc-900 text-xl font-bold font-rubik leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* 2. Status & Progres Pembelajaran */}
      <div className="flex flex-col gap-2">
        {/* Status: Sedang Berjalan / Tuntas / Prasyarat Berjalan */}
        {(statusType === 'in_progress' || statusType === 'completed' || statusType === 'prerequisite_progress') && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium font-rubik">
                {statusLabel || (statusType === 'completed' ? 'Tuntas Sempurna' : 'Progres Pembelajaran')}
              </span>
              <span className={`font-bold font-rubik ${statusType === 'in_progress' ? 'text-primary' : statusType === 'completed' ? 'text-slate-800' : 'text-slate-400'}`}>
                {statusValue || `${progressPercent}%`}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${statusType === 'completed' ? 'bg-primary' : statusType === 'in_progress' ? 'bg-primary' : 'bg-slate-300'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Status: Siap Dipelajari (+XP Reward) */}
        {statusType === 'ready' && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-semibold font-rubik">
                {statusLabel || 'Status: Siap Dipelajari'}
              </span>
              <span className="text-amber-600 font-extrabold font-rubik text-xs tracking-tight">
                {statusValue || '+120 XP Reward'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-200 rounded-full w-0" />
            </div>
          </div>
        )}

        {/* Status: Terkunci Prasyarat */}
        {statusType === 'locked_prerequisite' && (
          <div className="w-full p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center gap-3">
            <img src={iconGembok} alt="Terkunci" className="w-4 h-4 shrink-0" />
            <span className="text-xs text-slate-700 leading-tight font-normal font-rubik">
              Selesaikan modul <strong className="font-bold text-slate-900">{lockHighlight || 'Aljabar Dasar'}</strong> terlebih dahulu.
            </span>
          </div>
        )}

        {/* Status: Terkunci Level / XP */}
        {statusType === 'locked_level' && (
          <div className="w-full p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center gap-3">
            <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1H5a3 3 0 00-3 3v1a6 6 0 005.15 5.92A6 6 0 0011 16.92V19H8a1 1 0 000 2h8a1 1 0 000-2h-3v-2.08a6 6 0 003.85-2.92A6 6 0 0022 8V7a3 3 0 00-3-3zM4 8V7a1 1 0 011-1h2v4.18A4 4 0 014 8zm16 0a4 4 0 01-3 2.18V6h2a1 1 0 011 1v1z" />
            </svg>
            <span className="text-xs text-slate-700 leading-tight font-normal font-rubik">
              Terbuka otomatis saat akun mencapai <strong className="font-bold text-slate-900">{lockHighlight || 'Level 4 Explorer'}</strong>.
            </span>
          </div>
        )}
      </div>

      {/* 3. Meta Info (Latihan, Durasi / Skor) */}
      <div className="flex items-center gap-2 text-xs text-slate-600 font-rubik font-medium">
        {/* Latihan */}
        <div className="flex items-center gap-1.5">
          <img src={iconList} alt="Latihan" className="w-3.5 h-3 opacity-75" />
          <span>{exercisesCount} Latihan</span>
        </div>

        {/* Separator Bullet */}
        {(durationMinutes || score) && (
          <span className="text-slate-300 font-bold">•</span>
        )}

        {/* Estimasi Durasi */}
        {durationMinutes && (
          <div className="flex items-center gap-1.5">
            <img src={iconJam} alt="Waktu" className="w-3.5 h-3.5 opacity-75" />
            <span>{durationMinutes} Menit</span>
          </div>
        )}

        {/* Skor Jika Tuntas */}
        {score && (
          <div className="flex items-center gap-1.5 text-primary font-bold">
            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>{score}</span>
          </div>
        )}
      </div>

      {/* 4. Tombol Aksi Lebar Penuh (Rounded-Full Pill Button) */}
      <div>
        {actionButton.variant === 'primary' && (
          <button
            type="button"
            onClick={onAction}
            className="w-full h-11 px-5 bg-primary hover:bg-primary-dark text-white rounded-full font-rubik text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>{actionButton.label || 'Lanjutkan Belajar'}</span>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {actionButton.variant === 'review' && (
          <button
            type="button"
            onClick={onAction}
            className="w-full h-11 px-5 bg-[#F1F5F9] hover:bg-slate-200 text-[#3525CD] rounded-full font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>{actionButton.label || 'Ulas Kembali Modul'}</span>
          </button>
        )}

        {actionButton.variant === 'ready' && (
          <button
            type="button"
            onClick={onAction}
            className="w-full h-11 px-5 bg-[#EDE9FE] hover:bg-primary hover:text-white text-[#4338CA] rounded-full font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group"
          >
            <span>{actionButton.label || 'Mulai Bab Ini'}</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}

        {actionButton.variant === 'syllabus' && (
          <button
            type="button"
            onClick={onAction}
            className="w-full h-11 px-5 bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 rounded-full font-rubik text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>{actionButton.label || 'Lihat Silabus'}</span>
            <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </button>
        )}

        {actionButton.variant === 'locked' && (
          <button
            type="button"
            disabled
            className="w-full h-11 px-5 bg-[#F1F5F9] text-slate-400 rounded-full font-rubik text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-90"
          >
            {actionButton.icon === 'trophy' ? (
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1H5a3 3 0 00-3 3v1a6 6 0 005.15 5.92A6 6 0 0011 16.92V19H8a1 1 0 000 2h8a1 1 0 000-2h-3v-2.08a6 6 0 003.85-2.92A6 6 0 0022 8V7a3 3 0 00-3-3zM4 8V7a1 1 0 011-1h2v4.18A4 4 0 014 8zm16 0a4 4 0 01-3 2.18V6h2a1 1 0 011 1v1z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
            <span>{actionButton.label || 'Prasyarat Belum Terpenuhi'}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default KatalogMateriCard
