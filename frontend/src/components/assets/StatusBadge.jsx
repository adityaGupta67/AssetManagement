const StatusBadge = ({ status }) => {
  let color = "";

  if (status === "Available") {
    color = "bg-green-100 text-green-700";
  } else if (status === "Assigned") {
    color = "bg-blue-100 text-blue-700";
  } else if (status === "Repair") {
    color = "bg-red-100 text-red-700";
  } else {
    color = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;