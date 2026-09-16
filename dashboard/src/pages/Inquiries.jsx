import { useEffect, useState } from 'react'
import { Search, Eye, Trash2, FileText, X } from 'lucide-react'
import { inquiriesApi } from '../api'
import ConfirmDialog from '../components/ConfirmDialog'
import { toast } from '../components/Toast'

const STATUSES = ['', 'new', 'contacted', 'admitted', 'closed']
const BADGE = { new: 'badge-new', contacted: 'badge-contacted', admitted: 'badge-admitted', closed: 'badge-closed' }

function fmt(date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (statusFilter) params.status = statusFilter
      const data = await inquiriesApi.list(params)
      setInquiries(data || [])
    } catch { toast('Failed to load inquiries', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search, statusFilter])

  async function handleStatusChange(id, newStatus) {
    try {
      await inquiriesApi.update(id, { status: newStatus })
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i))
      if (selected?.id === id) setSelected(s => ({ ...s, status: newStatus }))
      toast('Status updated')
    } catch { toast('Failed to update status', 'error') }
  }

  async function handleDelete() {
    try {
      await inquiriesApi.delete(deleteTarget)
      setInquiries(prev => prev.filter(i => i.id !== deleteTarget))
      if (selected?.id === deleteTarget) setSelected(null)
      toast('Inquiry deleted')
    } catch { toast('Failed to delete', 'error') }
    finally { setDeleteTarget(null) }
  }

  return (
    <div>
      <div className="section-card">
        <div className="section-card-header">
          <span className="section-card-title">All Inquiries ({inquiries.length})</span>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div className="search-wrap">
              <Search size={14} />
              <input
                className="search-input"
                placeholder="Search name, email, phone…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              {STATUSES.filter(Boolean).map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading…</div>
        ) : inquiries.length === 0 ? (
          <div className="empty-state">
            <FileText size={36} style={{ opacity: 0.25 }} />
            <p>No inquiries found.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name / Contact</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(inq => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.full_name}</div>
                      <div className="td-muted">{inq.email}</div>
                      <div className="td-muted">{inq.phone}</div>
                    </td>
                    <td className="td-muted">{inq.student_name || '—'}</td>
                    <td className="td-muted">{inq.class_applying_for || '—'}</td>
                    <td>
                      <select
                        className="filter-select"
                        value={inq.status}
                        onChange={e => handleStatusChange(inq.id, e.target.value)}
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                      >
                        {STATUSES.filter(Boolean).map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="td-muted">{fmt(inq.created_at)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn btn-ghost btn-sm" title="View details" onClick={() => setSelected(inq)}>
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-danger btn-sm" title="Delete" onClick={() => setDeleteTarget(inq.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Inquiry Details</span>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}><X size={16} /></button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                ['Full Name', selected.full_name],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Student Name', selected.student_name || '—'],
                ['Class Applying For', selected.class_applying_for || '—'],
                ['Status', <span className={`badge ${BADGE[selected.status]}`}>{selected.status}</span>],
                ['Date', fmt(selected.created_at)],
                ['Message', selected.message || '—'],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="form-label">{label}</div>
                  <div style={{ fontSize: '0.9rem', color: '#1e2d6b' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Inquiry"
          message="Are you sure you want to delete this inquiry? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
