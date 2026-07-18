import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Demo credentials check
    const ADMIN_EMAIL    = "admin@company.com";
    const ADMIN_PASSWORD = "Admin@1234";

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Try: admin@company.com / Admin@1234");
      }
    }, 1400);
  };

  return (
    <div className="login-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="login-card">
        {/* Left panel */}
        <div className="login-panel login-panel--left admin-gradient">
          <div className="panel-content">
            <div className="panel-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="panel-title">Admin Portal</h2>
            <p className="panel-desc">
              Manage employees, payroll, attendance and all system settings from one powerful dashboard.
            </p>
            <ul className="panel-features">
              <li>
                <span className="feature-dot" />
                Full employee management
              </li>
              <li>
                <span className="feature-dot" />
                Payroll &amp; leave approvals
              </li>
              <li>
                <span className="feature-dot" />
                Analytics &amp; reports
              </li>
            </ul>
          </div>
          <div className="panel-circles">
            <div className="pcircle pcircle-1" />
            <div className="pcircle pcircle-2" />
          </div>
        </div>

        {/* Right panel — form */}
        <div className="login-panel login-panel--right">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </Link>

          <div className="form-header">
            <div className="form-badge admin-badge">Admin</div>
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-sub">Sign in to your admin account</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="admin-email">Email Address</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="admin-password">
                Password
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="admin-password"
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
                <input type="checkbox" id="admin-remember" />
                <span className="checkmark" />
                Remember me for 30 days
              </label>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className={`submit-btn admin-submit ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Sign In as Admin
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="switch-link">
            Are you an employee?{" "}
            <Link to="/employee-login">Employee Login →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
