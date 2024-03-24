import React, { Children, useEffect } from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

export default function Modal({ 
    title,
    isOpen,
    onClose, 
    onChange, 
    children
}) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="modal-overlay"
            onClick={onClose}>
        <div
                className="modal-content"
                onClick={e => e.stopPropagation()}>
        {<h1>{title}</h1>}    
        {children}
                <button onClick={onClose}>Close</button>
                <button onClick={onChange}>Save Changes</button>
            </div>
        </div>,
        document.body
    );
}

