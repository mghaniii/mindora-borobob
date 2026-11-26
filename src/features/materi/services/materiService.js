import { api } from '../../../services/api.js'

export const CATEGORIES = [
  { id: 'all', label: 'Semua Materi' },
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

const CATEGORY_COLORS = {
  bilangan: 'bg-violet-100 text-primary',
  aljabar: 'bg-purple-100/80 text-purple-800',
  geometri: 'bg-sky-50 text-sky-800',
  statistika: 'bg-teal-50 text-teal-800',
}

const STATUS_PRESENTATION = {
  in_progress: {
    label: 'Progres Pembelajaran',
    action: { label: 'Lanjutkan Belajar', variant: 'primary' },
  },
  completed: {
    label: 'Tuntas Sempurna',
    action: { label: 'Ulas Kembali Modul', variant: 'review' },
  },
  ready: {
    label: 'Status: Siap Dipelajari',
    action: { label: 'Mulai Bab Ini', variant: 'ready' },
  },
  prerequisite_progress: {
    label: 'Prasyarat Belum Selesai',
    action: { label: 'Lihat Silabus', variant: 'syllabus' },
  },
  locked_prerequisite: {
    label: 'Prasyarat Belum Terpenuhi',
    action: { label: 'Prasyarat Belum Terpenuhi', variant: 'locked', icon: 'lock' },
  },
  locked_level: {
    label: 'Level Belum Mencukupi',
    action: { label: 'Level Belum Mencukupi', variant: 'locked', icon: 'trophy' },
  },
}

export function mapMaterialToCard(item) {
  const status = STATUS_PRESENTATION[item.status] || STATUS_PRESENTATION.ready
  const progress = Number(item.progress) || 0
  const completedSubtopics = Number(item.completedSubtopics) || 0
  const totalModules = Number(item.totalModules) || 0
  const xpReward = Number(item.xpReward) || 0
  const score = item.score === null || item.score === undefined
    ? null
    : `Skor: ${item.score}/100`
  let statusValue = `${progress}%`

  if (item.status === 'in_progress') {
    statusValue = `${progress}% (${completedSubtopics}/${totalModules} Sub-bab)`
  } else if (item.status === 'completed') {
    statusValue = '100%'
  } else if (item.status === 'ready') {
    statusValue = `+${xpReward} XP Reward`
  }

  return {
    ...item,
    categoryColor: CATEGORY_COLORS[item.categoryFilter] || 'bg-slate-100 text-slate-700',
    statusType: item.status,
    statusLabel: status.label,
    statusValue,
    progressPercent: progress,
    completedSubtopics,
    totalModules,
    xpReward,
    score,
    lockMessage: item.status === 'locked_prerequisite'
      ? 'Selesaikan materi prasyarat terlebih dahulu.'
      : item.status === 'locked_level'
        ? 'Materi terbuka setelah level belajarmu meningkat.'
        : '',
    lockHighlight: item.status === 'locked_prerequisite'
      ? 'materi prasyarat'
      : item.status === 'locked_level'
        ? 'level berikutnya'
        : '',
    actionButton: status.action,
  }
}

export async function fetchMaterials() {
  const response = await api.get('/materials')
  return response.data.map(mapMaterialToCard)
}

export async function updateMaterialProgress(materialId, payload) {
  const response = await api.patch(
    `/materials/${encodeURIComponent(materialId)}/progress`,
    payload,
  )
  return response.data
}

export function applyMaterialProgress(item, progress) {
  return mapMaterialToCard({
    ...item,
    status: progress.status,
    progress: progress.progressPercentage,
    completedSubtopics: progress.completedSubtopics,
    totalModules: progress.totalModules,
    score: progress.score,
  })
}

export function getFilteredMateri({
  items = [],
  activeTab = 'all',
  searchQuery = '',
  statusFilter = 'all',
  sortBy = 'rekomendasi',
}) {
  let result = [...items]

  if (activeTab !== 'all') {
    result = result.filter((item) => item.categoryFilter === activeTab)
  }

  const query = searchQuery.toLowerCase().trim()
  if (query) {
    result = result.filter((item) => {
      const title = item.title?.toLowerCase() || ''
      const description = item.description?.toLowerCase() || ''
      const category = item.category?.toLowerCase() || ''
      return title.includes(query) || description.includes(query) || category.includes(query)
    })
  }

  if (statusFilter === 'locked') {
    result = result.filter((item) => item.statusType?.startsWith('locked') || item.statusType === 'prerequisite_progress')
  } else if (statusFilter !== 'all') {
    result = result.filter((item) => item.statusType === statusFilter)
  }

  if (sortBy === 'progres') {
    result.sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))
  }

  return result
}
