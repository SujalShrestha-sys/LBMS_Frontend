import api from "./api";

export const getBorrowerStats = () => {
    return api.get("/borrower/stats");
}