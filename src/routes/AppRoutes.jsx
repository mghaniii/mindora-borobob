import { Routes, Route, useParams } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Diagnostic from '../pages/Diagnostic'
import Materi from '../pages/Materi'
import Latihan from '../pages/Latihan'
import LatihanKuis from '../pages/LatihanKuis'

// Remount saat itemId berganti agar state kuis selalu segar
function LatihanKuisRoute() {
  const { itemId } = useParams()
  return <LatihanKuis key={itemId} />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/materi" element={<Materi />} />
      <Route path="/latihan" element={<Latihan />} />
      <Route path="/latihan/:itemId" element={<LatihanKuisRoute />} />
      <Route path="/diagnostic" element={<Diagnostic />} />
    </Routes>
  )
}
