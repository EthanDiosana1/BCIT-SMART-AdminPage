import React, { Children, useEffect } from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, onChange, children }) {
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
                <button onClick={onChange}>Save Changes</button>
            </div>
        </div>,
        document.body
    );
}

// export function Modal({ isOpen, onClose, onSave, children}) {
//     if (!isOpen) return null;

//     return ReactDOM.createPortal(
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-container" onClick={e => e.stopPropagation()}>
//                 <div className="modal-header">
//                     <span className="modal-title">DisplayName: </span>
//                     <button onClick={onClose} className="modal-close-btn">&times;</button>
//                 </div>
//                 <div className="modal-body">
//                     {children}
//                 </div>
//                 <div className="modal-footer">
//                     <button onClick={onSave} className="modal-save-btn">Save Changes</button>
//                     <button onClick={onClose} className="modal-close-btn-footer">Close</button>
//                 </div>
//             </div>
//         </div>,
//         document.body
//     );
// }
