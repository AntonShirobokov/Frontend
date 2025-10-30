import axios from "axios";


const apiAnalytics = axios.create(
    {
        baseURL: `${import.meta.env.VITE_API_GATEWAY_BASEURL}/analytics`,
    });

export default apiAnalytics;