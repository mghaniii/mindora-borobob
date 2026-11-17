/**
 * Service & Data Model untuk halaman Riwayat & Hasil Diagnostik
 *
 * Mengambil data dari endpoint backend, dengan fallback ke data contoh selama
 * backend belum aktif. Kontrak endpoint yang diharapkan:
 *   GET /diagnostic/summary    -> ringkasan skor siap-belajar, kekuatan & kelemahan
 *   GET /diagnostic/topic-mastery -> tren penguasaan topik per capaian pembelajaran
 *   GET /diagnostic/activities -> riwayat aktivitas (paginate via ?page=&category=)
 */

import { api } from '../../../services/api'

// 1. Ringkasan Hasil Diagnostik Utama (card atas)
export const MOCK_SUMMARY = {
  score: 92,
  maxScore: 100,
  readiness: 'Sangat Siap',
  phase: 'Fase F',
  levelTitle: 'Mandiri Mahir',
  lastCompletedAt: '12 Mei 2024',
  strength: {
    label: 'Aljabar & Matriks',
    percent: 94,
  },
  weakness: {
    label: 'Kalkulus & Turunan',
    percent: 76,
  },
  recommendation: {
    label: 'Invers & Determinan',
    note: 'Fokus pada penerapan SPLDV',
  },
}

// 2. Tren Penguasaan Topik Matematika
export const MOCK_TOPIC_MASTERY = {
  standard: 'Standar Capaian Pembelajaran Fase F (Kelas 11 SMA)',
  semester: 'Semester Genap',
  items: [
    {
      id: 'matriks-spldv',
      label: 'Matriks & Sistem Persamaan Linier (SPLDV)',
      percent: 92,
      status: 'Tuntas Mahir',
      tone: 'primary',
    },
    {
      id: 'fungsi-komposisi',
      label: 'Fungsi Komposisi & Fungsi Invers',
      percent: 88,
      status: 'Baik',
      tone: 'primary',
    },
    {
      id: 'limit-turunan',
      label: 'Limit Fungsi & Konsep Turunan (Kalkulus)',
      percent: 74,
      status: 'Perlu Ditingkatkan',
      tone: 'warning',
    },
    {
      id: 'statistika-peluang',
      label: 'Statistika Inferensial & Teori Peluang',
      percent: 85,
      status: 'Baik',
      tone: 'primary',
    },
  ],
  calibratedNote: 'Data terkalibrasi otomatis melalui 18 latihan adaptif.',
}

// 3. Filter Kategori Riwayat Aktivitas
export const ACTIVITY_CATEGORIES = [
  { id: 'all', label: 'Semua Aktivitas' },
  { id: 'Kuis Harian', label: 'Kuis Harian' },
  { id: 'Tes Diagnostik', label: 'Tes Diagnostik' },
  { id: 'Latihan Mandiri', label: 'Latihan Mandiri' },
]

