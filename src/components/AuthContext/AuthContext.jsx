import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        accessToken: null,
        refreshToken: null,
        user: null
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        const refresh = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user")

        if (access && refresh) {
            setAuth({
                accessToken: access,
                refreshToken: refresh,
                user: JSON.parse(user)
            });
        }
        setLoading(false);
    }, []);


    const login = (tokens, userData) => {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData))
        setAuth({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: userData
        });
    };


    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setAuth({
            accessToken: null,
            refreshToken: null,
            user: null
        });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}