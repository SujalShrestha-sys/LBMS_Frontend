// src/pages/Borrower/ManageBooks.jsx
import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react"; // Icon for heading
import StatsCards from "../../components/BorrowerManagementBooks/StatsCards";
import BookGrid from "../../components/BorrowerManagementBooks/BookGrid";
import { getAllBooks } from "../../services/bookServices";
import SearchBar from "../../components/BorrowerManagementBooks/SearchBar";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all books
  const loadBooks = async () => {
    try {
      setLoading(true);
      const res = await getAllBooks();
      setBooks(res.data.allBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Filter books based on search input
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Explore Books</h2>
        <p className="text-gray-600">Browse our complete library collection.</p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Search */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Book Grid Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          All Books
        </h3>

        {/* Subheading */}
        <p className="text-gray-500 text-sm mb-4">
          Discover books across genres. Click on a book to borrow it instantly!
        </p>

        {/* Loading or No Books Feedback */}
        {loading ? (
          <p className="text-gray-500">Loading books...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books found for your search.</p>
        ) : (
          <BookGrid books={filteredBooks} onBorrow={loadBooks} />
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
