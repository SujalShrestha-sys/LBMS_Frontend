import React, { useEffect, useState } from "react";
import {
  fetchAllBorrowerDetails,
  approveRequest,
  rejectRequest,
  returnBook,
  sendReminder,
} from "../../services/borrowService.js";

const BorrowerManagement = () => {
  const [stats, setStats] = useState({});
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchAllBorrowerDetails();
      setStats(res.data.stats || {});
      setPending(res.data.pending || []);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("Failed to fetch borrower data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await approveRequest(id);
    loadData(); // refresh instantly
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    loadData();
  };

  const handleReturn = async (id) => {
    await returnBook(id);
    loadData();
  };

  const handleReminder = async (id) => {
    await sendReminder(id);
    alert("Reminder email sent!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Borrower Management</h1>

      {/* === Stats Cards === */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Total Members</p>
          <p className="text-2xl font-bold">{stats.totalMembers || 0}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Active Borrowers</p>
          <p className="text-2xl font-bold">{stats.activeBorrowers || 0}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Pending Requests</p>
          <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Overdue Books</p>
          <p className="text-2xl font-bold">{stats.overdueBooks || 0}</p>
        </div>
      </div>

      {/* === Pending Requests Table === */}
      <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
      <table className="w-full border-collapse bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Borrower</th>
            <th className="p-3">Book</th>
            <th className="p-3">Request Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pending.length > 0 ? (
            pending.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="p-3">{req.user?.name}</td>
                <td className="p-3">{req.book?.title}</td>
                <td className="p-3">
                  {new Date(req.borrowDate).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3" colSpan="4">
                No pending requests
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === Books Status Table === */}
      <h2 className="text-lg font-semibold mt-6 mb-2">Books Status</h2>
      <table className="w-full border-collapse bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Borrower</th>
            <th className="p-3">Book</th>
            <th className="p-3">Borrow Date</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.user?.name}</td>
                <td className="p-3">{item.book?.title}</td>
                <td className="p-3">
                  {new Date(item.borrowDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      item.status === "Approved"
                        ? "bg-blue-100 text-blue-600"
                        : item.status === "Returned"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  {item.status === "Approved" && (
                    <>
                      <button
                        onClick={() => handleReturn(item._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                      >
                        Return Book
                      </button>
                      {item.dueDate && new Date(item.dueDate) < new Date() && (
                        <button
                          onClick={() => handleReminder(item._id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded-lg"
                        >
                          Send Reminder
                        </button>
                      )}
                    </>
                  )}
                  {item.status === "Returned" && (
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Returned
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3" colSpan="6">
                No borrow records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowerManagement;
