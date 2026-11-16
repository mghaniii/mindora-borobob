import { Link } from 'react-router-dom'
import logoIcon from '../../../assets/logo-icon.png'
import illustration from '../../../assets/login-illustration.webp'

/**
 * Kerangka halaman auth: kiri = formulir, kanan = ilustrasi.
 * Dipakai bersama oleh Login, Register, Lupa Password, dan Buat Password.
 */
export function AuthLayout({ children, footer }) {
  return (
    <div className="flex min-h-screen bg-white font-sans text-(color:--color-shadow)">
      <section className="flex w-full shrink-0 flex-col px-6 pt-16 pb-20 sm:px-20 lg:w-4/9">
        {/* Logo (sama dengan di Sidebar) */}
        <Link to="/" className="flex w-fit items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary p-1">
            <img src={logoIcon} alt="" className="h-4.5 w-6 object-contain" />
          </div>
          <span className="font-rubik text-2xl leading-9 font-extrabold tracking-tight text-primary">
            Mindora
          </span>
        </Link>

        <div className="flex flex-1 items-center pt-12 pb-10">
          <div className="w-full max-w-[480px]">{children}</div>
        </div>

        {footer && <p className="text-center text-sm leading-5">{footer}</p>}
      </section>

      <aside className="relative hidden flex-1 lg:block">
        <img
          src={illustration}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
    </div>
  )
}