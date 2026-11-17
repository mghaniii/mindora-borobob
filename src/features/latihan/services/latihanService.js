/**
 * Service & Mock Data Model untuk Fitur Latihan & Kuis
 */
import { api } from '../../../services/api.js'

// 1. Data Ringkasan Statistik Harian (Top Bar)
export const DAILY_STATS = {
  targetCompleted: 5,
  targetTotal: 8,
  streakDays: 3,
  todayXp: 80,
}

// 2. Data Opsi Filter Topik (Kategori Tab)
export const TOPIK_OPTIONS = [
  { id: 'all', label: 'Semua Topik SMA 11' },
  { id: 'matriks', label: 'Matriks & SPLDV' },
  { id: 'komposisi', label: 'Fungsi Komposisi' },
  { id: 'kalkulus', label: 'Limit & Turunan' },
  { id: 'statistika', label: 'Statistika Lanjut' },
]

// 3. Data Pilihan Urutkan
export const SORT_OPTIONS = [
  { value: 'rekomendasi', label: 'Rekomendasi Pintar' },
  { value: 'terbaru', label: 'Latihan Terbaru' },
  { value: 'xp', label: 'XP Tertinggi' },
  { value: 'durasi', label: 'Durasi Tersingkat' },
]

// 4. Data 4 Kartu Latihan (Sesuai Desain Desktop)
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
    actionButton: {
      label: 'Kerjakan',
      variant: 'primary', // ungu solid
      icon: 'arrow-right',
    },
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
    actionButton: {
      label: 'Mulai Drill',
      variant: 'drill', // indigo solid
      icon: 'play',
    },
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
    actionButton: {
      label: 'Tantangan',
      variant: 'challenge', // oranye solid
      icon: 'external-link',
    },
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
    tag: {
      label: 'Remediasi',
      variant: 'danger',
    },
    iconType: 'warning-refresh',
    actionButton: {
      label: 'Perbaiki',
      variant: 'neutral', // abu-abu lembut
      icon: 'refresh',
    },
  },
]

// 5. Data Banner Kuis Harian Adaptif
export const KUIS_HARIAN = {
  badge: 'Kuis Adaptif Harian',
  meta: '10 Soal • Estimasi 15 Menit',
  title: 'Siap Evaluasi Pemahaman? Lanjut ke Kuis Harian: Matriks & Determinan 2×2',
  actionLabel: 'Mulai Kuis Sekarang',
}

// 6. Data Performa Matriks (Widget Statistik Bawah)
export const PERFORMA_MATRIKS = {
  accuracy: {
    label: 'Rata-Rata Akurasi',
    value: '88%',
    growth: '+6%',
  },
  speed: {
    label: 'Kecepatan Rata-Rata',
    value: '1m 15s',
    unit: '/ soal',
  },
  readiness: {
    label: 'Kesiapan Bab',
    value: '82%',
    statusBadge: 'Siap',
  },
}

// 7. Bank Soal Kuis Latihan
// Pola teks soal: {variabel} = sorotan ungu, ~variabel~ = sorotan oranye.
const LETTERS = ['A', 'B', 'C', 'D']
const q = (id, difficulty, points, text, optionLabels, correctOption, visual = null) => ({
  id,
  difficulty,
  points,
  text,
  options: optionLabels.map((label, i) => ({ id: LETTERS[i], label })),
  correctOption,
  visual,
})
const mx = (label, rows) => ({ label, rows })

const SOAL_LAT_1 = [
  q('l1-1', 'mudah', 5, 'Diketahui matriks {A} dan {B} seperti di bawah. Elemen baris ke-2 kolom ke-1 dari {A + B} adalah…', ['2', '3', '4', '9'], 'B', { matrices: [mx('A', [[2, 3], [1, 4]]), mx('B', [[1, 0], [2, 5]])], operator: '+' }),
  q('l1-2', 'mudah', 5, 'Hasil perkalian skalar {3A} memiliki elemen baris ke-1 kolom ke-2 sebesar…', ['-3', '3', '-1', '12'], 'A', { matrices: [mx('A', [[2, -1], [0, 4]])] }),
  q('l1-3', 'menengah', 10, 'Jumlah elemen diagonal utama (trace) dari {A + B} adalah…', ['4', '5', '6', '10'], 'B', { matrices: [mx('A', [[1, 2], [3, 4]]), mx('B', [[0, 1], [1, 0]])], operator: '+' }),
  q('l1-4', 'menengah', 10, 'Elemen baris ke-2 kolom ke-2 dari {2A − B} adalah…', ['3', '2', '4', '5'], 'A', { matrices: [mx('A', [[3, 1], [2, 2]]), mx('B', [[1, 0], [1, 1]])], operator: '−' }),
  q('l1-5', 'menengah', 10, 'Sifat {(A + B) + C = A + (B + C)} pada penjumlahan matriks disebut sifat…', ['Komutatif', 'Asosiatif', 'Distributif', 'Identitas'], 'B'),
  q('l1-6', 'sulit', 15, 'Jika {A = B}, maka nilai {x + y} adalah…', ['3', '4', '5', '6'], 'C', { matrices: [mx('A', [['x', 2], [3, 4]]), mx('B', [[1, 2], [3, 'y']])], operator: '=' }),
]

