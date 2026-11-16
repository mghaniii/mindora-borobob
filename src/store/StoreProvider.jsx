import { useState } from 'react'
import { StoreContext } from './StoreContext'
import { getSession } from '../features/auth/authService'

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => ({
    user: getSession(),
  }))

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  )
}