// 4. Daftar Riwayat Aktivitas (24 data = 6 halaman x 4 baris)
export const MOCK_ACTIVITIES = [
  {
    id: 'act-1',
    iconType: 'kuis-harian',
    title: 'Matriks & Determinan 2×2',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '90 / 100',
    scoreTone: 'primary',
    finishedAt: 'Kemarin, 14:20',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-2',
    iconType: 'latihan-mandiri',
    title: 'Perkalian Skalar Matriks',
    subtitle: '5 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '100%',
    scoreTone: 'muted',
    finishedAt: '2 hari lalu, 09:15',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-3',
    iconType: 'tes-diagnostik',
    title: 'Tes Diagnostik Berkala Fase F',
    subtitle: 'Tes Kemampuan Adaptif Komprehensif',
    category: 'Tes Diagnostik',
    scoreLabel: '92 / 100',
    scoreTone: 'primary',
    finishedAt: '5 hari lalu, 11:00',
    statusLabel: 'Sempurna',
    statusTone: 'primary',
    actionLabel: 'Lihat Rapor',
    actionVariant: 'primary',
  },
  {
    id: 'act-4',
    iconType: 'latihan-eksploratif',
    title: 'Invers Matriks & Penerapan SPLDV',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '8 dari 8 Soal',
    scoreTone: 'muted',
    finishedAt: '1 minggu lalu',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-5',
    iconType: 'kuis-harian',
    title: 'Vektor & Operasinya',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '80 / 100',
    scoreTone: 'primary',
    finishedAt: '1 minggu lalu, 16:40',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-6',
    iconType: 'tes-diagnostik',
    title: 'Tes Diagnostik Awal Fase F',
    subtitle: 'Tes Kemampuan Adaptif Komprehensif',
    category: 'Tes Diagnostik',
    scoreLabel: '78 / 100',
    scoreTone: 'primary',
    finishedAt: '2 minggu lalu, 10:30',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Rapor',
    actionVariant: 'primary',
  },
  {
    id: 'act-7',
    iconType: 'latihan-mandiri',
    title: 'Penjumlahan & Pengurangan Matriks',
    subtitle: '6 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '6 dari 6 Soal',
    scoreTone: 'muted',
    finishedAt: '2 minggu lalu, 13:05',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-8',
    iconType: 'latihan-eksploratif',
    title: 'Fungsi Komposisi Sederhana',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '75%',
    scoreTone: 'muted',
    finishedAt: '3 minggu lalu',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-9',
    iconType: 'kuis-harian',
    title: 'Limit Fungsi Aljabar',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '70 / 100',
    scoreTone: 'primary',
    finishedAt: '3 minggu lalu, 09:50',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-10',
    iconType: 'latihan-mandiri',
    title: 'Aturan Eksponen & Logaritma',
    subtitle: '5 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '5 dari 5 Soal',
    scoreTone: 'muted',
    finishedAt: '3 minggu lalu, 15:20',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-11',
    iconType: 'tes-diagnostik',
    title: 'Tes Diagnostik Tengah Semester',
    subtitle: 'Tes Kemampuan Adaptif Komprehensif',
    category: 'Tes Diagnostik',
    scoreLabel: '85 / 100',
    scoreTone: 'primary',
    finishedAt: '1 bulan lalu, 08:00',
    statusLabel: 'Sempurna',
    statusTone: 'primary',
    actionLabel: 'Lihat Rapor',
    actionVariant: 'primary',
  },
  {
    id: 'act-12',
    iconType: 'latihan-eksploratif',
    title: 'Turunan Fungsi Polinomial',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '7 dari 8 Soal',
    scoreTone: 'muted',
    finishedAt: '1 bulan lalu',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-13',
    iconType: 'kuis-harian',
    title: 'Statistika & Distribusi Data',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '88 / 100',
    scoreTone: 'primary',
    finishedAt: '1 bulan lalu, 14:10',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-14',
    iconType: 'latihan-mandiri',
    title: 'Teori Peluang Dasar',
    subtitle: '5 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '4 dari 5 Soal',
    scoreTone: 'muted',
    finishedAt: '5 minggu lalu, 11:25',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-15',
    iconType: 'latihan-eksploratif',
    title: 'Determinan Matriks 3×3',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '100%',
    scoreTone: 'muted',
    finishedAt: '5 minggu lalu',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-16',
    iconType: 'kuis-harian',
    title: 'Sistem Persamaan Linier Tiga Variabel',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '76 / 100',
    scoreTone: 'primary',
    finishedAt: '6 minggu lalu, 10:15',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-17',
    iconType: 'tes-diagnostik',
    title: 'Tes Diagnostik Fase E',
    subtitle: 'Tes Kemampuan Adaptif Komprehensif',
    category: 'Tes Diagnostik',
    scoreLabel: '81 / 100',
    scoreTone: 'primary',
    finishedAt: '2 bulan lalu, 09:00',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Rapor',
    actionVariant: 'primary',
  },
  {
    id: 'act-18',
    iconType: 'latihan-mandiri',
    title: 'Manipulasi Persamaan Kuadrat',
    subtitle: '5 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '5 dari 5 Soal',
    scoreTone: 'muted',
    finishedAt: '2 bulan lalu, 16:45',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-19',
    iconType: 'latihan-eksploratif',
    title: 'Fungsi Invers & Grafiknya',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '6 dari 8 Soal',
    scoreTone: 'muted',
    finishedAt: '2 bulan lalu',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-20',
    iconType: 'kuis-harian',
    title: 'Transformasi Geometri',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '84 / 100',
    scoreTone: 'primary',
    finishedAt: '2 bulan lalu, 13:30',
    statusLabel: 'Selesai',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
  {
    id: 'act-21',
    iconType: 'latihan-mandiri',
    title: 'Urutan & Deret Aritmetika',
    subtitle: '5 Soal Penguatan Konsep',
    category: 'Latihan Mandiri',
    scoreLabel: '3 dari 5 Soal',
    scoreTone: 'muted',
    finishedAt: '3 bulan lalu, 10:05',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Ulangi',
    actionVariant: 'neutral',
  },
  {
    id: 'act-22',
    iconType: 'latihan-eksploratif',
    title: 'Limit Trigonometri',
    subtitle: '8 Soal Latihan Eksploratif',
    category: 'Latihan Mandiri',
    scoreLabel: '100%',
    scoreTone: 'muted',
    finishedAt: '3 bulan lalu',
    statusLabel: 'Tuntas',
    statusTone: 'primary',
    actionLabel: 'Detail',
    actionVariant: 'neutral',
  },
  {
    id: 'act-23',
    iconType: 'tes-diagnostik',
    title: 'Tes Diagnostik Awal Fase E',
    subtitle: 'Tes Kemampuan Adaptif Komprehensif',
    category: 'Tes Diagnostik',
    scoreLabel: '65 / 100',
    scoreTone: 'primary',
    finishedAt: '3 bulan lalu, 08:30',
    statusLabel: 'Selesai',
    statusTone: 'neutral',
    actionLabel: 'Lihat Rapor',
    actionVariant: 'primary',
  },
  {
    id: 'act-24',
    iconType: 'kuis-harian',
    title: 'Operasi Hitung Pecahan',
    subtitle: '10 Soal Objektif Pilihan Ganda',
    category: 'Kuis Harian',
    scoreLabel: '95 / 100',
    scoreTone: 'primary',
    finishedAt: '3 bulan lalu, 15:50',
    statusLabel: 'Sempurna',
    statusTone: 'primary',
    actionLabel: 'Lihat Pembahasan',
    actionVariant: 'primary',
  },
]

export const ACTIVITY_PAGE_SIZE = 4

/**
 * Bentuk respons getActivities selalu `{ items, total }` agar sama antara
 * hasil mock & hasil backend kelak. Mock menyaring kategori lalu memotong
 * sesuai halaman agar paginasi terasa seperti data asli.
 */
function buildMockActivities({ page = 1, category = 'all' } = {}) {
  const filtered =
    category === 'all'
      ? MOCK_ACTIVITIES
      : MOCK_ACTIVITIES.filter((item) => item.category === category)

  const total = filtered.length
  const start = (page - 1) * ACTIVITY_PAGE_SIZE
  const items = filtered.slice(start, start + ACTIVITY_PAGE_SIZE)

  return { items, total }
}

/**
 * Permintaan backend yang toleran terhadap kegagalan: bila endpoint belum
 * aktif (backend belum dideploy), gunakan data contoh agar halaman tetap
 * tampil. Hapus fallback ini setelah endpoint backend stabil berjalan.
 */
async function fetchWithFallback(path, fallback) {
  try {
    return await api.get(path)
  } catch (error) {
    console.warn(
      `[Riwayat-Diagnostik] Gagal memuat ${path}, menggunakan data contoh. (${error.message})`,
    )
    return fallback
  }
}

// Ringkasan skor diagnostik, kekuatan utama, area latihan, & rekomendasi jalur
export const getDiagnosticSummary = () =>
  fetchWithFallback('/diagnostic/summary', MOCK_SUMMARY)

// Tren penguasaan topik per capaian pembelajaran Fase F
export const getTopicMastery = () =>
  fetchWithFallback('/diagnostic/topic-mastery', MOCK_TOPIC_MASTERY)

// Riwayat aktivitas dengan paginasi & filter kategori -> { items, total }
export const getActivities = ({ page = 1, category = 'all' } = {}) =>
  fetchWithFallback(
    `/diagnostic/activities?page=${page}&category=${encodeURIComponent(category)}`,
    buildMockActivities({ page, category }),
  )
