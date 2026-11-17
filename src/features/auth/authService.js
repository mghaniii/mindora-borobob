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
const DIAGNOSTIC_RESULT_KEY = 'mindora_diagnostic_results'
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

// Membuat ID unik untuk akun baru.
function createId(existingIds) {
  let id

  do {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? `user-${crypto.randomUUID()}`
        : `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  } while (existingIds.includes(id))

  return id
}

export async function register({ name, email, password }) {
  await wait()

  const cleanName = name.trim().replace(/\s+/g, ' ')
  const cleanEmail = normalizeEmail(email)

  const users = getUsers()

  if (users.some((u) => u.email === cleanEmail)) {
    return {
      ok: false,
      field: 'email',
      error: 'Email ini sudah terdaftar. Silakan masuk.',
    }
  }

  const newUser = {
    id: createId(users.map((u) => u.id)),
    name: cleanName,
    email: cleanEmail,
    password,
  }

  write(USERS_KEY, [...read(USERS_KEY, []), newUser])

  const saved = read(USERS_KEY, []).some((u) => u.id === newUser.id)

  if (!saved) {
    return {
      ok: false,
      error: 'Akun tidak dapat disimpan. Periksa pengaturan penyimpanan browser Anda.',
    }
  }

  const sessionUser = toSessionUser(newUser)
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


// ---------------------------------------------------------------------------
// LUPA PASSWORD (SIMULASI LOKAL)
// Tidak ada email atau OTP yang dikirim. Permintaan reset hanya disimpan di
// localStorage browser ini. Siapa pun yang tahu email akun bisa mengubah
// passwordnya, jadi ini TIDAK aman untuk produksi. Nanti ganti dengan
// verifikasi OTP/email lewat backend.
// ---------------------------------------------------------------------------
const RESET_KEY = 'mindora_reset_request'
const RESET_TTL_MS = 15 * 60 * 1000 // masa berlaku 15 menit

function clearResetRequest() {
  try {
    localStorage.removeItem(RESET_KEY)
  } catch {
    // Diabaikan: tidak ada yang perlu dihapus jika penyimpanan tidak bisa diakses.
  }
}

// Mengembalikan permintaan reset yang masih berlaku, atau null.
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

  // Akun demo bawaan tidak boleh diubah.
  if (cleanEmail === normalizeEmail(DEMO_USER.email)) {
    return { ok: false, error: 'Password akun demo tidak dapat diubah.' }
  }

  // Hanya akun yang didaftarkan lewat Register.
  const user = read(USERS_KEY, []).find((u) => u.email === cleanEmail)
  if (!user) {
    return { ok: false, error: 'Akun dengan email tersebut tidak ditemukan.' }
  }

  // Simpan ID akun dan masa berlaku, tanpa password.
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

  // Hanya akun milik permintaan reset ini yang diubah.
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

  // Permintaan hanya bisa digunakan sekali.
  clearResetRequest()
  return { ok: true }
}

// Menyimpan preferensi belajar untuk akun yang sedang login.
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

// Menyimpan hasil diagnostik berdasarkan ID pengguna.
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

// Mengambil hasil diagnostik milik pengguna.
export function getDiagnosticResult(userId) {
  const allResults = read(DIAGNOSTIC_RESULT_KEY, {})
  return allResults[userId] || null
}

// Mengambil statistik belajar pengguna.
export function getLearningStats(userId) {
  const allStats = read('mindora_learning_stats', {})

  return allStats[userId] || {
    xp: 0,
    streak: 0,
    accuracy: 0,
    medals: 0,
  }
}

// Mengambil data tambahan profil pengguna.
export function getProfileExtras(userId) {
  const allExtras = read('mindora_profile_extras', {})
  return allExtras[userId] || {}
}
