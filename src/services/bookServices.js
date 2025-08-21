import api from "./api";

//Fetch all Books 
export const getAllBooks = () => {
    api.get("/books")
}

//Create book
export const createBook = (BookData) => {
    api.post("/books", BookData)
}

//Update Book
export const updateBook = (id, BookData) => {
    api.put(`/books/${id}`, BookData)
}

//Delete Book
export const deleteBook = (id) => {
    api.delete(`/books/${id}`)
}

// Borrower-specific
export const getNewReleases = () => api.get("/books/new");
export const getRecommendedBooks = () => api.get("/books/recommended");

