import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginSelect from './pages/LoginSelect.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import EmployeeLogin from './pages/EmployeeLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Portal selector — entry point */}
        <Route path="/" element={<LoginSelect />} />

        {/* Login pages */}
        <Route path="/admin-login"    element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* Dashboard (existing App) */}
        <Route path="/dashboard" element={<App />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
