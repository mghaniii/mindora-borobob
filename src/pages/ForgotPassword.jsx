
import { Link, Navigate } from 'react-router-dom'
import {
  AuthLayout,
  ForgotPasswordForm,
  useAuth,
} from '../features/auth'

export default function ForgotPassword() {
  const { user, isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return (
      <Navigate
        to={user?.hasCompletedDiagnostic ? '/dashboard' : '/diagnostic'}
        replace
      />
    )
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
            Daftar di sini
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
