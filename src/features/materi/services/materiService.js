/**
 * Service & Data Model untuk Katalog Materi Matematika
 * Mengacu presisi pada Design/halaman-materi-design-dekstop.png
 */

export const CATEGORIES = [
  { id: 'all', label: 'Semua Materi', count: 12 },
  { id: 'bilangan', label: 'Bilangan & Pecahan' },
  { id: 'aljabar', label: 'Aljabar Dasar' },
  { id: 'geometri', label: 'Geometri & Pengukuran' },
  { id: 'statistika', label: 'Statistika & Peluang' },
]

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua Modul' },
  { value: 'in_progress', label: 'Sedang Dipelajari' },
  { value: 'completed', label: 'Tuntas' },
  { value: 'ready', label: 'Siap Dipelajari' },
  { value: 'locked', label: 'Terkunci' },
]

export const SORT_OPTIONS = [
  { value: 'rekomendasi', label: 'Urutan Rekomendasi' },
  { value: 'terbaru', label: 'Modul Terbaru' },
  { value: 'progres', label: 'Progres Tertinggi' },
]

export const KATALOG_MATERI = [
  {
    id: 'mat-1',
    category: 'Bilangan Rasional',
    categoryColor: 'bg-violet-100 text-primary',
    categoryFilter: 'bilangan',
    title: 'Operasi Pecahan Campuran',
    description: 'Menghitung penjumlahan, pengurangan, dan penyederhanaan bentuk pecahan tidak sejenis.',
    statusType: 'in_progress',
    statusLabel: 'Progres Pembelajaran',
    statusValue: '75% (3/4 Sub-bab)',
    progressPercent: 75,
    exercisesCount: 8,
    durationMinutes: 25,
    actionButton: {
      label: 'Lanjutkan Belajar',
      variant: 'primary',
    },
  },
  {
    id: 'mat-2',
    category: 'Bilangan Bulat',
    categoryColor: 'bg-indigo-50 text-indigo-700',
    categoryFilter: 'bilangan',
    title: 'Bilangan Bulat & Garis Bilangan',
    description: 'Konsep dasar bilangan negatif, nilai mutlak, serta relasi posisi pada garis horizontal.',
    statusType: 'completed',
    statusLabel: 'Tuntas Sempurna',
    statusValue: '100%',
    progressPercent: 100,
    exercisesCount: 6,
    score: 'Skor: 95/100',
    actionButton: {
      label: 'Ulas Kembali Modul',
      variant: 'review',
    },
  },
  {
    id: 'mat-3',
    category: 'Aljabar Dasar',
    categoryColor: 'bg-purple-100/80 text-purple-800',
    categoryFilter: 'aljabar',
    title: 'Pengenalan Variabel & Bentuk Aljabar',
    description: 'Memahami koefisien, konstanta, suku sejenis, serta menyusun persamaan ekspresif.',
    statusType: 'ready',
    statusLabel: 'Status: Siap Dipelajari',
    statusValue: '+120 XP Reward',
    exercisesCount: 10,
    durationMinutes: 35,
    actionButton: {
      label: 'Mulai Bab Ini',
      variant: 'ready',
    },
  },
  {
    id: 'mat-4',
    category: 'Aljabar Lanjutan',
    categoryColor: 'bg-slate-100 text-slate-700',
    categoryFilter: 'aljabar',
    title: 'Persamaan Linear Satu Variabel',
    description: 'Menemukan nilai x pada bentuk aljabar setara melalui sifat kesamaan dan substitusi.',
    statusType: 'prerequisite_progress',
    statusLabel: 'Prasyarat: Variabel Aljabar',
    statusValue: '0%',
    progressPercent: 0,
    exercisesCount: 8,
    durationMinutes: 30,
    actionButton: {
      label: 'Lihat Silabus',
      variant: 'syllabus',
    },
  },
  {
    id: 'mat-5',
    category: 'Geometri Spasial',
    categoryColor: 'bg-sky-50 text-sky-800',
    categoryFilter: 'geometri',
    title: 'Keliling & Luas Bangun Datar',
    description: 'Perhitungan luas segitiga, jajar genjang, dan belah ketupat dalam pemecahan masalah kontekstual.',
    statusType: 'locked_prerequisite',
    lockMessage: 'Selesaikan modul Aljabar Dasar terlebih dahulu.',
    lockHighlight: 'Aljabar Dasar',
    exercisesCount: 12,
    actionButton: {
      label: 'Prasyarat Belum Terpenuhi',
      variant: 'locked',
      icon: 'lock',
    },
  },
  {
    id: 'mat-6',
    category: 'Statistika',
    categoryColor: 'bg-teal-50 text-teal-800',
    categoryFilter: 'statistika',
    title: 'Penyajian Data & Diagram Batang',
    description: 'Mengolah tabel frekuensi, membaca diagram lingkaran, serta interpretasi sebaran data kuantitatif.',
    statusType: 'locked_level',
    lockMessage: 'Terbuka otomatis saat akun mencapai Level 4 Explorer.',
    lockHighlight: 'Level 4 Explorer',
    exercisesCount: 8,
    actionButton: {
      label: 'Perlu 120 XP Lagi',
      variant: 'locked',
      icon: 'trophy',
    },
  },
]

/**
 * Filter dan sort helper untuk katalog materi
 */
export function getFilteredMateri({ items = KATALOG_MATERI, activeTab = 'all', searchQuery = '', statusFilter = 'all', sortBy = 'rekomendasi' }) {
  let result = [...items]

  // 1. Filter Kategori Tab
  if (activeTab !== 'all') {
    result = result.filter((item) => item.categoryFilter === activeTab)
  }

  // 2. Filter Search Query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim()
    result = result.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchDesc = item.description.toLowerCase().includes(q)
      const matchCat = item.category.toLowerCase().includes(q)
      return matchTitle || matchDesc || matchCat
    })
  }

  // 3. Filter Status
  if (statusFilter !== 'all') {
    if (statusFilter === 'in_progress') {
      result = result.filter((item) => item.statusType === 'in_progress')
    } else if (statusFilter === 'completed') {
      result = result.filter((item) => item.statusType === 'completed')
    } else if (statusFilter === 'ready') {
      result = result.filter((item) => item.statusType === 'ready')
    } else if (statusFilter === 'locked') {
      result = result.filter((item) => item.statusType.startsWith('locked'))
    }
  }

  // 4. Sortir
  if (sortBy === 'progres') {
    result.sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))
  }

  return result
}
