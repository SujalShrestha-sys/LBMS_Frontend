import api from "./api";

export const getLibrarianProfile = () => api.get("/admin/me");
export const getBorrowerProfile = () => api.get("/borrower/me");

export const updateLibrarianProfile = (profileData) => {
    api.put("/admin/updateProfile", profileData);
}

export const updateBorrowerProfile = (profileData) => {
    api.put("/borrower/updateProfile", profileData);
}

export const librarianStats = () => {
    return api.get("/admin/stats")
}