const SOAL_LAT_2 = [
  q('l2-1', 'mudah', 5, 'Determinan dari matriks {M} adalah…', ['5', '6', '11', '-5'], 'A', { matrices: [mx('M', [[2, 1], [3, 4]])] }),
  q('l2-2', 'mudah', 5, 'Matriks {M} disebut singular karena determinannya bernilai…', ['0', '1', '20', '40'], 'A', { matrices: [mx('M', [[5, 2], [10, 4]])] }),
  q('l2-3', 'menengah', 10, 'Diketahui matriks {P} dan matriks {Q} di bawah ini. Jika determinan dari matriks hasil penjumlahan (P + Q) adalah ~k~, berapakah nilai dari {2k}?', ['30', '60', '54', '72'], 'B', { matrices: [mx('P', [[4, -2], [3, 1]]), mx('Q', [[1, 2], [0, 5]])], operator: '+' }),
  q('l2-4', 'menengah', 10, 'Elemen baris ke-1 kolom ke-2 dari {M⁻¹} adalah…', ['1', '-1', '2', '-2'], 'A', { matrices: [mx('M', [[4, 2], [3, 1]])] }),
  q('l2-5', 'menengah', 10, 'Determinan dari matriks {M} adalah…', ['10', '12', '14', '16'], 'C', { matrices: [mx('M', [[3, -2], [1, 4]])] }),
  q('l2-6', 'sulit', 15, 'Jika {det(A) = 3} dan {det(B) = 4}, maka {det(AB)} sama dengan…', ['7', '12', '1', '81'], 'B'),
  q('l2-7', 'sulit', 15, 'Matriks {M} tidak memiliki invers (singular). Nilai {x} yang memenuhi adalah…', ['1', '2', '3', '6'], 'A', { matrices: [mx('M', [['2x', 3], [4, 6]])] }),
  q('l2-8', 'sulit', 15, 'Elemen baris ke-2 kolom ke-1 dari {M⁻¹} adalah…', ['2', '-2', '5', '-5'], 'B', { matrices: [mx('M', [[1, 2], [2, 5]])] }),
]

const SOAL_LAT_3 = [
  q('l3-1', 'menengah', 10, 'Harga {2 buku + 1 pensil} adalah Rp8.000, sedangkan {1 buku + 2 pensil} Rp7.000. Jika dimodelkan sebagai {AX = B}, harga satu buku adalah…', ['Rp2.000', 'Rp3.000', 'Rp4.000', 'Rp5.000'], 'B'),
  q('l3-2', 'menengah', 10, 'Determinan matriks koefisien dari sistem {2x + y = 8.000} dan {x + 2y = 7.000} adalah…', ['1', '2', '3', '5'], 'C'),
  q('l3-3', 'sulit', 15, 'Toko roti menjual paket {3 roti + 2 susu} seharga Rp24.000 dan {1 roti + 3 susu} seharga Rp22.000. Harga satu susu adalah…', ['Rp4.000', 'Rp5.000', 'Rp6.000', 'Rp7.000'], 'C'),
  q('l3-4', 'sulit', 15, 'Sistem {AX = B} dengan matriks {A} di bawah dan {B} = [5; 1] memiliki solusi {x} dan {y}. Nilai {x · y} adalah…', ['5', '6', '8', '9'], 'B', { matrices: [mx('A', [[1, 1], [2, -1]])] }),
  q('l3-5', 'menengah', 10, 'Sistem persamaan linear {AX = B} memiliki solusi tunggal jika dan hanya jika…', ['det(A) = 0', 'det(A) ≠ 0', 'A matriks nol', 'B matriks nol'], 'B'),
]

