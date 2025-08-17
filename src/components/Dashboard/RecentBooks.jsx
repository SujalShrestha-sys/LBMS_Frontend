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
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-600 text-xs font-medium">out of stock</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 text-xs font-medium">
            {book.available} available
          </span>
        </div>
      );
    }
  };

  const getCategoryStyle = (category) => {
    const styles = {
      Business: "bg-blue-50 text-blue-700 border border-blue-200",
      Programming: "bg-purple-50 text-purple-700 border border-purple-200",
      Drama: "bg-pink-50 text-pink-700 border border-pink-200",
      Technology: "bg-green-50 text-green-700 border border-green-200",
      "Web Dev": "bg-orange-50 text-orange-700 border border-orange-200",
    };
    return (
      styles[category] || "bg-gray-50 text-gray-700 border border-gray-200"
    );
  };

  return (
    <div className="w-1/2 my-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Books
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Latest additions to your collection
          </p>
        </div>

        {/* Books List */}
        <div className="p-4 space-y-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="px-4 py-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Book info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Book className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base group-hover:text-blue-700 transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Right side - Status and Category */}
                <div className="flex flex-col items-end gap-2">
                  {/* Status */}
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {getStatusDisplay(book)}
                  </div>

                  {/* Category */}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md shadow-sm group-hover:shadow-md transition-all duration-300 ${getCategoryStyle(
                      book.category
                    )}`}
                  >
                    {book.category}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {books.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Book size={24} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium">No recent books</p>
                <p className="text-xs text-gray-400">
                  Books will appear here when added
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentBooks;
