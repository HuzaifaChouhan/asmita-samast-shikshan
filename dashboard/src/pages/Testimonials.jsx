import { useEffect, useState } from 'react'
import { Plus, Search, Edit2, Trash2, Star, X } from 'lucide-react'
import { testimonialsApi } from '../api'
import ConfirmDialog from '../components/ConfirmDialog'
import { toast } from '../components/Toast'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const EMPTY = {
  name: '', role: '', message: '', rating: '', is_approved: false, is_featured: false, photo: null,
}

function Stars({ n }) {
  return <span className="stars">{'★'.repeat(n || 0)}{'☆'.repeat(5 - (n || 0))}</span>
}

export default function TestimonialsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [photoFile, setPhotoFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await testimonialsApi.list(search ? { search } : {})
      setItems(data || [])
    } catch { toast('Failed to load testimonials', 'error') }
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
      name: t.name, role: t.role, message: t.message,
      rating: t.rating ?? '', is_approved: t.is_approved, is_featured: t.is_featured, photo: null,
    })
    setPhotoFile(null)
    setModal(t)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('role', form.role)
      fd.append('message', form.message)
      if (form.rating) fd.append('rating', form.rating)
      fd.append('is_approved', form.is_approved)
      fd.append('is_featured', form.is_featured)
      if (photoFile) fd.append('photo', photoFile)

      if (modal === 'add') {
        const created = await testimonialsApi.create(fd)
        setItems(prev => [created, ...prev])
        toast('Testimonial added')
      } else {
        const updated = await testimonialsApi.update(modal.id, {
          name: form.name, role: form.role, message: form.message,
          rating: form.rating || null, is_approved: form.is_approved, is_featured: form.is_featured,
        })
        setItems(prev => prev.map(t => t.id === updated.id ? updated : t))
        toast('Testimonial updated')
      }
      setModal(null)
    } catch (err) { toast(err.message || 'Failed to save', 'error') }
    finally { setSaving(false) }
  }

  async function quickToggle(id, field, value) {
    try {
      const updated = await testimonialsApi.update(id, { [field]: value })
      setItems(prev => prev.map(t => t.id === id ? { ...t, [field]: updated[field] } : t))
      toast(`${field === 'is_approved' ? 'Approval' : 'Featured'} updated`)
    } catch { toast('Failed to update', 'error') }
  }

  async function handleDelete() {
    try {
      await testimonialsApi.delete(deleteTarget)
      setItems(prev => prev.filter(t => t.id !== deleteTarget))
      toast('Testimonial deleted')
    } catch { toast('Failed to delete', 'error') }
    finally { setDeleteTarget(null) }
  }

  const photoSrc = (t) => t.photo
    ? (t.photo.startsWith('http') ? t.photo : BASE_URL + t.photo)
    : null

  return (
    <div>
      <div className="section-card">
        <div className="section-card-header">
          <span className="section-card-title">Testimonials ({items.length})</span>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div className="search-wrap">
              <Search size={14} />
              <input
                className="search-input"
                placeholder="Search name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={15} /> Add
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading…</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <Star size={36} style={{ opacity: 0.25 }} />
            <p>No testimonials found.</p>
          </div>
        ) : (
          <div className="card-grid">
            {items.map(t => (
              <div key={t.id} className="item-card">
                <div className="item-card-row">
                  {photoSrc(t)
                    ? <img src={photoSrc(t)} alt={t.name} className="item-card-photo" />
                    : <div className="item-card-photo-placeholder"><Star size={20} /></div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="item-card-name">{t.name}</div>
                    <div className="item-card-sub">{t.role}</div>
                    {t.rating && <Stars n={t.rating} />}
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(30,45,107,0.65)', lineHeight: 1.6, overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  "{t.message}"
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <label className="toggle">
                    <input type="checkbox" checked={t.is_approved}
                      onChange={e => quickToggle(t.id, 'is_approved', e.target.checked)} />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                    Approved
                  </label>
                  <label className="toggle">
                    <input type="checkbox" checked={t.is_featured}
                      onChange={e => quickToggle(t.id, 'is_featured', e.target.checked)} />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                    Featured
                  </label>
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
              <span className="modal-title">{modal === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</span>
              <button className="btn btn-ghost" onClick={() => setModal(null)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <input className="form-input" required value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Parent, Student, Alumni" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" required value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating (1–5)</label>
                  <select className="form-select" value={form.rating}
                    onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}>
                    <option value="">No rating</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ★</option>)}
                  </select>
                </div>
                {modal === 'add' && (
                  <div className="form-group">
                    <label className="form-label">Photo</label>
                    <input className="form-input" type="file" accept="image/*"
                      onChange={e => setPhotoFile(e.target.files[0])} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <label className="toggle">
                    <input type="checkbox" checked={form.is_approved}
                      onChange={e => setForm(f => ({ ...f, is_approved: e.target.checked }))} />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                    Approved (visible)
                  </label>
                  <label className="toggle">
                    <input type="checkbox" checked={form.is_featured}
                      onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                    Featured
                  </label>
                </div>
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
          title="Delete Testimonial"
          message="Are you sure you want to delete this testimonial? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
