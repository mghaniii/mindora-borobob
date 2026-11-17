import iconPembelajaran from '../../../assets/landing-page/icon-pembelajaran-LP.svg'
import iconTergamifikasi from '../../../assets/landing-page/icon-termagamifikasi-LP.svg'
import iconUmpanBalik from '../../../assets/landing-page/icon-umpan-balik-LP.svg'

const FEATURES = [
  {
    icon: iconPembelajaran,
    title: 'Pembelajaran Adaptif',
    desc: 'Tingkat kesulitan menyesuaikan jawabanmu secara otomatis, jadi kamu selalu belajar di zona yang pas.',
  },
  {
    icon: iconTergamifikasi,
    title: 'Progres Tergamifikasi',
    desc: 'Poin, streak harian, dan pencapaian membuat setiap sesi belajar terasa seperti main game.',
  },
  {
    icon: iconUmpanBalik,
    title: 'Umpan Balik Instan',
    desc: 'Pembahasan langsung muncul setelah kamu menjawab, agar kesalahan jadi bahan belajar.',
  },
]

export function LandingFeatures() {
  return (
    <section id="fitur" className="scroll-mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-4 py-1.5 rounded-full bg-white text-primary-dark text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider shadow-sm">
            Fitur Halaman
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-rubik text-text-main">
            Didesain Khusus untuk Kenyamanan Belajar
          </h2>
          <p className="text-sm sm:text-base text-text-subtle font-sans max-w-xl">
            Setiap fitur dirancang berdasarkan kebiasaan belajar siswa agar fokus pada isi, bukan pada gangguan.
          </p>
        </div>

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="bg-white rounded-3xl border border-surface-border shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] p-7 flex flex-col gap-4"
            >
              <img src={feature.icon} alt="" className="w-16 h-16 object-contain" />
              <h3 className="text-lg font-bold font-rubik text-text-main">{feature.title}</h3>
              <p className="text-sm text-text-subtle font-sans leading-relaxed">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingFeatures
