import { useEffect, useState } from 'react'
import { Plus, Search, Edit2, Trash2, Users, X } from 'lucide-react'
import { teachersApi } from '../api'
import ConfirmDialog from '../components/ConfirmDialog'
import { toast } from '../components/Toast'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const EMPTY = {
  name: '', designation: '', subject: '', bio: '',
  experience_years: '', display_order: 0, is_active: true, photo: null,
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)        // null | 'add' | teacher obj
  const [form, setForm] = useState(EMPTY)
  const [photoFile, setPhotoFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await teachersApi.list(search ? { search } : {})
      setTeachers(data || [])
    } catch { toast('Failed to load teachers', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search])

  function openAdd() {
    setForm(EMPTY)
    setPhotoFile(null)
    setModal('add')
  }

  function openEdit(t) {
    setForm({
      name: t.name, designation: t.designation, subject: t.subject || '',
      bio: t.bio || '', experience_years: t.experience_years ?? '',
      display_order: t.display_order, is_active: t.is_active, photo: null,
    })
    setPhotoFile(null)
    setModal(t)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'photo') return
        if (v !== null && v !== undefined && v !== '') fd.append(k, v)
      })
      if (photoFile) fd.append('photo', photoFile)

      if (modal === 'add') {
        const created = await teachersApi.create(fd)
        setTeachers(prev => [created, ...prev])
        toast('Teacher added')
      } else {
        const updated = await teachersApi.update(modal.id, fd)
        setTeachers(prev => prev.map(t => t.id === updated.id ? updated : t))
        toast('Teacher updated')
      }
      setModal(null)
    } catch (err) { toast(err.message || 'Failed to save', 'error') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await teachersApi.delete(deleteTarget)
      setTeachers(prev => prev.filter(t => t.id !== deleteTarget))
      toast('Teacher deleted')
    } catch { toast('Failed to delete', 'error') }
    finally { setDeleteTarget(null) }
  }

  function toggle(field) {
    setForm(f => ({ ...f, [field]: !f[field] }))
  }

  const photoSrc = (t) => t.photo
    ? (t.photo.startsWith('http') ? t.photo : BASE_URL + t.photo)
    : null

  return (
    <div>
      <div className="section-card">
        <div className="section-card-header">
          <span className="section-card-title">Teachers ({teachers.length})</span>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div className="search-wrap">
              <Search size={14} />
              <input
                className="search-input"
                placeholder="Search name, subject…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={15} /> Add Teacher
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading…</div>
        ) : teachers.length === 0 ? (
          <div className="empty-state">
            <Users size={36} style={{ opacity: 0.25 }} />
            <p>No teachers found.</p>
          </div>
        ) : (
          <div className="card-grid">
            {teachers.map(t => (
              <div key={t.id} className="item-card">
                <div className="item-card-row">
                  {photoSrc(t)
                    ? <img src={photoSrc(t)} alt={t.name} className="item-card-photo" />
                    : <div className="item-card-photo-placeholder"><Users size={22} /></div>
                  }
                  <div>
                    <div className="item-card-name">{t.name}</div>
                    <div className="item-card-sub">{t.designation}</div>
                  </div>
                </div>
                {t.subject && <div className="item-card-sub">📚 {t.subject}</div>}
                {t.experience_years != null && (
                  <div className="item-card-sub">🕐 {t.experience_years} yrs experience</div>
                )}
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginTop: '0.2rem' }}>
                  <span className={`badge ${t.is_active ? 'badge-active' : 'badge-inactive'}`}>
                    {t.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="item-card-actions">
                  <button className="btn btn-navy btn-sm" onClick={() => openEdit(t)}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(t.id)}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{modal === 'add' ? 'Add Teacher' : 'Edit Teacher'}</span>
              <button className="btn btn-ghost" onClick={() => setModal(null)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation *</label>
                  <input className="form-input" required value={form.designation}
                    onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} placeholder="e.g. Senior Mathematics Teacher" />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="e.g. Mathematics" />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience (years)</label>
                  <input className="form-input" type="number" min="0" value={form.experience_years}
                    onChange={e => setForm(f => ({ ...f, experience_years: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea className="form-textarea" value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short description…" />
                </div>
                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input className="form-input" type="number" value={form.display_order}
                    onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Profile Photo</label>
                  <input className="form-input" type="file" accept="image/*"
                    onChange={e => setPhotoFile(e.target.files[0])} />
                  {modal !== 'add' && modal.photo && !photoFile && (
                    <div style={{ fontSize: '0.78rem', color: 'rgba(30,45,107,0.5)', marginTop: '0.3rem' }}>
                      Current photo will be kept if no new file selected.
                    </div>
                  )}
                </div>
                <label className="toggle" style={{ marginBottom: '0.5rem' }}>
                  <input type="checkbox" checked={form.is_active} onChange={() => toggle('is_active')} />
                  <span className="toggle-track"><span className="toggle-thumb" /></span>
                  Active (visible on website)
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><span className="spinner" style={{ borderTopColor: '#fff' }} /> Saving…</> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Teacher"
          message="Are you sure you want to delete this teacher? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
