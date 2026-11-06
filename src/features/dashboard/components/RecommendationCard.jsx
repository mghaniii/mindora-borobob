import React from 'react'

/**
 * Komponen RecommendationCard
 * Kartu rekomendasi materi pada dashboard
 * Mengacu pada desain Button material card rekomendasi.svg
 */
export function RecommendationCard({
  title = 'Aljabar Dasar Mudah',
  category = 'Aljabar',
  description = 'Mengenal variabel, suku sejenis, dan model matematika sederhana.',
  moduleCount = 6,
  tagColor = 'text-primary',
  bannerBg = 'bg-primary/10',
  image = null,
  onClick,
}) {
  return (
    <div 
      onClick={onClick}
      className="flex-1 min-w-0 w-full p-3.5 bg-white rounded-2xl border border-slate-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-2.5 cursor-pointer group"
    >
      <div className="flex flex-col gap-2.5">
        {/* Sampul gambar / thumbnail materi */}
        <div className={`h-24 w-full ${bannerBg} rounded-xl flex items-center justify-center overflow-hidden relative`}>
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <svg className="w-8 h-8 opacity-75 group-hover:scale-110 transition-transform duration-200 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          )}
        </div>

        {/* Konten kategori, judul, dan ringkasan */}
        <div className="pt-0.5 flex flex-col gap-1">
          <span className={`text-[11px] font-bold tracking-wide uppercase ${tagColor}`}>
            {category}
          </span>
          <h3 className="text-zinc-900 text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-xs font-normal line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Bagian bawah kartu (jumlah modul & tombol mulai) */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-gray-600 text-xs font-semibold tracking-wide">
          {moduleCount} Modul
        </span>
        <button 
          aria-label={`Mulai materi ${title}`}
          className="w-8 h-8 rounded-full bg-[#E8EFF1] group-hover:bg-primary group-hover:text-white text-[#474554] flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <path
              d="M11.875 21.25V10.75L20.125 16L11.875 21.25V21.25M13.375 16V16V16V16V16M13.375 18.5125L17.3125 16L13.375 13.4875V18.5125V18.5125"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default RecommendationCard
