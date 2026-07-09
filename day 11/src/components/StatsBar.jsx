import { useEmployees } from '../context/EmployeeContext';

export default function StatsBar() {
  const { stats } = useEmployees();

  const cards = [
    { label: 'Total Employees', value: stats.total, icon: '👥', color: '#6366f1', sub: `${stats.departments} departments` },
    { label: 'Active', value: stats.active, icon: '✅', color: '#10b981', sub: `${Math.round((stats.active / stats.total) * 100) || 0}% workforce` },
    { label: 'On Leave', value: stats.onLeave, icon: '🏖', color: '#f59e0b', sub: 'Currently away' },
    { label: 'Avg Salary', value: `₹${stats.avgSalary.toLocaleString('en-IN')}`, icon: '💰', color: '#3b82f6', sub: 'Annual package' },
    { label: 'Avg Performance', value: `${stats.avgPerformance}%`, icon: '📈', color: '#a78bfa', sub: 'Team average' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
      gap: 14,
      marginBottom: 24,
    }}>
      {cards.map(card => (
        <div
          key={card.label}
          className="glass"
          style={{
            padding: '18px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'var(--transition)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${card.color}60`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = '';
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20, right: -20,
            width: 80, height: 80,
            borderRadius: '50%',
            background: `${card.color}12`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}>{card.icon}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {card.label}
          </div>
          <div className="stat-number" style={{ fontSize: 26, fontWeight: 800, color: card.color, lineHeight: 1.1, marginBottom: 4 }}>
            {card.value}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
