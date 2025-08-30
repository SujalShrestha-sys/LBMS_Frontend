import React, { useEffect, useState } from "react";
import { ClipboardList, Zap } from "lucide-react";
import PendingRequestsTable from "../borrowers/PendingRequestsTable";
import {
  fetchAllBorrowerDetails,
  approveRequest,
  rejectRequest,
} from "../../services/borrowServices";

const QuickPendingRequest = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchAllBorrowerDetails();
      setPendingRequests(res.data.pending || []);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    await approveRequest(id);
    loadData();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    loadData();
  };

  if (loading) {
    return <p className="text-center py-4">Loading pending requests...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Header with Icon + Title + Subheading */}
      <div className="flex items-start gap-2 mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <ClipboardList className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Quick Pending Requests
          </h3>
          <p className="text-sm text-gray-500">
            Quick access to the most recent borrower requests
          </p>
        </div>
      </div>

      {/* Table Preview */}
      <PendingRequestsTable
        data={pendingRequests.slice(0, 3)}
        actions={{ handleApprove, handleReject }}
      />
    </div>
  );
};

export default QuickPendingRequest;
