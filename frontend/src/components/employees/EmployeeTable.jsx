import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({
  employees = [],
  onDelete = () => {},
}) => {
  const navigate = useNavigate();

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">
          No employees found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Employee ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-4 py-3">{employee.id}</td>

              <td className="px-4 py-3 font-medium">
                {employee.name}
              </td>

              <td className="px-4 py-3">
                {employee.department}
              </td>

              <td className="px-4 py-3">
                {employee.designation}
              </td>

              <td className="px-4 py-3">
                {employee.email}
              </td>

              <td className="px-4 py-3">
                {employee.phone}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : employee.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {employee.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() =>
                      navigate(`/view-employee/${employee.id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/edit-employee/${employee.id}`)
                    }
                    className="text-green-600 hover:text-green-800"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={() => onDelete(employee.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;