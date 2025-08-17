import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import StatsCard from "../../components/Dashboard/StatsCard.jsx";
import PendingRequest from "../../components/Dashboard/PendingRequest.jsx";
import ActiveBorrowedBooks from "../../components/Dashboard/ActiveBorrowedBooks.jsx";
import RecentBooks from "../../components/Dashboard/RecentBooks.jsx";
import { Book, Users, BookOpen, TrendingUp, Clock } from "lucide-react"; // Import icons

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back Admin</h2>
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
          color="bg-blue-200" // Light pastel blue
        />
        <StatsCard 
          title="Currently Borrowed" 
          value="30" 
          subtitle="Books currently borrowed" 
          icon={BookOpen} 
          color="bg-green-200" // Light pastel green
        />
        <StatsCard 
          title="Total Borrowers" 
          value="60" 
          subtitle="Active borrowers" 
          icon={Users} 
          color="bg-yellow-200" // Light pastel yellow
        />
        <StatsCard 
          title="Total Librarians" 
          value="5" 
          subtitle="Staff members" 
          icon={TrendingUp} 
          color="bg-purple-200" // Light pastel purple
        />
        <StatsCard 
          title="Total Borrows" 
          value="200" 
          subtitle="Total borrows this year" 
          icon={Clock} 
          color="bg-red-200" // Light pastel red
        />
        <StatsCard 
          title="Total Available Books" 
          value="90" 
          subtitle="Books in stock" 
          icon={Book} 
          color="bg-teal-200" // Light pastel teal
        />
      </div>

      {/* Pending Requests */}
      <PendingRequest />
      {/* Active Borrowed Books */}
      <ActiveBorrowedBooks />

      {/* Recent Books */}
      <RecentBooks />
    </DashboardLayout>
  );
};

export default Dashboard;