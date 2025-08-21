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
        <div className="bg-white px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Active Borrowed Books
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Books currently being borrowed
          </p>
        </div>

        {/*Table */}
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                  Borrower Name
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                  Book Title
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                  Borrow Date
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowed.map((b, index) => (
                <tr
                  key={b.id}
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/50 hover:shadow-sm transition-all duration-300 group ${
                    index === borrowed.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-green-700 font-semibold text-xs">
                          {b.borrower
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                        {b.borrower}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300">
                    {b.book}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-blue-700">
                        {b.borrowDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-red-700">
                        {b.dueDate}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {borrowed.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-sm">
                        <BookOpenCheck size={22} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          No active borrowed books
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
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
