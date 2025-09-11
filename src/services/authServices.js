import axios from "axios";
import api from "./api";

export const signupApi = async (userData) => await api.post("/auth/register", userData);
export const loginApi = async (credentials) => await api.post("/auth/login", credentials);
export const logoutApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}; 