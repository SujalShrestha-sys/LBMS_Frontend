import React from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto scrollbar-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
