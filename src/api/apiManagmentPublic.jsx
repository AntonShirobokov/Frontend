import axios from "axios";

const apiManagementPublic = axios.create({
    baseURL: `${import.meta.env.VITE_API_GATEWAY_BASEURL}`,
});

export default apiManagementPublic;