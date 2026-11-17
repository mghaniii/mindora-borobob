import { useState } from 'react'
import { Modal } from './Modal'
import { TextField } from '../auth/components/TextField'
import { PasswordField } from '../auth/components/PasswordField'
import { AuthButton } from '../auth/components/AuthButton.jsx'
import { useAuth } from '../auth'
import { validateEditProfile, validateChangePassword } from '../auth/validators'
import { savePreferences } from '../auth/authService'

const alertClass =
  'mt-4 rounded-xl bg-wrong px-4 py-3 text-sm font-medium text-[#93000A]'

/* ---------------------------- Edit Profil ---------------------------- */
export function EditProfileModal({ user, extras, isDemo, onClose, onSaved }) {
  const { updateProfile } = useAuth()
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    bio: extras.bio,
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateEditProfile(values, { isDemo })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await updateProfile(values)
    setIsSubmitting(false)

    if (!result.ok) {
      if (result.field) setErrors({ [result.field]: result.error })
      else setSubmitError(result.error)
      return
    }
    onSaved('Profil berhasil diperbarui.')
  }

  return (
    <Modal title="Edit Profil" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="name"
          name="name"
          label="Nama Lengkap"
          autoComplete="name"
          disabled={isDemo}
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          className="mt-5"
          disabled={isDemo}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        {isDemo && (
          <p className="mt-2 text-sm text-text-muted">
            Nama dan email akun demo tidak dapat diubah. Deskripsi diri tetap bisa diubah.
          </p>
        )}

        <div className="mt-5">
          <label
            htmlFor="bio"
            className="mb-2 block text-sm leading-5 font-semibold text-(color:--color-shadow)"
          >
            Deskripsi Diri
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={160}
            placeholder="Ceritakan sedikit tentang dirimu"
            value={values.bio}
            onChange={handleChange}
            className="w-full rounded-2xl border-[0.5px] border-[#95999A] bg-white px-4 py-3 text-sm text-(color:--color-shadow) outline-none placeholder:text-[#95999A] focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
          <p className="mt-1 text-right text-xs text-text-muted">
            {values.bio.length}/160
          </p>
          {errors.bio && (
            <p role="alert" className="text-sm text-[#BA1A1A]">
              {errors.bio}
            </p>
          )}
        </div>

        {submitError && (
          <p role="alert" className={alertClass}>
            {submitError}
          </p>
        )}

        <AuthButton type="submit" disabled={isSubmitting} className="mt-6">
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </AuthButton>
      </form>
    </Modal>
  )
}

/* --------------------------- Ubah Password --------------------------- */
export function ChangePasswordModal({ isDemo, onClose, onSaved }) {
  const { changePassword } = useAuth()
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateChangePassword(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const result = await changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
    setIsSubmitting(false)

    if (!result.ok) {
      if (result.field) setErrors({ [result.field]: result.error })
      else setSubmitError(result.error)
      return
    }
    onSaved('Password berhasil diubah.')
  }

  return (
    <Modal title="Ubah Sandi" onClose={onClose}>
      {isDemo ? (
        <>
          <p className="text-sm leading-6">
            Password akun demo tidak dapat diubah. Daftarkan akun sendiri untuk
            mencoba fitur ini.
          </p>
          <AuthButton onClick={onClose} className="mt-6">
            Mengerti
          </AuthButton>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <PasswordField
            id="currentPassword"
            name="currentPassword"
            label="Password Lama"
            placeholder="Masukkan password lama"
            autoComplete="current-password"
            value={values.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
          />
          <PasswordField
            id="newPassword"
            name="newPassword"
            label="Password Baru"
            placeholder="Buat password minimal 8 karakter"
            autoComplete="new-password"
            className="mt-5"
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Ulangi password baru"
            autoComplete="new-password"
            className="mt-5"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {submitError && (
            <p role="alert" className={alertClass}>
              {submitError}
            </p>
          )}

          <AuthButton type="submit" disabled={isSubmitting} className="mt-6">
            {isSubmitting ? 'Menyimpan...' : 'Simpan Password'}
          </AuthButton>
        </form>
      )}
    </Modal>
  )
}

/* ------------------------ Target Belajar Harian ----------------------- */
const GOAL_OPTIONS = [10, 15, 20, 30, 45, 60]

export function DailyGoalModal({ extras, onClose, onSaved }) {
  const [minutes, setMinutes] = useState(extras.dailyGoalMinutes)
  const [error, setError] = useState('')

  const handleSave = () => {
    const result = savePreferences({ dailyGoalMinutes: minutes })
    if (!result.ok) return setError(result.error)
    onSaved('Target belajar harian disimpan.')
  }

  return (
    <Modal title="Target Belajar Harian" onClose={onClose}>
      <p className="text-sm">Pilih durasi belajar per hari:</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {GOAL_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={minutes === option}
            onClick={() => setMinutes(option)}
            className={`h-12 cursor-pointer rounded-2xl border text-sm font-semibold transition-colors ${
              minutes === option
                ? 'border-primary bg-primary text-white'
                : 'border-[#95999A] bg-white text-(color:--color-shadow) hover:bg-surface-bg'
            }`}
          >
            {option} menit
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className={alertClass}>
          {error}
        </p>
      )}
      <AuthButton onClick={handleSave} className="mt-6">
        Simpan
      </AuthButton>
    </Modal>
  )
}

