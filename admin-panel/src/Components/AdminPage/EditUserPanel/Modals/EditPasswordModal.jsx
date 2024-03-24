import React from "react";
import { Modal } from "./Modals/Modal";

export function EditPasswordModal(fieldName, 
    textInputValue, setTextInputValue, isModalOpen) {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        closeButtonHandler();
      }}
    >
      <input
        type="text"
        placeholder={fieldName}
        value={textInputValue}
        onChange={(event) => {
          handleChange(event, setTextInputValue);
        }}
      />
    </Modal>
  );
}