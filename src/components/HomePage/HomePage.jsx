import "./HomePage.css"


function HomePage() {
    return (
        <>
            <main className="main">
                <section className="hero">
                    <h1>SortlyQR</h1>
                    <p className="tagline">
                        Персональные QR-коды для ваших вещей, событий и идей
                    </p>
                    <button className="cta">Создать QR-код</button>
                </section>

                <section className="features">
                    <h2>Что умеет SortlyQR?</h2>
                    <ul>
                        <li>
                            📦 <strong>Наводите порядок</strong> — помечайте коробки и вещи
                            QR-кодами и всегда знайте, где что лежит.
                        </li>
                        <li>
                            🔑 <strong>Находите потерянное</strong> — создавайте уникальные
                            QR-коды для предметов и помогайте людям возвращать их вам.
                        </li>
                        <li>
                            🤝 <strong>Делитесь контактами анонимно</strong> — обменивайтесь
                            информацией через QR-коды без раскрытия личных данных.
                        </li>
                        <li>
                            🚀 <strong>Отслеживайте статистику</strong> — анализируйте статистику
                            созданного qr кода.
                        </li>
                    </ul>
                </section>

                <section className="how-it-works">
                    <h2>Как это работает?</h2>
                    <ol>
                        <li>Создаёте QR-код для вещи, события или ссылки.</li>
                        <li>Печатаете или сохраняете его.</li>
                        <li>Сканируете — и получаете быстрый доступ к информации.</li>
                    </ol>
                </section>

            </main>
        </>
    )
}

export default HomePage;