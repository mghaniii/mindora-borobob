import React from 'react'

/**
 * Komponen Header Dashboard
 * Menampilkan kolom pencarian materi, lonceng notifikasi, dan profil pengguna
 * Direvisi dengan jarak atas pt-4 sm:pt-5 dan tinggi h-[96px] agar tidak mepet ke tepi atas layar
 * Sesuai referensi visual Design/Header bagian.svg
 */
export function Header({
  userName = 'Budi Pratama',
  userGrade = 'Kelas 2 SMA',
  userAvatar = null,
  notificationCount = 2,
  onSearch,
}) {
  return (
    <header className="h-[96px] w-full bg-surface-bg/90 backdrop-blur-md px-6 sm:px-8 pt-4 pb-3 flex items-center justify-end gap-5 sticky top-0 z-30 transition-all">
      {/* Kolom pencarian dengan pintasan Ctrl + K */}
      <div className="flex-1 max-w-md relative">
        <div className="relative flex items-center">
          {/* Ikon Kaca Pembesar Pencarian */}
          <svg
            className="w-4 h-4 text-[#787586] absolute left-3.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari materi atau topik..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-20 bg-white border border-slate-200/80 rounded-xl text-xs font-normal text-zinc-800 placeholder-[#787586] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
          />
          {/* Badge Pintasan Tombol Ctrl + K */}
          <div className="absolute right-2.5 hidden sm:flex items-center px-2 py-1 bg-[#E8EFF1] rounded-md text-[11px] font-medium text-[#474554]">
            <span>Ctrl + K</span>
          </div>
        </div>
      </div>

      {/* Bagian aksi kanan: Notifikasi & Profil pengguna */}
      <div className="flex items-center gap-4">
        {/* Tombol lonceng notifikasi */}
        <button
          aria-label="Notifikasi"
          className="w-11 h-11 rounded-full hover:bg-slate-200/60 flex items-center justify-center relative transition-colors cursor-pointer"
        >
          <svg
            className="w-10 h-10 shrink-0"
            viewBox="0 0 31 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lonceng */}
            <path
              d="M8 23.5833V21.75H9.83333V15.3333C9.83333 14.0653 10.2153 12.9385 10.9792 11.9531C11.7431 10.9677 12.7361 10.3222 13.9583 10.0167V9.375C13.9583 8.99306 14.092 8.6684 14.3594 8.40104C14.6267 8.13368 14.9514 8 15.3333 8C15.7153 8 16.0399 8.13368 16.3073 8.40104C16.5747 8.6684 16.7083 8.99306 16.7083 9.375V10.0167C17.9306 10.3222 18.9236 10.9677 19.6875 11.9531C20.4514 12.9385 20.8333 14.0653 20.8333 15.3333V21.75H22.6667V23.5833H8V23.5833M15.3333 16.7083V16.7083V16.7083V16.7083V16.7083V16.7083V16.7083V16.7083V16.7083M15.3333 26.3333C14.8292 26.3333 14.3976 26.1538 14.0385 25.7948C13.6795 25.4358 13.5 25.0042 13.5 24.5H17.1667C17.1667 25.0042 16.9872 25.4358 16.6281 25.7948C16.2691 26.1538 15.8375 26.3333 15.3333 26.3333V26.3333M11.6667 21.75H19V15.3333C19 14.325 18.641 13.4618 17.9229 12.7438C17.2049 12.0257 16.3417 11.6667 15.3333 11.6667C14.325 11.6667 13.4618 12.0257 12.7438 12.7438C12.0257 13.4618 11.6667 14.325 11.6667 15.3333V21.75V21.75"
              fill="#474554"
            />
            {/* Titik Indikator Notifikasi Oranye */}
            {notificationCount > 0 && (
              <rect
                x="15"
                y="6"
                width="10"
                height="10"
                rx="5"
                fill="#FFA048"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            )}
          </svg>
        </button>

        {/* Lencana profil pengguna: Avatar di KIRI, Nama & Kelas di KANAN (sesuai Header bagian.svg) */}
        <div className="flex items-center gap-3 pl-1">
          {/* Foto Profil (Avatar) di sebelah KIRI */}
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E4DFFF] shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 ring-2 ring-[#E4DFFF] text-primary font-bold text-xs flex items-center justify-center shrink-0">
              BP
            </div>
          )}

          {/* Nama & Kelas di sebelah KANAN (Rata Kiri) */}
          <div className="text-left hidden sm:flex flex-col justify-center">
            <span className="text-sm font-semibold text-[#161D1F] leading-tight">
              {userName}
            </span>
            <span className="text-xs font-normal text-[#474554] leading-tight mt-0.5">
              {userGrade}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
