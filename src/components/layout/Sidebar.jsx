import { NavLink } from "react-router-dom";
import { Home, Book, User } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/manage-books", icon: Book, label: "Manage Books" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold mb-6">BookHive</h1>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
