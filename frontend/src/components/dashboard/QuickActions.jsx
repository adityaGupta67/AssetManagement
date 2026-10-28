import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Package,
  Users,
  FileText,
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Asset",
      icon: <PlusCircle size={24} />,
      color: "bg-blue-600",
      path: "/add-asset",
    },
    {
      title: "View Assets",
      icon: <Package size={24} />,
      color: "bg-green-600",
      path: "/assets",
    },
    {
      title: "Employees",
      icon: <Users size={24} />,
      color: "bg-purple-600",
      path: "/employees",
    },
    {
      title: "Reports",
      icon: <FileText size={24} />,
      color: "bg-orange-600",
      path: "/reports",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-white rounded-xl p-6 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-lg transition-all duration-300`}
          >
            {action.icon}

            <span className="font-medium">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;