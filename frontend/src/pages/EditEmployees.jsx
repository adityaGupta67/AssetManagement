import { useParams } from "react-router-dom";
import EmployeeForm from "../components/employees/EmployeeForm";

const EditEmployees = () => {
  const { id } = useParams();

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const employee = employees.find(
    (employee) => employee.id === id
  );

  if (!employee) {
    return (
      <div className="p-6 text-red-600">
        Employee not found.
      </div>
    );
  }

  return (
    <EmployeeForm
      initialEmployee={employee}
      mode="edit"
    />
  );
};

export default EditEmployees;