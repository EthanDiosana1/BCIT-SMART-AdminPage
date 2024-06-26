import React from "react";
import Modal from "./Modal.jsx";
import "./Modal.css";

export function EditPasswordModal({
  title,
  fieldName,
  textInputValue,
  handleChange,
  isOpen,
  closeButtonHandler,
  submitButtonHandler,
  setTextInputValue,
}) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={() => {
        closeButtonHandler();
      }}
      onSubmit={() => {
        // pass the new password to the handler
        submitButtonHandler(textInputValue);
        closeButtonHandler();
      }}
    >

      <h4>New Password: </h4>
      <input
        type="password"
        placeholder={fieldName}
        //value={textInputValue}
        onChange={(event) => 
          handleChange(event, setTextInputValue)}
      />

      <h4>Confirm Password:</h4>
      <input
        type="password"
        placeholder={fieldName}
        //value={textInputValue}
        onChange={(event) => 
          handleChange(event, setTextInputValue)}
      />
    </Modal>
  );
}
