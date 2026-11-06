import React from 'react'
import Button from '../../../components/common/Button'
import iconEstimateWaktu from '../../../assets/diagnostic/icon-estimate-waktu.svg'
import iconSoal from '../../../assets/diagnostic/icon-soal.svg'
import illustrationAdventure from '../../../assets/diagnostic/illustration-adventure.svg'

/**
 * Komponen DiagnosticIntro
 * Tampilan pengantar tes adaptif diagnostik Mindora
 * Mengacu pada desain Figma rencana.md (baris 80-135)
 * Memanfaatkan langsung file aset SVG tanpa penumpukan kode mentah di JSX
 */
export default function DiagnosticIntro({ onStart }) {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-28 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Kolom Kiri: Informasi Tes & Tombol Aksi */}
        <div className="flex-1 flex flex-col items-start gap-8 max-w-xl">
          {/* Bagian Judul & Deskripsi */}
          <div className="flex flex-col items-start gap-4">
            <div className="px-4 py-1.5 bg-[#FFF6ED] rounded-[20px] inline-flex items-center justify-center">
              <span className="text-secondary text-xs font-extrabold font-sans uppercase tracking-wider">
                TES ADAPTIF
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-rubik text-text-main leading-tight">
              Yuk, Cari Tahu <span className="text-primary">Level Matematika</span> Kamu!
            </h1>

            <p className="text-text-muted text-base sm:text-lg font-normal leading-relaxed">
              Ini bukan ujian menegangkan, cuma buat tau kemampuan awal kamu supaya materi belajarnya nanti pas dan nggak kepanjangan. Dijamin asyik, santai, dan bebas stres!
            </p>
          </div>

          {/* Bagian Kartu Info (Estimasi Waktu & Jumlah Soal) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kartu 1: Estimasi Waktu */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 transition-transform duration-200 hover:-translate-y-0.5">
              <img
                src={iconEstimateWaktu}
                alt="Estimasi Waktu"
                className="w-10 h-10 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs text-text-subtle font-normal font-rubik">
                  Estimasi Waktu
                </span>
                <span className="text-base font-bold text-text-main font-rubik">
                  ± 10 Menit
                </span>
              </div>
            </div>

            {/* Kartu 2: Jumlah Soal */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 transition-transform duration-200 hover:-translate-y-0.5">
              <img
                src={iconSoal}
                alt="Jumlah Soal"
                className="w-10 h-10 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs text-text-subtle font-normal font-rubik">
                  Jumlah Soal
                </span>
                <span className="text-base font-bold text-text-main font-rubik">
                  15 Soal Seru
                </span>
              </div>
            </div>
          </div>

          {/* Bagian Tombol CTA & Catatan Istirahat */}
          <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={onStart}
              className="w-full sm:w-auto"
            >
              Mulai Tes Sekarang
            </Button>
            <p className="text-xs text-text-subtle font-normal">
              *Kamu bisa menjeda tes kapan saja jika perlu beristirahat.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Ilustrasi Hero Petualangan */}
        <div className="w-full lg:w-auto flex justify-center items-center shrink-0">
          <div className="w-full max-w-[500px] lg:max-w-[540px]">
            <img
              src={illustrationAdventure}
              alt="Mulai Petualanganmu!"
              className="w-full h-auto object-contain drop-shadow-md rounded-[32px] transition-transform duration-300 hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
