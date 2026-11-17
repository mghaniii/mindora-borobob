import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchKuisConfig } from '../services/latihanService.js'

const formatTime = (totalSeconds) => {
  const s = Math.max(0, totalSeconds)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/**
 * Logika pengerjaan kuis latihan: timer, jawaban, ragu-ragu, navigasi, dan hasil.
 */
export default function useLatihanKuis(itemId) {
  const [config, setConfig] = useState(null)
  const [status, setStatus] = useState('loading') // loading | active | finished | not-found
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchKuisConfig(itemId).then((cfg) => {
      if (cancelled) return
      if (!cfg) {
        setStatus('not-found')
        return
      }
      setConfig(cfg)
      setCurrentIndex(0)
      setAnswers({})
      setResult(null)
      setTimeRemaining(cfg.durationSeconds)
      setStatus('active')
    })
    return () => {
      cancelled = true
    }
  }, [itemId])

  const questions = config?.questions ?? []
  const currentQuestion = questions[currentIndex] ?? null
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? null : null

  const submitTest = useCallback(() => {
    if (!config) return
    const review = config.questions.map((question, index) => {
      const answer = answers[question.id] ?? null
      const selectedOption = answer?.selectedOption ?? null
      return {
        number: index + 1,
        questionId: question.id,
        text: question.text,
        points: question.points,
        selectedOption,
        correctOption: question.correctOption,
        isCorrect: selectedOption === question.correctOption,
        isDoubtful: answer?.isDoubtful ?? false,
      }
    })
    const correctCount = review.filter((r) => r.isCorrect).length
    const answeredCount = review.filter((r) => r.selectedOption).length
    const earnedPoints = review.filter((r) => r.isCorrect).reduce((sum, r) => sum + r.points, 0)
    const totalPoints = review.reduce((sum, r) => sum + r.points, 0)
    setResult({
      totalQuestions: config.questions.length,
      answeredCount,
      correctCount,
      earnedPoints,
      totalPoints,
      accuracyPercent: Math.round((correctCount / config.questions.length) * 100),
      xpEarned: Math.round((config.xpReward * correctCount) / config.questions.length),
      timeSpentSeconds: config.durationSeconds - Math.max(0, timeRemaining),
      review,
    })
    setStatus('finished')
  }, [config, answers, timeRemaining])

  const submitRef = useRef(submitTest)
  const remainingRef = useRef(timeRemaining)
  useEffect(() => {
    submitRef.current = submitTest
    remainingRef.current = timeRemaining
  })

  useEffect(() => {
    if (status !== 'active') return undefined
    const timer = setInterval(() => {
      const next = remainingRef.current - 1
      remainingRef.current = next
      setTimeRemaining(next)
      if (next <= 0) {
        clearInterval(timer)
        submitRef.current()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [status])

  const selectOption = useCallback(
    (optionId) => {
      if (!currentQuestion || status !== 'active') return
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: { ...prev[currentQuestion.id], selectedOption: optionId },
      }))
    },
    [currentQuestion, status],
  )

  const toggleDoubtful = useCallback(() => {
    if (!currentQuestion || status !== 'active') return
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isDoubtful: !prev[currentQuestion.id]?.isDoubtful,
      },
    }))
  }, [currentQuestion, status])

  const goToQuestion = useCallback(
    (index) => {
      if (index < 0 || index >= questions.length) return
      setCurrentIndex(index)
    },
    [questions.length],
  )

  const nextQuestion = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      submitTest()
      return
    }
    setCurrentIndex((i) => i + 1)
  }, [currentIndex, questions.length, submitTest])

  const prevQuestion = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), [])

  const restart = useCallback(() => {
    if (!config) return
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setTimeRemaining(config.durationSeconds)
    setStatus('active')
  }, [config])

  const answeredCount = useMemo(
    () => Object.values(answers).filter((a) => a?.selectedOption).length,
    [answers],
  )

  return {
    config,
    status,
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    currentAnswer,
    answers,
    answeredCount,
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    result,
    selectOption,
    toggleDoubtful,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitTest,
    restart,
  }
}