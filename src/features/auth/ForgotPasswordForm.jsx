import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthButton } from './components/AuthButton.jsx'
import { TextField } from './components/TextField'
import { GoogleIcon } from './components/icons'
import { validateForgotPassword } from './validators'
import { requestPasswordReset } from './authService'

export function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForgotPassword(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await requestPasswordReset(values)
    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error)
      return
    }

    // Simulasi lokal: tidak ada email/OTP. Langsung ke halaman password baru.
    navigate('/reset-password')
  }

  return (
    <>
      <h1 className="text-[32px] leading-10 font-extrabold">Cari email</h1>
      <p className="mt-3.5 text-base leading-6">
        Ayo di ingat-ingat lagi passwordnya!
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Masukkan email Anda"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        {submitError && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-wrong px-4 py-3 text-sm font-medium text-[#93000A]"
          >
            {submitError}
          </p>
        )}

        <AuthButton type="submit" disabled={isSubmitting} className="mt-8">
          {isSubmitting ? 'Memproses...' : 'Cari akun'}
        </AuthButton>
      </form>

      <div className="my-5 flex items-center gap-4 text-sm leading-5">
        <span className="flex-1 border-t-[0.5px] border-[#95999A]" />
        <span>atau</span>
        <span className="flex-1 border-t-[0.5px] border-[#95999A]" />
      </div>

      <AuthButton
        variant="outline"
        onClick={() =>
          setNotice('Masuk dengan Google belum tersedia di versi demo ini.')
        }
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