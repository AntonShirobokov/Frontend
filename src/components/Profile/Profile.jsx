import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import apiManagementPrivate from "../../api/apiManagementPrivate";
import "./Profile.css"
import QrCodeCard from "./QrCodeCard/QrCodeCard";

function Profile() {
    const { user } = useAuth();
    const [qrList, setQrList] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function onDelete(qrCodeId) {
        await apiManagementPrivate.delete("/management/api/deleteQrCode", {
            data: { qrCodeId: qrCodeId }
        }).then(
            response => {
                console.log(`Qr код ${qrCodeId} был удален`, response.status);
                setQrList(qrList.filter(qrCode => qrCode.qrCodeId != qrCodeId));
            }
        ).catch(error => {
            console.log("Ошибка при удалении qr кода: ", error.response.status);
        }
        )
    }


    useEffect(() => {
        async function fetchData() {
            await apiManagementPrivate.get("/management/api/getAllQrCodes").then(response => {
                console.log("Полученные данные", response.data);
                setQrList(response.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("Ошибка при запросе с кодом ", error.response.status);
            })
        };
        fetchData();
    }, [])


    return (
        <div className="main">
            <div className="user-info">
                <h2>Профиль</h2>
                <p><strong>ФИО:</strong> {`${user.lastName} ${user.firstName} ${user.middleName}`}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Роль:</strong> {user.roles.length === 1 ? "Пользователь" : "Модератор"}</p>
            </div>

            <div className="qr-section">
                <h2>Сохраненные QR-коды</h2>
                {isLoading ? null : (
                    qrList.length === 0
                        ? <p className="empty-message">Вы не сохранили ни один QR-код</p>
                        : <div className="conteiner">
                            {qrList.map(item => (
                                <div className="conteinerItem" key={item.qrCodeId}>
                                    <QrCodeCard qrCodeInfo={item} onDelete={onDelete} />
                                </div>
                            ))}
                        </div>
                )}
            </div>
        </div>
    );

}


export default Profile;