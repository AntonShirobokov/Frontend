import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./QrCodeCard.css"


function QrCodeWithStatistics({ qrCodeInfo, onDelete }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true)
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrList({ qrCodeInfo, onDelete }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function SimpleQr({ qrCodeInfo, onDelete }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} onDelete={onDelete} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrCodeCard({ qrCodeInfo, onDelete }) {
    switch (qrCodeInfo.type) {
        case "qrWithStatistics": return <QrCodeWithStatistics qrCodeInfo={qrCodeInfo} onDelete={onDelete} />;
        case "qrList": return <QrList qrCodeInfo={qrCodeInfo} onDelete={onDelete} />;
        default: return <SimpleQr qrCodeInfo={qrCodeInfo} onDelete={onDelete} />;
    }
};

export default QrCodeCard;