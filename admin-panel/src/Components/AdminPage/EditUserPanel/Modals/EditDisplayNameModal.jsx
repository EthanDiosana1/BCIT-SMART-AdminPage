import React from "react";
import Modal from "./Modal.jsx";
import './Modal.css';

export function EditDisplayNameModal({
    fieldName, 
    textInputValue,
    handleChange,
    isOpen,
    closeButtonHandler,
    setTextInputValue
}) {
  
    return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeButtonHandler();
      }}
    >
      <input
        type="text"
        placeholder={fieldName}
        value={textInputValue}
        onChange={(event) => 
            handleChange(event, setTextInputValue)}
      />
    </Modal>
  );
}
