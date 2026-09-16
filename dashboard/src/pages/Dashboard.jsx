import { useEffect, useState } from 'react'
import { FileText, Users, Star, AlertCircle, Clock } from 'lucide-react'
import { statsApi, inquiriesApi } from '../api'

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: color + '18' }}>
        <Icon size={18} color={color} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value ?? '—'}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'rgba(30,45,107,0.45)', marginTop: '0.1rem' }}>{sub}</div>}
    </div>
  )
}

function statusBadge(status) {
  const map = { new: 'badge-new', contacted: 'badge-contacted', admitted: 'badge-admitted', closed: 'badge-closed' }
  return <span className={`badge ${map[status] || 'badge-closed'}`}>{status}</span>
}

function fmt(date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      statsApi.get(),
      inquiriesApi.list(),
    ]).then(([s, inq]) => {
      setStats(s)
      setRecent((inq || []).slice(0, 5))
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading-state"><span className="spinner" /> Loading…</div>
  )

  return (
    <div>
      <div className="stat-grid">
        <StatCard label="Total Inquiries" value={stats?.total_inquiries} icon={FileText} color="#1e2d6b" />
        <StatCard label="New Inquiries" value={stats?.new_inquiries} sub="Needs attention" icon={AlertCircle} color="#dc2626" />
        <StatCard label="Teachers" value={stats?.total_teachers} sub={`${stats?.active_teachers} active`} icon={Users} color="#c9a84c" />
        <StatCard label="Testimonials" value={stats?.total_testimonials} sub={`${stats?.pending_testimonials} pending approval`} icon={Star} color="#7c3aed" />
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <span className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} /> Recent Inquiries
          </span>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <FileText size={32} style={{ opacity: 0.3 }} />
            <p>No inquiries yet.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(inq => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.full_name}</div>
                      <div className="td-muted">{inq.email}</div>
                    </td>
                    <td className="td-muted">{inq.phone}</td>
                    <td className="td-muted">{inq.class_applying_for || '—'}</td>
                    <td>{statusBadge(inq.status)}</td>
                    <td className="td-muted">{fmt(inq.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
