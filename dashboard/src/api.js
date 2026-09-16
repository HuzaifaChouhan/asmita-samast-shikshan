// Central API service — all requests go through here
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/admin'

function getToken() {
  return localStorage.getItem('admin_token')
}

async function request(method, path, data = null, isFormData = false) {
  const token = getToken()
  const headers = {}
  if (token) headers['Authorization'] = `Token ${token}`
  if (!isFormData && data) headers['Content-Type'] = 'application/json'

  const opts = { method, headers }
  if (data) opts.body = isFormData ? data : JSON.stringify(data)

  const res = await fetch(`${BASE_URL}${path}`, opts)

  if (res.status === 204) return null
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || json.detail || 'Request failed')
  return json
}

// Auth
export const authApi = {
  login: (username, password) => request('POST', '/auth/login/', { username, password }),
  logout: () => request('POST', '/auth/logout/'),
  me: () => request('GET', '/auth/me/'),
}

// Stats
export const statsApi = {
  get: () => request('GET', '/stats/'),
}

// Inquiries
export const inquiriesApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request('GET', `/inquiries/${qs ? '?' + qs : ''}`)
  },
  update: (id, data) => request('PATCH', `/inquiries/${id}/`, data),
  delete: (id) => request('DELETE', `/inquiries/${id}/`),
}

// Teachers
export const teachersApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request('GET', `/teachers/${qs ? '?' + qs : ''}`)
  },
  create: (formData) => request('POST', '/teachers/', formData, true),
  update: (id, formData) => request('PATCH', `/teachers/${id}/`, formData, true),
  delete: (id) => request('DELETE', `/teachers/${id}/`),
}

// Testimonials
export const testimonialsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request('GET', `/testimonials/${qs ? '?' + qs : ''}`)
  },
  create: (formData) => request('POST', '/testimonials/', formData, true),
  update: (id, data) => request('PATCH', `/testimonials/${id}/`, data),
  delete: (id) => request('DELETE', `/testimonials/${id}/`),
}
