import React, { useState } from "react";
import { Star } from "lucide-react";

const sampleBooks = [
  {
    id: 1,
    title: "The Legend Of 1900",
    author: "Mark Wood",
    cover: "https://picsum.photos/id/1015/200/300",
  },
  {
    id: 2,
    title: "The Greatest Show of 2nd Century",
    author: "Dale Phillips",
    cover: "https://picsum.photos/id/1025/200/300",
  },
  {
    id: 3,
    title: "The Maze Runner",
    author: "Mr. SunserBerk",
    cover: "https://picsum.photos/id/1035/200/300",
  },
  {
    id: 4,
    title: "Into The Wild",
    author: "Jon Krakauer",
    cover: "https://picsum.photos/id/1045/200/300",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://picsum.photos/id/1055/200/300",
  },
  {
    id: 6,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "https://picsum.photos/id/1065/200/300",
  },
];

const RecommendedBooks = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedBooks = showAll ? sampleBooks : sampleBooks.slice(0, 4);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-transform hover:scale-105"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h3 className="font-medium text-gray-800 truncate">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {sampleBooks.length > 4 && (
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
