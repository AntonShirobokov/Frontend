import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import apiManagementPrivate from "../../api/apiManagementPrivate";
import "./Profile.css"
import QrCodeCard from "./QrCodeCard/QrCodeCard";

function Profile() {
    const { accessToken, refreshToken, user } = useAuth();


    const [qrList, setQrList] = useState("");
    const [isLoading, setIsLoading] = useState(true);


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
            <div>
                <h2>Профиль</h2>
                <div>
                    <p><strong>ФИО:</strong> {user.lastName + " " + user.firstName + " " + user.middleName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.roles.length == 1 ? "Пользователь" : "Модератор"}</p>
                </div>
                <div>
                    <h2> Созданные qr коды </h2>

                    {isLoading ? null : qrList.length == 0 ? <p>Вы не сохранили ни один qr код</p> :
                        <div className="conteiner"> {qrList.map((item, index) => {
                            return <div className="conteinerItem" key={index}><QrCodeCard qrCodeInfo={item} /></div>
                        })}</div>
                    }
                </div>
            </div>
        </div>
    );

}


export default Profile;