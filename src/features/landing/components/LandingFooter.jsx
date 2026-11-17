import { Link } from 'react-router-dom'
import logoIcon from '../../../assets/logo-icon.png'
import iconInstagram from '../../../assets/landing-page/icon-ig-LP.svg'
import iconDiscord from '../../../assets/landing-page/icon-dc-LP.svg'
import iconLinkedin from '../../../assets/landing-page/icon-linkedin-LP.svg'

const FOOTER_COLUMNS = [
  {
    title: 'Navigasi',
    links: ['Fitur Utama', 'Cara Kerja', 'About'],
  },
  {
    title: 'Materi Belajar',
    links: ['SD (Kelas 1-6)', 'SMP (Kelas 7-9)', 'Persiapan Ujian', 'Olimpiade'],
  },
  {
    title: 'Dukungan',
    links: ['Pusat Bantuan', 'Kontak Kami', 'Kebijakan Privasi'],
  },
]

const SOCIALS = [
  { label: 'Instagram', icon: iconInstagram },
  { label: 'Discord', icon: iconDiscord },
  { label: 'LinkedIn', icon: iconLinkedin },
]

function IconHeart() {
  return (
    <svg className="w-3.5 h-3.5 fill-shadow inline-block -mt-0.5" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function LandingFooter() {
  return (
    <footer className="bg-white text-shadow border-t border-surface-stroke">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center p-1.5">
                <img src={logoIcon} alt="Mindora Logo" className="w-full h-full object-contain" />
              </span>
              <span className="text-xl font-extrabold font-rubik tracking-tight">Mindora</span>
            </Link>
            <p className="text-sm text-text-muted font-sans leading-relaxed">
              Platform pembelajaran matematika adaptif berbasis website yang menjadikan
              belajar mengasyikkan bagi siswa di seluruh Indonesia.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer"
                >
                  <img src={icon} alt="" className="w-9 h-9 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Kolom link */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-bold font-sans uppercase tracking-wide">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Baris bawah: stroke selebar layar, teks tetap dalam container */}
      <div className="border-t border-shadow/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-shadow/30 font-sans">
            © 2026 Mindora Indonesia. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-xs text-shadow/30 font-sans flex items-center gap-1.5">
            Dibuat dengan <IconHeart /> untuk Masa Depan Pendidikan Indonesia.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
