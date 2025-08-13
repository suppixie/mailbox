import React from "react";
import EmailItem from "./EmailItem";

export default function EmailList({ emails, activeFolder, onOpen, onToggleStar, onMarkRead, onDelete, onAddLabel, onDragStart, allLabels }) {
  return (
    <div className="list">
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={{ ...email, allLabels }}
          originFolder={activeFolder === "starred" ? email.__from : activeFolder}
          activeFolder={activeFolder}
          onOpen={onOpen}
          onToggleStar={onToggleStar}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
          onAddLabel={onAddLabel}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}