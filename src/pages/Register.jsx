import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common'

export default function Register() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-bg font-sans flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] border border-surface-border p-8 sm:p-10 flex flex-col items-center gap-5 text-center">
        <span className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </span>
        <h1 className="text-2xl font-extrabold font-rubik text-text-main">
          Halaman registrasi segera hadir
        </h1>
        <p className="text-sm text-text-subtle font-sans leading-relaxed">
          Form pendaftaran sedang dipersiapkan. Sementara itu, kamu sudah bisa masuk
          jika sudah memiliki akun Mindora.
        </p>
        <Button variant="primary" fullWidth onClick={() => navigate('/login')}>
          Kembali ke halaman masuk
        </Button>
      </div>
    </div>
  )
}
