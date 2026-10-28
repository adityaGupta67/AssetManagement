import { Link, useParams } from "react-router-dom";

const ViewEmployees = () => {
  const { id } = useParams();

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const employee = employees.find(
    (employee) => employee.id === id
  );

  if (!employee) {
    return (
      <div className="p-6 text-red-600 text-xl">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Employee Details
        </h1>

        <Link
          to="/employees"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <h3 className="text-gray-500 text-sm">
            Employee ID
          </h3>
          <p className="font-semibold text-lg">
            {employee.id}
          </p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Full Name
          </h3>
          <p className="font-semibold text-lg">
            {employee.name}
          </p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Department
          </h3>
          <p>{employee.department}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Designation
          </h3>
          <p>{employee.designation}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Email
          </h3>
          <p>{employee.email}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Phone
          </h3>
          <p>{employee.phone}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Joining Date
          </h3>
          <p>{employee.joiningDate}</p>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm">
            Status
          </h3>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              employee.status === "Active"
                ? "bg-green-100 text-green-700"
                : employee.status === "Inactive"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {employee.status}
          </span>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-gray-500 text-sm">
            Address
          </h3>
          <p>{employee.address}</p>
        </div>

      </div>
    </div>
  );
};

export default ViewEmployees;