import "./QrCodePage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiManagementPublic from "../../api/apiManagmentPublic";

function QrCodePage() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [qrData, setQrData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiManagementPublic.get(`/management/api/getQrCodeInfo/${params.id}`);
                setQrData(response.data);
            } catch (error) {
                console.error(`Ошибка: ${error.status}`, error.response?.data);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [params.id]);

    if (isLoading) {
        return <div className="loading"><p>Загрузка страницы...</p></div>;
    }

    if (!qrData) {
        return <div className="qr-page"><p>Не удалось загрузить данные QR-кода</p></div>;
    }

    return (
        <div className="qr-page">
            <h2>Содежимое qr кода "{qrData.title}"</h2>

            {qrData.content && qrData.content.length > 0 ? (
                <ul className="qr-content-list">
                    {qrData.content.map((item, index) => (
                        <li key={index} className="qr-item">
                            <span className="qr-item-name">{item.itemName}</span>
                            <span className="qr-item-quantity">{item.quantity}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Содержимое отсутствует</p>
            )}
        </div>
    );
}

export default QrCodePage;
