import React, { useState } from "react";
import { FaStar, FaRegStar, FaTag, FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
// import DeletePopup from "../Popups/DeletePopup";
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
  const [labelForId, setLabelForId] = useState(null);
  const [actionHoverId, setActionHoverId] = useState(null); // <-- Added

  return (
    <div className="grid">
        {emails.map((m) => (
          <div
            key={m.id}
            className={`card ${m.read ? "read" : "unread"}`}
            onMouseEnter={() => setActionHoverId(m.id)}
            onMouseLeave={() => setActionHoverId(null)}
            onClick={() => onOpenEmail(m.id)}   
                   >
              {actionHoverId === m.id && ( 
              <div className="mail-drag-handle-grid" 
              draggable onDragStart={(e) => onDragStartEmail(m.id, e)}
              title="Drag to move"> ⋮⋮</div>
              

            )}
            
{/* {actionHoverId !== m.id && m.new && <span className="new-status">•</span>} */}
{actionHoverId !== m.id && <span className="new-status"></span>}

            
          <div className="row-1">
            <div className="grid-star-avatar-from">

              <button
                className={`star ${m.starred ? "on" : ""}`} aria-label="Star"
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
              <div className="from">{m.from}
                 <div className="time">{m.time}</div>
                 </div>
            </div>
            <div className="grid-actions" onClick={(e) => e.stopPropagation()}>
              {m.read ? (
                <button aria-label="Mark as unread" title="Mark as unread" onClick={() => onMarkRead(m.id, false)}>
                  < FaEnvelope/>
                </button>
              ) : (
                <button aria-label="mark as read" title="Mark as read" onClick={() => onMarkRead(m.id, true)}>
                  <FaEnvelopeOpen />
                </button>
              )}
              <button aria-label="delete" title="Delete" onClick={() => onDeleteEmail(m.id)}>
                <FaTrash />
              </button>
              <button aria-label="label" title="Label" onClick={() => setLabelForId(m.id)}>
                <FaTag />
              </button>
            </div>
          </div>
          <div className="row-2">
            <div className="subject">{m.subject}</div>
          </div>
          <div className="row-3">
            <div className="excerpt">{m.excerpt}</div>
          </div>
        </div>
      ))}

      {/* {confirmId && (
        <DeletePopup
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            onDeleteEmail(confirmId);
            setConfirmId(null);
          }}
        />
      )} */}

    {labelForId && (
              <LabelPopup
                existingLabels={["Job Alerts", "Interviews"]}
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
