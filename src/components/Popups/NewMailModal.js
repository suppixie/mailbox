import React, { useState } from "react";
import "./NewMailModal.css";

export default function NewMailModal({ onClose, onSend }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className={`compose ${isExpanded ? "expanded" : ""}`}>
      <div className="header">
        <div className="title">New Message</div>
        <div className="window-controls">
          <button onClick={() => setIsExpanded((v) => !v)} title="Expand">⤢</button>
          <button onClick={onClose} title="Minimize">🗕</button>
          <button onClick={onClose} title="Close">✕</button>
        </div>
      </div>
      <div className="fields">
        <label>
          To
          <input value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label>
          Subject
          <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
      </div>
      <textarea className="editor" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your email…" />
      <div className="toolbar">
        <div className="left">
          <button title="Attach file">📎</button>
          <button title="Insert image">🖼️</button>
          <button title="Insert link">🔗</button>
          <button title="Formatting">A𝘢</button>
        </div>
        <button className="send" onClick={() => onSend({ to, subject, body })}>Send ▷</button>
      </div>
    </div>
  );
}
