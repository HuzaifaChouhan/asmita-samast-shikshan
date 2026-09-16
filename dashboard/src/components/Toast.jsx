import { useState, useCallback } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

let toastId = 0
let addToastExternal = null

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  addToastExternal = useCallback((msg, type = 'success') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export function toast(msg, type = 'success') {
  if (addToastExternal) addToastExternal(msg, type)
}
