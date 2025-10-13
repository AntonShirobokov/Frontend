import "./Login.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const from = location.state?.from || "/";
    const message = location.state?.message || "";


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Отправка данных на вход:", formData);
            const response = await axios.post("http://localhost:8080/auth/api/login", formData);
            console.log("Успех:", response.data);
            console.log("Данные:", jwtDecode(response.data.accessToken));
            console.log(from);
            console.log(message);

            login({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }, jwtDecode(response.data.accessToken))
            setErrorMessage("")
            navigate(from, { replace: true });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Ошибка сети");
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Вход</h2>

                {message && <div className="info-text">{message}</div>}

                <label htmlFor="email">Электронная почта</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите email"
                    required
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                    required
                />

                {errorMessage && <span className="error-text">{errorMessage}</span>}

                <button type="submit">Войти</button>
                <button type="button" onClick={() => { navigate("/registration") }}>Зарегестрироваться</button>
            </form>
        </div>
    );
}

export default Login;