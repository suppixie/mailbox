import React, { useMemo, useRef, useState } from "react";
import Sidebar from "./components/sidebar";
import EmailList from "./components/EmailList";
import NewMailModal from "./components/NewMailModal";
import { seedFolders, seedLabels, seedPages } from "./Data/EmailData";
import "./Inbox.css"
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18l-7 8v4l-4 2v-6L3 6z" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M20 12a8 8 0 10-2.34 5.66M20 12V7m0 5h-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const CheckboxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
  </svg>
);

export default function Inbox() {
  const [folders, setFolders] = useState(seedFolders);
  const [labels, setLabels] = useState(seedLabels);
  const [pages, setPages] = useState(seedPages);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [composeOpen, setComposeOpen] = useState(false);

  const dragInfo = useRef(null);

  // STARRED folder
  const starredEmails = useMemo(() => {
    const result = [];
    Object.entries(pages).forEach(([fid, arr]) => arr.forEach((e)=> e.starred && result.push({ ...e, __from: fid })));
    return result;
  }, [pages]);

  const currentEmails = useMemo(() => {
    return activeFolder === "starred" ? starredEmails : (pages[activeFolder] || []);
  }, [activeFolder, pages, starredEmails]);

  const unreadCounts = useMemo(() => {
    const countIn = (key) => (pages[key] || []).filter((e) => e.unread).length;
    return { primary: countIn("inbox"), promotions: countIn("promotions"), other: countIn("other") };
  }, [pages]);

  // Sidemenu reorder
  const handleReorderFolders = (srcId, dstId) => {
    const from = folders.findIndex((f)=>f.id===srcId);
    const to = folders.findIndex((f)=>f.id===dstId);
    if (from<0 || to<0 || from===to) return;
    const next = folders.slice();
    const [moved] = next.splice(from,1);
    next.splice(to,0,moved);
    setFolders(next);
  };

  // Email drag start
  const onEmailDragStart = (e, email, fromFolder) => {
    dragInfo.current = { type: "move-email", emailId: email.id, fromFolder };
    e.dataTransfer.effectAllowed = "move";
  };

  // Email Sidebar drop
  const onFolderDropEmail = (targetFolder) => {
    const info = dragInfo.current;
    if (!info || info.type !== "move-email") return;
    if (targetFolder === "starred") return; // cannot drop into smart folder
    setPages((prev) => {
      const src = (prev[info.fromFolder] || []).slice();
      const idx = src.findIndex((x) => x.id === info.emailId);
      if (idx < 0) return prev;
      const [moved] = src.splice(idx, 1);
      const dst = (prev[targetFolder] || []).slice();
      dst.unshift({ ...moved, unread: true });
      return { ...prev, [info.fromFolder]: src, [targetFolder]: dst };
    });
    dragInfo.current = null;
  };

  // Email actions
  const openEmail = (email, originFolder) => {
    if (activeFolder === "starred") originFolder = email.__from;
    setPages((prev)=> ({
      ...prev,
      [originFolder]: (prev[originFolder]||[]).map((e)=> e.id===email.id ? { ...e, unread:false, opened:true } : e)
    }));
  };
  const toggleStar = (email, originFolder) => {
    if (activeFolder === "starred") originFolder = email.__from;
    setPages((prev)=> ({
      ...prev,
      [originFolder]: (prev[originFolder]||[]).map((e)=> e.id===email.id ? { ...e, starred:!e.starred } : e)
    }));
  };
  const markAsRead = (email, originFolder) => {
    if (activeFolder === "starred") originFolder = email.__from;
    setPages((prev)=> ({
      ...prev,
      [originFolder]: (prev[originFolder]||[]).map((e)=> e.id===email.id ? { ...e, unread:false } : e)
    }));
  };
  const deleteEmail = (email, originFolder) => {
    if (activeFolder === "starred") originFolder = email.__from;
    setPages((prev)=>{
      const src = (prev[originFolder]||[]).filter((e)=>e.id!==email.id);
      const dst = (prev.trash||[]).slice();
      dst.unshift({ ...email, unread:false });
      return { ...prev, [originFolder]: src, trash: dst };
    });
  };
  const addLabelToEmail = (email, originFolder, label) => {
    if (!label) return;
    if (activeFolder === "starred") originFolder = email.__from;
    setPages((prev)=> ({
      ...prev,
      [originFolder]: (prev[originFolder]||[]).map((e)=> e.id===email.id ? { ...e, labels: e.labels.includes(label)? e.labels : [...e.labels, label] } : e)
    }));
    setLabels((ls)=> ls.includes(label) ? ls : [...ls, label]);
  };

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="left">
          <div className="brand">Mailbox</div>
        </div>
        <div className="right">
          <div className="circle" title="List"></div>
          <div className="circle" title="Grid"></div>
          <div className="circle" title="Settings"></div>
          <div className="avatar"/>
        </div>
      </div>

      <div className="layout">
        <Sidebar
          folders={folders}
          activeFolder={activeFolder}
          setActiveFolder={setActiveFolder}
          onReorder={handleReorderFolders}
          onFolderDropEmail={(fid)=>onFolderDropEmail(fid)}
          unreadCounts={unreadCounts}
          labels={labels}
          onCreateLabel={(name)=> setLabels((ls)=> ls.includes(name) ? ls : [...ls, name]) }
          onOpenCompose={()=>setComposeOpen(true)}
        />

        <main className="main">
          <div className="searchbar">
            <span className="icon"><SearchIcon/></span>
            <input placeholder="Search"/>
          </div>
          <div className="toolbar">
            <span className="tool"><FilterIcon/></span>
            <span className="tool"><RefreshIcon/></span>
            <span className="tool"><CheckboxIcon/></span>
            <span className="tool"><MoreIcon/></span>
          </div>

          <EmailList
            emails={currentEmails}
            activeFolder={activeFolder}
            onOpen={openEmail}
            onToggleStar={toggleStar}
            onMarkRead={markAsRead}
            onDelete={deleteEmail}
            onAddLabel={addLabelToEmail}
            onDragStart={onEmailDragStart}
            allLabels={labels}
          />
        </main>
      </div>

      {composeOpen && <NewMailModal onClose={()=>setComposeOpen(false)}/>} 
    </div>
  );
}
