import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg hover:bg-indigo-700"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-4 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">Management</h2>

          <button
            onClick={closeSidebar}
            className="hover:text-red-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-6 space-y-3">

          <Link
            to="/"
            onClick={closeSidebar}
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/assets"
            onClick={closeSidebar}
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            📦 Assets
          </Link>

          <Link
            to="/employees"
            onClick={closeSidebar}
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            👨‍💼 Employees
          </Link>

          <Link
            to="/add-asset"
            onClick={closeSidebar}
            className="block px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            ➕ Add Asset
          </Link>

          <Link
            to="/add-employee"
            onClick={closeSidebar}
            className="block px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
          >
            ➕ Add Employee
          </Link>
        </nav>

        {/* Bottom Profile */}
        <div className="border-t border-gray-700 pt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
            A
          </div>

          <div>
            <p className="font-semibold">Aditya</p>
            <p className="text-sm text-gray-400">
              Administrator
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;