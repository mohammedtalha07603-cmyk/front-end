export default function EmployeeDetailDrawer({ employee: emp, onClose, onEdit }) {
  if (!emp) return null;

  const getStatusClass = (s) =>
    s === 'Active' ? 'badge-active' : s === 'On Leave' ? 'badge-on-leave' : 'badge-inactive';

  const daysWorked = Math.floor(
    (new Date() - new Date(emp.joinDate)) / (1000 * 60 * 60 * 24)
  );
  const yearsWorked = (daysWorked / 365).toFixed(1);

  const perfColor = emp.performance >= 85 ? 'var(--success)' : emp.performance >= 65 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div
      className="modal-overlay"
      style={{ justifyContent: 'flex-end', padding: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          height: '100vh',
          background: '#0f172a',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideRight 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>
            Employee Details
          </span>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={onClose} aria-label="Close drawer">✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* Profile */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 80, height: 80,
              borderRadius: '50%',
              background: `${emp.color}22`,
              color: emp.color,
              border: `3px solid ${emp.color}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800,
              margin: '0 auto 14px',
            }}>{emp.avatar}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', marginBottom: 4 }}>{emp.name}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 10 }}>{emp.role}</div>
            <span className={`badge ${getStatusClass(emp.status)}`}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
              {emp.status}
            </span>
          </div>

          {/* Performance */}
          <DrawerSection title="Performance">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: perfColor, lineHeight: 1 }}>
                {emp.performance}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Overall Score</div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  width: `${emp.performance}%`,
                  height: '100%',
                  background: perfColor,
                  borderRadius: 99,
                  transition: 'width 1s ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>
          </DrawerSection>

          {/* Contact */}
          <DrawerSection title="Contact Information">
            <DetailItem icon="📧" label="Email" value={emp.email} />
            <DetailItem icon="📱" label="Phone" value={emp.phone || 'Not specified'} />
            <DetailItem icon="📍" label="Location" value={emp.location || 'Not specified'} />
          </DrawerSection>

          {/* Employment */}
          <DrawerSection title="Employment Details">
            <DetailItem icon="🏢" label="Department" value={emp.department} />
            <DetailItem icon="💼" label="Role" value={emp.role} />
            <DetailItem icon="📅" label="Join Date" value={new Date(emp.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
            <DetailItem icon="⏱" label="Tenure" value={`${yearsWorked} years (${daysWorked} days)`} />
          </DrawerSection>

          {/* Compensation */}
          <DrawerSection title="Compensation">
            <div style={{ padding: '16px', background: 'rgba(99,102,241,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Annual Package</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-primary)' }}>
                ₹{emp.salary.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                ₹{Math.round(emp.salary / 12).toLocaleString('en-IN')} / month
              </div>
            </div>
          </DrawerSection>

          {/* Skills */}
          {emp.skills && emp.skills.length > 0 && (
            <DrawerSection title="Skills">
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {emp.skills.map(skill => (
                  <span key={skill} style={{
                    padding: '4px 12px',
                    background: `${emp.color}15`,
                    border: `1px solid ${emp.color}40`,
                    borderRadius: 99,
                    fontSize: 12,
                    color: emp.color,
                    fontWeight: 500,
                  }}>{skill}</span>
                ))}
              </div>
            </DrawerSection>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: 10,
        }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onEdit}>
            ✏️ Edit Employee
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function DrawerSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: 12,
      }}>{title}</div>
      {children}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  );
}
