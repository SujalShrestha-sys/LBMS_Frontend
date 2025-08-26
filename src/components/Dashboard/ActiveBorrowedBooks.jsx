// components/Dashboard/ActiveBorrowedBooks.jsx
import React, { useEffect, useState } from "react";
import { BookOpenCheck } from "lucide-react";
import api from "../../services/api";
import { quickBorrowedList } from "../../services/borrowServices";

const ActiveBorrowedBooks = () => {
  const [borrowed, setBorrowed] = useState([]);

  const fetchBorrowed = async () => {
    try {
      const res = await quickBorrowedList();
      console.log("Quick borrowed: ", res);
      const active = res.data.records.filter(
        (r) => !r.isReturned && r.status === "Approved"
      );
      setBorrowed(active);
    } catch (err) {
      console.error("Error fetching borrowed books", err);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="w-5 h-5 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Active Borrowed Books
              </h2>
              <p className="text-sm text-gray-500">
                Book's borrowed by the user
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
                  Borrower
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Book
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600 text-center">
                  Genre
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
                <tr key={b._id} className=" hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800 text-center">
                    {b.user?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 text-center">
                    {b.user?.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-center">
                    {b.book?.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-center">
                    {b.book?.genre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {new Date(b.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {new Date(b.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {borrowed.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No active borrowed books
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
