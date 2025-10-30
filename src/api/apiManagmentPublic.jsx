import axios from "axios";

const apiManagementPublic = axios.create({
    baseURL: "http://localhost:8080",
});

export default apiManagementPublic;