import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";

import AddAsset from "./pages/AddAsset";
import EditAsset from "./pages/EditAsset";
import View from "./pages/View";

import AddEmployee from "./pages/AddEmployee";
import EditEmployees from "./pages/EditEmployees";
import ViewEmployees from "./pages/ViewEmployees";
import AssignAsset from "./pages/AssignAsset";
import ReturnAsset from "./pages/ReturnAsset";

import Login from "./pages/Login";

import { getMe, logout } from "./api/auth";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access_token");

      // No token means user is not logged in
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getMe();

        setUser(userData);
      } catch (error) {
        console.error("Failed to get current user:", error);

        // Token is invalid/expired
        logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // While checking login status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-bold">
            Asset Management System
          </h1>

        </div>

        {/* Logged in user */}
        <div className="font-medium">

          {user ? user.username : "Guest"}

        </div>

      </header>


      {/* Sidebar */}
      {user && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}


      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Main Content */}
      <main className="pt-20 p-6">

        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/" replace />
                : <Login />
            }
          />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              user
                ? <Dashboard />
                : <Navigate to="/login" replace />
            }
          />

          {/* Assets */}
          <Route
            path="/assets"
            element={
              user
                ? <Assets />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/add-asset"
            element={
              user
                ? <AddAsset />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/edit-asset/:id"
            element={
              user
                ? <EditAsset />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/view-asset/:id"
            element={
              user
                ? <View />
                : <Navigate to="/login" replace />
            }
          />


          {/* Employees */}
          <Route
            path="/employees"
            element={
              user
                ? <Employees />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/add-employee"
            element={
              user
                ? <AddEmployee />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/edit-employee/:id"
            element={
              user
                ? <EditEmployees />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/view-employee/:id"
            element={
              user
                ? <ViewEmployees />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/assign-asset/:id"
            element={
              user
                ? <AssignAsset />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/return-asset/:id"
            element={
              user
                ? <ReturnAsset />
                : <Navigate to="/login" replace />
            }
          />

        </Routes>

      </main>

    </div>
  );
}

export default App;