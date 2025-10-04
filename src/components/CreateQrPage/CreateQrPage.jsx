import "./CreateQrPage.css";
import { QRCodeSVG } from "qrcode.react";
import { useState, useRef } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate, useLocation, data } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";

function CreateQrPage() {
    const [typeQr, setTypeQr] = useState("simpleQr");
    const [link, setLink] = useState("");
    const [items, setItems] = useState([]); // теперь храним [{ itemName, quantity }]
    const [currentItemName, setCurrentItemName] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [qrValue, setQrValue] = useState("");
    const [qrCodeId, setQrCodeId] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { accessToken, refreshToken, user, loading } = useAuth();
    const qrRef = useRef();

    const addItem = () => {
        const name = currentItemName.trim();
        const qty = Number(currentQuantity);
        if (!name) return;
        if (qty <= 0) return setError("Количество должно быть больше нуля");

        setItems((prev) => [...prev, { itemName: name, quantity: qty }]);
        setCurrentItemName("");
        setCurrentQuantity(1);
        setError("");
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


        const id = qrCodeId ?? v4();
        const dataToSend = {
            qrCodeId: id,
            userId: user?.sub ?? null,
            type: typeQr,
            targetUrl: typeQr !== "qrList" ? link : `http://localhost:8082/qrcode/${id}`,
            content: typeQr === "qrList" ? items : null,
            qrUrl:
                typeQr === "simpleQr" ? link : `http://localhost:8083/qrcode/${id}`
        };

        setQrCodeId(id);
        setQrValue(dataToSend.qrUrl);

        await axios.post("http://localhost:8080/management/api/saveQr", dataToSend,
            {
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }
        )
            .then(response => {
                setError("");
                alert("Qrcode сохранен")
            })
            .catch(error => {
                console.log("лог1", error.response.status);
                console.log("лог1", error.response.data.message);
                switch (error.response.status) {
                    case 409:
                        console.log("лог2", error.response.data);
                        console.log("лог3", error);
                        setError("Вы уже сохранили этот QR код");
                        break;
                    case 401:

                        break;
                    default:
                        setError("Ошибка сервера, попробуйте позже");
                }
            })

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
                        setCurrentItemName("");
                        setCurrentQuantity(1);
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
                                placeholder="Название предмета"
                                value={currentItemName}
                                onChange={(e) => setCurrentItemName(e.target.value)}
                            />
                            <input
                                type="number"
                                min="1"
                                placeholder="Количество"
                                value={currentQuantity}
                                onChange={(e) => setCurrentQuantity(e.target.value)}
                            />
                            <button type="button" onClick={addItem}>
                                Добавить
                            </button>
                        </div>

                        <ul className="items-list">
                            {items.map((item, i) => (
                                <li key={i}>
                                    <span>
                                        {item.itemName} — {item.quantity} шт.
                                    </span>
                                    <button type="button" className="remove-btn" onClick={() => removeItem(i)}>
                                        <span className="remove-icon">−</span>
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
