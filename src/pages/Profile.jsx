import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth'
import {
  getProfileExtras,
  getLearningStats,
  getDiagnosticResult,
} from '../features/auth/authService'
import {
  EditProfileModal,
  ChangePasswordModal,
  DailyGoalModal,
  ReminderModal,
  ReportModal,
} from '../features/profile/ProfileModals'
import {
  PencilIcon,
  ShareIcon,
  BoltIcon,
  FlameIcon,
  TargetIcon,
  TrophyIcon,
  SlidersIcon,
  TimerIcon,
  BellIcon,
  ShieldIcon,
  LogoutIcon,
  ChartIcon,
  BadgeCheckIcon,
  RefreshIcon,
  ArrowRightIcon,
  GraduationIcon,
  HomeIcon,
  SparklesIcon,
  LockIcon,
} from '../features/profile/ProfileIcons'
import { Sidebar } from '../components/layout/Sidebar'
import { ProfileHeader } from '../features/profile/ProfileHeader'

const DEMO_ID = 'demo-1'

// Nilai bawaan jika data tersimpan belum lengkap (tidak menimpa nilai yang sudah disimpan).
const DEFAULT_PREFS = {
  bio: '',
  dailyGoalMinutes: 20,
  reminderEnabled: true,
  reminderTime: '16:00',
}

function withDefaults(extras) {
  const clean = Object.fromEntries(
    Object.entries(extras || {}).filter(([, value]) => value !== undefined && value !== null),
  )
  return { ...DEFAULT_PREFS, ...clean }
}

// ---- Fungsi bantu (turunan dari data akun, bukan hardcode) ----
function getInitials(name) {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('') || '?'
  )
}

function makeUsername(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `@${slug || 'siswa'}_math`
}

function makeStudentCode(id) {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 90000
  return `MND-${10000 + hash}`
}

function domainLabel(percent) {
  if (percent >= 90) return { text: 'Kuat', strong: true }
  if (percent >= 70) return { text: 'Baik', strong: false }
  return { text: 'Perlu Latihan', strong: false }
}

function scoreLabel(score, total) {
  const ratio = total ? score / total : 0
  if (ratio >= 0.9) return 'Sangat Siap'
  if (ratio >= 0.7) return 'Siap'
  return 'Perlu Latihan'
}

// ---- Kelas gaya yang dipakai berulang ----
const card = 'rounded bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
const row = 'flex items-center justify-between gap-4 rounded-sm bg-[#EDF3F5]'
const linkBtn =
  'cursor-pointer text-[13px] leading-5 font-semibold text-primary hover:text-primary-dark'
const pagePad = 'pr-6 pl-6 sm:pr-8'

export default function Profile() {
  const { user, isLoggedIn } = useAuth()

  // Hanya pengguna yang sudah login yang boleh membuka halaman ini.
  if (!isLoggedIn) return <Navigate to="/login" replace />

  return <ProfileContent user={user} />
}

