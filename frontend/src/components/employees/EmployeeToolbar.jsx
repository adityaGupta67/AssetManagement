import SearchBar from "./SearchBar";
import DepartmentFilter from "./DepartmentFilter";
import StatusFilter from "./StatusFilter";
import SortDropdown from "./SortDropdown";
import AddEmployeeButton from "./AddEmployeeButton";

const EmployeeToolbar = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <DepartmentFilter
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
          />

          <StatusFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Right Side */}
        <AddEmployeeButton />
      </div>
    </div>
  );
};

export default EmployeeToolbar;