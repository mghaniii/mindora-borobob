import {
  LandingNavbar,
  LandingHero,
  LandingHowItWorks,
  LandingFeatures,
  LandingCtaBanner,
  LandingFooter,
} from '../features/landing'

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <LandingNavbar />
      <main className="flex-1 flex flex-col">
        <LandingHero />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingCtaBanner />
      </main>
      <LandingFooter />
    </div>
  )
}
