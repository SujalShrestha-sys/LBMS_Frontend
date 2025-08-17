import React from "react";
import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4  bg-white shadow">
      <input
        type="text"
        placeholder="Search books, authors..."
        className="border rounded-lg px-4 py-1.5 w-1/4 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <span className="font-medium text-gray-700">Librarian</span>
      </div>
    </nav>
  );
};

export default Navbar;

                    