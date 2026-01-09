import { useState } from "react";
import "./PasswordModal.css";

const PasswordModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const SECRET_PASSWORD = "family123";

  const handleSubmit = () => {
    if (password === SECRET_PASSWORD) {
      onSuccess();
      onClose();
    } else {
      alert("Wrong password ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Enter Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Confirm</button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
