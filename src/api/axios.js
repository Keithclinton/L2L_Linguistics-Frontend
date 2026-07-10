import axios from 'axios'
import { auth, FIREBASE_CONFIGURED } from '../firebase'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
export const MEDIA_BASE_URL = API_URL.replace(/\/api\/?$/, '')

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach Firebase ID token on every request; Firebase refreshes it automatically
api.interceptors.request.use(async (config) => {
  if (FIREBASE_CONFIGURED && auth?.currentUser) {
    const token = await auth.currentUser.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
