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

export const replyToMessage = (id, reply) => {
   return api.put(`/contact/reply/${id}`, { reply })
}

export const markResolved = (id) => {
   return api.put(`/contact/resolve/${id}`)
}