import { NavLink } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  User,
  UserCog,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-8 flex items-center justify-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-600" />
        BookHive
      </h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/librarian/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/librarian/manageBooks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
            }
          >
            <BookOpen size={18} /> Manage Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/librarian/borrowed"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
            }
          >
            <ClipboardList size={18} /> Borrowed Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/librarian/my-books"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
            }
          >
            <User size={18} /> My Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/librarian/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
            }
          >
            <UserCog size={18} /> Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
