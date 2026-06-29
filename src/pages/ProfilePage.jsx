import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

export default function ProfilePage() {
  const { user, refreshUser } = useAuth()

  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    bio: user?.bio || '',
    date_of_birth: user?.date_of_birth || '',
  })
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', new_password2: '' })
  const [saving, setSaving] = useState(false)
  const [changingPw, setChangingPw] = useState(false)
  const [profileMsg, setProfileMsg] = useState(null)
  const [pwMsg, setPwMsg] = useState(null)
  const [pwErrors, setPwErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handlePwChange = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value })
    setPwErrors({ ...pwErrors, [e.target.name]: undefined })
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setProfileMsg(null)
    try {
      await api.patch('/auth/profile/', form)
      await refreshUser()
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' })
    } catch {
      setProfileMsg({ type: 'error', text: 'Failed to update profile.' })
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setChangingPw(true)
    setPwMsg(null)
    setPwErrors({})
    try {
      await api.post('/auth/profile/change-password/', pwForm)
      setPwMsg({ type: 'success', text: 'Password changed successfully.' })
      setPwForm({ old_password: '', new_password: '', new_password2: '' })
    } catch (err) {
      const data = err.response?.data
      if (data && typeof data === 'object') {
        setPwErrors(data)
      } else {
        setPwMsg({ type: 'error', text: 'Failed to change password.' })
      }
    } finally {
      setChangingPw(false)
    }
  }

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

      {/* Avatar & name */}
      <div className="card p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-lg">{user?.first_name} {user?.last_name}</p>
          <p className="text-slate-500 text-sm">{user?.email}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Member since {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('en-KE', { year: 'numeric', month: 'long' }) : '—'}
          </p>
        </div>
      </div>

      {/* Profile form */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">Personal Information</h2>

        {profileMsg && (
          <div className={`text-sm rounded-lg px-4 py-3 mb-5 ${profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
            {profileMsg.text}
          </div>
        )}

        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} className="input" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input value={user?.email || ''} disabled className="input opacity-60 cursor-not-allowed bg-slate-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
            <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="+254 7XX XXX XXX" className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
            <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us a bit about yourself…"
              className="input resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Tooltip text={sw.saveChanges}>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </Tooltip>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">Change Password</h2>

        {pwMsg && (
          <div className={`text-sm rounded-lg px-4 py-3 mb-5 ${pwMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
            {pwMsg.text}
          </div>
        )}

        <form onSubmit={changePassword} className="space-y-4">
          {[
            { name: 'old_password', label: 'Current Password' },
            { name: 'new_password', label: 'New Password' },
            { name: 'new_password2', label: 'Confirm New Password' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
              <input
                type="password"
                name={name}
                value={pwForm[name]}
                onChange={handlePwChange}
                className={`input ${pwErrors[name] ? 'border-red-300' : ''}`}
              />
              {pwErrors[name] && (
                <p className="text-xs text-red-500 mt-1">
                  {Array.isArray(pwErrors[name]) ? pwErrors[name].join(' ') : pwErrors[name]}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <Tooltip text={sw.updatePassword}>
              <button type="submit" disabled={changingPw} className="btn-primary">
                {changingPw ? 'Updating…' : 'Update Password'}
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  )
}
