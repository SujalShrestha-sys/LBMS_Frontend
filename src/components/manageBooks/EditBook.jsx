import React, { useState, useEffect } from "react";

const EditBook = ({ isOpen, onClose, book, isEditing }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    quantity: "",
    category: "",
    description: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (isEditing && book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        quantity: book.available || "",
        category: book.category || "",
        description: book.description || "",
      });
    } else {
      // Reset for adding new book
      setFormData({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        quantity: "",
        category: "",
        description: "",
      });
    }
  }, [isEditing, book, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      console.log("Updating book:", formData);
    } else {
      console.log("Adding new book:", formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] h-[750px] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditing
              ? "Update the book details below."
              : "Fill in the details to add a new book."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Section: Basic Info */}
          <h3 className="text-sm font-semibold text-gray-700">
            Basic Information
          </h3>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Author*</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">ISBN*</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Section: Publication Details */}
          <h3 className="text-sm font-semibold text-gray-700 mt-4">
            Publication Details
          </h3>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Publisher*
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Books quantity*
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Categories*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select categories</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Programming">Programming</option>
              <option value="Horror">Horror</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (Optional)"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
