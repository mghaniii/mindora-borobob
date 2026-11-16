import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthButton } from "./components/AuthButton.jsx"
import { TextField } from './components/TextField'
import { PasswordField } from './components/PasswordField'
import { GoogleIcon } from './components/icons'
import { validateLogin } from './validators'
import { useAuth } from './useAuth'

export function LoginForm() {
  const { login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
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

    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await login(values)
    setIsSubmitting(false)

    // Jika berhasil, store terisi dan pages/Login.jsx otomatis
    // memindahkan pengguna ke /dashboard.
    if (!result.ok) setSubmitError(result.error)
  }

  return (
    <>
      <h1 className="text-[32px] leading-10 font-extrabold">Masuk ke Mindora</h1>
      <p className="mt-3.5 text-base leading-6">
        Belajar matematika jadi lebih mudah dan menyenangkan!
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

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Masukkan password Anda"
          autoComplete="current-password"
          className="mt-5"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mt-1.5 text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Lupa password?
          </Link>
        </div>

        {submitError && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-wrong px-4 py-3 text-sm font-medium text-[#93000A]"
          >
            {submitError}
          </p>
        )}

        <AuthButton type="submit" disabled={isSubmitting} className="mt-8">
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