/* -------------------------- Notifikasi Pengingat ------------------------ */
export function ReminderModal({ extras, onClose, onSaved }) {
  const [enabled, setEnabled] = useState(extras.reminderEnabled)
  const [time, setTime] = useState(extras.reminderTime)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (enabled && !time) return setError('Jam pengingat wajib diisi.')
    const result = savePreferences({ reminderEnabled: enabled, reminderTime: time })
    if (!result.ok) return setError(result.error)
    onSaved('Pengaturan pengingat disimpan.')
  }

  return (
    <Modal title="Notifikasi Pengingat" onClose={onClose}>
      <label className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold">
        Aktifkan pengingat harian
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => {
            setEnabled(event.target.checked)
            setError('')
          }}
          className="h-5 w-5 accent-primary"
        />
      </label>

      <div className="mt-5">
        <label htmlFor="reminderTime" className="mb-2 block text-sm font-semibold">
          Jam pengingat (WIB)
        </label>
        <input
          id="reminderTime"
          type="time"
          disabled={!enabled}
          value={time}
          onChange={(event) => {
            setTime(event.target.value)
            setError('')
          }}
          className="h-12 w-full rounded-2xl border-[0.5px] border-[#95999A] bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      <p className="mt-3 text-sm text-text-muted">
        Di versi demo, pengaturan ini hanya disimpan. Belum ada notifikasi yang dikirim.
      </p>

      {error && (
        <p role="alert" className={alertClass}>
          {error}
        </p>
      )}
      <AuthButton onClick={handleSave} className="mt-6">
        Simpan
      </AuthButton>
    </Modal>
  )
}

/* ------------------------------- Rapor -------------------------------- */
export function ReportModal({ summary, onClose }) {
  const [message, setMessage] = useState('')
  const canShare = typeof navigator !== 'undefined' && Boolean(navigator.share)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setMessage('Ringkasan rapor disalin.')
    } catch {
      setMessage('Gagal menyalin. Salin teks di atas secara manual.')
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({ title: 'Rapor Mindora', text: summary })
    } catch {
      // Dibatalkan pengguna: tidak perlu pesan.
    }
  }

  return (
    <Modal title="Rapor Ringkas" onClose={onClose}>
      <pre className="rounded-xl bg-surface-bg p-4 font-sans text-sm leading-6 whitespace-pre-wrap">
        {summary}
      </pre>
      <div className="mt-5 flex gap-3">
        <AuthButton onClick={handleCopy}>Salin</AuthButton>
        {canShare && (
          <AuthButton variant="outline" onClick={handleShare}>
            Bagikan
          </AuthButton>
        )}
      </div>
      {message && (
        <p role="status" className="mt-3 text-center text-sm text-text-muted">
          {message}
        </p>
      )}
    </Modal>
  )
}