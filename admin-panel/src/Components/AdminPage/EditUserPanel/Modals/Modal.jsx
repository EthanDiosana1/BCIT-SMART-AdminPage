import React, { Children, useEffect } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

export default function Modal({ title, isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {<h3>{title}</h3>}
        {children}
        <div className="modal-button-container">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="submit-button" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
