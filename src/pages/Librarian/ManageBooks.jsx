import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatsCard from "../../components/Dashboard/StatsCard";
import ManageBooksTable from "../../components/manageBooks/ManageBooksTable";
import { BookOpen, Copy, Layers, Search, BookOpenText } from "lucide-react";
import EditBook from "../../components/manageBooks/EditBook";
import DeleteBook from "../../components/manageBooks/DeleteBook";

const ManageBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ Books state is here now
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Data Science Handbook",
      author: "John Smith",
      category: "Technology",
      publisher: "Web Publishers",
      isbn: "111-222-333",
      available: 8,
    },
    {
      id: 2,
      title: "Modern Web Development",
      author: "Jane Doe",
      category: "Business",
      publisher: "React Process",
      isbn: "222-333-444",
      available: 5,
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      author: "John Smith",
      category: "Horror",
      publisher: "AI Books",
      isbn: "333-444-555",
      available: 2,
    },
  ]);

  const handleAddBookClick = () => {
    setCurrentBook(null);
    setEditing(false);
    setShowAddModal(true);
  };

  const handleEditBookClick = (book) => {
    setCurrentBook(book);
    setEditing(true);
    setShowAddModal(true);
  };

  const handleDeleteBookClick = (book) => {
    setCurrentBook(book);
    setShowDeleteModal(true);
  };

  // ✅ Confirm delete actually updates state
  const handleConfirmDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== currentBook?.id));
    setShowDeleteModal(false);
    setCurrentBook(null);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
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
                value={books.reduce((acc, b) => acc + b.available, 0)}
                subtitle="Currently in stock"
                icon={Copy}
                color="bg-green-100"
              />
              <StatsCard
                title="Categories"
                value={new Set(books.map((b) => b.category)).size}
                subtitle="Book categories"
                icon={Layers}
                color="bg-purple-100"
              />
            </div>

            {/* Table Section */}
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
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Programming">Programming</option>
                    <option value="Horror">Horror</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <ManageBooksTable
                books={books} // ✅ pass books down
                searchQuery={searchQuery}
                filter={filter}
                onEditBook={handleEditBookClick}
                onDeleteBook={handleDeleteBookClick}
              />
            </section>
          </main>
        </div>
      </div>

      {/* Edit Book Modal */}
      <EditBook
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        book={currentBook}
        isEditing={isEditing}
      />

      {/* Delete Book Modal */}
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
