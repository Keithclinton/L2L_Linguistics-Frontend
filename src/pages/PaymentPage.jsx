import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const course = location.state?.course

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  if (!course) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 mb-4">No course selected for payment.</p>
        <Link to="/courses" className="btn-primary">Browse Courses</Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      await api.post('/payments/initiate/', { course_id: course.id, phone_number: phone })
      setMessage({ type: 'success', text: 'Payment initiated! You will receive a prompt on your phone shortly.' })
      setTimeout(() => navigate(`/courses/${course.id}`), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Payment failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Complete Payment</h1>
          <p className="text-slate-500 text-sm mb-6">Enrolling in <span className="font-medium text-slate-700">{course.title}</span></p>

          <div className="bg-slate-50 rounded-lg px-4 py-3 flex items-center justify-between mb-6">
            <span className="text-slate-600 text-sm">Amount due</span>
            <span className="font-bold text-slate-800">KES {parseFloat(course.price).toLocaleString()}</span>
          </div>

          {message && (
            <div className={`text-sm rounded-lg px-4 py-3 mb-5 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">M-Pesa Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                required
                className="input"
              />
              <p className="text-xs text-slate-400 mt-1">Enter the number to receive the M-Pesa STK push</p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Initiating payment…' : 'Pay Now'}
            </button>
          </form>

          <Link to={`/courses/${course.id}`} className="block text-center text-sm text-slate-400 hover:text-slate-600 mt-4">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
