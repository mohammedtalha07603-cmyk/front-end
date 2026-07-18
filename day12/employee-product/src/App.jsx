import "./App.css";
import { useState, useRef } from "react";
import { FaUsers, FaMoneyBillWave, FaClipboardCheck, FaUserPlus } from "react-icons/fa";

const employees = [
  {
    id: 1,
    name: "John Smith",
    position: "Frontend Developer",
    department: "IT",
    salary: "$5000",
    status: "Active"
  },
  {
    id: 2,
    name: "Emma Watson",
    position: "HR Manager",
    department: "HR",
    salary: "$4200",
    status: "Active"
  },
  {
    id: 3,
    name: "David Miller",
    position: "UI Designer",
    department: "Design",
    salary: "$4500",
    status: "Leave"
  },
  {
    id: 4,
    name: "Sophia Lee",
    position: "Backend Developer",
    department: "IT",
    salary: "$6000",
    status: "Active"
  }
];

export default function App() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadStatus("");

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Upload response:", data);
      setUploadStatus(`✅ "${file.name}" uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("❌ Upload failed. Make sure the server is running.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>EMS</h2>

        <ul>
          <li>Dashboard</li>
          <li>Employees</li>
          <li>Attendance</li>
          <li>Payroll</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="content">

        <header>
          <h1>Employee Management System</h1>
          <button onClick={() => fileInputRef.current.click()} disabled={uploading}>
            {uploading ? "Uploading..." : "Add Employee"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </header>

        {uploadStatus && (
          <p style={{ padding: "0 1.5rem", color: uploadStatus.startsWith("✅") ? "#4ade80" : "#f87171", fontWeight: 500 }}>
            {uploadStatus}
          </p>
        )}

        <section className="cards">

          <div className="card">
            <FaUsers className="icon"/>
            <h2>240</h2>
            <p>Total Employees</p>
          </div>

          <div className="card">
            <FaUserPlus className="icon"/>
            <h2>18</h2>
            <p>New Joiners</p>
          </div>

          <div className="card">
            <FaClipboardCheck className="icon"/>
            <h2>96%</h2>
            <p>Attendance</p>
          </div>

          <div className="card">
            <FaMoneyBillWave className="icon"/>
            <h2>$180K</h2>
            <p>Payroll</p>
          </div>

        </section>

        <section className="table-section">

          <div className="table-header">
            <h2>Employees</h2>

            <input
              type="text"
              placeholder="Search Employee..."
            />
          </div>

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {employees.map(emp => (

                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <span className={emp.status==="Active"?"active":"leave"}>
                      {emp.status}
                    </span>
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}