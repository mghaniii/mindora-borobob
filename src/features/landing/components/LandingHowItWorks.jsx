import iconDiagnostik from '../../../assets/landing-page/icon-diagnostic-LP.svg'
import iconBuku from '../../../assets/landing-page/icon-buku-LP.svg'
import iconLatihan from '../../../assets/landing-page/icon-latihan-LP.svg'
import iconPiala from '../../../assets/landing-page/icon-piala-LP.svg'

const STEPS = [
  {
    icon: iconDiagnostik,
    title: 'Tes Diagnostik',
    desc: 'Kenali level pemahamanmu lewat tes awal yang menyesuaikan tingkat kesulitan soal.',
  },
  {
    icon: iconBuku,
    title: 'Belajar',
    desc: 'Pelajari materi interaktif yang disusun khusus untuk menutup jurang pemahamanmu.',
  },
  {
    icon: iconLatihan,
    title: 'Latihan',
    desc: 'Kerjakan latihan terarah pada tiap topik hingga kamu benar-benar menguasainya.',
  },
  {
    icon: iconPiala,
    title: 'Naik Level',
    desc: 'Kumpulkan poin, pertahankan streak, dan naik ke fase pembelajaran berikutnya.',
  },
]

function ChevronDivider() {
  return (
    <span className="hidden lg:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary-light text-primary items-center justify-center shadow-sm">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </span>
  )
}

export function LandingHowItWorks() {
  return (
    <section id="cara-kerja" className="scroll-mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-4 py-1.5 rounded-full bg-primary-light text-primary-dark text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-rubik text-text-main">
            4 Langkah Mudah Menuju Jago Matematika
          </h2>
          <p className="text-sm sm:text-base text-text-subtle font-sans max-w-xl">
            Dari tes pertama hingga naik level, semuanya terpandu otomatis oleh sistem adaptif Mindora.
          </p>
        </div>

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {STEPS.map((step, index) => (
            <article
              key={step.title}
              className="relative bg-white rounded-3xl border border-surface-border shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-4"
            >
              {/* Nomor besar di latar */}
              <span className="absolute right-4 top-1 text-6xl font-extrabold font-rubik text-surface-muted/60 select-none pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <img src={step.icon} alt="" className="w-12 h-12 object-contain" />
              <h3 className="text-lg font-bold font-rubik text-text-main">{step.title}</h3>
              <p className="text-sm text-text-subtle font-sans leading-relaxed">{step.desc}</p>
              {index < STEPS.length - 1 && <ChevronDivider />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingHowItWorks
