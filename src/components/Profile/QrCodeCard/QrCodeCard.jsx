import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./QrCodeCard.css"


function QrCodeWithStatistics({ qrCodeInfo }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true)
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrList({ qrCodeInfo }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function SimpleQr({ qrCodeInfo }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function onClose() {
        setIsModalOpen(false);
    }

    function getInformation() {
        setIsModalOpen(true);
    }

    return <>
        {isModalOpen && <Modal qrCodeInfo={qrCodeInfo} onClose={onClose} />}
        <p className="qr-name">{qrCodeInfo.title}</p>
        <QRCodeSVG value={qrCodeInfo.targetUrl} className="qrCode"></QRCodeSVG>
        <button className="button-info" onClick={getInformation}>Подробнее</button>
    </>
}

function QrCodeCard({ qrCodeInfo }) {
    switch (qrCodeInfo.type) {
        case "qrWithStatistics": return <QrCodeWithStatistics qrCodeInfo={qrCodeInfo} />;
        case "qrList": return <QrList qrCodeInfo={qrCodeInfo} />;
        default: return <SimpleQr qrCodeInfo={qrCodeInfo} />;
    }
};

export default QrCodeCard;