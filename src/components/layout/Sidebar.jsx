import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoIcon from '../../assets/logo-icon.png'
import iconDashboard from '../../assets/sidebar/icon-dashboard-SD.svg?raw'
import iconMateri from '../../assets/sidebar/icon-materi-SD.svg?raw'
import iconLatihan from '../../assets/sidebar/icon-latihan-SD.svg?raw'
import iconRiwayat from '../../assets/sidebar/icon-riwayat-SD.svg?raw'

// Aset SVG sidebar pakai stroke="currentColor" agar warna ikut state aktif/non-aktif
function SidebarIcon({ src }) {
  return (
    <span
      className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: src }}
    />
  )
}

function ProfileSettingsIcon({ className = "w-[18px] h-4" }) {
  return (
    <svg className={className} viewBox="46 330.208 18.2 15.58" fill="none">
      <path
        d="M53.3333 337.542C52.325 337.542 51.4618 337.183 50.7438 336.465C50.0257 335.747 49.6667 334.883 49.6667 333.875C49.6667 332.867 50.0257 332.004 50.7438 331.285C51.4618 330.567 52.325 330.208 53.3333 330.208C54.3417 330.208 55.2049 330.567 55.9229 331.285C56.641 332.004 57 332.867 57 333.875C57 334.883 56.641 335.747 55.9229 336.465C55.2049 337.183 54.3417 337.542 53.3333 337.542M46 344.875V342.308C46 341.804 46.1299 341.331 46.3896 340.888C46.6493 340.444 47.0083 340.108 47.4667 339.879C48.2458 339.482 49.1243 339.146 50.1021 338.871C51.0799 338.596 52.1569 338.458 53.3333 338.458C53.4556 338.458 53.5625 338.458 53.6542 338.458C53.7458 338.458 53.8375 338.474 53.9292 338.504C53.8069 338.779 53.7038 339.066 53.6198 339.364C53.5358 339.661 53.4708 339.971 53.425 340.292H53.3333C52.2486 340.292 51.2747 340.429 50.4115 340.704C49.5483 340.979 48.8417 341.254 48.2917 341.529C48.1542 341.606 48.0434 341.713 47.9594 341.85C47.8753 341.988 47.8333 342.14 47.8333 342.308V343.042H53.6083C53.7 343.363 53.8222 343.68 53.975 343.993C54.1278 344.306 54.2958 344.6 54.4792 344.875H46M58.8333 345.792L58.5583 344.417C58.375 344.34 58.2031 344.26 58.0427 344.176C57.8823 344.092 57.7181 343.989 57.55 343.867L56.2208 344.279L55.3042 342.721L56.3583 341.804C56.3278 341.59 56.3125 341.392 56.3125 341.208C56.3125 340.025 56.3278 340.826 56.3583 340.613L55.3042 339.696L56.2208 338.138L57.55 338.55C57.7181 338.428 57.8823 338.325 58.0427 338.241C58.2031 338.157 58.375 338.076 58.5583 338L58.8333 336.625H60.6667L60.9417 338C61.125 338.076 61.2969 338.16 61.4573 338.252C61.6177 338.344 61.7819 338.458 61.95 338.596L63.2792 338.138L64.1958 339.742L63.1417 340.658C63.1722 340.842 63.1875 341.033 63.1875 341.231C63.1875 341.43 63.1722 341.621 63.1417 341.804L64.1958 342.721L63.2792 344.279L61.95 343.867C61.7819 343.989 61.6177 344.092 61.4573 344.176C61.2969 344.26 61.125 344.34 60.9417 344.417L60.6667 345.792H58.8333M59.75 343.042C60.2542 343.042 60.6858 342.862 61.0448 342.503C61.4038 342.144 61.5833 341.713 61.5833 341.208C61.5833 340.704 61.4038 340.273 61.0448 339.914C60.6858 339.555 60.2542 339.375 59.75 339.375C59.2458 339.375 58.8142 339.555 58.4552 339.914C58.0962 340.273 57.9167 340.704 57.9167 341.208C57.9167 341.713 58.0962 342.144 58.4552 342.503C58.8142 342.862 59.2458 343.042 59.75 343.042M53.3333 335.708C53.8375 335.708 54.2691 335.529 54.6281 335.17C54.9872 334.811 55.1667 334.379 55.1667 333.875C55.1667 333.371 54.9872 332.939 54.6281 332.58C54.2691 332.221 53.8375 332.042 53.3333 332.042C52.8292 332.042 52.3976 332.221 52.0385 332.58C51.6795 332.939 51.5 333.371 51.5 333.875C51.5 334.379 51.6795 334.811 52.0385 335.17C52.3976 335.529 52.8292 335.708 53.3333 335.708"
        fill="currentColor"
      />
    </svg>
  )
}

function BadgeAwardIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="255.5 968.25 16.5 15.75" fill="none">
      <path
        d="M261.2 984L259.775 981.6L257.075 981L257.337 978.225L255.5 976.125L257.337 974.025L257.075 971.25L259.775 970.65L261.2 968.25L263.75 969.337L266.3 968.25L267.725 970.65L270.425 971.25L270.163 974.025L272 976.125L270.163 978.225L270.425 981L267.725 981.6L266.3 984L263.75 982.913L261.2 984M261.838 982.087L263.75 981.262L265.7 982.087L266.75 980.288L268.812 979.8L268.625 977.7L270.012 976.125L268.625 974.512L268.812 972.412L266.75 971.963L265.663 970.163L263.75 970.987L261.8 970.163L260.75 971.963L258.688 972.412L258.875 974.512L257.487 976.125L258.875 977.7L258.688 979.837L260.75 980.288L261.838 982.087M262.963 978.788L267.2 974.55L266.15 973.463L262.963 976.65L261.35 975.075L260.3 976.125L262.963 978.788"
        fill="currentColor"
      />
    </svg>
  )
}

function HelpIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="40 1117.5 15 15" fill="none">
      <path
        d="M47.4625 1129.5C47.725 1129.5 47.9469 1129.41 48.1281 1129.23C48.3094 1129.05 48.4 1128.82 48.4 1128.56C48.4 1128.3 48.3094 1128.08 48.1281 1127.9C47.9469 1127.72 47.725 1127.62 47.4625 1127.62C47.2 1127.62 46.9781 1127.72 46.7969 1127.9C46.6156 1128.08 46.525 1128.3 46.525 1128.56C46.525 1128.82 46.6156 1129.05 46.7969 1129.23C46.9781 1129.41 47.2 1129.5 47.4625 1129.5M46.7875 1126.61H48.175C48.175 1126.2 48.2219 1125.88 48.3156 1125.64C48.4094 1125.4 48.675 1125.07 49.1125 1124.66C49.4375 1124.34 49.6938 1124.03 49.8813 1123.73C50.0688 1123.44 50.1625 1123.09 50.1625 1122.68C50.1625 1121.98 49.9062 1121.44 49.3938 1121.06C48.8813 1120.69 48.275 1120.5 47.575 1120.5C46.8625 1120.5 46.2844 1120.69 45.8406 1121.06C45.3969 1121.44 45.0875 1121.89 44.9125 1122.41L46.15 1122.9C46.2125 1122.68 46.3531 1122.43 46.5719 1122.17C46.7906 1121.91 47.125 1121.78 47.575 1121.78C47.975 1121.78 48.275 1121.88 48.475 1122.1C48.675 1122.32 48.775 1122.56 48.775 1122.82C48.775 1123.07 48.7 1123.31 48.55 1123.53C48.4 1123.75 48.2125 1123.95 47.9875 1124.14C47.4375 1124.62 47.1 1124.99 46.975 1125.24C46.85 1125.49 46.7875 1125.95 46.7875 1126.61M47.5 1132.5C46.4625 1132.5 45.4875 1132.3 44.575 1131.91C43.6625 1131.52 42.8687 1130.98 42.1937 1130.31C41.5187 1129.63 40.9844 1128.84 40.5906 1127.93C40.1969 1127.01 40 1126.04 40 1125C40 1123.96 40.1969 1122.99 40.5906 1122.07C40.9844 1121.16 41.5187 1120.37 42.1937 1119.69C42.8687 1119.02 43.6625 1118.48 44.575 1118.09C45.4875 1117.7 46.4625 1117.5 47.5 1117.5C48.5375 1117.5 49.5125 1117.7 50.425 1118.09C51.3375 1118.48 52.1312 1119.02 52.8062 1119.69C53.4812 1120.37 54.0156 1121.16 54.4094 1122.07C54.8031 1122.99 55 1123.96 55 1125C55 1126.04 54.8031 1127.01 54.4094 1127.93C54.0156 1128.84 53.4812 1129.63 52.8062 1130.31C52.1312 1130.98 51.3375 1131.52 50.425 1131.91C49.5125 1132.3 48.5375 1132.5 47.5 1132.5M47.5 1131C49.175 1131 50.5938 1130.42 51.7563 1129.26C52.9188 1128.09 53.5 1126.68 53.5 1125C53.5 1123.32 52.9188 1121.91 51.7563 1120.74C50.5938 1119.58 49.175 1119 47.5 1119C45.825 1119 44.4062 1119.58 43.2438 1120.74C42.0813 1121.91 41.5 1123.32 41.5 1125C41.5 1126.68 42.0813 1128.09 43.2438 1129.26C44.4062 1130.42 45.825 1131 47.5 1131"
        fill="currentColor"
      />
    </svg>
  )
}

function LogoutIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="224.95 1118.25 13.5 13.5" fill="none">
      <path
        d="M226.45 1131.75C226.038 1131.75 225.685 1131.6 225.391 1131.31C225.097 1131.02 224.95 1130.66 224.95 1130.25V1119.75C224.95 1119.34 225.097 1118.98 225.391 1118.69C225.685 1118.4 226.038 1118.25 226.45 1118.25H231.7V1119.75H226.45V1130.25H231.7V1131.75H226.45M234.7 1128.75L233.669 1127.66L235.581 1125.75H229.45V1124.25H235.581L233.669 1122.34L234.7 1121.25L238.45 1125L234.7 1128.75"
        fill="currentColor"
      />
    </svg>
  )
}

export function Sidebar({ className = "" }) {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: iconDashboard,
    },
    {
      name: 'Materi',
      path: '/materi',
      icon: iconMateri,
    },
    {
      name: 'Latihan & Kuis',
      path: '/latihan',
      icon: iconLatihan,
    },
    {
      name: 'Riwayat & Diagnostik',
      path: '/riwayat-diagnostik',
      icon: iconRiwayat,
    },
    {
      name: 'Pengaturan Profil',
      path: '/profile',
      icon: ProfileSettingsIcon,
    },
  ]

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <aside
      className={`w-72 h-screen sticky top-0 shrink-0 bg-white shadow-[0px_1px_16px_rgba(108,92,231,0.06)] border-r border-surface-border px-4 py-6 hidden lg:flex flex-col justify-between font-sans select-none overflow-y-auto ${className}`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand / Logo */}
        <Link to="/dashboard" className="px-3 flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1 shadow-sm transition-transform group-hover:scale-105">
            <img
              src={logoIcon}
              alt="Mindora Logo"
              className="w-6 h-4.5 object-contain"
            />
          </div>
          <span className="text-primary font-rubik font-extrabold text-2xl leading-9 tracking-tight">
            Mindora
          </span>
        </Link>

        {/* Navigation Menus */}
        <nav className="flex flex-col gap-1.5" aria-label="Menu Utama">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3.5 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-fg shadow-[0px_4px_16px_rgba(108,92,231,0.20)]'
                    : 'text-text-muted hover:bg-surface-bg hover:text-primary-dark'
                }`}
              >
                <div
                  className={`flex items-center justify-center transition-colors ${
                    isActive ? 'text-surface' : 'text-primary'
                  }`}
                >
                  {typeof item.icon === 'string' ? (
                    <SidebarIcon src={item.icon} />
                  ) : (
                    <item.icon />
                  )}
                </div>
                <span className="leading-[22px]">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Card Status Belajar */}
        <div className="bg-surface-status rounded-2xl p-4 shadow-[0px_4px_20px_rgba(108,92,231,0.06)] flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <span className="text-primary-dark text-[11px] font-bold uppercase tracking-[0.55px] leading-3.5">
              Status Belajar
            </span>
            <div className="flex items-center justify-center text-secondary">
              <BadgeAwardIcon />
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="text-text-main text-lg font-bold leading-[26px]">
              Level 3
            </h4>
            <p className="text-text-muted text-xs font-normal leading-[18px]">
              Siswa Adaptif Mandiri
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden relative">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: '65%' }}
            />
          </div>

          <p className="text-text-muted text-[11px] font-bold leading-3.5 tracking-[0.44px]">
            65% menuju Level 4
          </p>
        </div>

        {/* Footer Actions: Pusat Bantuan & Keluar */}
        <div className="px-2 flex items-center justify-between text-text-muted text-xs font-normal">
          <button
            type="button"
            className="flex items-center gap-2 hover:text-primary-dark transition-colors cursor-pointer py-1"
          >
            <HelpIcon />
            <span>Pusat Bantuan</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 hover:text-wrong transition-colors cursor-pointer py-1"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
