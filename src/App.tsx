import { useState } from 'react'
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/AccesoPorRol/AccesoPorRol'
// Modifica el estado del usuario para que incluya un rol: role: 'admin' o role: 'user'.
// Modifica el ProtectedRoute para que reciba una prop extra: requiredRole.
// El Reto: Si un usuario está logueado pero su rol no coincide con el requerido (ej: un 'user' intentando entrar a una ruta de 'admin'), redirígelo a una página que diga "Acceso Denegado".




//pagina de ejemplo
const Home = () => <h1 className='text-1xl'>Home</h1>
const Admin= () => <h1 className='text-1xl text-green-600 font-bold'>Bienvenido Admin</h1>
const Login = () => <h1 className='text-1xl text-indigo-600 font-bold'>Iniciar Sesion</h1>
const AccessDenied = () => <h1 className='text-1xl text-red-600'>Acceso Denegado</h1>
//paginas protegidas por rol
const Perfil = () => <h1 className='text-1xl text-blue-600 font-bold'>Perfil de Usuario</h1>
const DashboardAdmin = () => <h1 className='text-1xl text-green-600 font-bold'>Dashboard Admin(solo para admin)</h1>

function App() {
  const [user, setUser] = useState<{ id: number; name: string; role: 'admin' | 'user' } | null>(null)
  //funciones simuladores
  const loginAdmin = () => setUser ({ id: 1, name: 'mami', role: 'admin' })
  const loginUser = () => setUser ({ id: 1, name: 'mami', role: 'user' })
  const logout = () => setUser(null)


  return (
    <BrowserRouter>
      <nav className='p-9 bg-slate-800 text-white flex justify-between'>
        <div className='flex gap-4'>
          <Link to="/">Inicio</Link>
          <Link to="/admin">Admin (VIP)</Link>
          <Link to="/perfil">Perfil</Link> 
          
        </div>
        //panel de controle
        <div className='flex gap-2 item-center'>
          <span>{user ? `Hola, ${user.name} (${user.role})` : 'Desconnectado'}</span>
          <button className={`px-3 py-1 rounded ${user?.role === 'user' ? 'bg-green-500': 'bg-blue-500'}`} onClick={loginUser}>
           entrar como user
          </button>
           <button className={`px-3 py-1 rounded ${user?.role === 'admin' ? 'bg-green-500': 'bg-blue-500'}`} onClick={loginAdmin}>
            entrar como admin
          </button>
          <button className={`px-3 py-1 rounded ${user ? 'bg-red-500': 'bg-green-500'}`} onClick={logout}>
            Cerrar Sesion
          </button>
        </div>
    </nav>
    <div className="p-10">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/access-denied" element={<AccessDenied />}/>
      {/* Ruta protegida- Envolvemos el componente admin con nuestro Guardaespalda */}
      <Route path="/admin" element={
        <ProtectedRoute user={user} requiredRole="admin">
         <Login />
        </ProtectedRoute>
      } />
    </Routes>
    </div>
        

    </BrowserRouter>

        
  )
}
export default App
