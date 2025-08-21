// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Home, Book, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold mb-6">BookHive</h1>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <Home size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/manage-books"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <Book size={18} /> Manage Books
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <User size={18} /> Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
