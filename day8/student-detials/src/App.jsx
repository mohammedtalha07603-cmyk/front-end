import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [dept, setDept] = useState("");

  const addStudent = () => {
    if (name && roll && dept) {
      setStudents([...students, { name, roll, dept }]);
      setName("");
      setRoll("");
      setDept("");
    } else {
      alert("Please fill all fields");
    }
  };

  const deleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No Students Added</td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.dept}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteStudent(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;