import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/profile/')
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('access')) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [fetchProfile])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login/', { email, password })
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    await fetchProfile()
  }

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh')
      if (refresh) await api.post('/auth/logout/', { refresh })
    } catch {
      // ignore — clear session regardless
    } finally {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      setUser(null)
    }
  }

  const register = async (payload) => {
    await api.post('/auth/register/', payload)
  }

  const refreshUser = fetchProfile

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
