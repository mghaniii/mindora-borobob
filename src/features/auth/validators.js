const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Email wajib diisi.'
  if (!EMAIL_PATTERN.test(email)) return 'Format email tidak valid.'
  return ''
}

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Password wajib diisi.'
  return errors
}