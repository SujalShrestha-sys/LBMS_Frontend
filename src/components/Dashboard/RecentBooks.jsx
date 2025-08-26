import React, { useEffect, useState } from "react";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNewReleases } from "../../services/bookServices";

const RecentBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await getNewReleases();
        setBooks(res.data.data || []);
      } catch (err) {
        console.error("Error fetching recent books:", err);
      }
    };
    fetchRecent();
  }, []);

  const getStatusDisplay = (book) =>
    book.available === 0 ? (
      <span className="text-red-600 text-xs font-medium">Out of stock</span>
    ) : (
      <span className="text-green-600 text-xs font-medium">
        {book.available} available
      </span>
    );

  const getCategoryStyle = (genre) => {
    const styles = {
      Business: "bg-blue-100 text-blue-700",
      Programming: "bg-purple-100 text-purple-700",
      Drama: "bg-pink-100 text-pink-700",
      Technology: "bg-green-100 text-green-700",
      Financial: "bg-orange-100 text-orange-700",
    };
    return styles[genre] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-1/2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Books
            </h2>
          </div>
          <button
            onClick={() => navigate("/manage-books")}
            className="text-blue-600 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {/* Books List */}
        <div className="p-4 space-y-3">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => navigate("/manage-books")}
              className="px-4 py-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Cover Image or Icon */}
                <div className="flex items-center gap-3">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded-md border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200">
                      <Book className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </div>

                {/* Status & Genre */}
                <div className="flex flex-col items-end gap-1">
                  {getStatusDisplay(book)}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryStyle(
                      book.genre
                    )}`}
                  >
                    {book.genre || "General"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {books.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Book size={20} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium">No recent books</p>
                <p className="text-xs">Books will appear here when added</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentBooks;
