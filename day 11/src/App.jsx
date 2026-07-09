import { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import { ToastProvider } from './context/ToastContext';
import StatsBar from './components/StatsBar';
import Toolbar from './components/Toolbar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeModal from './components/EmployeeModal';
import { useEmployees } from './context/EmployeeContext';
import './index.css';

function AppContent() {
  const { view } = useEmployees();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        padding: '0 28px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(10,14,26,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--accent-gradient)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
          }}>👤</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              EmplorHQ
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Employee Management
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--success)',
            boxShadow: '0 0 6px var(--success)',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Live System</span>
        </div>
      </nav>

      {/* Page header */}
      <div style={{
        padding: '32px 28px 0',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: 28,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8,
          }}>
            Team Directory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
            Manage your employees, track performance and compensation
          </p>
          <StatsBar />
        </div>
      </div>

      {/* Main content */}
      <main style={{ flex: 1, padding: '0 28px 40px', maxWidth: 1400, width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>
        <Toolbar onAddClick={() => setShowAddModal(true)} />
        {view === 'table' ? <EmployeeTable /> : <EmployeeGrid />}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '18px 28px',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--text-muted)',
      }}>
        EmplorHQ — Employee Management System · Built with React ⚛️
      </footer>

      {showAddModal && <EmployeeModal onClose={() => setShowAddModal(false)} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <EmployeeProvider>
        <AppContent />
      </EmployeeProvider>
    </ToastProvider>
  );
}
