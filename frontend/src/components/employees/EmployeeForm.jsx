import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ initialEmployee, mode }) => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(
    initialEmployee || {
      id: "",
      name: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
      joiningDate: "",
      status: "",
      address: "",
    }
  );

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !employee.id.trim() ||
      !employee.name.trim() ||
      !employee.department.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    if (mode === "add") {
      existingEmployees.push(employee);

      localStorage.setItem(
        "employees",
        JSON.stringify(existingEmployees)
      );

      alert("Employee added successfully!");
    } else if (mode === "edit") {
      const updatedEmployees = existingEmployees.map((emp) =>
        emp.id === employee.id ? employee : emp
      );

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      alert("Employee updated successfully!");
    }

    navigate("/employees");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {mode === "edit"
          ? "Edit Employee"
          : "Add New Employee"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="id"
          placeholder="Employee ID"
          value={employee.id}
          onChange={handleChange}
          disabled={mode === "edit"}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={employee.name}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Operations">Operations</option>
          <option value="Marketing">Marketing</option>
        </select>

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={employee.phone}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>

        <textarea
          name="address"
          placeholder="Address"
          rows="4"
          value={employee.address}
          onChange={handleChange}
          className="border rounded-lg p-3 md:col-span-2"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold md:col-span-2"
        >
          {mode === "edit"
            ? "Update Employee"
            : "Save Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;