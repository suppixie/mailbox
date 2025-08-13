import React, { useState } from "react";
import "./Popups.css";

export default function LabelPopup({ onSelect, onClose }) {
  const [value, setValue] = useState("");
  return (
    <div className="overlay">
      <div className="popup">
        <div className="title">Add label</div>
        <div className="field">
          <input placeholder="Create or select a label" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="actions-cta">
          <button className="secondary" onClick={onClose}>Cancel</button>
          <button className="primary" onClick={() => value.trim() && onSelect(value.trim())}>Save</button>
        </div>
      </div>
    </div>
  );
}
