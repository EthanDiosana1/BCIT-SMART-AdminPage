import React from "react";
import Modal from "./Modal";
import './Modal.css'

export function DeleteUserModal({
  title,
  textInputValue,
  isOpen,
  handleChange,
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
        submitButtonHandler();
        closeButtonHandler();
      }}
    >
      <input
        type="text"
        placeholder="yes/no"
        value={textInputValue}
        onChange={(event) => handleChange(event, setTextInputValue)}
      />
    </Modal>
  );
}
