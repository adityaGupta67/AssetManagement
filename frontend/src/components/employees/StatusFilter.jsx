const StatusFilter = ({
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="All">
        All Status
      </option>

      <option value="Active">
        Active
      </option>

      <option value="Inactive">
        Inactive
      </option>

      <option value="On Leave">
        On Leave
      </option>
    </select>
  );
};

export default StatusFilter;    