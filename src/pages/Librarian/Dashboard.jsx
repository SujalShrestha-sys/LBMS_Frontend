// src/pages/Librarian/Dashboard.jsx
import React from "react";
import StatsCard from "../../components/Dashboard/StatsCard.jsx";
import PendingRequest from "../../components/Dashboard/PendingRequest.jsx";
import ActiveBorrowedBooks from "../../components/Dashboard/ActiveBorrowedBooks.jsx";
import RecentBooks from "../../components/Dashboard/RecentBooks.jsx";
import { Book, Users, BookOpen, TrendingUp, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access the dashboard</div>;
  }
  return (
    <>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Welcome Back <span className="text-blue-600">{user.name}</span>
      </h2>
      <p className="text-gray-600 mb-6">
        View key information and access important features.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Books"
          value="120"
          subtitle="Total books available"
          icon={Book}
          color="bg-blue-200"
        />
        <StatsCard
          title="Currently Borrowed"
          value="30"
          subtitle="Books currently borrowed"
          icon={BookOpen}
          color="bg-green-200"
        />
        <StatsCard
          title="Total Borrowers"
          value="60"
          subtitle="Active borrowers"
          icon={Users}
          color="bg-yellow-200"
        />
        <StatsCard
          title="Total Librarians"
          value="5"
          subtitle="Staff members"
          icon={TrendingUp}
          color="bg-purple-200"
        />
        <StatsCard
          title="Total Borrows"
          value="200"
          subtitle="Total borrows this year"
          icon={Clock}
          color="bg-red-200"
        />
        <StatsCard
          title="Total Available Books"
          value="90"
          subtitle="Books in stock"
          icon={Book}
          color="bg-teal-200"
        />
      </div>

      {/* Pending Requests */}
      <PendingRequest />

      {/* Active Borrowed Books */}
      <ActiveBorrowedBooks />

      {/* Recent Books */}
      <RecentBooks />
    </>
  );
};

export default Dashboard;
