import { api } from '../../../services/api.js'

export const DAILY_STATS = {
  targetCompleted: 5,
  targetTotal: 8,
  streakDays: 3,
  todayXp: 80,
}

export const TOPIK_OPTIONS = [
  { id: 'all', label: 'Semua Topik SMA 11' },
  { id: 'matriks', label: 'Matriks & SPLDV' },
  { id: 'komposisi', label: 'Fungsi Komposisi' },
  { id: 'kalkulus', label: 'Limit & Turunan' },
  { id: 'statistika', label: 'Statistika Lanjut' },
]

export const SORT_OPTIONS = [
  { value: 'rekomendasi', label: 'Rekomendasi Pintar' },
  { value: 'terbaru', label: 'Latihan Terbaru' },
  { value: 'xp', label: 'XP Tertinggi' },
  { value: 'durasi', label: 'Durasi Tersingkat' },
]

export const LATIHAN_ITEMS = [
  {
    id: 'lat-1',
    topikId: 'matriks',
    title: 'Penjumlahan & Perkalian Skalar Matriks',
    description: 'Pondasi ordo matriks, elemen seletak, serta sifat asosiatif dasar.',
    questionsCount: 6,
    durationMinutes: 8,
    xpReward: 40,
    tag: null,
    iconType: 'matrix-grid',
    actionButton: { label: 'Kerjakan', variant: 'primary', icon: 'arrow-right' },
  },
  {
    id: 'lat-2',
    topikId: 'matriks',
    title: 'Determinan & Invers Matriks 2×2',
    description: 'Perhitungan determinan, sifat matriks singular, dan rumus invers.',
    questionsCount: 8,
    durationMinutes: 12,
    xpReward: 60,
    tag: null,
    iconType: 'matrix-determinant',
    actionButton: { label: 'Mulai Drill', variant: 'drill', icon: 'play' },
  },
  {
    id: 'lat-3',
    topikId: 'matriks',
    title: 'Aplikasi Matriks dalam SPLDV & Ekonomi',
    description: 'Pemodelan konteks toko belanja dan sistem persamaan dua variabel.',
    questionsCount: 5,
    durationMinutes: 15,
    xpReward: 75,
    tag: null,
    iconType: 'chart-trend',
    actionButton: { label: 'Tantangan', variant: 'challenge', icon: 'external-link' },
  },
  {
    id: 'lat-4',
    topikId: 'matriks',
    title: 'Evaluasi Kesalahan Tanda Negatif Invers',
    description: 'Kaji ulang kesalahan peletakan tanda minus diagonal samping.',
    questionsCount: 3,
    questionsLabel: '3 Soal Ulang',
    durationMinutes: 5,
    xpReward: null,
    tag: { label: 'Remediasi', variant: 'danger' },
    iconType: 'warning-refresh',
    actionButton: { label: 'Perbaiki', variant: 'neutral', icon: 'refresh' },
  },
]

export const KUIS_HARIAN = {
  badge: 'Kuis Adaptif Harian',
  meta: '10 Soal • Estimasi 15 Menit',
  title: 'Siap Evaluasi Pemahaman? Lanjut ke Kuis Harian: Matriks & Determinan 2×2',
  actionLabel: 'Mulai Kuis Sekarang',
}

export const PERFORMA_MATRIKS = {
  accuracy: { label: 'Rata-Rata Akurasi', value: '88%', growth: '+6%' },
  speed: { label: 'Kecepatan Rata-Rata', value: '1m 15s', unit: '/ soal' },
  readiness: { label: 'Kesiapan Bab', value: '82%', statusBadge: 'Siap' },
}

export const KUIS_HARIAN_ID = 'kuis-harian'

export async function fetchKuisConfig(itemId) {
  const response = await api.get(`/latihan/${encodeURIComponent(itemId)}/kuis`)
  return response.data
}

export async function submitLatihan(itemId, payload) {
  const response = await api.post(
    `/latihan/${encodeURIComponent(itemId)}/kuis/submit`,
    payload,
  )
  return response.data
}
