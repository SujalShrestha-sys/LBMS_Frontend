import React from "react";
import { Book } from "lucide-react";

const RecentBooks = () => {
  const books = [
    {
      id: 1,
      title: "The Data Science Handbook",
      author: "John Smith",
      category: "Business",
      available: 2,
      status: "available",
    },
    {
      id: 2,
      title: "Modern Web Development",
      author: "Bob Wilson",
      category: "Programming",
      available: 3,
      status: "available",
    },
    {
      id: 3,
      title: "The last dance of 2025",
      author: "Mathew Wade",
      category: "Drama",
      available: 0,
      status: "out_of_stock",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      author: "Mark Karl",
      category: "Technology",
      available: 4,
      status: "available",
    },
    {
      id: 5,
      title: "React Complete Guide",
      author: "Saniya Tiwari",
      category: "Web Dev",
      available: 2,
      status: "available",
    },
  ];

  const getStatusDisplay = (book) => {
    if (book.status === "out_of_stock") {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-600 text-xs font-medium">Out of stock</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-green-600 text-xs font-medium">
          {book.available} available
        </span>
      </div>
    );
  };

  const getCategoryStyle = (category) => {
    const styles = {
      Business: "bg-blue-100 text-blue-700",
      Programming: "bg-purple-100 text-purple-700",
      Drama: "bg-pink-100 text-pink-700",
      Technology: "bg-green-100 text-green-700",
      "Web Dev": "bg-orange-100 text-orange-700",
    };
    return styles[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-1/2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Book className="w-5 h-5 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Recent Books</h2>
              <p className="text-sm text-gray-500">Latest additions to your collection</p>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="p-4 space-y-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="px-4 py-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Book info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{book.title}</h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </div>

                {/* Status and Category */}
                <div className="flex flex-col items-end gap-2">
                  {getStatusDisplay(book)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryStyle(book.category)}`}>
                    {book.category}
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