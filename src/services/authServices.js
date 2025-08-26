import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api/auth",
});

export const signupApi = (userData) => API.post("/register", userData);
export const loginApi = (credentials) => API.post("/login", credentials);
export const logoutApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}; 