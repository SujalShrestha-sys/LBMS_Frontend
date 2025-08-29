
import React, { useEffect, useState } from "react";
import {
  fetchAllBorrowerDetails,
  approveRequest,
  rejectRequest,
  sendReminder,
} from "../../services/borrowServices.js";
import { Users } from "lucide-react";
import { returnBookLibrarian } from "../../services/borrower.js";

import StatsCards from "./StatsCards.jsx";
import BorrowerTabs from "./BorrowerTabs.jsx";
import PendingRequestsTable from "./PendingRequestsTable.jsx";
import BorrowHistoryTable from "./BorrowHistoryTable.jsx";

const BorrowerManagement = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch borrower data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchAllBorrowerDetails();
      console.log("All borrower details: ", res);
      setPendingRequests(res.data.pending || []);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("Error fetching borrower details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Action Handlers
  const handleApprove = async (id) => {
    await approveRequest(id);
    loadData();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    loadData();
  };

  const handleReturn = async (id) => {
    await returnBookLibrarian(id);
    loadData();
  };

  const handleReminder = async (id) => {
    await sendReminder(id);
    alert("Reminder email sent!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading borrower data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className=" px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <Users className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Borrower Management
              </h2>
              <p className="text-sm text-gray-500">
                Manage pending requests, track borrowing history, and send
                reminders to borrowers
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards history={history} pendingRequests={pendingRequests} />

        {/* Main Content Card */}
        <div className="bg-white backdrop-blur-sm  rounded-xl  overflow-hidden">
          {/* Tabs */}
          <BorrowerTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingCount={pendingRequests.length}
            historyCount={history.length}
          />

          {/* Content Area */}
          <div className="p-4">
            {activeTab === "pending" && (
              <PendingRequestsTable
                data={pendingRequests}
                actions={{ handleApprove, handleReject }}
              />
            )}

            {activeTab === "history" && (
              <BorrowHistoryTable
                data={history}
                actions={{ handleReturn, handleReminder }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerManagement;
