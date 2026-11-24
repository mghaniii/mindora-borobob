/**
 * authService.js
 * Login & register sekarang memanggil backend sungguhan (lihat Rencana auth.md):
 *   POST /auth/login, POST /auth/register -> simpan JWT di localStorage['auth_token']
 *   (key yang sama dengan yang dibaca src/services/api.js untuk header Bearer).
 * Signature fungsi dipertahankan ({ ok, user, error, field? }) supaya
 * LoginForm/RegisterForm/useAuth tidak perlu diubah.
 *
 * Masih lokal (menunggu backend): lupa/reset password, preferensi belajar,
 * hasil diagnostik, statistik, dan extras profil.
 */

import { api, ApiError } from '../../services/api'

const TOKEN_KEY = 'auth_token'
const SESSION_KEY = 'mindora_session'
const USERS_KEY = 'mindora_users'
const DIAGNOSTIC_RESULT_KEY = 'mindora_diagnostic_results'
const RESET_KEY = 'mindora_reset_request'
const RESET_TTL_MS = 15 * 60 * 1000
const DEMO_EMAIL = 'demo@mindora.id'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Penyimpanan penuh atau diblokir browser: abaikan, aplikasi tetap jalan.
  }
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

// Bentuk user yang boleh masuk ke store: tanpa password.
// hasCompletedDiagnostic datang dari backend (dihitung dari diagnostic_history).
function toSessionUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    kelas: user.kelas,
    hasCompletedDiagnostic: Boolean(user.hasCompletedDiagnostic),
  }
}

function persistSession({ token, user }) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // Token gagal disimpan: sesi tetap jalan di memori sampai reload.
  }
  write(SESSION_KEY, toSessionUser(user))
}

export function getSession() {
  return read(SESSION_KEY, null)
}

function toLoginError(error) {
  if (error instanceof ApiError) {
    // Pesan sengaja sama untuk email tidak ada & password salah.
    if (error.status === 401) return 'Email atau password salah.'
    if (error.data?.message) return error.data.message
  }
  return 'Tidak dapat terhubung ke server. Coba lagi sebentar.'
}

function toRegisterError(error) {
  if (error instanceof ApiError) {
    const data = error.data || {}
    if (data.field) return { field: data.field, message: data.message || 'Data tidak valid.' }
    if (error.status === 409) {
      return { field: 'email', message: data.message || 'Email ini sudah terdaftar. Silakan masuk.' }
    }
    return { message: data.message || 'Registrasi gagal. Coba lagi.' }
  }
  return { message: 'Tidak dapat terhubung ke server. Coba lagi sebentar.' }
}

export async function login({ email, password }) {
  try {
    const data = await api.post('/auth/login', {
      email: normalizeEmail(email),
      password,
    })
    persistSession(data)
    return { ok: true, user: getSession() }
  } catch (error) {
    return { ok: false, error: toLoginError(error) }
  }
}

export async function register({ name, email, password }) {
  try {
    const data = await api.post('/auth/register', {
      name: String(name || '').trim().replace(/\s+/g, ' '),
      email: normalizeEmail(email),
      password,
      // kelas sengaja tidak dikirim: backend memakai default 'Kelas 2 SMA'.
    })
    persistSession(data)
    return { ok: true, user: getSession() }
  } catch (error) {
    const mapped = toRegisterError(error)
    return mapped.field
      ? { ok: false, field: mapped.field, error: mapped.message }
      : { ok: false, error: mapped.message }
  }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // Diabaikan: tidak ada yang perlu dihapus jika penyimpanan tidak bisa diakses.
  }
}

// Dipanggil setelah POST /diagnostic/submit berhasil. Backend adalah sumber
// kebenaran saat reload; ini hanya memperbarui sesi agar redirect langsung benar.
export function markDiagnosticCompleted() {
  const session = getSession()
  if (!session) return
  write(SESSION_KEY, { ...session, hasCompletedDiagnostic: true })
}

// ---------------------------------------------------------------------------
// LUPA PASSWORD (MASIH SIMULASI LOKAL — lihat Rencana auth.md §2.6)
// Belum ada endpoint backend; permintaan reset hanya disimpan di localStorage
// browser ini dan hanya berlaku untuk akun yang terdaftar lokal. Akun yang
// dibuat lewat backend belum bisa direset dari sini sampai endpoint
// /auth/forgot-password & /auth/reset-password + tabel password_resets tersedia.
// ---------------------------------------------------------------------------

// Meniru jeda jaringan agar tampilan "loading" bisa dicoba.
const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

