import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { useToast } from '../context/ToastContext';
import { DEPARTMENTS, ROLES, STATUS_OPTIONS } from '../data/employees';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  status: 'Active',
  salary: '',
  joinDate: new Date().toISOString().split('T')[0],
  location: '',
  skills: '',
  performance: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email';
  if (!form.department) errors.department = 'Department is required';
  if (!form.role) errors.role = 'Role is required';
  if (!form.salary || isNaN(Number(form.salary)) || Number(form.salary) <= 0)
    errors.salary = 'Valid salary required';
  if (!form.joinDate) errors.joinDate = 'Join date is required';
  return errors;
}

export default function EmployeeModal({ onClose, editEmployee = null }) {
  const { addEmployee, updateEmployee } = useEmployees();
  const { addToast } = useToast();

  const [form, setForm] = useState(
    editEmployee
      ? {
          ...editEmployee,
          skills: Array.isArray(editEmployee.skills) ? editEmployee.skills.join(', ') : editEmployee.skills,
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // Reset role if department changes
      if (name === 'department') updated.role = '';
      return updated;
    });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 400)); // Simulate async

    const payload = {
      ...form,
      salary: Number(form.salary),
      performance: form.performance ? Number(form.performance) : undefined,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    if (editEmployee) {
      updateEmployee({ ...payload, id: editEmployee.id });
      addToast(`${form.name} updated successfully!`, 'success');
    } else {
      addEmployee(payload);
      addToast(`${form.name} added successfully!`, 'success');
    }
    setSaving(false);
    onClose();
  };

  const roleOptions = form.department ? (ROLES[form.department] || []) : [];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {editEmployee ? '✏️ Edit Employee' : '➕ Add Employee'}
          </h2>
          <button
            className="btn btn-secondary btn-icon"
            onClick={onClose}
            aria-label="Close modal"
          >✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Name */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="emp-name">Full Name *</label>
                <input
                  id="emp-name"
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Arjun Mehta"
                  autoFocus
                />
                {errors.name && <FieldError msg={errors.name} />}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-email">Email *</label>
                <input
                  id="emp-email"
                  className="form-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@company.com"
                />
                {errors.email && <FieldError msg={errors.email} />}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-phone">Phone</label>
                <input
                  id="emp-phone"
                  className="form-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-dept">Department *</label>
                <select
                  id="emp-dept"
                  className="form-select"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <FieldError msg={errors.department} />}
              </div>

              {/* Role */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-role">Role *</label>
                <select
                  id="emp-role"
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={!form.department}
                >
                  <option value="">Select role</option>
                  {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.role && <FieldError msg={errors.role} />}
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-status">Status</label>
                <select id="emp-status" className="form-select" name="status" value={form.status} onChange={handleChange}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Salary */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-salary">Annual Salary (₹) *</label>
                <input
                  id="emp-salary"
                  className="form-input"
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="100000"
                  min="0"
                />
                {errors.salary && <FieldError msg={errors.salary} />}
              </div>

              {/* Join Date */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-joindate">Join Date *</label>
                <input
                  id="emp-joindate"
                  className="form-input"
                  name="joinDate"
                  type="date"
                  value={form.joinDate}
                  onChange={handleChange}
                />
                {errors.joinDate && <FieldError msg={errors.joinDate} />}
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-location">Location</label>
                <input
                  id="emp-location"
                  className="form-input"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>

              {/* Performance */}
              <div className="form-group">
                <label className="form-label" htmlFor="emp-perf">Performance (0-100)</label>
                <input
                  id="emp-perf"
                  className="form-input"
                  name="performance"
                  type="number"
                  value={form.performance}
                  onChange={handleChange}
                  placeholder="80"
                  min="0"
                  max="100"
                />
              </div>

              {/* Skills */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="emp-skills">Skills (comma-separated)</label>
                <input
                  id="emp-skills"
                  className="form-input"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, AWS"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? '⏳ Saving...' : editEmployee ? '💾 Update' : '➕ Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldError({ msg }) {
  return (
    <span style={{ color: 'var(--danger)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
      ⚠ {msg}
    </span>
  );
}
