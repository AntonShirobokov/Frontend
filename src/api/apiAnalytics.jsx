import axios from "axios";


const apiAnalytics = axios.create(
    {
        baseURL: "http://localhost:8080/analytics",
    });

export default apiAnalytics;