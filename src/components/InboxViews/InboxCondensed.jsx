import React from "react";
import "./InboxCondensed.css";

export default function InboxCondensed({ emails, onOpenEmail, onToggleStar, onDeleteEmail, onMarkRead, labelEmail, onDragStartEmail }) {
  return (
    <div className="list condensed">
      {emails.map((m) => (
        <div key={m.id} className={`row ${m.read ? "read" : "unread"}`} draggable onDragStart={(e) => onDragStartEmail(m.id, e)} onClick={() => onOpenEmail(m.id)}>
          <button
            className={`star ${m.starred ? "on" : ""}`}
            title="Star"
            onClick={(e) => { e.stopPropagation(); onToggleStar(m.id); }}
          >★</button>
          <div className="from">{m.from}</div>
          <div className="subject">{m.subject}</div>
          <div className="time">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
      ))}
    </div>
  );
}
