import React, { useState } from "react";
import {
  FaRegStar,
  FaStar,
  FaReply,
  FaTrash,
  FaEllipsisV
} from "react-icons/fa";
import { LuMinimize, LuMaximize2 } from "react-icons/lu";
import { RxReset } from "react-icons/rx";
import "./OpenEmailModal.css";

export default function OpenEmailModal({
  email,
  onClose,
  onReply,
  onToggleStar,
  onDelete,
  onMore,
}) {
  const [viewMode, setViewMode] = useState("normal"); 
  // "normal", "minimized", "expanded"

  if (!email) return null;

  return (
    <div className={`modal-container ${viewMode}`}>
      <div
        className="modal-header"
        onClick={() => {
          if (viewMode === "minimized") setViewMode("normal");
        }}
      >
        <span className="modal-title">{email.subject}</span>
        <div className="modal-header-actions">
          <button
            className="icon-btn"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("minimized");
            }}
          >
            _
          </button>

          <button
            className="icon-btn"
            title={viewMode === "expanded" ? "Restore" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              setViewMode(viewMode === "expanded" ? "normal" : "expanded");
            }}
          >
            {viewMode === "expanded" ? <LuMinimize /> : <LuMaximize2 />}
          </button>

          <button
            className="icon-btn"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {viewMode !== "minimized" && (
        <div className="modal-sender">
          <div className="sender-left">
            <div className="avatar">
              {email.avatar ? (
                <img src={email.avatar} alt={email.from} />
              ) : (
                email.from.charAt(0)
              )}
            </div>
            <div className="sender-info">
              <span className="sender-name">{email.from}</span>
              <span className="sender-address">{email.address}</span>
            </div>
          </div>
          <div className="sender-right">
            <div className="sender-right-actions">
            <button
              className="icon-btn"
              title={email.starred ? "Unstar" : "Star"}
              onClick={onToggleStar}
            >
              {email.starred ? <FaStar /> : <FaRegStar />}
            </button>
            <button className="icon-btn" title="Reply" onClick={onReply}>
              <FaReply /> Reply
            </button>
            <button className="icon-btn" title="Delete" onClick={onDelete}>
              <FaTrash />
            </button>
            <button className="icon-btn" title="More" onClick={onMore}>
              <FaEllipsisV />
            </button></div>
            <span className="email-date-time">
              {email.date} {email.time}
            </span>
          </div>
        </div>
      )}

      {viewMode !== "minimized" && (
        <div className="modal-body">
          {email.image && <img src={email.image} alt="" className="email-banner" />}
          <div
            className="email-content"
            dangerouslySetInnerHTML={{ __html: email.content }}
          />
        </div>
      )}
    </div>
  );
}
