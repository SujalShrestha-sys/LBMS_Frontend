// src/pages/Borrower/MyBooks.jsx
import React, { useState } from "react";
import StatsCards from "./StatsCards";
import MyBooksTable from "./MyBooksTable";

const MyBooks = () => {
  const [search, setSearch] = useState("");

  // Dummy data for now (replace later with API)
  const books = [
    {
      id: 1,
      title: "Javascript Mastery",
      author: "John Doe",
      borrowDate: "2025-01-20",
      returnDate: null,
      status: "Borrowed",
    },
    {
      id: 2,
      title: "Python Mastery",
      author: "John Doe",
      borrowDate: "2023-01-20",
      returnDate: null,
      status: "Borrowed",
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      author: "Jane Smith",
      borrowDate: "2025-05-20",
      returnDate: "2025-08-20",
      status: "Returned",
    },
    {
      id: 4,
      title: "Web Design Fundamentals",
      author: "Tom Wilson",
      borrowDate: "2025-06-18",
      returnDate: "2025-07-18",
      status: "Returned",
    },
    {
      id: 5,
      title: "Database Design",
      author: "John Doe",
      borrowDate: "2025-12-20",
      returnDate: null,
      status: "Overdue",
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Books</h2>
        <p className="text-gray-600">
          Track your reading progress and manage borrowed books
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Table */}
      <MyBooksTable books={filteredBooks} />
    </div>
  );
};

export default MyBooks;
