import React, { useMemo, useState } from "react";
import "./Sidebar.css";

export default function Sidebar({
  folders,
  labels,
  counters,
  activeFolderId,
  onSelectFolder,
  setFolderOrder,
  onDropPayload,
  onOpenCompose,
}) {
  const [dragFolderId, setDragFolderId] = useState(null);

  const onDragStartFolder = (id, ev) => {
    setDragFolderId(id);
    ev.dataTransfer.setData(
      "application/x-mailbox",
      JSON.stringify({ type: "folder-reorder", id })
    );
    ev.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (targetId, ev) => {
    const data = ev.dataTransfer.getData("application/x-mailbox");
    if (!data) return;
    const payload = JSON.parse(data);
    onDropPayload(payload, targetId);
    setDragFolderId(null);
  };

  const top = folders.slice(0, folders.findIndex((f) => f.id === "documents") + 1);
  const categories = folders.filter((f) => f.isCategory);

  const counterFor = (id) => {
    if (id === "primary") return counters.primary;
    if (id === "promotions") return counters.promotions;
    if (id === "other") return counters.other;
    return 0;
  };

  return (
    <aside className="sidebar">
      <button className="compose" onClick={onOpenCompose}>+ New Mail</button>

      <ul className="folder-list" role="listbox" aria-label="Folders">
        {top.map((f) => (
          <li
            key={f.id}
            className={`folder-item ${activeFolderId === f.id ? "active" : ""}`}
            draggable
            onDragStart={(e) => onDragStartFolder(f.id, e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(f.id, e)}
            onClick={() => onSelectFolder(f.id)}
          >
            <span className="drag-handle">⋮⋮</span>
            <span className="icon" aria-hidden>{f.icon}</span>
            <span className="name">{f.name}</span>
            {!f.isCategory && f.id === "drafts" ? <span className="count">3</span> : null}
          </li>
        ))}
      </ul>

      <div className="less">less ▴</div>

      <div className="section">Categories</div>
      <ul className="folder-list">
        {categories.map((f) => (
          <li
            key={f.id}
            className={`folder-item ${activeFolderId === f.id ? "active" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(f.id, e)}
            onClick={() => onSelectFolder(f.id)}
          >
            <span className="dot" />
            <span className="name">{f.name}</span>
            {counterFor(f.id) > 0 && <span className="pill">{counterFor(f.id)}</span>}
          </li>
        ))}
      </ul>

      <div className="section labels-head">Labels <button className="add">＋</button></div>
      <ul className="labels">
        {labels.map((l) => (
          <li key={l}>#{l}</li>
        ))}
      </ul>
    </aside>
  );
}