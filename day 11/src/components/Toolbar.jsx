import { useEmployees } from '../context/EmployeeContext';
import { DEPARTMENTS, STATUS_OPTIONS } from '../data/employees';

export default function Toolbar({ onAddClick }) {
  const {
    search, setSearch,
    filterDept, setFilterDept,
    filterStatus, setFilterStatus,
    sortBy, setSortBy,
    view, setView,
    filteredEmployees,
  } = useEmployees();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
      {/* Top row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', fontSize: 16, pointerEvents: 'none',
          }}>🔍</span>
          <input
            id="search-employees"
            className="form-input"
            style={{ paddingLeft: 40 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, role…"
            aria-label="Search employees"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: 18,
              }}
              aria-label="Clear search"
            >×</button>
          )}
        </div>

        {/* View toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          {['table', 'grid'].map(v => (
            <button
              key={v}
              id={`view-${v}`}
              onClick={() => setView(v)}
              style={{
                padding: '8px 14px',
                background: view === v ? 'var(--accent-gradient)' : 'transparent',
                color: view === v ? 'white' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                transition: 'var(--transition)',
              }}
              title={`${v === 'table' ? 'Table' : 'Grid'} view`}
              aria-pressed={view === v}
            >
              {v === 'table' ? '☰' : '⊞'}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button className="btn btn-primary btn-lg" onClick={onAddClick} id="add-employee-btn">
          ＋ Add Employee
        </button>
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
          Showing {filteredEmployees.length} result{filteredEmployees.length !== 1 ? 's' : ''}
        </span>

        <div style={{ flex: 1 }} />

        <select
          id="filter-dept"
          className="form-select"
          style={{ width: 'auto', minWidth: 150 }}
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          id="filter-status"
          className="form-select"
          style={{ width: 'auto', minWidth: 140 }}
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          id="sort-by"
          className="form-select"
          style={{ width: 'auto', minWidth: 140 }}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          aria-label="Sort employees"
        >
          <option value="name">Sort: Name A–Z</option>
          <option value="salary">Sort: Salary (High)</option>
          <option value="performance">Sort: Performance</option>
          <option value="joinDate">Sort: Newest First</option>
        </select>

        {(filterDept !== 'All' || filterStatus !== 'All' || search) && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setFilterDept('All');
              setFilterStatus('All');
              setSearch('');
            }}
            id="clear-filters"
          >
            ✕ Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
