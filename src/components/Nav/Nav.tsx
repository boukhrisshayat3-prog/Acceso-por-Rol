import { NavLink } from 'react-router-dom'
import type { User } from '../../types'

interface NavProps {
  user: User | null
  loginUser: () => void
  loginAdmin: () => void
  logout: () => void
}
 


 const Nav = ({ user, loginUser, loginAdmin, logout }: NavProps) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white font-semibold'
        : 'text-gray-300 hover:text-white hover:bg-slate-700'
    }`

  const buttonClass = (variant: 'primary' | 'danger') =>
    `px-4 py-2 rounded font-medium transition-all ${
      variant === 'primary'
        ? 'bg-blue-600 hover:bg-blue-700 text-white'
        : 'bg-red-600 hover:bg-red-700 text-white'
    }`

  return (
    <nav className="bg-linear-to-r from-slate-800 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-xl font-bold text-indigo-400">Builder</div>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/perfil" className={navLinkClass}>
            Perfil
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin (VIP)
          </NavLink>
        </div>

        {/* Auth Section */}
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-sm bg-slate-700 px-3 py-1 rounded">
                {user.name} <span className="text-indigo-400 font-semibold">({user.role})</span>
              </span>
              <button className={buttonClass('danger')} onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-400">Desconectado</span>
              <button className={buttonClass('primary')} onClick={loginUser}>
                User
              </button>
              <button className={buttonClass('primary')} onClick={loginAdmin}>
                Admin
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
 export default Nav
