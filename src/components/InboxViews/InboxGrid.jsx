import React, { useState } from "react";
import { FaStar, FaRegStar, FaTag, FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import DeletePopup from "../Popups/DeletePopup";
import LabelPopup from "../Popups/LabelPopup";
import "./InboxGrid.css";

export default function InboxGrid({
  emails,
  onOpenEmail,
  onToggleStar,
  onDragStartEmail,
  onMarkRead,
  onDeleteEmail,
  labelEmail,
}) {
  const [confirmId, setConfirmId] = useState(null);
  const [labelForId, setLabelForId] = useState(null);

  return (
    <div className="grid">
      {emails.map((m) => (
        <div
          key={m.id}
          className={`card ${m.read ? "read" : "unread"}`}
          draggable
          onDragStart={(e) => onDragStartEmail(m.id, e)}
          onClick={() => onOpenEmail(m.id)}
        >
          <div className="row-1">
            <div className="grid-star-avatar-from">
            <button
              className={`star ${m.starred ? "on" : ""}`}
              title="Star"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(m.id);
              }}
              style={{ color: m.starred ? "#FFD600" : "#bbb" }}
            >
              {m.starred ? <FaStar /> : <FaRegStar />}
            </button>
            <div className="avatar">{m.avatar}</div>
            <div className="from">{m.from}</div>
            </div>
            <div className="grid-actions" onClick={(e) => e.stopPropagation()}>
              {m.read ? (
                <button
                  title="Mark as unread"
                  onClick={() => onMarkRead(m.id, false)}
                >
                  {React.createElement(FaEnvelopeOpen)}
                </button>
              ) : (
                <button
                  title="Mark as read"
                  onClick={() => onMarkRead(m.id, true)}
                >
                  {React.createElement(FaEnvelope)}
                </button>
              )}
              <button title="Delete" onClick={() => setConfirmId(m.id)}>
                 {React.createElement(FaTrash)}
              </button>
              <button title="Label" onClick={() => setLabelForId(m.id)}>
                 {React.createElement(FaTag)}
              </button>
            </div>
          </div>
          <div className="row-2">
            <div className="subject">{m.subject}</div>
          </div>
          <div className="row-3">
            <div className="excerpt">{m.excerpt}</div>
            <div className="time">
              {new Date(m.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}

      {confirmId && (
        <DeletePopup
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            onDeleteEmail(confirmId);
            setConfirmId(null);
          }}
        />
      )}

      {labelForId && (
        <LabelPopup
          onClose={() => setLabelForId(null)}
          onSelect={(label) => {
            labelEmail(labelForId, label);
            setLabelForId(null);
          }}
        />
      )}
    </div>
  );
}
