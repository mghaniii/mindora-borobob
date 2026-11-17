import { useStore } from '../../store'
import * as authService from './authService'

/**
 * Jembatan antara store tim (state.user) dan authService.
 * Komponen cukup memanggil useAuth(); tidak perlu tahu detail penyimpanan.
 */
export function useAuth() {
  const { state, setState } = useStore()

  const login = async (credentials) => {
    const result = await authService.login(credentials)
    if (result.ok) {
      // Bentuk "gabung" (...prev) supaya field lain di store tidak terhapus.
      setState((prev) => ({ ...prev, user: result.user }))
    }
    return result
  }

  const logout = () => {
    authService.logout()
    setState((prev) => ({ ...prev, user: null }))
  }
  const markDiagnosticCompleted = () => {
  authService.markDiagnosticCompleted()

  setState((prev) => ({
    ...prev,
    user: prev.user
      ? { ...prev.user, hasCompletedDiagnostic: true }
      : null,
  }))
}

  const register = async (data) => {
    const result = await authService.register(data)

    if (result.ok) {
      setState((prev) => ({ ...prev, user: result.user }))
    }

    return result
  }


  const updateProfile = async (data) => {
    return await authService.updateProfile(data)
  }

  
  return {
    user: state.user,
    isLoggedIn: Boolean(state.user),
    login,
    register,
    logout,
    markDiagnosticCompleted,
    updateProfile,
  }
}