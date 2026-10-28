const SortDropdown = ({
  sortBy,
  setSortBy,
}) => {
  return (
    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="name">
        Name
      </option>

      <option value="department">
        Department
      </option>

      <option value="designation">
        Designation
      </option>

      <option value="joiningDate">
        Joining Date
      </option>

      <option value="status">
        Status
      </option>
    </select>
  );
};

export default SortDropdown;