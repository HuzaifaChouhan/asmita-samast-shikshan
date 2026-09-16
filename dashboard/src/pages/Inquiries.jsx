import { useEffect, useState } from 'react'
import { Search, Eye, Trash2, FileText, X, Plus } from 'lucide-react'
import { inquiriesApi } from '../api'
import ConfirmDialog from '../components/ConfirmDialog'
import { toast } from '../components/Toast'

const STATUSES = ['new', 'contacted', 'admitted', 'closed']
const BADGE = { new: 'badge-new', contacted: 'badge-contacted', admitted: 'badge-admitted', closed: 'badge-closed' }
const CLASSES = ['Nursery','KG','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']

function fmt(date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const EMPTY_FORM = {
  full_name: '', email: '', phone: '',
  student_name: '', class_applying_for: '', message: '', status: 'new',
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [addModal, setAddModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

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

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleAdd(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const created = await inquiriesApi.create(form)
      setInquiries(prev => [created, ...prev])
      setAddModal(false)
      setForm(EMPTY_FORM)
      toast('Inquiry added successfully')
    } catch (err) { toast(err.message || 'Failed to add', 'error') }
    finally { setSaving(false) }
  }

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
          <div className="section-card-header-right">
            <div className="search-wrap">
              <Search size={14} />
              <input
                className="search-input"
                placeholder="Search name, email, phone…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setAddModal(true) }}>
              <Plus size={15} /> Add Inquiry
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading…</div>
        ) : inquiries.length === 0 ? (
          <div className="empty-state">
            <FileText size={34} style={{ opacity: 0.22 }} />
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
                        style={{ fontSize: '0.76rem', padding: '0.28rem 0.55rem' }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="td-muted" style={{ whiteSpace: 'nowrap' }}>{fmt(inq.created_at)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
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

      {/* ── Add Inquiry Modal ── */}
      {addModal && (
        <div className="modal-overlay" onClick={() => setAddModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Add New Inquiry</span>
              <button className="btn btn-ghost" onClick={() => setAddModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name *</label>
                    <input className="form-input" required value={form.full_name} onChange={set('full_name')} placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input className="form-input" required value={form.phone} onChange={set('phone')} placeholder="Mobile number" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="Email address" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Name</label>
                    <input className="form-input" value={form.student_name} onChange={set('student_name')} placeholder="Student's name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Class Applying For</label>
                    <select className="form-select" value={form.class_applying_for} onChange={set('class_applying_for')}>
                      <option value="">Select class</option>
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={set('status')}>
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message / Notes</label>
                  <textarea className="form-textarea" value={form.message} onChange={set('message')} placeholder="Any additional notes…" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><span className="spinner" style={{ borderTopColor: '#fff' }} /> Saving…</> : 'Add Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Detail View Modal ── */}
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
                ['Email', selected.email || '—'],
                ['Phone', selected.phone],
                ['Student Name', selected.student_name || '—'],
                ['Class Applying For', selected.class_applying_for || '—'],
                ['Status', <span className={`badge ${BADGE[selected.status]}`}>{selected.status}</span>],
                ['Date', fmt(selected.created_at)],
                ['Message', selected.message || '—'],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="form-label" style={{ marginBottom: '0.15rem' }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e2d6b' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete ── */}
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
