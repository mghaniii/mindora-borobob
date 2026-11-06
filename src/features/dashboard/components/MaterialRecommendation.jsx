import React from 'react'
import RecommendationCard from './RecommendationCard.jsx'

export function MaterialRecommendation({
  title = 'Rekomendasi Materi',
  subtitle = 'Pilihan topik esensial untuk kelas XI',
  items,
  onSeeAll,
  onSelectMaterial,
}) {
  const defaultItems = [
    {
      id: 'aljabar-1',
      category: 'Aljabar',
      title: 'Aljabar Dasar Mudah',
      description: 'Mengenal variabel, suku sejenis, dan model matematika sederhana.',
      moduleCount: 6,
      tagColor: 'text-primary',
      bannerBg: 'bg-primary/10',
    },
    {
      id: 'geometri-1',
      category: 'Geometri',
      title: 'Geometri & Bangun Datar',
      description: 'Eksplorasi keliling, luas bidang, dan sudut poligon.',
      moduleCount: 7,
      tagColor: 'text-secondary',
      bannerBg: 'bg-secondary/15',
    },
    {
      id: 'statistika-1',
      category: 'Statistika',
      title: 'Statistika & Data',
      description: 'Membaca diagram batang, garis, dan menghitung nilai rata-rata.',
      moduleCount: 5,
      tagColor: 'text-primary',
      bannerBg: 'bg-correct/15',
    },
  ]

  const materials = items || defaultItems

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Bagian header rekomendasi */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-zinc-900 text-lg font-bold font-sans">
            {title}
          </h2>
          <p className="text-gray-500 text-xs font-normal">
            {subtitle}
          </p>
        </div>

        <button
          onClick={onSeeAll}
          className="text-primary hover:text-primary-dark text-xs font-bold inline-flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>Lihat Semua</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Grid kartu rekomendasi materi (3 kolom sejajar dengan Continue Learning) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {materials.map((mat) => (
          <RecommendationCard
            key={mat.id}
            category={mat.category}
            title={mat.title}
            description={mat.description}
            moduleCount={mat.moduleCount}
            tagColor={mat.tagColor}
            bannerBg={mat.bannerBg}
            image={mat.image}
            onClick={() => onSelectMaterial && onSelectMaterial(mat)}
          />
        ))}
      </div>
    </div>
  )
}

export default MaterialRecommendation
