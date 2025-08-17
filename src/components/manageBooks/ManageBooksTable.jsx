import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const ManageBooksTable = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Dummy book data
  useEffect(() => {
    const fetchBooks = () => {
      return [
        {
          id: 1,
          title: "The Data Science Handbook",
          author: "John Smith",
          category: "Technology",
          publisher: "Web Publishers",
          available: 8,
        },
        {
          id: 2,
          title: "Modern Web Development",
          author: "Jane Doe",
          category: "Business",
          publisher: "React Process",
          available: 5,
        },
        {
          id: 3,
          title: "Machine Learning Basics",
          author: "John Smith",
          category: "Horror",
          publisher: "AI Books",
          available: 0,
        },
        {
          id: 4,
          title: "React Complete Guide",
          author: "Robert Miles",
          category: "Programming",
          publisher: "Bubble Productions",
          available: 3,
        },
        {
          id: 5,
          title: "Learning JavaScript",
          author: "Alice Brown",
          category: "Programming",
          publisher: "Tech Books",
          available: 7,
        },
        {
          id: 6,
          title: "The Art of Design",
          author: "Emily White",
          category: "Design",
          publisher: "Creative Press",
          available: 4,
        },
      ];
    };

    setBooks(fetchBooks());
  }, []);

  // Filtering logic
  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(results);
    setCurrentPage(1); // reset to first page after search
  }, [searchQuery, books]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
      <div role="region" aria-label="Books list">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 text-sm tracking-wider">
              <th scope="col" className="px-6 py-4 font-semibold">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Author
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Category
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Publisher
              </th>
              <th scope="col" className="px-6 py-4 text-center font-semibold">
                Availability
              </th>
              <th scope="col" className="px-6 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedBooks.map((book, idx) => (
              <tr
                key={book.id}
                className={`hover:bg-gray-50 hover:shadow-sm cursor-pointer transition duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {book.title}
                </td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">{book.publisher}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available > 0
                      ? `${book.available} Available`
                      : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex items-center justify-center space-x-2">
                  <button
                    aria-label={`View ${book.title}`}
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    aria-label={`Edit ${book.title}`}
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:scale-105 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    aria-label={`Delete ${book.title}`}
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No matching books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-50 rounded-b-2xl">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages || 1}
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 text-sm rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-sm rounded-lg ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 text-sm rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBooksTable;
