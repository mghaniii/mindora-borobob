import { useState } from 'react'
import { StoreContext } from './StoreContext'

export function StoreProvider({ children }) {
  const [state, setState] = useState({
    user: null,
  })

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  )
}
