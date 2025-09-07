import api from "./api";

export const getAllStats = () => {
    return api.get("/contact/stats")
}
export const createMessage = (data) => {
    return api.post("/contact/create", data)
}

export const getAllMessages = () => {
    return api.get("/contact/getMessage")
}