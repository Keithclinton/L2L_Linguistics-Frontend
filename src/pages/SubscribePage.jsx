import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

const PLANS = [
  { value: 'daily',   label: '1 Day',     price: 50 },
  { value: 'monthly', label: '30 Days',   price: 500 },
  { value: 'yearly',  label: '12 Months', price: 4000 },
]

export default function SubscribePage() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState('monthly')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null) // null | 'pending' | 'completed' | 'failed'
  const [error, setError] = useState('')

  const pollStatus = (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const { data } = await api.get(`/payments/${paymentId}/`)
        if (data.status !== 'pending') {
          clearInterval(interval)
          setPaymentStatus(data.status)
          if (data.status === 'completed') {
            setTimeout(() => navigate('/courses'), 2000)
          }
        }
      } catch {
        clearInterval(interval)
      }
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/payments/initiate/', { plan, phone_number: phone })
      setPaymentStatus('pending')
      pollStatus(data.payment_id)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-1">All-Access Subscription</h1>
          <p className="text-slate-500 text-sm mb-6">Unlock every course on the platform</p>

          {paymentStatus === 'pending' && (
            <div className="bg-amber-50 text-amber-700 text-sm rounded-lg px-4 py-3 mb-5">
              Check your phone for the M-Pesa prompt… waiting for confirmation.
            </div>
          )}
          {paymentStatus === 'completed' && (
            <div className="bg-emerald-50 text-emerald-700 text-sm rounded-lg px-4 py-3 mb-5">
              Subscription active! Redirecting to courses…
            </div>
          )}
          {paymentStatus === 'failed' && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
              Payment failed. Please try again.
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">{error}</div>
          )}

          {(!paymentStatus || paymentStatus === 'failed') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map((p) => (
                  <button
                    type="button"
                    key={p.value}
                    onClick={() => setPlan(p.value)}
                    className={`rounded-lg border px-3 py-3 text-center transition-colors ${
                      plan === p.value
                        ? 'border-primary-700 bg-primary-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-800">{p.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">KES {p.price}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712 345 678"
                  required
                  className="input"
                />
                <p className="text-xs text-slate-400 mt-1">
                  You will receive an M-Pesa STK push on this number
                </p>
              </div>

              <Tooltip text={sw.subscribe} className="block w-full">
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Starting payment…' : 'Subscribe'}
                </button>
              </Tooltip>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
