import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api/auth", // adjust if backend runs on a different port
});

// Signup
export const signup = (userData) => API.post("/register", userData);

// Login
export const login = (credentials) => API.post("/login", credentials);

//logout
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}
