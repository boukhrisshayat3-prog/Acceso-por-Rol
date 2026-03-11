import { useState } from 'react'
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/AccesoPorRol/AccesoPorRol'
// Modifica el estado del usuario para que incluya un rol: role: 'admin' o role: 'user'.
// Modifica el ProtectedRoute para que reciba una prop extra: requiredRole.
// El Reto: Si un usuario está logueado pero su rol no coincide con el requerido (ej: un 'user' intentando entrar a una ruta de 'admin'), redirígelo a una página que diga "Acceso Denegado".




//pagina de ejemplo
const Home = () => <h1 className='text-1xl'>Home</h1>
const Login = () => <h1 className='text-1xl text-indigo-600 font-bold'>Panel de Administracion</h1>
const AccessDenied = () => <h1 className='text-1xl text-red-600'>Acceso Denegado</h1>

function App() {
  const [user, setUser] = useState<{ id: number; name: string; role: 'admin' | 'user' } | null>(null)
  const login = () => setUser ({ id: 1, name: 'mami', role: 'user' })
  const logout = () => setUser(null)


  return (
    <BrowserRouter>
      <nav className='p-9 bg-slate-800 text-white flex justify-between'>
        <div className='flex gap-4'>
          <Link to="/">Inicio</Link>
          <Link to="/admin">Admin (VIP)</Link>
        </div>
       <button className={`px-3 py-1 rounded ${user ? 'bg-red-500': 'bg-green-500'}`} onClick={user ? logout : AccessDenied}>
      {user ? 'Cerrar Sesion': 'Simular Login'}
    </button>
    </nav>
    <div className="p-10">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/access-denied" element={<AccessDenied />}/>
      {/* Ruta protegida- Envolvemos el componente admin con nuestro Guardaespalda */}
      <Route path="/admin" element={
        <ProtectedRoute isAllowed={!!user} requiredRole="admin" userRole={user?.role}>
         <Login />
        </ProtectedRoute>
      } />
    </Routes>
    </div>
        

    </BrowserRouter>

        
  )
}
export default App
