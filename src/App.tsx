import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/AccesoPorRol/AccesoPorRol'
import Nav from './components/Nav/Nav'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AccessDenied } from './pages/AccessDenied'
import { Perfil } from './pages/Perfil'
import { DashboardAdmin } from './pages/DashboardAdmin'
import { NotFound } from './pages/NotFound'
import type { Role, User } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback((role: Role) => {
    setUser({ id: 1, name: 'mami', role })
  }, [])
  
  const logout = useCallback(() => setUser(null), [])

  return (
    <BrowserRouter>
      <Nav 
        user={user} 
        loginUser={() => login('user')}
        loginAdmin={() => login('admin')}
        logout={logout}
      />

      <div className="p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute user={user}>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App