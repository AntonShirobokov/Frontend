import "./Login.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import { jwtDecode } from 'jwt-decode';

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        passwordHash: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", formData);
            console.log("Успех:", response.data);
            console.log("Успех:", jwtDecode(response.data.accessToken));

            login({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }, jwtDecode(response.data.accessToken))

            // localStorage.setItem("accessToken", response.data.accessToken)

            // localStorage.setItem("refreshToken", response.data.refreshToken)
            setErrorMessage("")
            navigate("/")
        } catch (error) {
            setErrorMessage(error.response.data.message)
            if (error.response) {
                console.error("Ошибка от сервера:", error.response.data);
            } else {
                console.error("Ошибка сети:", error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Вход</h2>

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
                    name="passwordHash"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                    required
                />

                {errorMessage && <span className="error-text">{errorMessage}</span>}

                <button type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;