const DepartmentFilter = ({
  departmentFilter,
  setDepartmentFilter,
}) => {
  return (
    <select
      value={departmentFilter}
      onChange={(e) =>
        setDepartmentFilter(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="All">
        All Departments
      </option>

      <option value="IT">IT</option>
      <option value="HR">HR</option>
      <option value="Finance">Finance</option>
      <option value="Sales">Sales</option>
      <option value="Operations">
        Operations
      </option>
      <option value="Marketing">
        Marketing
      </option>
    </select>
  );
};

export default DepartmentFilter;