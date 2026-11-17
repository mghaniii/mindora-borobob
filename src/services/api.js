/**
 * Client HTTP terpusat untuk seluruh komunikasi dengan backend.
 * Base URL dibaca dari environment variable VITE_API_BASE_URL (lihat .env.example).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const DEFAULT_TIMEOUT_MS = 10_000
const AUTH_TOKEN_STORAGE_KEY = 'auth_token'

/**
 * Error terpadu hasil pemanggilan backend.
 * Memuat status HTTP dan body respons agar mudah ditangani di sisi UI.
 */
export class ApiError extends Error {
  constructor(message, { status = null, data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

/**
 * Permintaan HTTP dasar dengan batas waktu, header otentikasi, dan normalisasi error.
 */
async function request(method, path, { body = null, params = null, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const token = getAuthToken()
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        // Content-Type hanya saat ada body: GET tanpa header ini tidak
        // memicu preflight CORS saat frontend dan backend beda origin.
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })

    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      throw new ApiError(`Gagal ${method} ${path} (HTTP ${response.status})`, {
        status: response.status,
        data: payload,
      })
    }

    return payload
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError(`Permintaan ${method} ${path} melebihi batas waktu`, { status: 408 })
    }
    // Umumnya muncul saat backend belum aktif atau tidak terjangkau dari jaringan
    throw new ApiError(`Tidak dapat terhubung ke backend: ${method} ${path}`, { status: null })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const api = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options) => request('POST', path, { ...options, body }),
  put: (path, body, options) => request('PUT', path, { ...options, body }),
  patch: (path, body, options) => request('PATCH', path, { ...options, body }),
  delete: (path, options) => request('DELETE', path, options),
}

export default api
