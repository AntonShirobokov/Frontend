import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import "./Modal.css";

/* --- Модалки по типам --- */
function ModalQrWithStatistics({ qrCodeInfo, onClose, onDelete }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div>
                    <p>Подробная информация qr кода "{qrCodeInfo.title}"</p>
                    <p>Тип: qr код для отслеживания статистики</p>
                </div>
                <div className="modal-buttons">
                    <button className="button-close" onClick={onClose}>Закрыть</button>
                    <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}

function ModalQrList({ qrCodeInfo, onClose, onDelete }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div>
                    <p>Подробная информация qr кода "{qrCodeInfo.title}"</p>
                    <p>Тип: qr код список</p>
                    <p>Здесь будет список содержимого</p>
                </div>
                <div className="modal-buttons">
                    <button className="button-close" onClick={onClose}>Закрыть</button>
                    <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}

function ModalSimpleQr({ qrCodeInfo, onClose, onDelete }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div>
                    <p>Подробная информация qr кода "{qrCodeInfo.title}"</p>
                    <p>Тип: простой qr код</p>
                    <p>Дата создания: {qrCodeInfo.createdAt}</p>
                    <p>Куда ведет: {qrCodeInfo.targetUrl}</p>
                    <QRCodeSVG value={qrCodeInfo.qrUrl} />
                </div>
                <div className="modal-buttons">
                    <button className="button-close" onClick={onClose}>Закрыть</button>
                    <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}

/* --- Главная модалка с порталом --- */
function Modal({ qrCodeInfo, onClose, onDelete }) {
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
            modalContent = <ModalQrWithStatistics qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
            break;
        case "qrList":
            modalContent = <ModalQrList qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
            break;
        default:
            modalContent = <ModalSimpleQr qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
    }

    return createPortal(modalContent, document.body);
}

export default Modal;
