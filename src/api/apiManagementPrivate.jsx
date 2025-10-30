import axios from "axios";
import { useAuth } from "../components/AuthContext/AuthContext";

const apiManagementPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_API_GATEWAY_BASEURL}`,
});

apiManagementPrivate.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


apiManagementPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(`${import.meta.env.VITE_API_GATEWAY_BASEURL}/auth/api/refresh`, {
                    refreshToken,
                });

                const { accessToken: newAccessToken } = response.data;
                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiManagementPrivate(originalRequest);
            } catch (err) {
                //Действия в случае если refresh токен просрочен
                console.error("Ошибка обновления токена:", err);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiManagementPrivate;