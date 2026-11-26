import { api } from '../../../services/api'
import thumbnailAljabar from '../../../assets/materi/thumbnail-aljabar-materi.svg'
import thumbnailGeometri from '../../../assets/materi/thumbnail-geometri-materi.svg'
import thumbnailStatistika from '../../../assets/materi/thumbnail-statistika-materi.svg'

const CATEGORY_VISUALS = {
  aljabar: {
    tagColor: 'text-primary',
    bannerBg: 'bg-primary/10',
    image: thumbnailAljabar,
  },
  geometri: {
    tagColor: 'text-secondary',
    bannerBg: 'bg-secondary/15',
    image: thumbnailGeometri,
  },
  statistika: {
    tagColor: 'text-primary',
    bannerBg: 'bg-correct/15',
    image: thumbnailStatistika,
  },
  bilangan: {
    tagColor: 'text-secondary',
    bannerBg: 'bg-secondary/10',
    image: null,
  },
}

const DEFAULT_VISUAL = {
  tagColor: 'text-primary',
  bannerBg: 'bg-primary/10',
  image: null,
}

const getDashboardData = async (path) => {
  const response = await api.get(path)
  return response.data
}

const getInitials = (name) => String(name || '')
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0])
  .join('')
  .toUpperCase()

export const getDashboardSummary = () => getDashboardData('/dashboard/summary')

export const getContinueLearning = () => getDashboardData('/dashboard/continue-learning')

export const getMaterialRecommendations = async () => {
  const items = await getDashboardData('/dashboard/recommendations')
  return items.map((item) => ({
    ...item,
    ...(CATEGORY_VISUALS[item.categoryFilter] || DEFAULT_VISUAL),
  }))
}

export const getLeaderboard = async () => {
  const items = await getDashboardData('/dashboard/leaderboard')
  return items.map((item) => ({
    ...item,
    initials: getInitials(item.name),
  }))
}
