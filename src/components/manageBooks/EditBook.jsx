import React, { useState, useEffect } from "react";

const EditBook = ({ isOpen, onClose, book, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    quantity: "",
    available: "",
    genre: "",
    description: "",
    publishedYear: "",
    coverImage: "",
  });
  const [coverImage, setCoverImage] = useState();

  // Prefill form when editing
  useEffect(() => {
    if (isEditing && book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        quantity: book.quantity || "",
        available: book.available != undefined ? book.available : "",
        genre: book.genre || "",
        description: book.description || "",
        publishedYear: book.publishedYear || "",
        coverImage: book.coverImage || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        quantity: "",
        available: "",
        genre: "",
        description: "",
        publishedYear: "",
        coverImage: "",
      });
    }
  }, [isEditing, book, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData to send files if any
    const bookData = new FormData();

    const payload = {
      ...formData,
      quantity: formData.quantity ? Number(formData.quantity) : 0,
      available: formData.available
        ? Number(formData.available)
        : formData.quantity
        ? Number(formData.quantity)
        : 0, // default available = quantity if empty
    };

    // Append all fields to FormData
    Object.entries(payload).forEach(([key, value]) => {
      bookData.append(key, value);
    });

    if (coverImage) {
      bookData.append("coverImage", coverImage);
    }

    // Call the save function
    onSave(bookData, isEditing);
  };

  return (
    <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-xs flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing
              ? "Update book details"
              : "Add a new book to your library"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Author & ISBN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN *
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Publisher & Genre */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Genre</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Programming">Programming</option>
                <option value="Horror">Horror</option>
                <option value="Design">Design</option>
                <option value="Financial">Financial</option>
                <option value="Lifestyle & Habits">Lifestyle & Habits</option>
              </select>
            </div>
          </div>

          {/* Quantity & Available */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available
              </label>
              <input
                type="number"
                name="available"
                value={formData.available}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Published Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Optional description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
