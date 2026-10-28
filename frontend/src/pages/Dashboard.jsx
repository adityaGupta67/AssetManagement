import { useState, useEffect } from "react";

import {
  Package,
  CheckCircle,
  UserCheck,
  Wrench,
  Trash2,
  IndianRupee,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import CategoryBarChart from "../components/dashboard/CategoryBarChart";
import QuickActions from "../components/dashboard/QuickActions";

import { getAssets } from "../api/assets";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Loading dashboard...");

        const assetsData = await getAssets();

        console.log("Assets received:", assetsData);
        console.log(
          "Is assets array:",
          Array.isArray(assetsData)
        );

        setAssets(
          Array.isArray(assetsData)
            ? assetsData
            : []
        );

      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        setError(
          error.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // -----------------------------
  // Asset statistics
  // -----------------------------

  const totalAssets = assets.length;

  const availableAssets = assets.filter(
    (asset) => asset.status === "Available"
  ).length;

  const assignedAssets = assets.filter(
    (asset) => asset.status === "Assigned"
  ).length;

  const repairAssets = assets.filter(
    (asset) => asset.status === "Repair"
  ).length;

  const retiredAssets = assets.filter(
    (asset) => asset.status === "Retired"
  ).length;

  const totalValue = assets.reduce(
    (sum, asset) =>
      sum + Number(asset.purchase_cost || 0),
    0
  );

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          <p className="font-semibold">
            Failed to load dashboard
          </p>

          <p className="mt-1">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Dashboard
  // -----------------------------

  return (
    <>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        <StatCard
          title="Total Assets"
          value={totalAssets}
          color="bg-blue-600"
          icon={
            <Package
              size={32}
              className="text-white"
            />
          }
        />

        <StatCard
          title="Available Assets"
          value={availableAssets}
          color="bg-green-600"
          icon={
            <CheckCircle
              size={32}
              className="text-white"
            />
          }
        />

        <StatCard
          title="Assigned Assets"
          value={assignedAssets}
          color="bg-indigo-600"
          icon={
            <UserCheck
              size={32}
              className="text-white"
            />
          }
        />

        <StatCard
          title="Repair Assets"
          value={repairAssets}
          color="bg-yellow-500"
          icon={
            <Wrench
              size={32}
              className="text-white"
            />
          }
        />

        <StatCard
          title="Retired Assets"
          value={retiredAssets}
          color="bg-red-600"
          icon={
            <Trash2
              size={32}
              className="text-white"
            />
          }
        />

        <StatCard
          title="Total Asset Value"
          value={`₹${totalValue.toLocaleString("en-IN")}`}
          color="bg-purple-600"
          icon={
            <IndianRupee
              size={32}
              className="text-white"
            />
          }
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6">

        <StatusPieChart
          available={availableAssets}
          assigned={assignedAssets}
          repair={repairAssets}
          retired={retiredAssets}
        />

        <CategoryBarChart
          assets={assets}
        />

      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <QuickActions />
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <RecentActivity
          activities={activities}
        />
      </div>
    </>
  );
};

export default Dashboard;