const SOAL_LAT_4 = [
  q('l4-1', 'mudah', 5, 'Pada invers matriks {M}, elemen baris ke-1 kolom ke-2 bernilai…', ['-3/5', '3/5', '-1/5', '4/5'], 'A', { matrices: [mx('M', [[2, 3], [1, 4]])] }),
  q('l4-2', 'menengah', 10, 'Rumus invers {A⁻¹ = (1/det(A))·adj(A)}. Untuk {A} = [a b; c d], elemen diagonal samping pada adj(A) bertanda…', ['Positif keduanya', 'Negatif keduanya', 'a positif, d negatif', 'b positif, c negatif'], 'B'),
  q('l4-3', 'menengah', 10, 'Elemen baris ke-1 kolom ke-2 dari {M⁻¹} adalah…', ['3', '-3', '7', '-2'], 'B', { matrices: [mx('M', [[1, 3], [2, 7]])] }),
]

export const KUIS_HARIAN_ID = 'kuis-harian'

const SOAL_KUIS_HARIAN = [
  q('kh-1', 'mudah', 5, 'Ordo dari matriks {M} di bawah adalah…', ['2×2', '2×3', '3×2', '3×3'], 'B', { matrices: [mx('M', [[2, 3, 1], [4, 0, 5]])] }),
  q('kh-2', 'mudah', 5, 'Determinan dari matriks {M} adalah…', ['10', '12', '14', '2'], 'A', { matrices: [mx('M', [[3, 1], [2, 4]])] }),
  { ...SOAL_LAT_2[2], id: 'kh-3' },
  { ...SOAL_LAT_1[2], id: 'kh-4' },
  { ...SOAL_LAT_2[3], id: 'kh-5' },
  { ...SOAL_LAT_2[6], id: 'kh-6' },
  { ...SOAL_LAT_3[0], id: 'kh-7' },
  { ...SOAL_LAT_1[1], id: 'kh-8' },
  { ...SOAL_LAT_2[5], id: 'kh-9' },
  { ...SOAL_LAT_4[2], id: 'kh-10' },
]

const QUESTION_BANK = {
  'lat-1': SOAL_LAT_1,
  'lat-2': SOAL_LAT_2,
  'lat-3': SOAL_LAT_3,
  'lat-4': SOAL_LAT_4,
  [KUIS_HARIAN_ID]: SOAL_KUIS_HARIAN,
}

const FORMULA_PER_ITEM = {
  'lat-1': { title: 'Sifat Perkalian Skalar', expression: 'k·(A + B) = k·A + k·B' },
  'lat-2': { title: 'Rumus Determinan 2×2', expression: 'det(M) = (a·d) - (b·c)' },
  'lat-3': { title: 'Solusi SPLDV Matriks', expression: 'AX = B  ⇒  X = A⁻¹·B' },
  'lat-4': { title: 'Rumus Invers 2×2', expression: 'A⁻¹ = (1/det)·[d -b; -c a]' },
  [KUIS_HARIAN_ID]: { title: 'Rumus Determinan 2×2', expression: 'det(M) = (a·d) - (b·c)' },
}

const KUIS_PHASE = 'Fase F SMA • Matematika Wajib'

function buildMockKuisConfig(itemId) {
  if (itemId === KUIS_HARIAN_ID) {
    return {
      id: itemId,
      title: 'Kuis Harian: Matriks & Determinan 2×2',
      phase: KUIS_PHASE,
      durationSeconds: 15 * 60,
      xpReward: 100,
      formula: FORMULA_PER_ITEM[itemId],
      questions: QUESTION_BANK[itemId],
    }
  }
  const item = LATIHAN_ITEMS.find((i) => i.id === itemId)
  if (!item || !QUESTION_BANK[item.id]) return null
  return {
    id: item.id,
    title: item.title,
    phase: KUIS_PHASE,
    durationSeconds: item.durationMinutes * 60,
    xpReward: item.xpReward ?? 20,
    formula: FORMULA_PER_ITEM[item.id],
    questions: QUESTION_BANK[item.id],
  }
}

// 8. Kontrak endpoint kuis: GET /latihan/:itemId/kuis (fallback mock saat backend belum tersedia)
export async function fetchKuisConfig(itemId) {
  try {
    return await api.get(`/latihan/${itemId}/kuis`)
  } catch (error) {
    console.warn(`[latihanService] Backend belum tersedia, memakai mock kuis "${itemId}":`, error.message)
    return buildMockKuisConfig(itemId)
  }
}

