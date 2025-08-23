import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api/auth",
});


// Signup
export const signupApi = (userData) => API.post("/register", userData);

// Login
export const loginApi = (credentials) => API.post("/login", credentials);

//logout
export const logoutApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
