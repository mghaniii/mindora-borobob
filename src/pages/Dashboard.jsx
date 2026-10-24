import Sidebar from '../components/layout/Sidebar'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#161D1F]">Dashboard</h1>
      </main>
    </div>
  )
}

