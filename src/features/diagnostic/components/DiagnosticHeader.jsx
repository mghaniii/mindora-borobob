import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoIcon from '../../../assets/logo-icon.png'
import Button from '../../../components/common/Button'

/**
 * Komponen DiagnosticHeader
 * Header navigasi atas khusus untuk alur tes diagnostik
 * Mengacu pada desain Figma rencana.md (baris 61-78)
 */
export default function DiagnosticHeader({ onExit }) {
  const navigate = useNavigate()

  const handleExit = () => {
    if (onExit) {
      onExit()
    } else {
      // Default: navigasi kembali ke halaman dashboard
      navigate('/dashboard')
    }
  }

  return (
    <header className="w-full h-20 px-6 sm:px-12 lg:px-20 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-40">
      {/* Sisi Kiri: Logo Mindora */}
      <Link to="/dashboard" className="flex items-center gap-3 group">
        <div className="w-8 h-8 p-1 bg-primary rounded-lg flex items-center justify-center overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105">
          <img src={logoIcon} alt="Mindora Logo" className="w-6 h-auto object-contain" />
        </div>
        <span className="text-primary text-2xl font-extrabold font-rubik tracking-tight">
          Mindora
        </span>
      </Link>

      {/* Sisi Tengah: Badge Persiapan Tes */}
      <div className="hidden sm:inline-flex px-4 py-1.5 bg-primary/10 rounded-[20px] items-center justify-center">
        <span className="text-primary text-xs font-extrabold font-sans uppercase tracking-wider">
          PERSIAPAN TES
        </span>
      </div>

      {/* Sisi Kanan: Bantuan & Tombol Keluar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => alert('Fitur bantuan tes diagnostik dapat diakses melalui pembimbing atau pusat bantuan.')}
          className="px-3 sm:px-4 py-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          Butuh Bantuan?
        </button>

        <Button
          variant="outline-secondary"
          size="md"
          onClick={handleExit}
        >
          Keluar
        </Button>
      </div>
    </header>
  )
}
