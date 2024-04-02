import React from "react";
import Modal from "./Modal.jsx";
import './Modal.css';

export function EditEmailModal({
    title,
    fieldName, 
    textInputValue,
    handleChange,
    isOpen,
    closeButtonHandler,
    submitButtonHandler,
    setTextInputValue
}) {
  
    return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={() => {
        closeButtonHandler();
      }}
      onSubmit={() => {
        // pass the new email to the handler
        submitButtonHandler(textInputValue);
        //setTextInputValue(textInputValue);
        closeButtonHandler();
      }}
    >
      <input
        type="email"
        placeholder={fieldName}
        value={textInputValue}
        onChange={(event) => 
            handleChange(event, setTextInputValue)}
      />
    </Modal>
  );
}