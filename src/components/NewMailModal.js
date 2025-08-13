import React, { useState } from "react";

const Icon = {
  close: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>),
  expand: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="currentColor" strokeWidth="2"/></svg>),
  minimize: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2"/></svg>)
};

export default function NewMailModal({ onClose }) {
  const [mode, setMode] = useState("normal"); // normal | minimized | expanded
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const cls = ["compose", mode === "expanded" && "compose--expanded", mode === "minimized" && "compose--min"].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <div className="compose__header">
        <div>New Message</div>
        <div className="compose__headerActions">
          <button title="Expand" onClick={()=>setMode("expanded")}><Icon.expand/></button>
          <button title="Minimize" onClick={()=>setMode("minimized")}><Icon.minimize/></button>
          <button title="Close" onClick={onClose}><Icon.close/></button>
        </div>
      </div>
      {mode !== "minimized" && (
        <div className="compose__body">
          <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder="To"/>
          <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject"/>
          <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Write your email..."/>
          <div className="compose__toolbar">
            <button title="Insert file">📎</button>
            <button title="Insert image">🖼️</button>
            <button title="Insert link">🔗</button>
            <button title="Formatting">Aa</button>
            <div className="grow"/>
            <button className="send">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}