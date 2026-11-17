/**
 * Service & Data Model untuk Dashboard
 * Mengambil data dashboard dari endpoint backend, dengan fallback ke data
 * contoh selama backend belum aktif. Kontrak endpoint yang diharapkan:
 *   GET /dashboard/summary           -> banner sambutan & statistik harian
 *   GET /dashboard/continue-learning -> modul yang sedang dipelajari
 *   GET /dashboard/recommendations   -> daftar rekomendasi materi
 *   GET /dashboard/leaderboard       -> peringkat kelas mingguan
 */

import { api } from '../../../services/api'
import thumbnailAljabar from '../../../assets/materi/thumbnail-aljabar-materi.svg'
import thumbnailGeometri from '../../../assets/materi/thumbnail-geometri-materi.svg'
import thumbnailStatistika from '../../../assets/materi/thumbnail-statistika-materi.svg'

/**
 * Data contoh (fallback) yang disalin dari tampilan dashboard awal.
 * Nilai ini juga dipakai hook sebagai state awal agar dashboard tetap
 * terisi selama permintaan backend belum selesai (ikut pola INITIAL_QUESTIONS
 * pada useDiagnosticLogic).
 */
export const MOCK_SUMMARY = {
  name: 'Budi',
  currentTopic: 'Operasi Hitung Campuran',
  targetPercentage: 68,
  spentMinutes: 14,
  totalTargetMinutes: 20,
  streakDays: 3,
  totalXp: 420,
  completedModules: 12,
}

export const MOCK_CONTINUE_LEARNING = {
  chapter: 'Bab 4 • Bilangan Rasional',
  title: 'Penjumlahan Pecahan Campuran',
  completedSubtopics: 4,
  totalSubtopics: 6,
  progressPercentage: 75,
}

export const MOCK_RECOMMENDATIONS = [
  {
    id: 'aljabar-1',
    category: 'Aljabar',
    title: 'Aljabar Dasar Mudah',
    description: 'Mengenal variabel, suku sejenis, dan model matematika sederhana.',
    moduleCount: 6,
    tagColor: 'text-primary',
    bannerBg: 'bg-primary/10',
    image: thumbnailAljabar,
  },
  {
    id: 'geometri-1',
    category: 'Geometri',
    title: 'Geometri & Bangun Datar',
    description: 'Eksplorasi keliling, luas bidang, dan sudut poligon.',
    moduleCount: 7,
    tagColor: 'text-secondary',
    bannerBg: 'bg-secondary/15',
    image: thumbnailGeometri,
  },
  {
    id: 'statistika-1',
    category: 'Statistika',
    title: 'Statistika & Data',
    description: 'Membaca diagram batang, garis, dan menghitung nilai rata-rata.',
    moduleCount: 5,
    tagColor: 'text-primary',
    bannerBg: 'bg-correct/15',
    image: thumbnailStatistika,
  },
]

export const MOCK_LEADERBOARD = [
  {
    rank: 1,
    name: 'Budi Santoso',
    initials: 'BS',
    avatar: null,
    xp: 1620,
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: 'Budi (Kamu)',
    initials: 'BP',
    avatar: null,
    xp: 1450,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: 'Dinda Ayu',
    initials: 'DA',
    avatar: null,
    xp: 1380,
    isCurrentUser: false,
  },
]

/**
 * Permintaan backend yang toleran terhadap kegagalan: bila endpoint belum
 * aktif (backend belum dideploy), gunakan data contoh agar dashboard tetap
 * tampil. Hapus fallback ini setelah endpoint backend stabil berjalan.
 */
async function fetchWithFallback(path, fallback) {
  try {
    return await api.get(path)
  } catch (error) {
    console.warn(
      `[Dashboard] Gagal memuat ${path}, menggunakan data contoh. (${error.message})`,
    )
    return fallback
  }
}

// Banner sambutan & statistik ringkasan harian (streak, XP, modul selesai)
export const getDashboardSummary = () =>
  fetchWithFallback('/dashboard/summary', MOCK_SUMMARY)

// Modul yang sedang dipelajari pengguna
export const getContinueLearning = () =>
  fetchWithFallback('/dashboard/continue-learning', MOCK_CONTINUE_LEARNING)

// Daftar rekomendasi materi
export const getMaterialRecommendations = () =>
  fetchWithFallback('/dashboard/recommendations', MOCK_RECOMMENDATIONS)

// Peringkat kelas mingguan
export const getLeaderboard = () =>
  fetchWithFallback('/dashboard/leaderboard', MOCK_LEADERBOARD)
