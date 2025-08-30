import React, { useState } from "react";
import { Heart, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { borrowBook } from "../../services/bookServices";

const BookCard = ({ book, onBorrow }) => {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    try {
      await borrowBook(book._id);
      onBorrow();
    } catch (err) {
      console.error("Error borrowing book:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  const image = book.coverImage?.trim()
    ? book.coverImage
    : "https://via.placeholder.com/150x220.png?text=Book+Cover";

  const isAvailable = book.available > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition p-5 flex flex-col relative group">
      {/* Favorite */}
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 bg-white rounded-full shadow p-2 hover:scale-110 transition z-10"
      >
        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            favorite ? "text-red-500" : "text-gray-400"
          }`}
          fill={favorite ? "currentColor" : "none"}
        />
      </button>

      {/* Image */}
      <div className="w-full h-48 bg-gray-50 rounded-md overflow-hidden mb-4">
        <img
          src={image}
          alt={book.title}
          className="h-full w-full object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Title & Author */}
      <h3 className="font-semibold text-gray-800 text-lg truncate">
        {book.title}
      </h3>
      <p className="text-sm text-gray-500 mb-2">{book.author}</p>

      {/* Genre */}
      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full w-fit mb-2">
        {book.genre}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {book.description || "No description available"}
      </p>

      {/* Info Badges */}
      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        <span className="bg-gray-100 px-2 py-1 rounded-md">
          ISBN: {book.isbn}
        </span>
        <span
          className={`px-2 py-1 rounded-md ${
            isAvailable
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {book.available}/{book.quantity}
        </span>
      </div>

      {/* Availability */}
      <div
        className={`flex items-center gap-1 text-sm font-medium mb-3 ${
          isAvailable ? "text-green-600" : "text-red-500"
        }`}
      >
        {isAvailable ? (
          <>
            <CheckCircle2 className="w-4 h-4" /> Available
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4" /> Unavailable
          </>
        )}
      </div>

      {/* Borrow Button */}
      <button
        onClick={handleBorrow}
        disabled={!isAvailable || loading}
        className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
          isAvailable
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : <BookOpen className="w-4 h-4" />}
        {loading ? "" : "Borrow"}
      </button>
    </div>
  );
};

export default BookCard;
