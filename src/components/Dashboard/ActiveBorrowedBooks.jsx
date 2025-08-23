import React from "react";
import { BookOpenCheck } from "lucide-react";

const ActiveBorrowedBooks = () => {
  const borrowed = [
    {
      id: 1,
      borrower: "Mike Ross",
      book: "Atomic Habits",
      borrowDate: "02-Aug-2025",
      dueDate: "02-Aug-2025",
    },
    {
      id: 2,
      borrower: "Emily Clark",
      book: "Deep Work",
      borrowDate: "02-Aug-2025",
      dueDate: "02-Aug-2025",
    },
    {
      id: 3,
      borrower: "Emily Clark",
      book: "Deep Work",
      borrowDate: "02-Aug-2025",
      dueDate: "02-Aug-2025",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="w-5 h-5 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Active Borrowed Books
              </h2>
              <p className="text-sm text-gray-500">
                Books currently being borrowed
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
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowed.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-semibold text-xs">
                          {b.borrower
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {b.borrower}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 text-center">
                    {b.book}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-blue-700">
                        {b.borrowDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-medium text-red-700">
                        {b.dueDate}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {borrowed.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <BookOpenCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          No active borrowed books
                        </p>
                        <p className="text-xs mt-1">
                          Borrowed books will appear here
                        </p>
                      </div>
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
};

export default ActiveBorrowedBooks;
