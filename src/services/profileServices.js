import api from "./api";

// ✅ Get profile (from backend)
export const getLibrarianProfile = async () => {
    const res = await api.get("/admin/me");
    return res.data;
};

export const getBorrowerProfile = async () => {
    const res = await api.get("/borrower/me");
    return res.data;
};

// ✅ Update profile
export const updateLibrarianProfile = async (profileData) => {
    const res = await api.put("/admin/updateProfile", profileData);
    return res.data;
};

export const updateBorrowerProfile = async (profileData) => {
    const res = await api.put("/borrower/updateProfile", profileData);
    return res.data;
};