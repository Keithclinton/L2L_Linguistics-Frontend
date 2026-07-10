import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, googleProvider, FIREBASE_CONFIGURED } from '../firebase'
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
    }
  }, [])

  useEffect(() => {
    if (!FIREBASE_CONFIGURED) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await fetchProfile()
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [fetchProfile])

  const login = async (email, password) => {
    if (!FIREBASE_CONFIGURED) throw new Error('Sign-in unavailable — Firebase not configured.')
    await signInWithEmailAndPassword(auth, email, password)
    await fetchProfile()
  }

  const loginWithGoogle = async () => {
    if (!FIREBASE_CONFIGURED) throw new Error('Sign-in unavailable — Firebase not configured.')
    await signInWithPopup(auth, googleProvider)
    await fetchProfile()
  }

  const register = async ({ email, password, first_name, last_name, phone_number }) => {
    if (!FIREBASE_CONFIGURED) throw new Error('Sign-up unavailable — Firebase not configured.')
    await createUserWithEmailAndPassword(auth, email, password)
    await api.patch('/auth/profile/', { first_name, last_name, phone_number: phone_number || '' })
    await fetchProfile()
  }

  const logout = async () => {
    if (FIREBASE_CONFIGURED) await signOut(auth)
    setUser(null)
  }

  const resetPassword = async (email) => {
    if (!FIREBASE_CONFIGURED) throw new Error('Password reset unavailable — Firebase not configured.')
    await sendPasswordResetEmail(auth, email)
  }

  const refreshUser = fetchProfile

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, register, resetPassword, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
