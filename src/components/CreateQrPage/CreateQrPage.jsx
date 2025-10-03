import "./CreateQrPage.css";
import { QRCodeSVG } from "qrcode.react";
import { useState, useRef } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";

function CreateQrPage() {
    const [typeQr, setTypeQr] = useState("simpleQr");
    const [link, setLink] = useState("");
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [qrCodeId, setQrCodeId] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { user, loading } = useAuth();
    const qrRef = useRef();

    const addItem = () => {
        const v = currentItem.trim();
        if (!v) return;
        setItems((prev) => [...prev, v]);
        setCurrentItem("");
    };

    const removeItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    function generateHandler() {
        if ((typeQr === "qrWithStatistics" || typeQr === "qrList") && !user) {
            navigate("/login", {
                state: {
                    from: location.pathname,
                    message: "Для создания этого типа QR-кода необходимо авторизоваться"
                }
            });
            return;
        }

        if (typeQr !== "qrList" && !link.trim()) {
            setError("Введите ссылку перед генерацией QR-кода");
            return;
        }
        if (typeQr === "qrList" && items.length === 0) {
            setError("Добавьте хотя бы один элемент в список перед генерацией QR-кода");
            return;
        }

        setError("");

        const id = qrCodeId ?? v4();
        setQrCodeId(id);

        const url =
            typeQr === "simpleQr" ? link : `http://localhost:8083/qrcode/${id}`;

        setQrValue(url);
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (!user) {
            navigate("/login", {
                state: {
                    from: location.pathname,
                    message: "Для сохранения QR-кода необходимо авторизоваться"
                }
            });
            return;
        }

        if (!qrValue) {
            setError("Сначала сгенерируйте QR-код");
            return;
        }
        if (typeQr !== "qrList" && !link.trim()) {
            setError("Поле ссылки не должно быть пустым");
            return;
        }
        if (typeQr === "qrList" && items.length === 0) {
            setError("Список должен содержать хотя бы один элемент");
            return;
        }

        try {
            const id = qrCodeId ?? v4();
            const dataToSend = {
                qrCodeId: id,
                userId: user?.sub ?? null,
                type: typeQr,
                targetUrl: typeQr !== "qrList" ? link : null,
                list: typeQr === "qrList" ? items : null,
                qrUrl:
                    typeQr === "simpleQr" ? link : `http://localhost:8083/qrcode/${id}`
            };

            setQrCodeId(id);
            setQrValue(dataToSend.qrUrl);

            await axios.post("http://localhost:8080/management/api/saveQr", dataToSend);

            setError("");
        } catch (err) {
            console.error("Ошибка при сохранении QR-кода:", err);
            setError("Ошибка при сохранении QR-кода. Попробуйте ещё раз.");
        }
    }

    return (
        <main className="main">
            <form className="create-qr-form" onSubmit={submitHandler}>
                <h2>Выберите тип Qr кода и сгенерируйте его</h2>

                <label htmlFor="qrtype">Тип Qr кода</label>
                <select
                    id="qrtype"
                    value={typeQr}
                    onChange={(e) => {
                        const newType = e.target.value;
                        setTypeQr(newType);
                        setLink("");
                        setItems([]);
                        setCurrentItem("");
                        setQrValue("");
                        setQrCodeId(null);
                        setError("");
                    }}
                >
                    <option value="simpleQr">Простой Qr код</option>
                    <option value="qrWithStatistics">Qr код с отслеживанием статистики</option>
                    <option value="qrList">Qr код для списка содержимого</option>
                </select>

                {(typeQr === "simpleQr" || typeQr === "qrWithStatistics") && (
                    <>
                        <label htmlFor="url">Введите ссылку</label>
                        <input
                            id="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </>
                )}

                {typeQr === "qrList" && (
                    <>
                        <label>Введите элементы списка</label>
                        <div className="list-input">
                            <input
                                value={currentItem}
                                onChange={(e) => setCurrentItem(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addItem();
                                    }
                                }}
                            />
                            <button type="button" onClick={addItem}>
                                Добавить
                            </button>
                        </div>

                        <ul className="items-list">
                            {items.map((item, i) => (
                                <li key={i}>
                                    <span>{item}</span>
                                    <button type="button" onClick={() => removeItem(i)}>
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {qrValue && (
                    <div className="qr-code-container" ref={qrRef}>
                        <QRCodeSVG value={qrValue} size={200} />
                    </div>
                )}

                {error && <p className="error-message">{error}</p>}

                <div className="actions">
                    <button type="button" onClick={generateHandler}>
                        Сгенерировать
                    </button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </main>
    );
}

export default CreateQrPage;
