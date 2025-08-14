import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./InboxGrid.css";

export default function InboxGrid({ emails, onOpenEmail, onToggleStar, onDragStartEmail }) {
  return (
    <div className="grid">
      {emails.map((m) => (
        <div key={m.id} className={`card ${m.read ? "read" : "unread"}`} draggable onDragStart={(e) => onDragStartEmail(m.id, e)} onClick={() => onOpenEmail(m.id)}>
          <div className="card-top">
            <button
              className={`star ${m.starred ? "on" : ""}`}
              title="Star"
              onClick={(e) => { e.stopPropagation(); onToggleStar(m.id); }}
              style={{color: m.starred ? "#FFD600" : "#bbb", }}
              >{m.starred ? React.createElement(FaStar) : React.createElement(FaRegStar)}</button>
            <div className="time">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>
          <div className="avatar">{m.avatar}</div>
          <div className="from">{m.from}</div>
          <div className="subject">{m.subject}</div>
          <div className="excerpt">{m.excerpt}</div>
        </div>
      ))}
    </div>
  );
}
