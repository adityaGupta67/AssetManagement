import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";
const COLORS = [
  "#22c55e", // Available - Green
  "#3b82f6", // Assigned - Blue
  "#f59e0b", // Repair - Yellow
  "#ef4444", // Retired - Red
];

const StatusPieChart = ({
  available,
  assigned,
  repair,
  retired,
}) => {
  const data = [
    { name: "Available", value: available },
    { name: "Assigned", value: assigned },
    { name: "Repair", value: repair },
    { name: "Retired", value: retired },
  ];
  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Assets by Status
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
<Pie
  data={data}
  dataKey="value"
  nameKey="name"
  outerRadius={100}
  label
  onClick={(entry) =>
    navigate(`/assets?status=${entry.name}`)
  }
>
  {data.map((entry, index) => (
    <Cell
      key={entry.name}
      fill={COLORS[index]}
      style={{ cursor: "pointer" }}
    />
  ))}
</Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;