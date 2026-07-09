import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useEmployees } from '../context/EmployeeContext';

export default function DeleteConfirmModal({ employee, onClose }) {
  const { deleteEmployee } = useEmployees();
  const { addToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await new Promise(r => setTimeout(r, 300));
    deleteEmployee(employee.id);
    addToast(`${employee.name} removed from system`, 'error');
    setDeleting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 400 }} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">🗑️ Delete Employee</h2>
          <button className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Are you sure you want to delete{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{employee.name}</strong>?
            This action cannot be undone.
          </p>
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.08)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}>
            <Avatar name={employee.avatar} color={employee.color} size="sm" />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{employee.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{employee.role} · {employee.department}</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={deleting}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, color, size = 'sm' }) {
  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ background: `${color}30`, color, border: `1.5px solid ${color}50` }}
    >
      {name}
    </div>
  );
}
