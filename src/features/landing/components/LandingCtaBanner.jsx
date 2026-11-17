import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/common'

export function LandingCtaBanner() {
  const navigate = useNavigate()

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto rounded-[32px] bg-secondary/10 border-2 border-secondary px-6 sm:px-10 py-12 sm:py-16 flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-rubik text-text-main leading-tight">
            Mulai Petualangan Matematikamu Hari Ini!
          </h2>
          <p className="text-sm sm:text-base text-text-muted font-sans max-w-xl">
            Gratis untuk mencoba. Tes diagnostik pertama hanya butuh beberapa menit.
          </p>
          <Button variant="secondary" size="lg" glow withArrow onClick={() => navigate('/register')}>
            Daftar Belajar Gratis
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LandingCtaBanner
