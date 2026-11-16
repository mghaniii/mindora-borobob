/**
 * authService.js
 * Semua logika akun DEMO ada di file ini (disimpan di localStorage browser).
 * Belum ada backend, jadi ini BUKAN autentikasi sungguhan dan TIDAK aman:
 * password tersimpan apa adanya di browser. Nanti, saat API tersedia,
 * cukup ganti isi fungsi-fungsi di sini; halaman lain tidak perlu diubah.
 */

const USERS_KEY = 'mindora_users'
const SESSION_KEY = 'mindora_session'
const DIAGNOSTIC_KEY = 'mindora_completed_users'
// Akun contoh supaya halaman Login bisa dicoba sebelum Register selesai.
const DEMO_USER = {
  id: 'demo-1',
  name: 'Budi Pratama',
  email: 'demo@mindora.id',
  password: 'Mindora123',
}

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

// Meniru jeda jaringan agar tampilan "loading" bisa dicoba.
const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

function getUsers() {
  return [DEMO_USER, ...read(USERS_KEY, [])]
}

export function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

// Data yang boleh masuk ke store: tanpa password.
function toSessionUser({ id, name, email }) {
  const completedUsers = read(DIAGNOSTIC_KEY, [])

  return {
    id,
    name,
    email,
    hasCompletedDiagnostic: completedUsers.includes(id),
  }
}

export function getSession() {
  return read(SESSION_KEY, null)
}

export async function login({ email, password }) {
  await wait()
  const user = getUsers().find((u) => u.email === normalizeEmail(email))

  // Pesan sengaja sama untuk "email tidak ada" dan "password salah".
  if (!user || user.password !== password) {
    return { ok: false, error: 'Email atau password salah.' }
  }

  const sessionUser = toSessionUser(user)
  write(SESSION_KEY, sessionUser)
  return { ok: true, user: sessionUser }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // Diabaikan: tidak ada yang perlu dihapus jika penyimpanan tidak bisa diakses.
  }
}
export function markDiagnosticCompleted() {
  const session = getSession()

  if (!session) return

  const completedUsers = read(DIAGNOSTIC_KEY, [])

  if (!completedUsers.includes(session.id)) {
    write(DIAGNOSTIC_KEY, [...completedUsers, session.id])
  }

  write(SESSION_KEY, {
    ...session,
    hasCompletedDiagnostic: true,
  })
}