import logo from "/logo.png";
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";

function Header() {
    const navigate = useNavigate();
    const { accessToken, logout, loading } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) return null;

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__logo">
                    <img src={logo} alt="Link2U Logo" />
                    <span className="header__title">SortlyQR</span>
                </div>

                <nav className="header__nav">
                    <ul className="header__menu">
                        <li><a href="/">Главная</a></li>
                        <li><a href="/create">Создать qr код</a></li>
                    </ul>
                </nav>
            </div>

            <div className="header__actions">
                {accessToken ? (
                    <>
                        <button className="btn btn-profile" onClick={() => navigate("/profile")}>
                            Профиль
                        </button>
                        <button className="btn btn-logout" onClick={handleLogout}>
                            Выход
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-login" onClick={() => navigate("/login")}>
                            Вход
                        </button>
                        <button className="btn btn-register" onClick={() => navigate("/registration")}>
                            Регистрация
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;