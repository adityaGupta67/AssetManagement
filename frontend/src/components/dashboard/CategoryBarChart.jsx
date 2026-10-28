import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CategoryBarChart = ({ assets }) => {
  const navigate = useNavigate();

  // Count assets in each category
  const categoryCount = {};

  assets.forEach((asset) => {
    categoryCount[asset.category] =
      (categoryCount[asset.category] || 0) + 1;
  });

  // Convert object to array
  const data = Object.entries(categoryCount).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Assets by Category
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Click a bar to view assets in that category.
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            cursor="pointer"
            onClick={(barData) =>
              navigate(`/assets?category=${barData.category}`)
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;