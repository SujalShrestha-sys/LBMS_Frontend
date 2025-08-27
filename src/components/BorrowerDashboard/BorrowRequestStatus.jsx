import React from "react";
import { ListChecks } from "lucide-react";

const sampleRequests = [
  {
    id: 1,
    title: "React Complete Essentials",
    date: "10-Aug-2025",
    status: "Pending",
  },
  {
    id: 2,
    title: "Java Backend Mastery",
    date: "12-Aug-2025",
    status: "Borrowed",
  },
  {
    id: 3,
    title: "Advanced Node.js Guide",
    date: "14-Aug-2025",
    status: "Pending",
  },
];

const BorrowRequestStatus = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-1">
        <ListChecks className="text-green-600 w-6 h-6" />
        <h2 className="text-xl font-semibold text-gray-800">
          Borrow Request Status
        </h2>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        Monitor your recent book requests and their status.
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="px-6 py-4 font-semibold">Book Title</th>
              <th className="px-6 py-4 font-semibold">Request Date</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleRequests.map((req, index) => (
              <tr
                key={req.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="px-6 py-4 text-gray-800">{req.title}</td>
                <td className="px-6 py-4 text-gray-600">{req.date}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BorrowRequestStatus;
