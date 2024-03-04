import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    employeeName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    country: "",
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://crudcrud.com/api/3b6744664e6148eb8655f85ad9942e0f/posts"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (id) => {
    const selectedEmployee = employees.find((employee) => employee._id === id);
    setSelectedEmployeeId(id);
    setFormData({
      id: selectedEmployee.id,
      employeeName: selectedEmployee.employeeName,
      email: selectedEmployee.email,
      mobileNumber: selectedEmployee.mobileNumber,
      dob: selectedEmployee.dob,
      gender: selectedEmployee.gender,
      country: selectedEmployee.country,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url =
        "https://crudcrud.com/api/3b6744664e6148eb8655f85ad9942e0f/posts";
      let method = "POST";
      if (selectedEmployeeId) {
        url += `/${selectedEmployeeId}`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Success:", data);
      setFormData({
        id: "",
        employeeName: "",
        email: "",
        mobileNumber: "",
        dob: "",
        gender: "",
        country: "",
      });
      setShowModal(false);
      setSelectedEmployeeId(null);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowModal(false); 
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://crudcrud.com/api/3b6744664e6148eb8655f85ad9942e0f/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
      <span>Employee Management</span>
      <button className="add-employee-btn" onClick={() => setShowModal(true)}>
        Add Employee
      </button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Mobile Number</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.id}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNumber}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>{employee.country}</td>
              <td>
                <button
                  onClick={() => handleDelete(employee._id)}
                  style={{ marginLeft: "50px" }}
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleUpdate(employee._id)}
                  style={{ marginLeft: "20px" }}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <span className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </span>
              <p>Add New Employee</p>
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter ID"
                required
              />

              <label> Full Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                placeholder="Enter Employee Name"
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
              />

              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                required
              />

              <label>Date Of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Select Date Of Birth"
                required
              />

              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Albania">India</option>
              </select>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
