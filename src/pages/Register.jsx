
import { Link, Navigate } from 'react-router-dom'
import { AuthLayout, RegisterForm, useAuth } from '../features/auth'

export default function Register() {
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
          Sudah punya akun?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
          >
            Masuk di sini
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
