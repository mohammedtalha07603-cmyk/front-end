import { createContext, useContext, useReducer, useCallback } from 'react';
import { initialEmployees } from '../data/employees';

const EmployeeContext = createContext(null);

function generateId(employees) {
  return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
}

function generateAvatar(name) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#a78bfa',
  '#06b6d4', '#84cc16',
];

function getRandomColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      const newId = generateId(state.employees);
      const newEmployee = {
        ...action.payload,
        id: newId,
        avatar: generateAvatar(action.payload.name),
        color: getRandomColor(newId),
        performance: action.payload.performance ?? Math.floor(Math.random() * 30) + 65,
        skills: action.payload.skills ?? [],
      };
      return { ...state, employees: [...state.employees, newEmployee] };
    }
    case 'UPDATE_EMPLOYEE': {
      return {
        ...state,
        employees: state.employees.map(e =>
          e.id === action.payload.id
            ? { ...e, ...action.payload, avatar: generateAvatar(action.payload.name), color: e.color }
            : e
        ),
      };
    }
    case 'DELETE_EMPLOYEE':
      return { ...state, employees: state.employees.filter(e => e.id !== action.payload) };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'SET_FILTER_DEPT':
      return { ...state, filterDept: action.payload };

    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };

    case 'SET_SORT':
      return { ...state, sortBy: action.payload };

    case 'SET_VIEW':
      return { ...state, view: action.payload };

    default:
      return state;
  }
}

const initialState = {
  employees: initialEmployees,
  search: '',
  filterDept: 'All',
  filterStatus: 'All',
  sortBy: 'name',
  view: 'table', // 'table' | 'grid'
};

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addEmployee = useCallback((data) => dispatch({ type: 'ADD_EMPLOYEE', payload: data }), []);
  const updateEmployee = useCallback((data) => dispatch({ type: 'UPDATE_EMPLOYEE', payload: data }), []);
  const deleteEmployee = useCallback((id) => dispatch({ type: 'DELETE_EMPLOYEE', payload: id }), []);

  const filteredEmployees = state.employees
    .filter(e => {
      const q = state.search.toLowerCase();
      const matchSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
      const matchDept = state.filterDept === 'All' || e.department === state.filterDept;
      const matchStatus = state.filterStatus === 'All' || e.status === state.filterStatus;
      return matchSearch && matchDept && matchStatus;
    })
    .sort((a, b) => {
      if (state.sortBy === 'name') return a.name.localeCompare(b.name);
      if (state.sortBy === 'salary') return b.salary - a.salary;
      if (state.sortBy === 'performance') return b.performance - a.performance;
      if (state.sortBy === 'joinDate') return new Date(b.joinDate) - new Date(a.joinDate);
      return 0;
    });

  const stats = {
    total: state.employees.length,
    active: state.employees.filter(e => e.status === 'Active').length,
    onLeave: state.employees.filter(e => e.status === 'On Leave').length,
    inactive: state.employees.filter(e => e.status === 'Inactive').length,
    avgSalary: state.employees.length
      ? Math.round(state.employees.reduce((s, e) => s + e.salary, 0) / state.employees.length)
      : 0,
    avgPerformance: state.employees.length
      ? Math.round(state.employees.reduce((s, e) => s + e.performance, 0) / state.employees.length)
      : 0,
    departments: [...new Set(state.employees.map(e => e.department))].length,
  };

  const value = {
    ...state,
    filteredEmployees,
    stats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setSearch: (v) => dispatch({ type: 'SET_SEARCH', payload: v }),
    setFilterDept: (v) => dispatch({ type: 'SET_FILTER_DEPT', payload: v }),
    setFilterStatus: (v) => dispatch({ type: 'SET_FILTER_STATUS', payload: v }),
    setSortBy: (v) => dispatch({ type: 'SET_SORT', payload: v }),
    setView: (v) => dispatch({ type: 'SET_VIEW', payload: v }),
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used within EmployeeProvider');
  return ctx;
}
