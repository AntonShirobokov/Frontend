import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import "./Modal.css";
import apiAnalytics from "../../../api/apiAnalytics";
import { useEffect } from "react";
import { useState } from "react";
import apiManagementPrivate from "../../../api/apiManagementPrivate";

function ModalQrWithStatistics({ qrCodeInfo, onClose, onDelete, onRefresh }) {
    const [isLoadingCount, setIsLoadingCount] = useState(true);
    const [countRedirect, setCountRedirect] = useState("загрузка");
    const [isEditing, setIsEditing] = useState(false);
    const [titleToEdit, setTitleToEdit] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [targetUrl, setTargetUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiAnalytics.get(`/api/${qrCodeInfo.qrCodeId}`);
                setCountRedirect(response.data.countOfRedirect);
                setIsLoadingCount(false);
            } catch (error) {
                console.log("Ошибка при загрузке статистики", error);
                setCountRedirect("ошибка загрузки данных");
                setIsLoadingCount(false);
            }
        }
        fetchData();
    }, [qrCodeInfo.qrCodeId]);

    const handleEdit = () => {
        setTitleToEdit(qrCodeInfo.title);
        setTargetUrl(qrCodeInfo.targetUrl);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrorMessage("");
    };

    const handleSave = async () => {
        if (!titleToEdit.trim()) {
            setErrorMessage("Название не может быть пустым");
            return;
        } else if (!targetUrl.trim()) {
            setErrorMessage("Целевой ресурс не может быть пустым");
            return;
        }

        try {
            await apiManagementPrivate.put("/management/api/updateQrWithStatistics", {
                qrCodeId: qrCodeInfo.qrCodeId,
                title: titleToEdit.trim(),
                targetUrl: targetUrl.trim(),
            });
            qrCodeInfo.title = titleToEdit.trim();
            qrCodeInfo.targetUrl = targetUrl.trim();
            await onRefresh();
            setIsEditing(false);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Ошибка при сохранении. Попробуйте снова.");
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p className="modal-header">
                    Подробная информация QR-кода "{qrCodeInfo.title}"
                </p>

                <div className="modal-info-block">
                    <div className="modal-info-item">
                        <label>Тип:</label>
                        <p>QR-код для отслеживания статистики</p>
                    </div>

                    <div className="modal-info-item">
                        <label>Количество сканирований:</label>
                        <p>{countRedirect}</p>
                    </div>

                    {!isEditing ? (
                        <>
                            <div className="modal-info-item">
                                <label>Целевой ресурс:</label>
                                <p>{qrCodeInfo.targetUrl}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modal-info-item">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={titleToEdit}
                                    onChange={(e) => {
                                        setTitleToEdit(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    placeholder="Введите название"
                                />
                            </div>

                            <div className="modal-info-item">
                                <label>Целевой ресурс:</label>
                                <input
                                    type="text"
                                    value={targetUrl}
                                    onChange={(e) => {
                                        setTargetUrl(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    placeholder="Введите ссылку"
                                />
                            </div>
                        </>
                    )}

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>

                <div className="modal-buttons">
                    {!isEditing ? (
                        <>
                            <button className="button-close" onClick={onClose}>
                                Закрыть
                            </button>
                            <button className="button-close" onClick={handleEdit}>
                                Редактировать
                            </button>
                            <button
                                className="button-delete"
                                onClick={() => onDelete(qrCodeInfo.qrCodeId, qrCodeInfo.type)}
                            >
                                Удалить
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="button-close" onClick={handleSave}>
                                Сохранить
                            </button>
                            <button className="button-delete" onClick={handleCancel}>
                                Отмена
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ModalQrList({ qrCodeInfo, onClose, onDelete, onRefresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [dataToEdit, setDataToEdit] = useState([]);
    const [titleToEdit, setTitleToEdit] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEdit = () => {
        setDataToEdit(qrCodeInfo.qrCodeData.content || []);
        setTitleToEdit(qrCodeInfo.title || "");
        setErrorMessage("");
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!titleToEdit.trim()) {
            setErrorMessage("Название не может быть пустым");
            return;
        }

        try {
            await apiManagementPrivate.put("/management/api/updateQrList", {
                qrCodeId: qrCodeInfo.qrCodeId,
                title: titleToEdit.trim(),
                content: dataToEdit,
            });
            qrCodeInfo.title = titleToEdit.trim();
            qrCodeInfo.qrCodeData.content = dataToEdit;
            await onRefresh();
            setIsEditing(false);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Ошибка при сохранении. Попробуйте снова.");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrorMessage("");
    };

    const handleAddItem = () => {
        setDataToEdit([...dataToEdit, { itemName: "", quantity: "" }]);
    };

    const handleRemoveItem = (index) => {
        setDataToEdit(dataToEdit.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const newData = [...dataToEdit];
        newData[index][field] = value;
        setDataToEdit(newData);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p className="modal-header">
                    Подробная информация QR-кода "{qrCodeInfo.title}"
                </p>

                <div className="modal-info-block">
                    <div className="modal-info-item">
                        <label>Тип:</label>
                        <p>QR-код список</p>
                    </div>

                    {!isEditing ? (
                        <>
                            {qrCodeInfo.qrCodeData.content &&
                                qrCodeInfo.qrCodeData.content.length > 0 ? (
                                qrCodeInfo.qrCodeData.content.map((item, index) => (
                                    <div className="modal-info-item" key={index}>
                                        <label>{item.itemName}:</label>
                                        <p>{item.quantity}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Список содержимого пуст</p>
                            )}
                        </>
                    ) : (
                        <div className="list-edit-container">
                            <div className="modal-info-item">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={titleToEdit}
                                    onChange={(e) => setTitleToEdit(e.target.value)}
                                    placeholder="Введите название"
                                />
                            </div>

                            {dataToEdit.map((item, index) => (
                                <div className="edit-row" key={index}>
                                    <input
                                        type="text"
                                        value={item.itemName}
                                        onChange={(e) =>
                                            handleChange(index, "itemName", e.target.value)
                                        }
                                        placeholder="Название"
                                        className="input-item"
                                    />
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleChange(index, "quantity", e.target.value)
                                        }
                                        placeholder="Количество"
                                        className="input-quantity"
                                    />
                                    <button
                                        className="button-remove"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <button className="button-add" onClick={handleAddItem}>
                                + Добавить элемент
                            </button>

                            {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="modal-buttons">
                    {!isEditing ? (
                        <>
                            <button className="button-close" onClick={onClose}>
                                Закрыть
                            </button>
                            <button className="button-close" onClick={handleEdit}>
                                Редактировать
                            </button>
                            <button
                                className="button-delete"
                                onClick={() => onDelete(qrCodeInfo.qrCodeId, qrCodeInfo.type)}
                            >
                                Удалить
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="button-close" onClick={handleSave}>
                                Сохранить
                            </button>
                            <button className="button-delete" onClick={handleCancel}>
                                Отмена
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ModalSimpleQr({ qrCodeInfo, onClose, onDelete }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p className="modal-header">
                    Подробная информация QR-кода "{qrCodeInfo.title}"
                </p>

                <div className="modal-info-block">
                    <div className="modal-info-item">
                        <label>Тип:</label>
                        <p>Простой QR-код</p>
                    </div>

                    <div className="modal-info-item">
                        <label>Дата создания:</label>
                        <p>{qrCodeInfo.createdAt}</p>
                    </div>

                    <div className="modal-info-item">
                        <label>Целевой ресурс:</label>
                        <p>{qrCodeInfo.targetUrl}</p>
                    </div>

                    <QRCodeSVG value={qrCodeInfo.qrUrl} />
                </div>

                <div className="modal-buttons">
                    <button className="button-close" onClick={onClose}>
                        Закрыть
                    </button>
                    <button
                        className="button-delete"
                        onClick={() => onDelete(qrCodeInfo.qrCodeId, qrCodeInfo.type)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}

function Modal({ qrCodeInfo, onClose, onDelete, onRefresh }) {
    const formattedDate = new Date(qrCodeInfo.createdAt).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const infoWithFormattedDate = { ...qrCodeInfo, createdAt: formattedDate };

    let modalContent;
    switch (qrCodeInfo.type) {
        case "qrWithStatistics":
            modalContent = <ModalQrWithStatistics qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />;
            break;
        case "qrList":
            modalContent = <ModalQrList qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />;
            break;
        default:
            modalContent = <ModalSimpleQr qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />;
    }

    return createPortal(modalContent, document.body);
}

export default Modal;
