import React, { useState } from "react";
import { Check, X } from "lucide-react";

export default function PendingRequestsTable() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      borrower: "John Doe",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    {
      id: 2,
      borrower: "sam wilson",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    {
      id: 3,
      borrower: "Brian lara",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    {
      id: 4,
      borrower: "Cameron",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
    {
      id: 5,
      borrower: "Mark Wook",
      book: "The Alchemist",
      date: "12-Aug-2025",
    },
  ]);

  const handleApprove = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    console.log(`Approved request ${id}`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    console.log(`Rejected request ${id}`);
  };

  return (
    <div className="w-full my-10" >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Requests
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Only pending requests are shown
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                  Borrower Name
                </th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                  Book Title
                </th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                  Request Date
                </th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr
                  key={req.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === requests.length - 1 ? "border-b-0" : ""
                  }`}
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
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                      >
                        <Check size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
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
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Check size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">No pending requests</p>
                      <p className="text-xs text-gray-400">
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
