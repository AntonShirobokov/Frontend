import { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Данные регистрации:", formData);

        try {
            await axios.post(`${import.meta.env.VITE_API_GATEWAY_BASEURL}/auth/api/registration`, formData);
            console.log("Успешная регистрация");
            navigate("/");
        } catch (error) {
            console.error("Ошибка:", error.response?.data);

            if (error.response) {
                if (error.response.status === 400) {
                    const backendErrors = error.response.data.errors || {};
                    const mappedErrors = {};

                    for (const key in backendErrors) {
                        if (key === "passwordHash") {
                            mappedErrors["password"] = backendErrors[key];
                        } else {
                            mappedErrors[key] = backendErrors[key];
                        }
                    }
                    setErrors(mappedErrors);
                }

                if (error.response.status === 409) {
                    setErrors({ email: error.response.data.message });
                }
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>

                <label htmlFor="firstName">Имя</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Введите имя"
                    required
                    className={errors.firstName ? "error-input" : ""}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}

                <label htmlFor="lastName">Фамилия</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Введите фамилию"
                    required
                    className={errors.lastName ? "error-input" : ""}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}

                <label htmlFor="middleName">Отчество</label>
                <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Введите отчество"
                    className={errors.middleName ? "error-input" : ""}
                />
                {errors.middleName && (
                    <span className="error">{errors.middleName}</span>
                )}

                <label htmlFor="email">Электронная почта</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите email"
                    required
                    className={errors.email ? "error-input" : ""}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                    required
                    className={errors.password ? "error-input" : ""}
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <button type="submit">Зарегистрироваться</button>
                <button type="button" onClick={() => { navigate("/login") }}>Войти</button>
            </form>
        </div>
    );
}

export default Registration;
