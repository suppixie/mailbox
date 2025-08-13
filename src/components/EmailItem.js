import React, { useState } from "react";
import DeletePopup from "./DeletePopup";
import LabelPopup from "./LabelPopup";

const StarIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#F5C518" : "none"}>
    <path
      d="M12 3l2.9 5.88 6.5.94-4.7 4.58 1.1 6.43L12 17.77 6.2 21l1.1-6.43L2.6 9.82l6.5-.94L12 3z"
      stroke="currentColor" strokeWidth="1.5" fill={filled ? "#F5C518" : "none"}
    />
  </svg>
);

const AttachmentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.5l-8.5 8.5a6 6 0 01-8.5-8.5L12 4a4 4 0 116 6l-9 9a2 2 0 01-3-3l8-8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function EmailItem({ email, originFolder, activeFolder, onOpen, onToggleStar, onMarkRead, onDelete, onAddLabel, onDragStart }) {
  const [hover, setHover] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const isOpened = email.opened;
  const rowCls = ["email", hover && "hover", isOpened && "opened"].filter(Boolean).join(" ");
  const bold = email.unread && !isOpened;

  return (
    <div
      className={rowCls}
      draggable
      onDragStart={(e)=>onDragStart(e, email, originFolder)}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>{ setHover(false); setShowDelete(false); setShowLabel(false); }}
      onClick={()=>onOpen(email, originFolder)}
    >
      <div className="left">
        <button
          className={["star", email.starred && "on"].filter(Boolean).join(" ")}
          onClick={(ev)=>{ ev.stopPropagation(); onToggleStar(email, originFolder); }}
          title={email.starred ? "Unstar" : "Star"}
        >
          <StarIcon filled={email.starred} />
        </button>
        <div className="sender">{email.sender}</div>
        <div className={["subject", bold && "bold"].filter(Boolean).join(" ")}>{email.subject}</div>
        <div className="preview">{email.preview}</div>
        {email.hasAttachment && <span className="attach" title="Attachment"><AttachmentIcon/></span>}
      </div>
      <div className={["right", bold && "bold"].filter(Boolean).join(" ")}>{email.time}</div>

      <div className="email-actions" onClick={(e)=>e.stopPropagation()}>
        <button title="Mark as read" onClick={()=>onMarkRead(email, originFolder)}>✓</button>
        <button title="Delete" onClick={()=>setShowDelete(true)}>🗑️</button>
        <button title="Label" onClick={()=>setShowLabel(true)}>🏷️</button>

        {showDelete && (
          <DeletePopup
            onConfirm={()=>onDelete(email, originFolder)}
            onCancel={()=>setShowDelete(false)}
          />
        )}
        {showLabel && (
          <LabelPopup
            labels={email.allLabels}
            onChoose={(l)=>{ onAddLabel(email, originFolder, l); setShowLabel(false); }}
            onClose={()=>setShowLabel(false)}
          />
        )}
      </div>
    </div>
  );
}