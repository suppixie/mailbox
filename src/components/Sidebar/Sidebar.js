import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({
  folders,
  labels,
  counters,
  activeFolderId,
  onSelectFolder,
  setFolderOrder,
  onDropItem,
  onOpenCompose,
}) {
  const [showAllFolders, setShowAllFolders] = useState(false);
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
  ev.preventDefault();
  const data = ev.dataTransfer.getData("application/x-mailbox");
  if (!data) return;

  const item = JSON.parse(data);

  if (item.type === "folder-reorder" && item.id !== targetId) {
    const updated = [...folders];
    const fromIndex = updated.findIndex(f => f.id === item.id);
    const toIndex = updated.findIndex(f => f.id === targetId);

    if (fromIndex > -1 && toIndex > -1) {
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setFolderOrder(updated); 
    }
  } else if (item.type === "email") {
    onDropItem(item, targetId);
  }

  setDragFolderId(null);
};

  const top = folders.slice(0, folders.findIndex((f) => f.id === "documents") + 1);
  const categories = folders.filter((f) => f.isCategory);
  
  const defaultCount = 5;
  const foldersToShow = showAllFolders ? top : top.slice(0, defaultCount);
  const hasMore = top.length > defaultCount;
  
  const counterFor = (id) => {
    if (id === "primary") return counters.primary;
    if (id === "promotions") return counters.promotions;
    if (id === "other") return counters.other;
    return 0;
  };

  return (
    <div className="menu">
      <div className="sidebar-header">
          <button className="hamburger" aria-label="menu">{React.createElement(FaBars)}</button>
        <button className="compose-btn" onClick={onOpenCompose}>+ New Mail</button>
      </div>
      <div className="sidebar">
      <ul className="folder-list" role="listbox" aria-label="Folders">
       {foldersToShow.map((f) => (
          <li
              key={f.id}
              className={`folder-item 
                          ${activeFolderId === f.id ? "active" : ""} 
                          ${dragFolderId === f.id ? "dragging" : ""}`}
              draggable
              onDragStart={(e) => onDragStartFolder(f.id, e)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(f.id, e)}
              onClick={() => onSelectFolder(f.id)}
            >
              <span className="drag-handle">⋮⋮</span>
              <span className="icon" aria-hidden>{React.createElement(f.icon)}</span>
              <span className="name">{f.name}</span>
            </li>
  ))}
</ul>

{hasMore && !showAllFolders && (
  <div className="more" onClick={() => setShowAllFolders(true)}>more ▾</div>
)}
{hasMore && showAllFolders && (
  <div className="more" onClick={() => setShowAllFolders(false)}>less ▴</div>
)}

      <div className="section">Categories</div>
      <ul className="folder-list">
        {categories.map((f) => (
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
            <span className="dot">{React.createElement(f.icon)}</span>
            <span className="name">{f.name}</span>
            {counterFor(f.id) > 0 && <span className="pill">{counterFor(f.id)}</span>}
          </li>
        ))}
      </ul>

      <div className="section labels-head">Labels <button className="add">＋</button></div>
      <ul className="labels">
        {labels.map((l) => (
          <li key={l} onClick={() => onSelectFolder(l)}>#{l}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}
