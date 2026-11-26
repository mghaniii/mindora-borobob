import { useCallback, useEffect, useState } from 'react'
import {
  applyMaterialProgress,
  fetchMaterials,
  updateMaterialProgress,
} from '../services/materiService.js'

export function useMateriData() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [updatingId, setUpdatingId] = useState(null)
  const [updateError, setUpdateError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchMaterials()
      .then((materials) => {
        if (cancelled) return
        setItems(materials)
        setStatus('ready')
      })
      .catch((loadFailure) => {
        if (cancelled) return
        setError(loadFailure)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [loadAttempt])

  const retry = useCallback(() => {
    setStatus('loading')
    setError(null)
    setLoadAttempt((value) => value + 1)
  }, [])

  const saveProgress = useCallback(async (materialId, completedSubtopics) => {
    setUpdatingId(materialId)
    setUpdateError(null)
    try {
      const progress = await updateMaterialProgress(materialId, { completedSubtopics })
      setItems((previous) => previous.map((item) => (
        item.id === materialId ? applyMaterialProgress(item, progress) : item
      )))
      return progress
    } catch (failure) {
      setUpdateError(failure)
      throw failure
    } finally {
      setUpdatingId(null)
    }
  }, [])

  return {
    items,
    status,
    error,
    updatingId,
    updateError,
    retry,
    saveProgress,
  }
}

export default useMateriData
