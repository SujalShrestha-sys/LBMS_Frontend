import React, { useState } from "react";
import { Check, X } from "lucide-react";

export default function PendingRequestsTable() {
  const [requests, setRequests] = useState([
    { id: 1, borrower: "John Doe", book: "The Alchemist", date: "12-Aug-2025" },
    {
      id: 2,
      borrower: "Sam Wilson",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    {
      id: 3,
      borrower: "Brian Lara",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    { id: 4, borrower: "Cameron", book: "The Alchemist", date: "12-Aug-2025" },
    {
      id: 5,
      borrower: "Mark Wook",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
  ]);

  const handleAction = (id, action) => {
    setRequests(requests.filter((req) => req.id !== id));
    console.log(`${action} request ${id}`);
  };

  return (
    <div className="w-full my-10">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Pending Requests
              </h2>
              <p className="text-sm text-gray-500">
                Only pending requests are shown
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Borrower Name
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Book Title
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Request Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium text-center">
                    {req.borrower}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-center">
                    {req.book}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {req.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleAction(req.id, "Approved")}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                      >
                        <Check size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "Rejected")}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Check size={20} />
                      </div>
                      <p className="text-sm font-medium">No pending requests</p>
                      <p className="text-xs">
                        All requests have been processed
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
