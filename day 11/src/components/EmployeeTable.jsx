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

function Avatar({ name, color }) {
  return (
    <div
      className="avatar avatar-md"
      style={{ background: `${color}22`, color, border: `1.5px solid ${color}55` }}
    >
      {name}
    </div>
  );
}

function PerformanceBar({ value }) {
  const color = value >= 85 ? 'var(--success)' : value >= 65 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        flex: 1,
        height: 5,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 99,
        overflow: 'hidden',
        minWidth: 60,
      }}>
        <div style={{
          width: `${value}%`,
          height: '100%',
          background: color,
          borderRadius: 99,
          transition: 'width 0.6s ease',
        }} />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 600, minWidth: 28 }}>{value}%</span>
    </div>
  );
}

export default function EmployeeTable() {
  const { filteredEmployees } = useEmployees();
  const [editEmp, setEditEmp] = useState(null);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [viewEmp, setViewEmp] = useState(null);

  if (filteredEmployees.length === 0) {
    return (
      <div className="table-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No employees found</h3>
          <p>Try adjusting your search or filters, or add a new employee.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Performance</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                {/* Employee */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={emp.avatar} color={emp.color} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.3 }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{emp.email}</div>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td>
                  <span className={`badge ${getDeptClass(emp.department)}`}>
                    {emp.department}
                  </span>
                </td>

                {/* Role */}
                <td style={{ fontSize: 13 }}>{emp.role}</td>

                {/* Status */}
                <td>
                  <span className={`badge ${getStatusClass(emp.status)}`}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    {emp.status}
                  </span>
                </td>

                {/* Salary */}
                <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>
                  ₹{emp.salary.toLocaleString('en-IN')}
                </td>

                {/* Performance */}
                <td style={{ minWidth: 120 }}>
                  <PerformanceBar value={emp.performance} />
                </td>

                {/* Join Date */}
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {new Date(emp.joinDate).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </td>

                {/* Actions */}
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="btn btn-secondary btn-sm btn-icon"
                      onClick={() => setViewEmp(emp)}
                      title="View details"
                      id={`view-emp-${emp.id}`}
                    >👁</button>
                    <button
                      className="btn btn-secondary btn-sm btn-icon"
                      onClick={() => setEditEmp(emp)}
                      title="Edit employee"
                      id={`edit-emp-${emp.id}`}
                    >✏️</button>
                    <button
                      className="btn btn-danger btn-sm btn-icon"
                      onClick={() => setDeleteEmp(emp)}
                      title="Delete employee"
                      id={`delete-emp-${emp.id}`}
                    >🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editEmp && <EmployeeModal editEmployee={editEmp} onClose={() => setEditEmp(null)} />}
      {deleteEmp && <DeleteConfirmModal employee={deleteEmp} onClose={() => setDeleteEmp(null)} />}
      {viewEmp && <EmployeeDetailDrawer employee={viewEmp} onClose={() => setViewEmp(null)} onEdit={() => { setEditEmp(viewEmp); setViewEmp(null); }} />}
    </>
  );
}
