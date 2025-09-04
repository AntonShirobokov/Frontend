import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useEffect } from "react";

export const PrivateRoute = () => {
    const { accessToken, refreshToken } = useAuth();
    const [loading, setLoading] = useState(true);

    // Делаем небольшую проверку, пока читаем данные из localStorage
    useEffect(() => {
        // Если есть токен и пользователь в localStorage, считаем, что загрузка закончена
        setLoading(false);
    }, []);

    if (loading) return <></>;

    return accessToken && refreshToken ? <Outlet /> : <Navigate to="/login" />;
};