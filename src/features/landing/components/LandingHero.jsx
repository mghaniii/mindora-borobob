import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/common'
import illustrationHero from '../../../assets/landing-page/icon-gambar-anak-perempuan.svg'

export function LandingHero() {
  const navigate = useNavigate()

  return (
    <section className="bg-primary-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Teks */}
        <div className="flex flex-col gap-6 items-start max-w-xl">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider shadow-sm">
            Platform Matematika Adaptif #1
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-rubik text-text-main leading-[1.15]">
            Belajar Matematika Seru, Adaptif & <span className="text-primary">Bebas Stres!</span>
          </h1>
          <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
            Mindora menyesuaikan materi dengan kemampuanmu, melatih topik yang masih lemah,
            dan memberi penghargaan di setiap kemajuan. Belajar jadi petualangan, bukan beban.
          </p>
          <Button
            variant="secondary"
            size="lg"
            glow
            withArrow
            onClick={() => navigate('/register')}
          >
            Mulai Belajar Gratis
          </Button>
        </div>

        {/* Ilustrasi */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={illustrationHero}
            alt=""
            className="w-72 sm:w-96 lg:w-[512px] max-w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default LandingHero
