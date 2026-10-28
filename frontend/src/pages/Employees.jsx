import { useEffect, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import AddEmployeeButton from "../components/employees/AddEmployeeButton";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    setEmployees(savedEmployees);
  }, []);

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== id
    );

    setEmployees(updatedEmployees);

    localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees)
    );
  };

return (
  <div className="p-6">
    <div className="flex justify-end mb-6">
      <AddEmployeeButton />
    </div>
    <EmployeeTable
      employees={employees}
      onDelete={handleDelete}
    />
  </div>
);
    
  
};

export default Employees;