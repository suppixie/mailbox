import React, { useState } from "react";
import {FaFont, FaLink , FaImage , FaPaperclip, FaPaperPlane, } from "react-icons/fa";
import {LuMaximize2, LuX} from "react-icons/lu";
import "./NewMailModal.css";

export default function NewMailModal({ onClose, onSend }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
  <div className={`compose ${isMinimized ? "minimized" : ""}`}>

        <div className="header" onClick={() => {
          if (isMinimized) setIsMinimized(false);
        }}>
        <div className="title">New Message</div>
        <div className="window-controls">
          {!isMinimized ? (
    <>
      <button onClick={() => setIsMinimized(true)} title="Minimize">🗕</button>
      <button onClick={onClose} title="Close">{React.createElement(LuX)}</button>
    </>
  ) : (
    <>
      <button onClick={() => setIsMinimized(false)} title="Maximize">{React.createElement(LuMaximize2)}</button>
      <button onClick={onClose} title="Close">{React.createElement(LuX)}</button>
    </>
  )}
        </div>
      </div>
       {!isMinimized && (
        <>
          <div className="fields">
            <label>
              To
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
            <label>
              Subject
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}/>
            </label>
          </div>

      <textarea className="editor" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your email…" />
      <div className="newmail-toolbar">
        <div className="left">
          <button className="tools" title="Attach file"> {React.createElement(FaPaperclip)}</button>
          <button className="tools" title="Insert image"> {React.createElement(FaImage)}</button>
          <button className="tools" title="Insert link"> {React.createElement(FaLink)}</button>
          <button className="tools" title="Formatting"> {React.createElement(FaFont)}</button>
        </div>
        <button className="send-btn" onClick={() => onSend({ to, subject, body })}>Send {React.createElement(FaPaperPlane)}</button>
      </div>
      </>
     )}
    </div>
    
  );
}
