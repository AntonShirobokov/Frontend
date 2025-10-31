import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <main className="main">
                <section className="hero">
                    <h1>SortlyQR</h1>
                    <p className="tagline">
                        SortlyQR — это сервис для создания персональных QR-кодов, которые связывают ваши вещи и события с цифровым миром.
                    </p>
                    <button className="cta" onClick={() => navigate("/create")}>Создать QR-код</button>
                </section>

                <section className="features">
                    <h2>Возможности</h2>
                    <ul>
                        <li>
                            🔹 <strong>Генерация обычных QR-кодов</strong> — быстро создавайте стандартные QR-коды для ссылок, контактов и любых данных.
                        </li>
                        <li>
                            📊 <strong>QR-коды с отслеживанием статистики</strong> — узнавайте, сколько раз, где и когда сканировали ваши QR-коды.
                        </li>
                        <li>
                            📦 <strong>Наводите порядок</strong> — помечайте коробки и вещи QR-кодами и всегда знайте, где что лежит.
                        </li>
                        <li>
                            💼 <strong>Подходит для всех</strong> — используйте SortlyQR для личных целей, бизнеса или продвижения бренда.
                        </li>
                    </ul>
                </section>

                <section className="how-it-works">
                    <h2>Как это работает?</h2>
                    <ol>
                        <li>Создайте QR-код для вещи, события или ссылки.</li>
                        <li>Сохраните или распечатайте его.</li>
                        <li>Сканируйте и получайте мгновенный доступ к информации.</li>
                    </ol>
                </section>
            </main>
        </>
    );
}

export default HomePage;
