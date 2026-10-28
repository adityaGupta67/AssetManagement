import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const AddEmployeeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/add-employee")}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
    >
      <Plus size={18} />
      Add Employee
    </button>
  );
};

export default AddEmployeeButton;