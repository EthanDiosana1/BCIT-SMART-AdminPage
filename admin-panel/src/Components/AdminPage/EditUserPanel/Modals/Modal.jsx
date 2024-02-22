import './Modal.css';
import ReactDOM from 'react-dom';

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="modal-overlay"
            onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.body
    );
}