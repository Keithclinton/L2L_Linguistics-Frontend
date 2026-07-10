import { Link } from 'react-router-dom'
import logo from '../assets/logo-icon.png'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Ufasaha Wa Lugha" className="w-7 h-7 object-contain" />
              <span className="font-semibold text-white">Ufasaha Wa Lugha</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Learn Kiswahili at your own pace with structured courses taught by expert instructors.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/courses?free=true" className="hover:text-white transition-colors">Free Courses</Link></li>
              <li><Link to="/my-enrollments" className="hover:text-white transition-colors">My Learning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-sm text-slate-400 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xs text-slate-400 bg-slate-700/50 rounded-lg px-3 py-1.5">📱 Coming soon on the App Store</span>
            <span className="text-xs text-slate-400 bg-slate-700/50 rounded-lg px-3 py-1.5">🤖 Coming soon on Google Play</span>
          </div>
          © {new Date().getFullYear()} Ufasaha Wa Lugha. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
