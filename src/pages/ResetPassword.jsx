
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  AuthLayout,
  ResetPasswordForm,
  getResetRequest,
  useAuth,
} from '../features/auth'

export default function ResetPassword() {
  const { user, isLoggedIn } = useAuth()
  const [request] = useState(() => getResetRequest())

  if (isLoggedIn) {
    return (
      <Navigate
        to={user?.hasCompletedDiagnostic ? '/dashboard' : '/diagnostic'}
        replace
      />
    )
  }

  if (!request) {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <AuthLayout
      footer={
        <>
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
          >
            Buat di sini
          </Link>
        </>
      }
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
