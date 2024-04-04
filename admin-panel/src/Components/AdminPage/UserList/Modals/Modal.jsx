import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import urls from "../../../../data/urls.json";

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetFields = () => {
    setDisplayName("");
    setPassword("");
    setPasswordConfirmation("");
    setEmail("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!displayName || !password || !passwordConfirmation || !email) {
      setError("All fields are required.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    const formData = {
      display_name: displayName,
      password: password,
      email: email
    };
    console.log(formData);

    try {
      await onSubmit(formData); 
      alert("User was successfully created.");
      resetFields();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Failed to submit the form. Please try again.");
    }
  };

  const handleCancel = () => {
    resetFields();
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Enter User Details</h3>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-input">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="modal-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="modal-input">
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div className="modal-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="modal-button-container">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
