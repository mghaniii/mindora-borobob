import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchKuisConfig, submitLatihan } from '../services/latihanService.js'

const formatTime = (totalSeconds) => {
  const seconds = Math.max(0, totalSeconds)
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

const createSubmissionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16)
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

const getErrorMessage = (error, fallback) =>
  typeof error === 'string' ? error : error?.data?.message || error?.message || fallback

export default function useLatihanKuis(itemId) {
  const [config, setConfig] = useState(null)
  const [status, setStatus] = useState('loading')
  const [loadError, setLoadError] = useState(null)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [result, setResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const submissionIdRef = useRef(null)
  const submitInFlightRef = useRef(false)
  const autoSubmitAttemptedRef = useRef(false)
  const startedAtRef = useRef(null)
  const deadlineRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    fetchKuisConfig(itemId)
      .then((nextConfig) => {
        if (cancelled) return
        if (!nextConfig) {
          setStatus('not-found')
          return
        }
        submissionIdRef.current = createSubmissionId()
        autoSubmitAttemptedRef.current = false
        startedAtRef.current = Date.now()
        deadlineRef.current = startedAtRef.current + nextConfig.durationSeconds * 1000
        setConfig(nextConfig)
        setCurrentIndex(0)
        setAnswers({})
        setResult(null)
        setSubmitError(null)
        setIsSubmitting(false)
        setTimeRemaining(nextConfig.durationSeconds)
        setStatus('active')
      })
      .catch((error) => {
        if (cancelled) return
        setLoadError(error)
        setStatus(error.status === 404 ? 'not-found' : 'error')
      })

    return () => {
      cancelled = true
    }
  }, [itemId, loadAttempt])

  const questions = useMemo(() => config?.questions ?? [], [config])
  const currentQuestion = questions[currentIndex] ?? null
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? null : null

  const submitTest = useCallback(async () => {
    if (!config || submitInFlightRef.current || status === 'finished') return

    submitInFlightRef.current = true
    setIsSubmitting(true)
    setSubmitError(null)

    const answerRows = questions.map((question) => ({
      questionId: question.id,
      selectedOption: answers[question.id]?.selectedOption ?? null,
      isDoubtful: Boolean(answers[question.id]?.isDoubtful),
    }))

    try {
      const serverResult = await submitLatihan(config.id, {
        submissionId: submissionIdRef.current,
        answers: answerRows,
        timeSpentSeconds: Math.min(
          config.durationSeconds,
          Math.max(0, Math.floor((Date.now() - (startedAtRef.current || Date.now())) / 1000)),
        ),
      })
      setResult(serverResult)
      setStatus('finished')
    } catch (error) {
      setSubmitError(error)
    } finally {
      submitInFlightRef.current = false
      setIsSubmitting(false)
    }
  }, [answers, config, questions, status])

  const submitRef = useRef(submitTest)
  useEffect(() => {
    submitRef.current = submitTest
  }, [submitTest])

  useEffect(() => {
    if (status !== 'active') return undefined
    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil(((deadlineRef.current || Date.now()) - Date.now()) / 1000))
      setTimeRemaining(remaining)
    }
    updateRemaining()
    const timer = setInterval(updateRemaining, 1000)
    return () => clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (
      status === 'active'
      && timeRemaining === 0
      && !isSubmitting
      && !autoSubmitAttemptedRef.current
    ) {
      autoSubmitAttemptedRef.current = true
      submitRef.current()
    }
  }, [isSubmitting, status, timeRemaining])

  const selectOption = useCallback((optionId) => {
    if (!currentQuestion || status !== 'active' || isSubmitting) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: { ...previous[currentQuestion.id], selectedOption: optionId },
    }))
  }, [currentQuestion, isSubmitting, status])

  const toggleDoubtful = useCallback(() => {
    if (!currentQuestion || status !== 'active' || isSubmitting) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        ...previous[currentQuestion.id],
        isDoubtful: !previous[currentQuestion.id]?.isDoubtful,
      },
    }))
  }, [currentQuestion, isSubmitting, status])

  const goToQuestion = useCallback((index) => {
    if (isSubmitting || index < 0 || index >= questions.length) return
    setCurrentIndex(index)
  }, [isSubmitting, questions.length])

  const nextQuestion = useCallback(() => {
    if (isSubmitting) return
    if (currentIndex >= questions.length - 1) {
      submitTest()
      return
    }
    setCurrentIndex((index) => index + 1)
  }, [currentIndex, isSubmitting, questions.length, submitTest])

  const prevQuestion = useCallback(() => {
    if (isSubmitting) return
    setCurrentIndex((index) => Math.max(0, index - 1))
  }, [isSubmitting])

  const restart = useCallback(() => {
    if (!config || isSubmitting) return
    submissionIdRef.current = createSubmissionId()
    autoSubmitAttemptedRef.current = false
    startedAtRef.current = Date.now()
    deadlineRef.current = startedAtRef.current + config.durationSeconds * 1000
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setSubmitError(null)
    setTimeRemaining(config.durationSeconds)
    setStatus('active')
  }, [config, isSubmitting])

  const retry = useCallback(() => {
    setStatus('loading')
    setLoadError(null)
    setLoadAttempt((value) => value + 1)
  }, [])

  const answeredCount = useMemo(
    () => Object.values(answers).filter((answer) => answer?.selectedOption).length,
    [answers],
  )

  return {
    config,
    status,
    loadError,
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
    isSubmitting,
    submitError: submitError
      ? getErrorMessage(submitError, 'Kuis gagal dikirim. Jawabanmu tetap tersimpan di halaman ini.')
      : null,
    submitErrorStatus: submitError?.status ?? null,
    selectOption,
    toggleDoubtful,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitTest,
    restart,
    retry,
  }
}
