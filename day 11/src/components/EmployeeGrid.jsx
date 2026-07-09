import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import EmployeeModal from './EmployeeModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EmployeeDetailDrawer from './EmployeeDetailDrawer';

function getDeptClass(dept) {
  return `dept-${dept?.toLowerCase()}`;
}

function getStatusClass(status) {
  if (status === 'Active') return 'badge-active';
  if (status === 'On Leave') return 'badge-on-leave';
  return 'badge-inactive';
}

function PerformanceArc({ value }) {
  const color = value >= 85 ? '#10b981' : value >= 65 ? '#f59e0b' : '#ef4444';
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const dash = (value / 100) * circumference;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: 11, fontWeight: 700, color }}>{value}%</span>
    </div>
  );
}

export default function EmployeeGrid() {
  const { filteredEmployees } = useEmployees();
  const [editEmp, setEditEmp] = useState(null);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [viewEmp, setViewEmp] = useState(null);

  if (filteredEmployees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3>No employees found</h3>
        <p>Try adjusting your search or filters, or add a new employee.</p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {filteredEmployees.map(emp => (
          <div
            key={emp.id}
            className="glass"
            style={{
              padding: 20,
              cursor: 'pointer',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => setViewEmp(emp)}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${emp.color}, transparent)`,
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  className="avatar avatar-md"
                  style={{ background: `${emp.color}22`, color: emp.color, border: `2px solid ${emp.color}44`, fontSize: 18 }}
                >
                  {emp.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15, lineHeight: 1.3 }}>{emp.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{emp.role}</div>
                </div>
              </div>
              <PerformanceArc value={emp.performance} />
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              <span className={`badge ${getDeptClass(emp.department)}`}>{emp.department}</span>
              <span className={`badge ${getStatusClass(emp.status)}`}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                {emp.status}
              </span>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              <InfoRow icon="📧" text={emp.email} />
              <InfoRow icon="📍" text={emp.location || 'Not specified'} />
              <InfoRow icon="💰" text={`₹${emp.salary.toLocaleString('en-IN')} / year`} bold />
            </div>

            {/* Skills */}
            {emp.skills && emp.skills.length > 0 && (
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
                {emp.skills.slice(0, 3).map(skill => (
                  <span key={skill} style={{
                    padding: '2px 8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 99,
                    fontSize: 11,
                    color: 'var(--text-secondary)',
                  }}>{skill}</span>
                ))}
                {emp.skills.length > 3 && (
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', padding: '2px 4px' }}>
                    +{emp.skills.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div
              style={{ display: 'flex', gap: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => setEditEmp(emp)}
                id={`grid-edit-${emp.id}`}
              >✏️ Edit</button>
              <button
                className="btn btn-danger btn-sm btn-icon"
                onClick={() => setDeleteEmp(emp)}
                id={`grid-delete-${emp.id}`}
              >🗑</button>
            </div>
          </div>
        ))}
      </div>

      {editEmp && <EmployeeModal editEmployee={editEmp} onClose={() => setEditEmp(null)} />}
      {deleteEmp && <DeleteConfirmModal employee={deleteEmp} onClose={() => setDeleteEmp(null)} />}
      {viewEmp && <EmployeeDetailDrawer employee={viewEmp} onClose={() => setViewEmp(null)} onEdit={() => { setEditEmp(viewEmp); setViewEmp(null); }} />}
    </>
  );
}

function InfoRow({ icon, text, bold }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
      <span>{icon}</span>
      <span style={{
        color: bold ? 'var(--text-primary)' : 'var(--text-muted)',
        fontWeight: bold ? 600 : 400,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{text}</span>
    </div>
  );
}
