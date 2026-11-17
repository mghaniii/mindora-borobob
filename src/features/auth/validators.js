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

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = {}

  if (!name.trim()) errors.name = 'Nama lengkap wajib diisi.'

  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError

  if (!password) errors.password = 'Password wajib diisi.'
  else if (password.length < 8) errors.password = 'Password minimal 8 karakter.'

  if (!confirmPassword) errors.confirmPassword = 'Konfirmasi password wajib diisi.'
  else if (confirmPassword !== password)
    errors.confirmPassword = 'Konfirmasi password tidak sama.'

  return errors
}

export function validateResetPassword({ password, confirmPassword }) {
  const errors = {}

  if (!password) {
    errors.password = 'Password wajib diisi.'
  } else if (password.length < 8) {
    errors.password = 'Password minimal 8 karakter.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi.'
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Konfirmasi password tidak sama.'
  }

  return errors
}


export function validateForgotPassword({ email }) {
  const errors = {}
  const emailError = validateEmail(email)

  if (emailError) errors.email = emailError

  return errors
}


export function validateChangePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  const errors = {}

  if (!currentPassword) {
    errors.currentPassword = 'Password saat ini wajib diisi.'
  }

  if (!newPassword) {
    errors.newPassword = 'Password baru wajib diisi.'
  } else if (newPassword.length < 8) {
    errors.newPassword = 'Password baru minimal 8 karakter.'
  } else if (newPassword === currentPassword) {
    errors.newPassword = 'Password baru harus berbeda dari password lama.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi.'
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak sama.'
  }

  return errors
}

export function validateEditProfile({ name, email, bio }, { isDemo = false } = {}) {
  const errors = {}

  if (!name.trim()) {
    errors.name = 'Nama lengkap wajib diisi.'
  }

  const emailError = validateEmail(email)
  if (emailError) {
    errors.email = emailError
  }

  return errors
}