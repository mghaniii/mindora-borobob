
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Diagnostic from '../pages/Diagnostic'
import Materi from '../pages/Materi'
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
        path="/diagnostic"
        element={
          <ProtectedRoute>
            <Diagnostic />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
