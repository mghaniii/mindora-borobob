
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthButton } from './components/AuthButton.jsx'
import { PasswordField } from './components/PasswordField'
import { GoogleIcon } from './components/icons'
import { validateResetPassword } from './validators'
import { completePasswordReset } from './authService'

export function ResetPasswordForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

  useEffect(() => {
    if (!redirectTo) return
    const timer = setTimeout(() => navigate(redirectTo, { replace: true }), 1500)
    return () => clearTimeout(timer)
  }, [redirectTo, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateResetPassword(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await completePasswordReset({ password: values.password })
    setIsSubmitting(false)

    if (result.ok) {
      setSuccess('Password berhasil diubah. Mengalihkan ke halaman Login...')
      setRedirectTo('/login')
      return
    }

    setSubmitError(result.error)
    if (result.expired) setRedirectTo('/forgot-password')
  }

  return (
    <>
      <h1 className="text-[32px] leading-10 font-extrabold">Buat password baru</h1>
      <p className="mt-3.5 text-base leading-6">Jangan di lupain lagi ya!</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <PasswordField
          id="password"
          name="password"
          label="Password Baru"
          placeholder="Buat password minimal 8 karakter"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Konfirmasi Password"
          placeholder="Ulangi password anda"
          autoComplete="new-password"
          className="mt-5"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {submitError && (
          <p role="alert" className="mt-4 rounded-xl bg-wrong px-4 py-3 text-sm font-medium text-[#93000A]">
            {submitError}
          </p>
        )}

        {success && (
          <p role="status" className="mt-4 rounded-xl bg-[#E6F4EA] px-4 py-3 text-sm font-medium text-[#1E4620]">
            {success}
          </p>
        )}

        <AuthButton
          type="submit"
          disabled={isSubmitting || Boolean(success)}
          className="mt-8"
        >
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </AuthButton>
      </form>

      <div className="my-5 flex items-center gap-4 text-sm leading-5">
        <span className="flex-1 border-t-[0.5px] border-[#95999A]" />
        <span>atau</span>
        <span className="flex-1 border-t-[0.5px] border-[#95999A]" />
      </div>

      <AuthButton
        variant="outline"
        onClick={() => setNotice('Masuk dengan Google belum tersedia di versi demo ini.')}
      >
        <GoogleIcon />
        Lanjutkan dengan Google
      </AuthButton>

      {notice && (
        <p role="status" className="mt-3 text-center text-sm text-text-muted">
          {notice}
        </p>
      )}
    </>
  )
}
