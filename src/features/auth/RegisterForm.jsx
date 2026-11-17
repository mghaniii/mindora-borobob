
import { useState } from 'react'
import { AuthButton } from './components/AuthButton.jsx'
import { TextField } from './components/TextField'
import { PasswordField } from './components/PasswordField'
import { GoogleIcon } from './components/icons'
import { validateRegister } from './validators'
import { useAuth } from './useAuth'

export function RegisterForm() {
  const { register } = useAuth()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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

    const nextErrors = validateRegister(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await register(values)
    setIsSubmitting(false)

    if (!result.ok) {
      if (result.field) setErrors({ [result.field]: result.error })
      else setSubmitError(result.error)
    }
  }

  return (
    <>
      <h1 className="text-[32px] leading-10 font-extrabold">
        Buat Akun Mindora
      </h1>
      <p className="mt-3.5 text-base leading-6">
        Belajar matematika jadi lebih mudah dan menyenangkan!
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <TextField
          id="name"
          name="name"
          type="text"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap Anda"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Masukkan email Anda"
          autoComplete="email"
          className="mt-5"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Buat password minimal 8 karakter"
          autoComplete="new-password"
          className="mt-5"
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
          <p
            role="alert"
            className="mt-4 rounded-xl bg-wrong px-4 py-3 text-sm font-medium text-[#93000A]"
          >
            {submitError}
          </p>
        )}

        <AuthButton type="submit" disabled={isSubmitting} className="mt-8">
          {isSubmitting ? 'Memproses...' : 'Daftar'}
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
          setNotice('Daftar dengan Google belum tersedia di versi demo ini.')
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
