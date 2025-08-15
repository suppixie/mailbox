import React, { useState } from "react";
import "./Popups.css";

export default function LabelPopup({ existingLabels = [], onSelect, onClose }) {
  const [labels, setLabels] = useState(existingLabels);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [lastLabel, setLastLabel] = useState("");

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed && !selected) return;

    let finalLabel = selected || trimmed;

    if (trimmed && !labels.includes(trimmed)) {
      const newLabels = [...labels, trimmed];
      setLabels(newLabels);
      finalLabel = trimmed;
    }

    setLastLabel(finalLabel);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);

    onSelect(finalLabel);
  };

  return (
    <>
      {showAlert && (
        <div className="label-alert">
          Saved to label <span className="mini-label">{lastLabel}</span>
        </div>
      )}

      <div className="overlay">
        <div className="popup">
          <div className="title">Add label</div>

          <div className="field">
            <input
              placeholder="Create or select a label"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSelected(null);
              }}
            />
          </div>

          {labels.length > 0 && (
            <div className="label-list">
              {labels.map((label, i) => (
                <div
                  key={i}
                  className={`label-item ${selected === label ? "selected" : ""}`}
                  onClick={() => {
                    setSelected(label);
                    setValue("");
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          <div className="actions-cta">
            <button className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