function ProfileContent({ user }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const isDemo = user.id === DEMO_ID

  const [rawExtras, setExtras] = useState(() => getProfileExtras(user.id))
  const extras = withDefaults(rawExtras)
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')

  const stats = getLearningStats(user.id)
  const result = getDiagnosticResult(user.id)
  const level = Math.floor(stats.xp / 500) + 1

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(timer)
  }, [notice])

  const closeModal = () => setModal(null)
  const handleSaved = (message) => {
    setExtras(getProfileExtras(user.id))
    setNotice(message)
    closeModal()
  }

  const handleLogout = () => {
    logout() // hapus sesi; akun dan status Diagnostic tetap tersimpan
    navigate('/login', { replace: true })
  }

  const summary = [
    `Rapor Mindora - ${user.name}`,
    `ID: ${makeStudentCode(user.id)} | Kelas 2 SMA | Fase D`,
    '',
    `Total XP: ${stats.xp.toLocaleString('id-ID')} (data demo)`,
    `Streak belajar: ${stats.streak} hari (data demo)`,
    `Akurasi soal: ${stats.accuracy}% (data demo)`,
    `Medali: ${stats.medals} (data demo)`,
    '',
    result
      ? `Tes diagnostik: ${result.score}/${result.total}\n` +
       (result.domains ?? []).map((d) => `- ${d.name}: ${d.percent}%`).join('\n')
      : user.hasCompletedDiagnostic
        ? 'Tes diagnostik: sudah dikerjakan (rincian belum tersedia).'
        : 'Tes diagnostik: belum dikerjakan.',
  ].join('\n')

  const statItems = [
    { icon: <BoltIcon size={16} />, value: stats.xp.toLocaleString('en-US'), label: 'Total XP', tint: 'bg-[#E4DFFF] text-primary' },
    { icon: <FlameIcon size={16} />, value: `${stats.streak} Hari`, label: 'Streak Belajar', tint: 'bg-[#FFE3CC] text-[#E07B1A]' },
    { icon: <TargetIcon size={16} />, value: `${stats.accuracy}%`, label: 'Akurasi Soal', tint: 'bg-[#E4DFFF] text-primary' },
    { icon: <TrophyIcon size={16} />, value: String(stats.medals), label: 'Medali Koleksi', tint: 'bg-[#FFE3CC] text-[#E07B1A]' },
  ]

  const hasDiagnostic = user.hasCompletedDiagnostic || Boolean(result)

  return (
    <div className="flex min-h-screen bg-surface-bg font-sans text-(color:--color-shadow)">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <ProfileHeader name={user.name} />

        <main className={`flex-1 pb-10 ${pagePad}`}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 text-[13px] leading-5">
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-primary">
              <HomeIcon size={16} /> Beranda
            </Link>
            <span className="text-text-muted">/</span>
            <span className="font-medium text-primary">Profil Siswa</span>
          </nav>

          {/* Judul + aksi */}
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-rubik text-[32px] leading-10 font-bold tracking-tight text-[#161D1F]">
                Profil Siswa
              </h1>
              <p className="mt-1.5 text-[13px] leading-5">
                Kelola akun, preferensi belajar adaptif, dan ringkasan capaian matematikanmu.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModal('edit')}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-primary shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#F1EEFF]"
              >
                <PencilIcon size={16} /> Edit Profil
              </button>
              <button
                type="button"
                onClick={() => setModal('report')}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-2xl bg-[#FFA048] px-5 text-sm font-semibold text-white hover:brightness-95"
              >
                <ShareIcon size={16} /> Bagikan Rapor
              </button>
            </div>
          </div>

          {notice && (
            <p
              role="status"
              className="mt-4 rounded-xl bg-[#E6F4EA] px-4 py-3 text-sm font-medium text-[#1E4620]"
            >
              {notice}
            </p>
          )}

          {/* Kartu identitas + statistik */}
          <section className={`${card} mt-6 flex flex-wrap items-center justify-between gap-6 p-8`}>
            <div className="flex min-w-0 flex-wrap items-start gap-5">
              <div className="relative h-[110px] w-[110px] shrink-0">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 font-rubik text-4xl font-bold text-primary ring-4 ring-[#E4DFFF]">
                  {getInitials(user.name)}
                </div>
                <span className="absolute -right-1 -bottom-1 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] leading-4 font-bold whitespace-nowrap text-white ring-2 ring-white">
                  <SparklesIcon size={12} /> Lvl {level}
                </span>
              </div>

              <div className="max-w-[300px] min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-rubik text-2xl leading-8 font-semibold text-[#161D1F]">
                    {user.name}
                  </h2>
                  <span className="rounded-full bg-[#E4DFFF] px-2.5 py-0.5 text-[11px] leading-4 font-bold whitespace-nowrap text-primary">
                    Fase D &bull; SMA
                  </span>
                </div>
                <p className="mt-1 text-sm leading-5">
                  {makeUsername(user.name)} &bull; ID: {makeStudentCode(user.id)}
                </p>
                <div className="mt-2.5 flex flex-col items-start gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF3F5] px-3 py-0.5 text-xs leading-4">
                    <GraduationIcon size={14} className="text-primary" /> Kelas 2 SMA
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF3F5] px-3 py-0.5 text-xs leading-4">
                    <TargetIcon size={14} className="text-[#E07B1A]" /> Siswa Mandiri Adaptif
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[22px] text-[#474554] italic">
                  {extras.bio ? `“${extras.bio}”` : 'Belum ada deskripsi diri.'}
                </p>
              </div>
            </div>

            <div>
              <div className="rounded-sm bg-[#E8EFF1] p-4">
                <div className="flex flex-wrap justify-center gap-3">
                  {statItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex h-[116px] w-[90px] flex-col items-center justify-center rounded-sm bg-white px-2 text-center"
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${item.tint}`}>
                        {item.icon}
                      </span>
                      <span className="mt-2 font-rubik text-xl leading-7 font-medium whitespace-nowrap">
                        {item.value}
                      </span>
                      <span className="w-[60px] text-xs leading-4 text-[#474554]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {isDemo && (
                <p className="mt-2 text-right text-[11px] text-text-muted">Data demo</p>
              )}
            </div>
          </section>

          {/* Dua kolom */}
          <div className="mt-8 grid items-start gap-x-8 gap-y-6 lg:grid-cols-[7fr_10fr]">
            <div className="flex flex-col gap-6">
              {/* Preferensi Belajar */}
              <section className={`${card} p-6`}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4DFFF] text-primary">
                    <SlidersIcon size={18} />
                  </span>
                  <div>
                    <h2 className="font-rubik text-lg leading-7 font-medium">Preferensi Belajar</h2>
                    <p className="text-xs leading-4 font-medium text-[#474554]">
                      Kustomisasi ritme dan model adaptif
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className={`${row} px-3.5 py-3.5`}>
                    <div className="flex items-center gap-3">
                      <TimerIcon size={20} className="shrink-0 text-primary" />
                      <div>
                        <p className="text-[13px] leading-5 font-medium">Target Belajar Harian</p>
                        <p className="text-[11px] leading-4 text-[#474554]">
                          {extras.dailyGoalMinutes} Menit / hari
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setModal('goal')} className={linkBtn}>
                      Ubah
                    </button>
                  </div>

                  <div className={`${row} px-3.5 py-3.5`}>
                    <div className="flex items-center gap-3">
                      <BellIcon size={20} className="shrink-0 text-primary" />
                      <div>
                        <p className="text-[13px] leading-5 font-medium">Notifikasi Pengingat</p>
                        <p className="text-[11px] leading-4 text-[#474554]">
                          {extras.reminderEnabled
                            ? `Setiap hari pukul ${extras.reminderTime} WIB`
                            : 'Dimatikan'}
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setModal('reminder')} className={linkBtn}>
                      Ubah
                    </button>
                  </div>
                </div>
              </section>

              {/* Akun & Keamanan */}
              <section className={`${card} p-6`}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFF1]">
                    <ShieldIcon size={18} />
                  </span>
                  <div>
                    <h2 className="font-rubik text-lg leading-7 font-medium">Akun &amp; Keamanan</h2>
                    <p className="text-xs leading-4 font-medium text-[#474554]">
                      Akses kredensial siswa terdaftar
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="rounded-sm bg-[#EDF3F5] px-3 py-3">
                    <p className="text-[11px] leading-4 font-semibold text-[#474554]">Email Terdaftar</p>
                    <p className="mt-1 text-sm leading-5 break-all">{user.email}</p>
                  </div>

                  <div className={`${row} px-3 py-3`}>
                    <div>
                      <p className="text-[11px] leading-4 font-semibold text-[#474554]">Kata Sandi</p>
                      <p className="text-sm leading-5 tracking-[0.25em]">••••••••••••</p>
                    </div>
                    <button type="button" onClick={() => setModal('password')} className={linkBtn}>
                      Ubah Sandi
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#FDE8E8] text-[13px] font-semibold text-[#BA1A1A] hover:bg-[#FBD5D5]"
                  >
                    <LogoutIcon size={18} /> Keluar dari Akun
                  </button>
                </div>
              </section>
            </div>

            {/* Hasil Tes Diagnostik */}
            <section className={`${card} p-7`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4DFFF] text-primary">
                    <ChartIcon size={18} />
                  </span>
                  <div className="max-w-[240px]">
                    <h2 className="font-rubik text-lg leading-[25px] font-medium">
                      Hasil Tes Diagnostik Matematika
                    </h2>
                    <p className="mt-1 text-xs leading-4 font-medium text-[#474554]">
                      Evaluasi domain kompetensi Kurikulum Merdeka
                    </p>
                  </div>
                </div>
                {result && (
                  <span className="flex w-[170px] shrink-0 items-center gap-2 rounded-3xl bg-[#FFDFC0] px-4 py-1.5 text-[13px] leading-[18px] font-semibold">
                    <BadgeCheckIcon size={20} className="shrink-0" />
                    <span>
                      {result.score} / {result.total} &bull; {scoreLabel(result.score, result.total)}
                    </span>
                  </span>
                )}
              </div>

              {result ? (
                <div className="mt-9 flex flex-col gap-3.5">
                 {(result.domains ?? []).map((domain) => {
                    const label = domainLabel(domain.percent)
                    return (
                      <div key={domain.name}>
                        <div className="flex items-center justify-between gap-3 text-[13px] leading-5">
                          <span>{domain.name}</span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span
                              className={`rounded-full px-2 text-[11px] leading-4 font-bold ${
                                label.strong
                                  ? 'bg-[#EDEBFA] text-primary'
                                  : 'bg-[#F6EADB] text-[#8A4B00]'
                              }`}
                            >
                              {label.text}
                            </span>
                            <span className="font-medium">{domain.percent}%</span>
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EEF2F4]">
                          <div
                            className={`h-full rounded-full ${label.strong ? 'bg-primary' : 'bg-[#FFA048]'}`}
                            style={{ width: `${Math.min(100, Math.max(0, domain.percent))}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-9 rounded-sm bg-[#EDF3F5] px-6 py-10 text-center">
                  <p className="text-[13px] leading-5 font-medium">
                    {user.hasCompletedDiagnostic
                      ? 'Rincian hasil tes diagnostik belum tersedia di profil.'
                      : 'Kamu belum mengerjakan tes diagnostik.'}
                  </p>
                  <p className="mt-1 text-xs leading-4 text-[#474554]">
                    {user.hasCompletedDiagnostic
                      ? 'Skor dan progres tiap domain akan tampil di sini setelah datanya tersedia.'
                      : 'Kerjakan tes untuk melihat progres tiap domain matematikamu.'}
                  </p>
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                {hasDiagnostic ? (
                  <Link
                    to="/diagnostic"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-[#E8EDF0] px-5 text-[13px] font-medium hover:bg-[#DDE5E8]"
                  >
                    <RefreshIcon size={18} /> Tes Ulang Diagnostik
                  </Link>
                ) : (
                  <Link
                    to="/diagnostic"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-5 text-[13px] font-semibold text-white hover:bg-primary-dark"
                  >
                    Mulai Tes Diagnostik <ArrowRightIcon size={16} />
                  </Link>
                )}

                {hasDiagnostic && (
                  <button
                    type="button"
                    onClick={() => setModal('report')}
                    className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-[#2B1FA8] px-5 text-[13px] font-semibold text-white hover:bg-[#241A8C]"
                  >
                    Lihat Rapor Lengkap <ArrowRightIcon size={16} />
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-[#E3E8EA] py-4 text-center text-[13px] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <LockIcon size={14} /> Keamanan data belajarmu terjamin sepenuhnya.
          </span>
        </footer>
      </div>

      {modal === 'edit' && (
        <EditProfileModal user={user} extras={extras} isDemo={isDemo} onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'password' && (
        <ChangePasswordModal isDemo={isDemo} onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'goal' && (
        <DailyGoalModal extras={extras} onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'reminder' && (
        <ReminderModal extras={extras} onClose={closeModal} onSaved={handleSaved} />
      )}
      {modal === 'report' && <ReportModal summary={summary} onClose={closeModal} />}
    </div>
  )
}