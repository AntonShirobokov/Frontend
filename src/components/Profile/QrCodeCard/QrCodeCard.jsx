import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./QrCodeCard.css"


function QrCodeWithStatistics({ qrCodeInfo, onDelete, onRefresh }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true)
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.qrUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrList({ qrCodeInfo, onDelete, onRefresh }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.qrUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function SimpleQr({ qrCodeInfo, onDelete, onRefresh }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} onRefresh={onRefresh} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrCodeCard({ qrCodeInfo, onDelete, onRefresh }) {
    switch (qrCodeInfo.type) {
        case "qrWithStatistics": return <QrCodeWithStatistics qrCodeInfo={qrCodeInfo} onDelete={onDelete} onRefresh={onRefresh} />;
        case "qrList": return <QrList qrCodeInfo={qrCodeInfo} onDelete={onDelete} onRefresh={onRefresh} />;
        default: return <SimpleQr qrCodeInfo={qrCodeInfo} onDelete={onDelete} onRefresh={onRefresh} />;
    }
};

export default QrCodeCard;