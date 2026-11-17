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
} from '../features/profile/ProfileIcons'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'

const DEMO_ID = 'demo-1'

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

const card = 'rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
const row = 'flex items-center justify-between gap-4 rounded-xl bg-[#EDF3F5] px-5 py-4'

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

  const [extras, setExtras] = useState(() => getProfileExtras(user.id))
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')

  const stats = getLearningStats(user.id)
  const result = getDiagnosticResult(user.id)
  // Hasil tersimpan versi lama belum punya domains; jangan render rincian dari bentuk itu
  const resultDetail = Array.isArray(result?.domains) ? result : null
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
    resultDetail
      ? `Tes diagnostik: ${resultDetail.score}/${resultDetail.total}\n` +
        resultDetail.domains.map((d) => `- ${d.name}: ${d.percent}%`).join('\n')
      : user.hasCompletedDiagnostic || result
        ? 'Tes diagnostik: sudah dikerjakan (rincian belum tersedia).'
        : 'Tes diagnostik: belum dikerjakan.',
  ].join('\n')

  const statItems = [
    { icon: <BoltIcon size={20} />, value: stats.xp.toLocaleString('en-US'), label: 'Total XP', tint: 'bg-[#E4DFFF] text-primary' },
    { icon: <FlameIcon size={20} />, value: `${stats.streak} Hari`, label: 'Streak Belajar', tint: 'bg-[#FFE3CC] text-[#E07B1A]' },
    { icon: <TargetIcon size={20} />, value: `${stats.accuracy}%`, label: 'Akurasi Soal', tint: 'bg-[#E4DFFF] text-primary' },
    { icon: <TrophyIcon size={20} />, value: String(stats.medals), label: 'Medali Koleksi', tint: 'bg-[#FFE3CC] text-[#E07B1A]' },
  ]

  return (
    <div className="flex min-h-screen bg-surface-bg font-sans text-(color:--color-shadow)">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 px-6 pb-10 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-primary">
              <HomeIcon size={16} /> Beranda
            </Link>
            <span className="text-text-muted">/</span>
            <span className="font-medium text-primary">Profil Siswa</span>
          </nav>

          {/* Judul + aksi */}
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-rubik text-[40px] leading-[48px] font-bold tracking-tight">
                Profil Siswa
              </h1>
              <p className="mt-1 text-base">
                Kelola akun, preferensi belajar adaptif, dan ringkasan capaian matematikanmu.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModal('edit')}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-primary shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#F1EEFF]"
              >
                <PencilIcon size={18} /> Edit Profil
              </button>
              <button
                type="button"
                onClick={() => setModal('report')}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#FFA048] px-6 text-base font-semibold text-white hover:brightness-95"
              >
                <ShareIcon size={18} /> Bagikan Rapor
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
          <section className={`${card} mt-6 flex flex-wrap items-start justify-between gap-8 p-8`}>
            <div className="flex flex-wrap gap-6">
              <div className="relative h-[120px] w-[120px] shrink-0">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 font-rubik text-4xl font-bold text-primary ring-4 ring-[#E4DFFF]">
                  {getInitials(user.name)}
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold whitespace-nowrap text-white">
                  Lvl {level}
                </span>
              </div>

              <div className="max-w-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-rubik text-[24px] leading-8 font-bold">{user.name}</h2>
                  <span className="rounded-full bg-[#E4DFFF] px-3 py-1 text-xs font-bold text-primary">
                    Fase D &bull; SMA
                  </span>
                </div>
                <p className="mt-1 text-base">
                  {makeUsername(user.name)} &bull; ID: {makeStudentCode(user.id)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF3F5] px-3 py-1.5 text-sm">
                    <GraduationIcon size={16} /> Kelas 2 SMA
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF3F5] px-3 py-1.5 text-sm">
                    <TargetIcon size={16} /> Siswa Mandiri Adaptif
                  </span>
                </div>
                <p className="mt-4 text-base text-[#474554] italic">
                  {extras.bio ? `“${extras.bio}”` : 'Belum ada deskripsi diri.'}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-[#E8EFF1] p-6">
              <p className="mb-3 text-right text-xs text-text-muted">Data demo</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {statItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex w-[132px] flex-col items-center rounded-lg bg-white px-3 py-5 text-center"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${item.tint}`}>
                      {item.icon}
                    </span>
                    <span className="mt-3 font-rubik text-2xl font-medium">{item.value}</span>
                    <span className="text-sm leading-5 text-[#474554]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Dua kolom */}
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="flex flex-col gap-8">
              {/* Preferensi Belajar */}
              <section className={card}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E4DFFF] text-primary">
                    <SlidersIcon />
                  </span>
                  <div>
                    <h2 className="font-rubik text-2xl font-medium">Preferensi Belajar</h2>
                    <p className="text-sm font-medium text-[#474554]">Kustomisasi ritme dan model adaptif</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className={row}>
                    <div className="flex items-center gap-4">
                      <TimerIcon className="text-primary" />
                      <div>
                        <p className="text-base font-medium">Target Belajar Harian</p>
                        <p className="text-sm text-[#474554]">{extras.dailyGoalMinutes} Menit / hari</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setModal('goal')} className="cursor-pointer text-base font-semibold text-primary hover:text-primary-dark">
                      Ubah
                    </button>
                  </div>

                  <div className={row}>
                    <div className="flex items-center gap-4">
                      <BellIcon className="text-primary" />
                      <div>
                        <p className="text-base font-medium">Notifikasi Pengingat</p>
                        <p className="text-sm text-[#474554]">
                          {extras.reminderEnabled
                            ? `Setiap hari pukul ${extras.reminderTime} WIB`
                            : 'Dimatikan'}
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setModal('reminder')} className="cursor-pointer text-base font-semibold text-primary hover:text-primary-dark">
                      Ubah
                    </button>
                  </div>
                </div>
              </section>

              {/* Akun & Keamanan */}
              <section className={card}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF3F5]">
                    <ShieldIcon />
                  </span>
                  <div>
                    <h2 className="font-rubik text-2xl font-medium">Akun &amp; Keamanan</h2>
                    <p className="text-sm font-medium text-[#474554]">Akses kredensial siswa terdaftar</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="rounded-xl bg-[#EDF3F5] px-5 py-4">
                    <p className="text-sm font-medium text-[#474554]">Email Terdaftar</p>
                    <p className="mt-1 text-lg break-all">{user.email}</p>
                  </div>

                  <div className={row}>
                    <div>
                      <p className="text-sm font-medium text-[#474554]">Kata Sandi</p>
                      <p className="mt-1 text-lg tracking-widest">••••••••••••</p>
                    </div>
                    <button type="button" onClick={() => setModal('password')} className="cursor-pointer text-base font-semibold text-primary hover:text-primary-dark">
                      Ubah Sandi
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FDE8E8] text-base font-semibold text-[#BA1A1A] hover:bg-[#FBD5D5]"
                  >
                    <LogoutIcon size={20} /> Keluar dari Akun
                  </button>
                </div>
              </section>
            </div>

            {/* Hasil Tes Diagnostik */}
            <section className={card}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E4DFFF] text-primary">
                    <ChartIcon />
                  </span>
                  <div>
                    <h2 className="font-rubik text-2xl leading-8 font-medium">Hasil Tes Diagnostik Matematika</h2>
                    <p className="text-sm font-medium text-[#474554]">Evaluasi domain kompetensi Kurikulum Merdeka</p>
                  </div>
                </div>
                {resultDetail && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFDFC0] px-5 py-3 text-base font-semibold">
                    <BadgeCheckIcon size={20} />
                    {resultDetail.score} / {resultDetail.total} &bull; {scoreLabel(resultDetail.score, resultDetail.total)}
                  </span>
                )}
              </div>

              {resultDetail ? (
                <div className="mt-8 flex flex-col gap-5">
                  {resultDetail.domains.map((domain) => {
                    const label = domainLabel(domain.percent)
                    return (
                      <div key={domain.name}>
                        <div className="flex items-center justify-between text-base">
                          <span>{domain.name}</span>
                          <span className="flex items-center gap-3">
                            <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${label.strong ? 'bg-[#E4DFFF] text-primary' : 'bg-[#FFE3CC] text-[#8A4B00]'}`}>
                              {label.text}
                            </span>
                            <span className="font-semibold">{domain.percent}%</span>
                          </span>
                        </div>
                        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#EDF3F5]">
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
                <div className="mt-8 rounded-xl bg-[#EDF3F5] px-6 py-10 text-center">
                  <p className="text-base font-medium">
                    {user.hasCompletedDiagnostic || result
                      ? 'Rincian hasil tes diagnostik belum tersedia di profil.'
                      : 'Kamu belum mengerjakan tes diagnostik.'}
                  </p>
                  <p className="mt-1 text-sm text-[#474554]">
                    {user.hasCompletedDiagnostic || result
                      ? 'Skor dan progres tiap domain akan tampil di sini setelah datanya tersedia.'
                      : 'Kerjakan tes untuk melihat progres tiap domain matematikamu.'}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {user.hasCompletedDiagnostic || result ? (
                  <Link
                    to="/diagnostic"
                    className="inline-flex h-14 items-center gap-2 rounded-full bg-[#E8EFF1] px-6 text-base font-medium hover:bg-[#DDE7EA]"
                  >
                    <RefreshIcon size={20} /> Tes Ulang Diagnostik
                  </Link>
                ) : (
                  <Link
                    to="/diagnostic"
                    className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white hover:bg-primary-dark"
                  >
                    Mulai Tes Diagnostik <ArrowRightIcon size={20} />
                  </Link>
                )}

                {(user.hasCompletedDiagnostic || result) && (
                  <button
                    type="button"
                    onClick={() => setModal('report')}
                    className="inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-[#2B1FA8] px-6 text-base font-semibold text-white hover:bg-[#241A8C]"
                  >
                    Lihat Rapor Lengkap <ArrowRightIcon size={20} />
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-[#E3E8EA] py-5 text-center text-sm text-text-muted">
          Keamanan data belajarmu terjamin sepenuhnya.
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