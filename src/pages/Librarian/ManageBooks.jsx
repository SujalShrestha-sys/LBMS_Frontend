import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatsCard from "../../components/Dashboard/StatsCard";
import ManageBooksTable from "../../components/manageBooks/ManageBooksTable";
import { BookOpen, Copy, Layers, Search, BookOpenText } from "lucide-react";
import EditBook from "../../components/manageBooks/EditBook";
import DeleteBook from "../../components/manageBooks/DeleteBook";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
} from "../../services/bookServices.js";

const ManageBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  // Centralized books state
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      setBooks(res.data.allBooks);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Add new book
  const handleAddBookClick = () => {
    setCurrentBook(null);
    setEditing(false);
    setShowAddModal(true);
  };

  // Edit existing book
  const handleEditBookClick = (book) => {
    setCurrentBook(book);
    setEditing(true);
    setShowAddModal(true);
  };

  // Delete book confirmation
  const handleDeleteBookClick = (book) => {
    setCurrentBook(book);
    setShowDeleteModal(true);
  };

  // Confirm delete
  // Delete
  const handleConfirmDelete = async () => {
    try {
      if (currentBook?._id) {
        await deleteBook(currentBook._id);
        fetchBooks();
      }
    } catch (err) {
      console.error("Failed to delete book", err);
    } finally {
      setShowDeleteModal(false);
      setCurrentBook(null);
    }
  };

  // Save book (add or edit)
  const handleSaveBook = async (bookData, editing) => {
    try {
      if (editing && currentBook?._id) {
        await updateBook(currentBook._id, bookData);
        // Update book
      } else {
        await createBook(bookData);
      }
      fetchBooks();
    } catch (error) {
      console.error("failed to save book", error);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading books...</p>;
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        <main className="bg-gray-50 flex-1 overflow-y-auto">
          {/* Header */}
          <section className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Manage Books
              </h2>
              <p className="text-gray-600">
                Add, edit, and organize your library's book collection
              </p>
            </div>
            <div>
              <button
                onClick={handleAddBookClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Add New Book
              </button>
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <StatsCard
              title="Total Books"
              value={books.length}
              subtitle="All books count"
              icon={BookOpen}
              color="bg-blue-100"
            />
            <StatsCard
              title="Available Copies"
              value={books.reduce((sum, b) => sum + Number(b.available || 0), 0)}
              subtitle="Currently in stock"
              icon={Copy}
              color="bg-green-100"
            />
            <StatsCard
              title="Categories"
              value={new Set(books.map((b) => b.genre)).size}
              subtitle="Book genres"
              icon={Layers}
              color="bg-purple-100"
            />
          </div>

          {/* Books List */}
          <section className="rounded-lg p-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
              <div className="flex flex-row items-start flex-start gap-3">
                <BookOpenText size={22} className="text-green-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Books List
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 -ml-[34px]">
                    Browse and manage all books in your library
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-4" />
                  <input
                    type="text"
                    placeholder="Search books, authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="All">All</option>
                  {Array.from(new Set(books.map((b) => b.genre))).map(
                    (genre) =>
                      genre && (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      )
                  )}
                </select>
              </div>
            </div>

            <ManageBooksTable
              books={books}
              searchQuery={searchQuery}
              filter={filter}
              onEditBook={handleEditBookClick}
              onDeleteBook={handleDeleteBookClick}
            />
          </section>
        </main>
      </div>

      {/* Add/Edit Book Modal */}
      <EditBook
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        book={currentBook}
        isEditing={isEditing}
        onSave={handleSaveBook}
      />

      {/* Delete Confirmation */}
      <DeleteBook
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        book={currentBook}
      />
    </>
  );
};

export default ManageBooks;
