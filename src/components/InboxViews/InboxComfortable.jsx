import React, { useState } from "react";
import "./InboxComfortable.css";
import { FaStar, FaRegStar, FaTag , FaTrash , FaEnvelope , FaEnvelopeOpen, FaBars } from "react-icons/fa";
import DeletePopup from "../Popups/DeletePopup.js";
import LabelPopup from "../Popups/LabelPopup.js";
import OpenEmailModal from "../Popups/OpenEmailModal.js"; 

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

  const [openedEmail, setOpenedEmail] = useState(null);

  return (
    <>
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
             {actionHoverId === m.id && (
              <span className="mail-area-drag-handle"
                draggable
                onDragStart={(e) => onDragStartEmail(m.id, e)}
                title="Drag to move" > ⋮⋮</span>
            )}

            <div className="column-1">
              <button
                className={`star ${m.starred ? "on" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(m.id);
                }}
                title="Star"
                style={{ color: m.starred ? "#FFD600" : "#bbb" }}
              >
                {m.starred ? <FaStar /> : <FaRegStar />}
              </button>

              <div className="avatar">{m.avatar}</div>
              <div className="from">{m.from}</div>
            </div>

            <div className="main column-2">
              <div className="subject">{m.subject}</div>
              <div className="excerpt">{m.excerpt}</div>
            </div>

            <div className="column-3">
              {actionHoverId === m.id ? (
                <div className="actions" onClick={(e) => e.stopPropagation()}>
                  {m.read ? (
                    <button
                      title="Mark as unread"
                      onClick={() => onMarkRead(m.id, false)}
                    >
                      <FaEnvelopeOpen />
                    </button>
                  ) : (
                    <button
                      title="Mark as read"
                      onClick={() => onMarkRead(m.id, true)}
                    >
                      <FaEnvelope />
                    </button>
                  )}
                  <button title="Delete" onClick={() => setConfirmId(m.id)}>
                    <FaTrash />
                  </button>
                  <button title="Label" onClick={() => setLabelForId(m.id)}>
                    <FaTag />
                  </button>
                </div>
              ) : (
                <div className="date-time">
                  {m.time}
                </div>
              )}
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
            existingLabels={["Job Alerts", "Interviews"]}
            onClose={() => setLabelForId(null)}
            onSelect={(label) => {
              labelEmail(labelForId, label);
              setLabelForId(null);
            }}
          />
        )}
      </div>

      {openedEmail && (
        <OpenEmailModal
          email={openedEmail}
          onClose={() => setOpenedEmail(null)}
          onReply={() => console.log("Replying to", openedEmail)}
          onToggleStar={() => onToggleStar(openedEmail.id)}
          onDelete={() => {
            onDeleteEmail(openedEmail.id);
            setOpenedEmail(null);
          }}
          onMore={() => console.log("More actions")}
        />
      )}
    </>
  );
}
