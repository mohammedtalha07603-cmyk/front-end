import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ employeeId: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.employeeId || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Demo credentials check
    const EMP_ID       = "EMP-00123";
    const EMP_PASSWORD = "Emp@1234";

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.employeeId === EMP_ID && form.password === EMP_PASSWORD) {
        navigate("/dashboard");
      } else {
        setError("Invalid ID or password. Try: EMP-00123 / Emp@1234");
      }
    }, 1400);
  };

  return (
    <div className="login-bg">
      <div className="blob blob-1 emp-blob-1" />
      <div className="blob blob-2 emp-blob-2" />
      <div className="blob blob-3 emp-blob-3" />

      <div className="login-card reverse-card">
        {/* Right side: form */}
        <div className="login-panel login-panel--right">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </Link>

          <div className="form-header">
            <div className="form-badge emp-badge">Employee</div>
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-sub">Sign in to your employee account</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="emp-id">Employee ID</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                  <line x1="7" y1="2" x2="7" y2="22"/>
                  <line x1="17" y1="2" x2="17" y2="22"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <line x1="2" y1="7" x2="7" y2="7"/>
                  <line x1="2" y1="17" x2="7" y2="17"/>
                  <line x1="17" y1="17" x2="22" y2="17"/>
                  <line x1="17" y1="7" x2="22" y2="7"/>
                </svg>
                <input
                  id="emp-id"
                  name="employeeId"
                  type="text"
                  placeholder="EMP-00123"
                  value={form.employeeId}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="emp-password">
                Password
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="emp-password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <label className="checkbox-label">
                <input type="checkbox" id="emp-remember" />
                <span className="checkmark" />
                Remember me for 30 days
              </label>
            </div>

            <button
              id="employee-login-btn"
              type="submit"
              className={`submit-btn emp-submit ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Sign In as Employee
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="switch-link">
            Are you an admin?{" "}
            <Link to="/admin-login">Admin Login →</Link>
          </p>
        </div>

        {/* Left panel — decorative */}
        <div className="login-panel login-panel--left emp-gradient">
          <div className="panel-content">
            <div className="panel-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2 className="panel-title">Employee Portal</h2>
            <p className="panel-desc">
              Access your payslips, apply for leaves, check attendance and manage your personal profile.
            </p>
            <ul className="panel-features">
              <li>
                <span className="feature-dot emp-dot" />
                View &amp; download payslips
              </li>
              <li>
                <span className="feature-dot emp-dot" />
                Apply for leave requests
              </li>
              <li>
                <span className="feature-dot emp-dot" />
                Track attendance history
              </li>
            </ul>
          </div>
          <div className="panel-circles">
            <div className="pcircle pcircle-1 emp-pcircle" />
            <div className="pcircle pcircle-2 emp-pcircle" />
          </div>
        </div>
      </div>
    </div>
  );
}
