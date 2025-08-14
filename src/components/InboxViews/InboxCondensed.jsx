import React, {useState} from "react";
import { FaStar, FaRegStar, FaTrash, FaTag, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import DeletePopup from "../Popups/DeletePopup.js";
import LabelPopup from "../Popups/LabelPopup.js";
import "./InboxCondensed.css";

export default function InboxCondensed({ emails, onOpenEmail, onToggleStar, onDeleteEmail, onMarkRead, labelEmail, onDragStartEmail }) {
    const [actionHoverId, setActionHoverId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);
    const [labelForId, setLabelForId] = useState(null);
  return (
    <div className="list condensed">
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
          <div className="column-1">
          <button
            className={`star ${m.starred ? "on" : ""}`}
            title="Star"
            onClick={(e) => { e.stopPropagation(); onToggleStar(m.id); }}
            style={{color: m.starred ? "#FFD600" : "#bbb", }}
                          >{m.starred ? React.createElement(FaStar) : React.createElement(FaRegStar)}
          </button>
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
                          <button title="Mark as unread" 
                              onClick={() => onMarkRead(m.id, false)}
                                >{React.createElement(FaEnvelopeOpen)}
                          </button>
                          ) : (
                          <button title="Mark as read" 
                              onClick={() => onMarkRead(m.id, true)}
                                >{React.createElement(FaEnvelope)}
                          </button>
                          )}
                          <button title="Delete" onClick={() => setConfirmId(m.id)}>{React.createElement(FaTrash)}</button>
                          <button title="Label" onClick={() => setLabelForId(m.id)}>{React.createElement(FaTag)}</button>
                          </div>
                        ) : (
                            <div className="date-time">
                              {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
