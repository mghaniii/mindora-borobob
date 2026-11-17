import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Diagnostic from '../pages/Diagnostic'
import DiagnosticHistory from '../pages/DiagnosticHistory'
import Materi from '../pages/Materi'
import Latihan from '../pages/Latihan'
import LatihanKuis from '../pages/LatihanKuis'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Profile from '../pages/Profile'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

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
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/materi"
        element={
          <ProtectedRoute>
            <Materi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/latihan"
        element={
          <ProtectedRoute>
            <Latihan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/latihan/:itemId"
        element={
          <ProtectedRoute>
            <LatihanKuisRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/diagnostic"
        element={
          <ProtectedRoute>
            <Diagnostic />
          </ProtectedRoute>
        }
      />
      <Route
        path="/riwayat-diagnostik"
        element={
          <ProtectedRoute>
            <DiagnosticHistory />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}