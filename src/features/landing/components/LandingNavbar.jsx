import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/common'
import logoIcon from '../../../assets/logo-icon.png'

// Link dalam halaman (anchor); placeholder tanpa tujuan dirender sebagai tombol
const NAV_LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara kerja', href: '#cara-kerja' },
  { label: 'About', href: '#' },
]

function IconMenu() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M18.3 5.71L12 12.01l-6.3-6.3-1.42 1.42L10.59 13.4 4.3 19.7l1.42 1.42L12 14.83l6.29 6.29 1.41-1.41-6.29-6.3 6.29-6.29-1.4-1.41z" />
    </svg>
  )
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
      <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center p-1.5 shadow-sm transition-transform group-hover:scale-105">
        <img src={logoIcon} alt="Mindora Logo" className="w-full h-full object-contain" />
      </span>
      <span className="text-xl font-extrabold font-rubik text-text-main tracking-tight">
        Mindora
      </span>
    </Link>
  )
}

export function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-surface-border">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Brand />

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.href === '#' ? (
              <button
                key={link.label}
                type="button"
                className="text-sm font-semibold font-sans text-text-muted hover:text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold font-sans text-text-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Aksi desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-bold font-sans text-text-main hover:text-primary transition-colors px-3 py-2"
          >
            Masuk
          </Link>
          <Button variant="secondary" size="sm" onClick={() => navigate('/register')}>
            Daftar
          </Button>
        </div>

        {/* Tombol hamburger mobile */}
        <button
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-text-main hover:bg-surface-card transition-colors cursor-pointer"
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-border bg-white px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) =>
            link.href === '#' ? (
              <button
                key={link.label}
                type="button"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold font-sans text-text-main hover:bg-surface-card transition-colors cursor-pointer text-left"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold font-sans text-text-main hover:bg-surface-card transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <div className="flex flex-col gap-3 pt-3 mt-2 border-t border-surface-border">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-bold font-sans text-text-main hover:text-primary transition-colors"
            >
              Masuk
            </Link>
            <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>
              Daftar
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default LandingNavbar
