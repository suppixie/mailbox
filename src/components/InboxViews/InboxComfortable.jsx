import React, { useState } from "react";
import "./InboxComfortable.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import DeletePopup from "../Popups/DeletePopup.js";
import LabelPopup from "../Popups/LabelPopup.js";

export default function InboxComfortable({
  emails,
  onOpenEmail,
  onToggleStar,
  onDeleteEmail,
  onMarkRead,
  labelEmail,
  onDragStartEmail,
}) {
  const [actionHoverId, setActionHoverId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [labelForId, setLabelForId] = useState(null);

  return (
    <div className="list comfortable">
      {emails.map((m) => (
        <div
          key={m.id}
          className={`row ${m.read ? "read" : "unread"}`}
          draggable
          onDragStart={(e) => onDragStartEmail(m.id, e)}
          onMouseEnter={() => setActionHoverId(m.id)}
          onMouseLeave={() => setActionHoverId(null)}
          onClick={() => onOpenEmail(m.id)}
        >
          <button
            className={`star ${m.starred ? "on" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(m.id);
            }}
            title="Star" style={{color: m.starred ? "#FFD600" : "#bbb", }}
                          >{m.starred ? React.createElement(FaStar) : React.createElement(FaRegStar)}</button>

          <div className="avatar">{m.avatar}</div>
          <div className="main">
            <div className="top">
              <div className="from">{m.from}</div>
              <div className="time">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
            <div className="subject">{m.subject}</div>
            <div className="excerpt">{m.excerpt}</div>
          </div>

          <div className={`actions ${actionHoverId === m.id ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
            <button title="Mark as read" onClick={() => onMarkRead(m.id, true)}>✉️</button>
            <button title="Delete" onClick={() => setConfirmId(m.id)}>🗑️</button>
            <button title="Label" onClick={() => setLabelForId(m.id)}>🏷️</button>
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
