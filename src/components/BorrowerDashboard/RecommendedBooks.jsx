// src/components/BorrowerDashboard/RecommendedBooks.jsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getRecommendedBooks } from "../../services/bookServices";

const RecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch recommended books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await getRecommendedBooks();
        console.log("Recommended books: ", res);
        setBooks(res.data.data || []);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const displayedBooks = showAll ? books : books.slice(0, 4);

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-md p-6 w-full max-w-full">
        <p className="text-gray-500">Loading recommendations...</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-md p-6 w-full max-w-full">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-1">
        <Star className="text-yellow-500 w-6 h-6" />
        <h2 className="text-xl font-semibold text-gray-800">
          Recommended for You
        </h2>
      </div>

      {/* Subheading */}
      <p className="text-gray-500 text-sm mb-6">
        Books tailored to your interests and reading history.
      </p>

      {/* Grid Layout */}
      {books.length === 0 ? (
        <p className="text-gray-500 text-sm">No recommendations available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-transform hover:scale-105 flex flex-col"
            >
              <img
                src={book.coverImage || "https://via.placeholder.com/200x300"}
                alt={book.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-gray-800 truncate mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{book.author}</p>
              {book.description && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {book.description}
                </p>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {book.genre || "N/A"}
                </span>
                <span>
                  {book.available}/{book.quantity} available
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View More Button */}
      {books.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default RecommendedBooks;
