import React from "react";

export default function DeletePopup({ onConfirm, onCancel }) {
  return (
    <div className="pop confirm">
      <div>Delete and send to Trash?</div>
      <div className="actions">
        <button className="danger" onClick={onConfirm}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}