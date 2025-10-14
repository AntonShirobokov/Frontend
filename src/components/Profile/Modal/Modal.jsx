import "./Modal.css"
import { QRCodeSVG } from "qrcode.react"


function ModalQrWithStatistics({ qrCodeInfo, onClose, onDelete }) {
    return <>
        <div className="modal-backdrop">

            <div className="modal">
                <div>
                    <div><p>Подробная информация qr кода "{qrCodeInfo.title}"</p></div>
                    <div><p>Тип: qr код для отслеживания статистики</p></div>
                </div>
                <button className="button-close" onClick={() => onClose()}>Закрыть</button>
                <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
            </div>

        </div>
    </>
}


function ModalQrList({ qrCodeInfo, onClose, onDelete }) {
    return <>
        <div className="modal-backdrop">

            <div className="modal">
                <div>
                    <div><p>Подробная информация qr кода "{qrCodeInfo.title}"</p></div>
                    <div><p>Тип: qr код список</p></div>
                    <div><p>Здесь будет список содержимого</p></div>
                </div>
                <button className="button-close" onClick={() => onClose()}>Закрыть</button>
                <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
            </div>

        </div>
    </>
}

function ModalSimpleQr({ qrCodeInfo, onClose, onDelete }) {

    return <>
        <div className="modal-backdrop">

            <div className="modal">
                <div>
                    <div><p>Подробная информация qr кода "{qrCodeInfo.title}"</p></div>
                    <div><p>Тип: простой qr код</p></div>
                    <div><p>Дата создания qr кода: {qrCodeInfo.createdAt}</p></div>
                    <div><p>Куда ведет qr код: {qrCodeInfo.targetUrl}</p></div>
                    <QRCodeSVG value={qrCodeInfo.qrUrl}></QRCodeSVG>
                </div>
                <button className="button-close" onClick={() => onClose()}>Закрыть</button>
                <button className="button-delete" onClick={() => onDelete(qrCodeInfo.qrCodeId)}>Удалить</button>
            </div>

        </div>
    </>
}

function Modal({ qrCodeInfo, onClose, onDelete }) {

    const formattedDate = new Date(qrCodeInfo.createdAt).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const infoWithFormattedDate = { ...qrCodeInfo, createdAt: formattedDate };

    switch (qrCodeInfo.type) {
        case "qrWithStatistics": return <ModalQrWithStatistics qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
        case "qrList": return <ModalQrList qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
        default: return <ModalSimpleQr qrCodeInfo={infoWithFormattedDate} onClose={onClose} onDelete={onDelete} />;
    }
}

export default Modal;