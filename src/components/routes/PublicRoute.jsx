import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useEffect } from "react";

export const PublicRoute = () => {
    const { accessToken, refreshToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <></>;

    // Если пользователь уже авторизован — редиректим на профиль
    return accessToken && refreshToken ? <Navigate to="/" /> : <Outlet />;
};