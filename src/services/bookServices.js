import api from "./api";

//Fetch all Books 
export const getAllBooks = () => {
    return api.get("/books")
}

//getMyBooks
export const getMyBooks = () => {
    return api.get("/borrower/myBooks")
}

//Create book
export const createBook = (BookData) => {
    return api.post("/books", BookData)
}

//Update Book
export const updateBook = (id, BookData) => {
    return api.put(`/books/${id}`, BookData)
}

//Delete Book
export const deleteBook = (id) => {
    return api.delete(`/books/${id}`)
}

// Borrower-specific
export const getNewReleases = () => {
    return api.get("/books/new");
}
export const getRecommendedBooks = () => {
    return api.get("/books/recommended");
}

export const borrowBook = (bookId) => {
    return api.post(`/borrow/${bookId}`)
}
