const StatusFilter = ({ value, onChange }) => {
  return (
    <select
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={value}
      onChange={onChange}
    >
      <option value="All">All</option>
      <option value="Available">Available</option>
      <option value="Assigned">Assigned</option>
      <option value="Repair">Repair</option>
      <option value="Retired">Retired</option>
    </select>
  );
};

export default StatusFilter;