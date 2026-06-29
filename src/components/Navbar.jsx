import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Tooltip from './Tooltip'
import sw from '../i18n/sw'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setProfileOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-primary-700' : 'text-slate-600 hover:text-primary-700'
    }`

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KL</span>
            </div>
            <span className="font-semibold text-slate-800 text-lg">KiswahiliLMS</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/courses" className={navLinkClass}>Courses</NavLink>
            {user && <NavLink to="/my-enrollments" className={navLinkClass}>My Learning</NavLink>}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span>{user.first_name}</span>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                    <Tooltip text={sw.myProfile} className="block" position="bottom">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        My Profile
                      </Link>
                    </Tooltip>
                    <Tooltip text={sw.myLearning} className="block" position="bottom">
                      <Link
                        to="/my-enrollments"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        My Learning
                      </Link>
                    </Tooltip>
                    <hr className="my-1 border-slate-100" />
                    <Tooltip text={sw.signOut} className="block" position="bottom">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Tooltip text={sw.signIn}>
                  <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
                </Tooltip>
                <Tooltip text={sw.getStarted}>
                  <Link to="/register" className="btn-primary text-sm">Get Started</Link>
                </Tooltip>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-1">
            <NavLink
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Courses
            </NavLink>
            {user ? (
              <>
                <Tooltip text={sw.myLearning} className="block" position="bottom">
                  <NavLink
                    to="/my-enrollments"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    My Learning
                  </NavLink>
                </Tooltip>
                <Tooltip text={sw.myProfile} className="block" position="bottom">
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    My Profile
                  </NavLink>
                </Tooltip>
                <Tooltip text={sw.signOut} className="block" position="bottom">
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </Tooltip>
              </>
            ) : (
              <div className="flex gap-2 px-3 pt-2">
                <Tooltip text={sw.signIn} className="flex-1 block">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-sm w-full text-center block">Sign In</Link>
                </Tooltip>
                <Tooltip text={sw.getStarted} className="flex-1 block">
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm w-full text-center block">Get Started</Link>
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
