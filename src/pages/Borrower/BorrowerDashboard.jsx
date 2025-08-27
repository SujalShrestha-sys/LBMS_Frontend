// src/pages/Borrower/Dashboard.jsx
import React from "react";
import StatsCards from "../../components/BorrowerDashboard/StatsCards";
import RecommendedBooks from "../../components/BorrowerDashboard/RecommendedBooks";
import RecentBooks from "../../components/Dashboard/RecentBooks";
import BorrowRequestStatus from "../../components/BorrowerDashboard/BorrowRequestStatus";
import { useAuth } from "../../context/AuthContext";

const BorrowerDashboard = () => {
  const { user, loading } = useAuth();
  console.log(user);
  console.log(loading);
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back <span className="text-blue-600">{user.name}</span>
        </h2>
        <p className="text-gray-600 mt-1">
          Here’s an overview of your activity.
        </p>
      </div>

      {/* Stats Section */}
      <StatsCards />

      {/* Recommended Books */}
      <RecommendedBooks />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="w-[1100px]">
          <RecentBooks />
        </div>
        <div className="w-full">
          <BorrowRequestStatus />
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
