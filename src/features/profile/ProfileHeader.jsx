import { SearchIcon, BellIcon } from './ProfileIcons'

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

export function ProfileHeader({ name, grade = 'Kelas 2 SMA' }) {
  return (
    <header className="sticky top-0 z-30 flex h-24 items-center justify-between gap-4 bg-surface-bg/90 pt-1.5 pr-6 pl-6 backdrop-blur-md sm:pr-8">
      {/* Kolom pencarian */}
      <div className="relative w-full max-w-[440px]">
        <SearchIcon
          size={18}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#787586]"
        />
        <input
          type="text"
          aria-label="Cari rumus atau bab matematika"
          placeholder="Cari rumus, bab matematika..."
          className="h-10 w-full rounded-lg bg-white pr-4 pl-10 text-[13px] text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#787586] focus:ring-2 focus:ring-primary/20 sm:pr-20"
        />
        <span className="absolute top-1/2 right-3 hidden -translate-y-1/2 rounded bg-[#E8EFF1] px-2 py-0.5 text-[11px] leading-4 font-medium text-[#474554] sm:block">
          Ctrl+K
        </span>
      </div>

      {/* Notifikasi + identitas */}
      <div className="flex shrink-0 items-center gap-5">
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#474554] transition-colors hover:bg-slate-200/60"
        >
          <BellIcon size={22} />
          <span className="absolute top-2 right-2.5 h-2.5 w-2.5 rounded-full bg-[#FFA048] ring-2 ring-surface-bg" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-[#E4DFFF]">
            {getInitials(name)}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm leading-5 font-semibold text-[#161D1F]">{name}</span>
            <span className="text-xs leading-4 text-[#474554]">{grade}</span>
          </div>
        </div>
      </div>
    </header>
  )
}