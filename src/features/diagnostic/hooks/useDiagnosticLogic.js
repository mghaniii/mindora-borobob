import { useState, useEffect, useCallback } from 'react'

/**
 * Data awal simulasi tes diagnostik adaptif matematika
 * Terstruktur tujuan kedepannya response REST API backend / database
 */
const INITIAL_QUESTIONS = [
  {
    id: 1,
    number: 1,
    category: 'PENJUMLAHAN',
    topic: 'ADAPTIF MATEMATIKA DASAR',
    questionText: '27 + 35 = ....',
    instruction: 'Evaluasi hasil operasi penjumlahan di atas dengan memilih salah satu jawaban yang paling tepat.',
    alertMessage: 'Perhatikan digit puluhan dan satuan secara terpisah untuk meminimalisir kesalahan perhitungan.',
    stepsHeader: 'CARA PENYELESAIAN BERSUSUN',
    stepsBadge: 'Langkah demi Langkah',
    steps: [
      {
        step: 1,
        title: 'Kolom Satuan (Digit Terakhir)',
        formula: '7 + 5',
        description: 'Hitung penjumlahan digit satuan: 7 + 5 = 12. Tulis angka 2 pada kolom satuan, lalu simpan 1 di atas kolom puluhan.',
      },
      {
        step: 2,
        title: 'Kolom Puluhan Bersama Simpanan',
        formula: '1 + 2 + 3',
        description: 'Jumlahkan simpanan bersama digit puluhan: 1 (simpanan) + 2 + 3 = 6. Tulis angka 6 pada kolom puluhan.',
      },
      {
        step: 3,
        title: 'Penggabungan Puluhan & Satuan',
        formula: '60 + 2',
        description: 'Gabungkan nilai puluhan dan satuan untuk mendapatkan hasil akhir: 60 + 2 = 62.',
      },
    ],
    finalResult: {
      equation: '27 + 35 = 62',
      correctOptionLabel: 'Jawaban Benar: Opsi B',
    },
    options: [
      { id: 'A', label: '12', isCorrect: false },
      { id: 'B', label: '62', isCorrect: true },
      { id: 'C', label: '70', isCorrect: false },
      { id: 'D', label: '32', isCorrect: false },
    ],
    hint: 'Gunakan penguraian nilai tempat: (20 + 30) + (7 + 5) = 50 + 12 = 62. Pisahkan puluhan dan satuan agar dapat dikalkulasikan seketika di memori tanpa coret-coretan pensil.',
    hintTag: 'Dekomposisi Nilai Tempat',
    correctOption: 'B',
  },
  {
    id: 2,
    number: 2,
    category: 'PENJUMLAHAN TIGA ANGKA',
    topic: 'ADAPTIF MATEMATIKA DASAR',
    questionText: '146 + 238 = ....',
    instruction: 'Tentukan hasil penjumlahan bilangan tiga angka di atas dengan teliti.',
    alertMessage: 'Perhatikan teknik menyimpan saat menjumlahkan nilai satuan ke puluhan.',
    stepsHeader: 'CARA PENYELESAIAN BERSUSUN',
    stepsBadge: 'Langkah demi Langkah',
    steps: [
      {
        step: 1,
        title: 'Penjumlahan Digit Satuan',
        formula: '6 + 8',
        description: 'Hitung penjumlahan digit satuan: 6 + 8 = 14. Tulis angka 4 pada kolom satuan, lalu simpan 1 di atas kolom puluhan.',
      },
      {
        step: 2,
        title: 'Penjumlahan Digit Puluhan',
        formula: '1 + 4 + 3',
        description: 'Jumlahkan digit puluhan bersama angka simpanan: 1 (simpanan) + 4 + 3 = 8. Tulis angka 8 pada kolom puluhan.',
      },
      {
        step: 3,
        title: 'Penjumlahan Digit Ratusan',
        formula: '1 + 2',
        description: 'Jumlahkan digit ratusan: 1 + 2 = 3. Tulis angka 3 pada kolom ratusan. Hasil keseluruhan adalah 384.',
      },
    ],
    finalResult: {
      equation: '146 + 238 = 384',
      correctOptionLabel: 'Jawaban Benar: Opsi B',
    },
    options: [
      { id: 'A', label: '374', isCorrect: false },
      { id: 'B', label: '384', isCorrect: true },
      { id: 'C', label: '394', isCorrect: false },
      { id: 'D', label: '404', isCorrect: false },
    ],
    hint: '(100 + 200) + (40 + 30) + (6 + 8) = 300 + 70 + 14 = 384. Pisahkan per nilai tempat ratusan, puluhan, dan satuan untuk kalkulasi instan di kepala.',
    hintTag: 'Pengelompokan Ratusan',
    correctOption: 'B',
  },
  {
    id: 3,
    number: 3,
    category: 'PERKALIAN',
    topic: 'ADAPTIF MATEMATIKA DASAR',
    questionText: '14 × 6 = ....',
    instruction: 'Hitunglah hasil perkalian bilangan di atas.',
    alertMessage: 'Uraikan angka 14 menjadi penjumlahan puluhan dan satuan sebelum mengalikan.',
    stepsHeader: 'CARA PENYELESAIAN BERSUSUN',
    stepsBadge: 'Langkah demi Langkah',
    steps: [
      {
        step: 1,
        title: 'Kalikan Nilai Puluhan',
        formula: '10 × 6',
        description: 'Kalikan digit puluhan dengan pengali: 10 × 6 = 60.',
      },
      {
        step: 2,
        title: 'Kalikan Nilai Satuan',
        formula: '4 × 6',
        description: 'Kalikan digit satuan dengan pengali: 4 × 6 = 24.',
      },
      {
        step: 3,
        title: 'Jumlahkan Kedua Hasil Perkalian',
        formula: '60 + 24',
        description: 'Jumlahkan hasil perkalian puluhan dan satuan: 60 + 24 = 84.',
      },
    ],
    finalResult: {
      equation: '14 × 6 = 84',
      correctOptionLabel: 'Jawaban Benar: Opsi C',
    },
    options: [
      { id: 'A', label: '64', isCorrect: false },
      { id: 'B', label: '74', isCorrect: false },
      { id: 'C', label: '84', isCorrect: true },
      { id: 'D', label: '94', isCorrect: false },
    ],
    hint: 'Pisahkan menjadi (10 × 6) + (4 × 6) = 60 + 24 = 84.',
    hintTag: 'Distributif Perkalian',
    correctOption: 'C',
  },
  {
    id: 4,
    number: 4,
    category: 'PERKALIAN BERSUSUN',
    topic: 'ADAPTIF MATEMATIKA DASAR',
    questionText: '24 × 15 = ....',
    instruction: 'Evaluasi jawaban perkalian bersusun dua digit di atas.',
    alertMessage: 'Perhatikan digit puluhan dan satuan pengali secara terpisah saat mengalikan bersusun.',
    stepsHeader: 'CARA PENYELESAIAN BERSUSUN',
    stepsBadge: 'Langkah demi Langkah',
    steps: [
      {
        step: 1,
        title: 'Perkalian dengan Satuan Pengali (angka 5)',
        formula: '24 × 5',
        description: 'Kalikan 4 × 5 = 20 (tulis 0, simpan 2). Lalu 2 × 5 = 10 + 2 = 12 . Hasil baris pertama: 120.',
      },
      {
        step: 2,
        title: 'Perkalian dengan Puluhan Pengali (angka 1)',
        formula: '24 × 10',
        description: 'Kalikan 24 dengan 1 puluhan (geser 1 posisi ke kiri): 24 × 1 = 24 . Hasil baris kedua: 240.',
      },
      {
        step: 3,
        title: 'Penjumlahan Hasil Baris',
        formula: '120 + 240',
        description: 'Jumlahkan kedua baris perhitungan: 120 + 240 = 360 .',
      },
    ],
    finalResult: {
      equation: '24 × 15 = 360',
      correctOptionLabel: 'Jawaban Benar: Opsi A',
    },
    options: [
      { id: 'A', label: '360', isCorrect: true },
      { id: 'B', label: '240', isCorrect: false },
      { id: 'C', label: '340', isCorrect: false },
      { id: 'D', label: '380', isCorrect: false },
    ],
    hint: '24 × 15 = (24 ÷ 2) × (15 × 2) = 12 × 30 = 360! Sangat mudah dihitung di luar kepala.',
    hintTag: 'Aturan Dobel & Separuh',
    correctOption: 'A',
  },
]

