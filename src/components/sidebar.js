import React from "react";

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function Sidebar({ folders, activeFolder, setActiveFolder, onReorder, onFolderDropEmail, unreadCounts, labels, onCreateLabel, onOpenCompose }) {
  return (
    <aside className="sidebar">
      <button className="newmail" onClick={onOpenCompose}>+ New Mail</button>

      <ul className="folders">
        {folders.map((f) => (
          <li
            key={f.id}
            className={["folder", activeFolder===f.id && "active"].filter(Boolean).join(" ")}
            draggable
            onDragStart={(e)=>{ e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", f.id); }}
            onDragOver={(e)=>e.preventDefault()}
            onDrop={(e)=>{
              e.preventDefault();
              const srcId = e.dataTransfer.getData("text/plain");
              if (srcId && srcId !== f.id && onReorder) onReorder(srcId, f.id);
              // Also allow dropping emails into a folder
              onFolderDropEmail(f.id);
            }}
            onClick={()=>setActiveFolder(f.id)}
          >
            <div className="dot"/>
            <span>{f.name}</span>
            {typeof f.count === "number" && <span className="count">{f.count}</span>}
            {f.id === "drafts" && <span className="count">3</span>}
          </li>
        ))}
      </ul>

      <div className="less">less ^</div>

      <div className="system">
        <div className="row"><span>Primary</span><b className="pill">{unreadCounts.primary}</b></div>
        <div className="row"><span>Promotions</span><b className="pill">{unreadCounts.promotions}</b></div>
        <div className="row"><span>Other</span><b className="pill">{unreadCounts.other}</b></div>
      </div>

      <div className="labels">
        <div className="head">
          <span>Labels</span>
          <button className="add" onClick={()=>{
            const name = prompt("Create new label");
            if (name) onCreateLabel(name);
          }}>+</button>
        </div>
        <ul>
          {labels.map((l)=> <li key={l}>{l}</li>)}
        </ul>
      </div>
    </aside>
  );
}