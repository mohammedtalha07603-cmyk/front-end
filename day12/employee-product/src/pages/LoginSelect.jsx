import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginSelect() {
  const navigate = useNavigate();

  return (
    <div className="login-bg">
      {/* Animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="select-card">
        <div className="brand">
          <div className="brand-icon">EMS</div>
          <h1 className="brand-title">Employee Management System</h1>
          <p className="brand-sub">Select your login portal to continue</p>
        </div>

        <div className="portal-grid">
          <button
            id="admin-portal-btn"
            className="portal-btn admin-portal"
            onClick={() => navigate("/admin-login")}
          >
            <div className="portal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="portal-info">
              <span className="portal-label">Admin Portal</span>
              <span className="portal-desc">Full system access & management</span>
            </div>
            <svg className="portal-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <button
            id="employee-portal-btn"
            className="portal-btn employee-portal"
            onClick={() => navigate("/employee-login")}
          >
            <div className="portal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="portal-info">
              <span className="portal-label">Employee Portal</span>
              <span className="portal-desc">View payslips, leaves & profile</span>
            </div>
            <svg className="portal-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <p className="footer-note">© 2025 EMS · All rights reserved</p>
      </div>
    </div>
  );
}