// Lengkapi soal 4 sampai 15 secara dinamis jika diperlukan
// for (let i = 4; i <= 15; i++) {
//   INITIAL_QUESTIONS.push({
//     id: i,
//     number: i,
//     category: i % 2 === 0 ? 'ALJABAR DASAR' : 'PECAHAN',
//     topic: 'ADAPTIF MATEMATIKA DASAR',
//     questionText: i % 2 === 0 ? `Tentukan nilai x jika 2x + ${i} = ${i * 3}` : `Hitunglah: 1/${(i % 4) + 2} + 2/${(i % 4) + 2} = ....`,
//     instruction: 'Pilihlah salah satu jawaban yang menurut Anda paling tepat.',
//     alertMessage: 'Selesaikan persamaan atau samakan penyebut pecahan sebelum menjumlahkan.',
//     steps: [
//       { step: 1, label: `Langkah analisis perhitungan awal nomor ${i}` },
//       { step: 2, label: `Sederhanakan kedua ruas persamaan` },
//       { step: 3, label: `Hasil akhir nomor ${i}: ${i * 2}`, isResult: true },
//     ],
//     options: [
//       { id: 'A', label: `${i * 2 - 1}` },
//       { id: 'B', label: `${i * 2}` },
//       { id: 'C', label: `${i * 2 + 1}` },
//       { id: 'D', label: `${i * 2 + 2}` },
//     ],
//     hint: 'Fokus pada langkah dekomposisi awal sebelum menghitung hasil akhir.',
//     correctOption: 'B',
//   })
// }

