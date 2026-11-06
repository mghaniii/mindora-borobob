import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Diagnostic from '../pages/Diagnostic'
import Materi from '../pages/Materi'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/materi" element={<Materi />} />
      <Route path="/diagnostic" element={<Diagnostic />} />
    </Routes>
  )
}
