// src/components/MyBooks/MyBooksTable.jsx
import React, { useState } from "react";
import { RotateCcw, CornerUpLeft, Search, Filter } from "lucide-react";

// SearchBar Component
const SearchBar = ({ search, setSearch, status, setStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books, authors..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="All">All</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Returned">Returned</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};

// Main Table Component
const MyBooksTable = () => {
  const allBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-20",
      returnDate: "2025-09-05",
      status: "Borrowed",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-18",
      returnDate: "2025-09-02",
      status: "Overdue",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-10",
      returnDate: "2025-08-25",
      status: "Returned",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-15",
      returnDate: "2025-08-30",
      status: "Borrowed",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-12",
      returnDate: "2025-08-28",
      status: "Overdue",
    },
    {
      id: 6,
      title: "Moby Dick",
      author: "Herman Melville",
      coverImage: "/images/default-book.png",
      borrowedDate: "2025-08-05",
      returnDate: "2025-08-20",
      status: "Returned",
    },
  ];

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || book.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
      {/* Search & Filter */}
      <SearchBar
        search={search}
        setSearch={handleSearchChange}
        status={status}
        setStatus={handleStatusChange}
      />

      {/* Table */}
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 text-base tracking-wide">
            <th className="px-6 py-4 font-semibold">Book</th>
            <th className="px-6 py-4 font-semibold">Borrowed</th>
            <th className="px-6 py-4 font-semibold">Return</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {currentBooks.length > 0 ? (
            currentBooks.map((book, index) => (
              <tr
                key={book.id}
                className={`hover:shadow-md transition duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-12 h-16 rounded-md object-cover border border-gray-200 shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-base">
                      {book.title}
                    </p>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{book.borrowedDate}</td>
                <td className="px-4 py-3 text-gray-700">{book.returnDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold border ${
                      book.status === "Returned"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : book.status === "Overdue"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105 transition">
                      <RotateCcw size={16} /> Renew
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105 transition">
                      <CornerUpLeft size={16} /> Return
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No matching books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredBooks.length > 0 && (
        <div className="flex justify-between items-center mt-4 px-6 py-2 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooksTable;
