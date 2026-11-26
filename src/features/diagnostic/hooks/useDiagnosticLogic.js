import { useState, useEffect, useCallback, useRef } from 'react'
import { getDiagnosticQuestions, submitDiagnostic } from '../services/diagnosticService.js'

const getErrorMessage = (error, fallback) =>
  typeof error === 'string' ? error : error?.data?.message || error?.message || fallback

const createSubmissionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16)
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export function useDiagnosticLogic({ totalTimeSeconds = 600, onComplete } = {}) {
  const [questions, setQuestions] = useState([])
  const [questionsStatus, setQuestionsStatus] = useState('loading')
  const [loadError, setLoadError] = useState(null)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(totalTimeSeconds)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [completionResult, setCompletionResult] = useState(null)
  const submissionIdRef = useRef(null)
  const submitInFlightRef = useRef(false)
  const autoSubmitAttemptedRef = useRef(false)
  const startedAtRef = useRef(null)
  const deadlineRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    getDiagnosticQuestions()
      .then((items) => {
        if (cancelled) return
        if (!Array.isArray(items) || items.length === 0) {
          setQuestions([])
          setLoadError('Soal diagnostik belum tersedia.')
          setQuestionsStatus('error')
          return
        }
        setQuestions(items)
        setQuestionsStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return
        setLoadError(error)
        setQuestionsStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [loadAttempt])

  const retryLoadQuestions = useCallback(() => {
    setQuestionsStatus('loading')
    setLoadError(null)
    setLoadAttempt((value) => value + 1)
  }, [])

  const currentQuestion = questions[currentIndex] || null
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] || null : null

  const startTest = useCallback(() => {
    if (questionsStatus !== 'ready' || questions.length === 0) return
    submissionIdRef.current = createSubmissionId()
    autoSubmitAttemptedRef.current = false
    startedAtRef.current = Date.now()
    deadlineRef.current = startedAtRef.current + totalTimeSeconds * 1000
    setAnswers({})
    setCurrentIndex(0)
    setTimeRemaining(totalTimeSeconds)
    setSubmitError(null)
    setCompletionResult(null)
    setIsFinished(false)
    setIsStarted(true)
  }, [questions, questionsStatus, totalTimeSeconds])

  const handleSubmitTest = useCallback(async () => {
    if (submitInFlightRef.current || questions.length === 0 || isFinished) return

    const answerRows = questions.map((question) => ({
      questionId: question.id,
      selectedOption: answers[question.id]?.selectedOption ?? null,
      isDoubtful: Boolean(answers[question.id]?.isDoubtful),
    }))

    if (!answerRows.some((answer) => answer.selectedOption)) {
      setSubmitError('Jawab minimal satu soal sebelum mengumpulkan tes.')
      return
    }

    submitInFlightRef.current = true
    setIsSubmitting(true)
    setSubmitError(null)

    const totalTimeSpentSeconds = Math.min(
      totalTimeSeconds,
      Math.max(0, Math.floor((Date.now() - (startedAtRef.current || Date.now())) / 1000)),
    )
    const submissionId = submissionIdRef.current || createSubmissionId()
    submissionIdRef.current = submissionId

    try {
      const serverResult = await submitDiagnostic({
        submissionId,
        totalTimeSpentSeconds,
        answers: answerRows,
      })
      const localResult = {
        ...serverResult,
        score: serverResult.totalCorrect,
        total: serverResult.totalQuestions ?? questions.length,
        scorePercent: serverResult.score,
      }
      setCompletionResult(localResult)
      setIsFinished(true)
      onComplete?.(localResult)
    } catch (error) {
      setSubmitError(error)
    } finally {
      submitInFlightRef.current = false
      setIsSubmitting(false)
    }
  }, [answers, isFinished, onComplete, questions, totalTimeSeconds])

  const submitRef = useRef(handleSubmitTest)
  useEffect(() => {
    submitRef.current = handleSubmitTest
  }, [handleSubmitTest])

  useEffect(() => {
    if (!isStarted || isFinished || questionsStatus !== 'ready') return undefined

    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil(((deadlineRef.current || Date.now()) - Date.now()) / 1000))
      setTimeRemaining(remaining)
    }
    updateRemaining()
    const timer = setInterval(updateRemaining, 1000)

    return () => clearInterval(timer)
  }, [isFinished, isStarted, questionsStatus])

  useEffect(() => {
    if (
      isStarted
      && timeRemaining === 0
      && !isFinished
      && !isSubmitting
      && !autoSubmitAttemptedRef.current
    ) {
      autoSubmitAttemptedRef.current = true
      submitRef.current()
    }
  }, [isFinished, isStarted, isSubmitting, timeRemaining])

  const handleSelectOption = useCallback((optionId) => {
    if (!currentQuestion || isSubmitting || isFinished) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        ...previous[currentQuestion.id],
        selectedOption: optionId,
        isDoubtful: previous[currentQuestion.id]?.isDoubtful || false,
      },
    }))
  }, [currentQuestion, isFinished, isSubmitting])

  const handleResetAnswer = useCallback(() => {
    if (!currentQuestion || isSubmitting) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        ...previous[currentQuestion.id],
        selectedOption: null,
      },
    }))
  }, [currentQuestion, isSubmitting])

  const handleToggleDoubtful = useCallback(() => {
    if (!currentQuestion || isSubmitting) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        ...previous[currentQuestion.id],
        selectedOption: previous[currentQuestion.id]?.selectedOption ?? null,
        isDoubtful: !previous[currentQuestion.id]?.isDoubtful,
      },
    }))
  }, [currentQuestion, isSubmitting])

  const handleNext = useCallback(() => {
    if (isSubmitting) return
    setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))
  }, [isSubmitting, questions.length])

  const handlePrev = useCallback(() => {
    if (isSubmitting) return
    setCurrentIndex((index) => Math.max(0, index - 1))
  }, [isSubmitting])

  const handleGoToQuestion = useCallback((index) => {
    if (isSubmitting || index < 0 || index >= questions.length) return
    setCurrentIndex(index)
  }, [isSubmitting, questions.length])

  const totalAnswered = Object.values(answers).filter((answer) => answer.selectedOption).length
  const progressPercent = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0

  return {
    questions,
    questionsStatus,
    loadError,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    currentAnswer,
    answers,
    timeRemaining,
    formattedTime: `${String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:${String(timeRemaining % 60).padStart(2, '0')}`,
    progressPercent,
    totalAnswered,
    isSubmitting,
    submitError: submitError
      ? getErrorMessage(submitError, 'Tes gagal dikirim. Jawabanmu tetap tersimpan di halaman ini.')
      : null,
    submitErrorStatus: submitError?.status ?? null,
    isFinished,
    completionResult,
    startTest,
    retryLoadQuestions,
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
