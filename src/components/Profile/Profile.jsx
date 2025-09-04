import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
import "./Profile.css"

function Profile() {
    const { accessToken, refreshToken, user } = useAuth();


    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Профиль</h2>
                <div className="profile-info">
                    <p><strong>ФИО:</strong> {user.lastName + " " + user.firstName + " " + user.middleName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.roles[0]}</p>
                    <p><strong>Access Token:</strong> {accessToken}</p>
                    <p><strong>Refresh Token:</strong> {refreshToken}</p>
                </div>
            </div>
        </div>
    );

}


export default Profile;