function clearResetRequest() {
  try {
    localStorage.removeItem(RESET_KEY)
  } catch {
    // Diabaikan.
  }
}

export function getResetRequest() {
  const request = read(RESET_KEY, null)
  if (!request) return null

  if (!request.expiresAt || request.expiresAt < Date.now()) {
    clearResetRequest()
    return null
  }
  return request
}

export async function requestPasswordReset({ email }) {
  await wait()
  const cleanEmail = normalizeEmail(email)

  if (cleanEmail === normalizeEmail(DEMO_EMAIL)) {
    return { ok: false, error: 'Password akun demo tidak dapat diubah.' }
  }

  const user = read(USERS_KEY, []).find((u) => u.email === cleanEmail)
  if (!user) {
    return { ok: false, error: 'Akun dengan email tersebut tidak ditemukan.' }
  }

  write(RESET_KEY, {
    userId: user.id,
    email: user.email,
    expiresAt: Date.now() + RESET_TTL_MS,
  })

  if (!getResetRequest()) {
    return {
      ok: false,
      error: 'Permintaan tidak dapat disimpan. Periksa pengaturan penyimpanan browser Anda.',
    }
  }

  return { ok: true }
}

export async function completePasswordReset({ password }) {
  await wait()

  const request = getResetRequest()
  if (!request) {
    return {
      ok: false,
      expired: true,
      error: 'Permintaan reset sudah kedaluwarsa. Silakan ulangi dari awal.',
    }
  }

  const users = read(USERS_KEY, [])
  if (!users.some((u) => u.id === request.userId)) {
    clearResetRequest()
    return {
      ok: false,
      expired: true,
      error: 'Akun tidak ditemukan. Silakan ulangi dari awal.',
    }
  }

  write(
    USERS_KEY,
    users.map((u) => (u.id === request.userId ? { ...u, password } : u)),
  )

  const saved = read(USERS_KEY, []).some(
    (u) => u.id === request.userId && u.password === password,
  )

  if (!saved) {
    return {
      ok: false,
      error: 'Password tidak dapat disimpan. Periksa pengaturan penyimpanan browser Anda.',
    }
  }

  clearResetRequest()
  return { ok: true }
}

// ---------------------------------------------------------------------------
// DATA LOKAL LAIN (menunggu endpoint backend terkait)
// ---------------------------------------------------------------------------

export function savePreferences(updates) {
  const session = getSession()

  if (!session) {
    return {
      ok: false,
      error: 'Sesi pengguna tidak ditemukan. Silakan login kembali.',
    }
  }

  const key = 'mindora_preferences'
  const allPreferences = read(key, {})
  const currentPreferences = allPreferences[session.id] || {
    dailyGoalMinutes: 20,
    reminderEnabled: false,
    reminderTime: '16:00',
  }

  const updatedPreferences = {
    ...currentPreferences,
    ...updates,
  }

  write(key, {
    ...allPreferences,
    [session.id]: updatedPreferences,
  })

  const saved = read(key, {})

  if (!saved[session.id]) {
    return {
      ok: false,
      error: 'Pengaturan gagal disimpan.',
    }
  }

  return { ok: true }
}

export function saveDiagnosticResult(result) {
  const session = getSession()

  if (!session) {
    return { ok: false, error: 'Sesi pengguna tidak ditemukan.' }
  }

  const allResults = read(DIAGNOSTIC_RESULT_KEY, {})

  write(DIAGNOSTIC_RESULT_KEY, {
    ...allResults,
    [session.id]: result,
  })

  return { ok: true }
}

export function getDiagnosticResult(userId) {
  const allResults = read(DIAGNOSTIC_RESULT_KEY, {})
  return allResults[userId] || null
}

export function getLearningStats(userId) {
  const allStats = read('mindora_learning_stats', {})

  return allStats[userId] || {
    xp: 0,
    streak: 0,
    accuracy: 0,
    medals: 0,
  }
}

export function getProfileExtras(userId) {
  const allExtras = read('mindora_profile_extras', {})
  const allPreferences = read('mindora_preferences', {})

  return {
    ...(allExtras[userId] || {}),
    ...(allPreferences[userId] || {}),
  }
}


export function updateProfile(data) {
  const session = getSession()

  if (!session) {
    return { ok: false, error: 'Sesi pengguna tidak ditemukan.' }
  }

  const allExtras = read('mindora_profile_extras', {})
  const currentExtras = allExtras[session.id] || {}

  write('mindora_profile_extras', {
    ...allExtras,
    [session.id]: {
      ...currentExtras,
      bio: String(data.bio ?? '').trim(),
    },
  })

  return { ok: true }
}
