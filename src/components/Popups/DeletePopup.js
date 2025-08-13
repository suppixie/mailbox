import React from "react";
import "./Popups.css";

export default function DeletePopup({ onCancel, onConfirm }) {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="title">Delete this email?</div>
        <div className="msg">It will be moved to the Trash folder.</div>
        <div className="actions-cta">
          <button onClick={onCancel} className="secondary">Cancel</button>
          <button onClick={onConfirm} className="danger">Delete</button>
        </div>
      </div>
    </div>
  );
}