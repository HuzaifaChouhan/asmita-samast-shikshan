import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setLoading(false)
      return
    }
    // Verify the token is still valid with the server
    authApi.me()
      .then(data => {
        const u = { username: data.username, email: data.email }
        localStorage.setItem('admin_user', JSON.stringify(u))
        setUser(u)
      })
      .catch(() => {
        // Token is stale or invalid — clear everything and force re-login
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(username, password) {
    const data = await authApi.login(username, password)
    localStorage.setItem('admin_token', data.token)
    const u = { username: data.username, email: data.email }
    localStorage.setItem('admin_user', JSON.stringify(u))
    setUser(u)
  }

  async function logout() {
    try { await authApi.logout() } catch (_) {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
