import React from "react";
import { Modal } from "./Modals/Modal";

export function EditDisplayNameModal(fieldName, 
    textInputValue, handleChange, isModalOpen) {
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
        onChange={(event) => 
            handleChange(event, state)}
      />
    </Modal>
  );
}