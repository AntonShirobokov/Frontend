import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


export const PublicRoute = () => {
    const { accessToken, refreshToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <></>;

    if (accessToken && refreshToken) {
        const redirectTo = location.state?.from || "/";
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};