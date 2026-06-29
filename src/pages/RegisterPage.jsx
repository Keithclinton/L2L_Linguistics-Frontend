import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

export default function RegisterPage() {
  const { register, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone_number: '',
    password: '', password2: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      await register(form)
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      const data = err.response?.data
      if (data && typeof data === 'object') {
        setErrors(data)
      } else {
        setErrors({ non_field_errors: 'Registration failed. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input ${errors[name] ? 'border-red-300 focus:ring-red-400' : ''}`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {Array.isArray(errors[name]) ? errors[name].join(' ') : errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">KL</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">Start learning Kiswahili today</p>
          </div>

          {errors.non_field_errors && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
              {Array.isArray(errors.non_field_errors) ? errors.non_field_errors.join(' ') : errors.non_field_errors}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field('first_name', 'First Name', 'text', 'John')}
              {field('last_name', 'Last Name', 'text', 'Doe')}
            </div>
            {field('email', 'Email', 'email', 'you@example.com')}
            {field('phone_number', 'Phone Number (optional)', 'tel', '+254 7XX XXX XXX')}

            {/* Password fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`input pr-10 ${errors.password ? 'border-red-300' : ''}`}
                />
                <button
                  type="button"
                  title={sw.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {Array.isArray(errors.password) ? errors.password.join(' ') : errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password2"
                value={form.password2}
                onChange={handleChange}
                placeholder="Repeat password"
                className={`input ${errors.password2 ? 'border-red-300' : ''}`}
              />
              {errors.password2 && (
                <p className="text-xs text-red-500 mt-1">
                  {Array.isArray(errors.password2) ? errors.password2.join(' ') : errors.password2}
                </p>
              )}
            </div>

            <Tooltip text={sw.createAccount} className="block w-full">
              <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </Tooltip>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Tooltip text={sw.alreadyHaveAccount}>
              <Link to="/login" className="text-primary-700 font-medium hover:underline">Sign in</Link>
            </Tooltip>
          </p>
        </div>
      </div>
    </div>
  )
}
