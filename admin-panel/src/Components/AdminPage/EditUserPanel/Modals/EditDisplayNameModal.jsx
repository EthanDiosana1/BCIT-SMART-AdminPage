import React from "react";
import Modal from "./Modal.jsx";
import './Modal.css';

export function EditDisplayNameModal({
    title,
    fieldName, 
    textInputValue,
    handleChange,
    isOpen,
    closeButtonHandler,
    setTextInputValue
}) {
  
    return (
    <Modal
      title={title}
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