/**
 * Custom Hook: useDiagnosticLogic
 * Menangani state diagnostik, timer mundur, penyimpanan jawaban, reset opsi, dan pengiriman ke backend
 */
export function useDiagnosticLogic({ totalTimeSeconds = 600, onComplete } = {}) {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { [questionId]: { selectedOption: 'B', isDoubtful: false } }
  const [timeRemaining, setTimeRemaining] = useState(totalTimeSeconds)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  // Timer mundur otomatis
  useEffect(() => {
    if (isFinished || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isFinished, timeRemaining])

  // Format waktu MM:SS (contoh 09:40)
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [timeRemaining])

  const currentQuestion = questions[currentIndex] || questions[0]
  const currentAnswer = answers[currentQuestion.id] || null

  // Aksi memilih jawaban
  const handleSelectOption = (optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: optionId,
        isDoubtful: prev[currentQuestion.id]?.isDoubtful || false,
      },
    }))
  }

  // Aksi "Coba Ulang" (Mereset jawaban pada soal aktif)
  const handleResetAnswer = () => {
    setAnswers((prev) => {
      const updated = { ...prev }
      if (updated[currentQuestion.id]) {
        updated[currentQuestion.id] = {
          ...updated[currentQuestion.id],
          selectedOption: null,
        }
      }
      return updated
    })
  }

  // Aksi menandai ragu-ragu
  const handleToggleDoubtful = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: prev[currentQuestion.id]?.selectedOption || null,
        isDoubtful: !prev[currentQuestion.id]?.isDoubtful,
      },
    }))
  }

  // Navigasi soal
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleGoToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index)
    }
  }

  // Pengiriman data jawaban akhir (Siap kirim ke Backend API)
  const handleSubmitTest = async () => {
    setIsSubmitting(true)

    const submissionPayload = {
      completedAt: new Date().toISOString(),
      totalTimeSpentSeconds: totalTimeSeconds - timeRemaining,
      totalQuestions: questions.length,
      answers: Object.entries(answers).map(([qId, ans]) => ({
        questionId: Number(qId),
        selectedOption: ans.selectedOption,
        isDoubtful: Boolean(ans.isDoubtful),
      })),
    }

    console.log('[Diagnostic] Payload Siap Backend:', submissionPayload)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsFinished(true)
      if (onComplete) {
        onComplete(submissionPayload)
      }
    }, 600)
  }

  // Status progres
  const totalAnswered = Object.values(answers).filter((a) => a.selectedOption).length
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    currentAnswer,
    answers,
    timeRemaining,
    formattedTime: formattedTime(),
    progressPercent,
    totalAnswered,
    isSubmitting,
    isFinished,
    // Actions
    selectOption: handleSelectOption,
    resetCurrentAnswer: handleResetAnswer,
    toggleDoubtful: handleToggleDoubtful,
    nextQuestion: handleNext,
    prevQuestion: handlePrev,
    goToQuestion: handleGoToQuestion,
    submitTest: handleSubmitTest,
  }
}

export default useDiagnosticLogic
