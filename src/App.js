import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.js";
import InboxComfortable from "./components/InboxViews/InboxComfortable.jsx";
import InboxCondensed from "./components/InboxViews/InboxCondensed.jsx";
import InboxGrid from "./components/InboxViews/InboxGrid.jsx";
import NewMailModal from "./components/Popups/NewMailModal.js";
import { FaFilter, FaCheckSquare, FaSyncAlt, FaEllipsisV, FaCog,FaSearch, FaThLarge, FaAlignJustify  } from "react-icons/fa";
import { MdFormatLineSpacing } from "react-icons/md";
import OpenEmailModal from "./components/Popups/OpenEmailModal.js";
import { initialFolders, initialEmails, defaultLabels } from "./Data/EmailData.js";
import "./App.css";

export default function App() {
  const [folders, setFolders] = useState(initialFolders);
  const [emails, setEmails] = useState(initialEmails);
  const [labels, setLabels] = useState(defaultLabels);
  const [activeFolderId, setActiveFolderId] = useState("inbox");
  const [openEmailId, setOpenEmailId] = useState(null);
  const [view, setView] = useState("comfortable"); // comfortable | condensed | grid
  const [showCompose, setShowCompose] = useState(false);
  const [showSentAlert, setShowSentAlert] = useState(false);


  const counters = useMemo(() => {
    const map = { primary: 0, promotions: 0, other: 0 };
    Object.values(emails).forEach((e) => {
      if (!e.read) {
        if (e.category && map[e.category] !== undefined) map[e.category]++;
      }
    });
    return map;
  }, [emails]);

  const setFolderOrder = (newOrder) => {
    setFolders(newOrder);
  };

  const onOpenEmail = (id) => {
    setEmails((prev) => ({ ...prev, [id]: { ...prev[id], read: true } }));
      setOpenEmailId(id);
  };

  const onToggleStar = (id) => {
    setEmails((prev) => {
      const next = { ...prev[id], starred: !prev[id].starred };
      return { ...prev, [id]: next };
    });
  };

  const onDeleteEmail = (id) => {
    setEmails((prev) => ({ ...prev, [id]: { ...prev[id], folder: "trash" } }));
  };

  const onMarkRead = (id, read = true) => {
    setEmails((prev) => ({ ...prev, [id]: { ...prev[id], read } }));
  };

  const addLabel = (name) => {
    if (!labels.includes(name)) setLabels((l) => [...l, name]);
  };

  const labelEmail = (id, name) => {
    addLabel(name);
    setEmails((prev) => {
      const set = new Set(prev[id].labels || []);
      set.add(name);
      return { ...prev, [id]: { ...prev[id], labels: Array.from(set) } };
    });
  };

  const moveEmailToFolder = (id, folderId) => {
    setEmails((prev) => ({ ...prev, [id]: { ...prev[id], folder: folderId } }));
  };

  const reorderFolders = (sourceId, targetId) => {
    const i = folders.findIndex((f) => f.id === sourceId);
    const j = folders.findIndex((f) => f.id === targetId);
    if (i < 0 || j < 0) return;
    const copy = [...folders];
    const [moved] = copy.splice(i, 1);
    copy.splice(j, 0, moved);
    setFolders(copy);
  };

  const visibleEmails = useMemo(() => {
  return Object.values(emails)
    .filter((e) => {
      // Starred
      if (activeFolderId === "starred") return e.starred;

      // Trash, Sent, Drafts, Inbox , Spam
      if (["inbox", "sent", "trash", "drafts","spam"].includes(activeFolderId)) {
        return e.folder === activeFolderId;
      }

      // Categories (Primary, Promotions, Other)
      const folderObj = folders.find(f => f.id === activeFolderId);
      if (folderObj?.isCategory) {
        return e.category === activeFolderId;
      }
      //labels
      if (labels.includes(activeFolderId)) {
        return e.labels?.includes(activeFolderId);
      }

      return false;
    })
    .sort((a, b) => b.timestamp - a.timestamp);
}, [emails, activeFolderId, folders, labels]);

  const handleDropOnFolder = (item, folderId) => {
    if (item.type === "email") {
      moveEmailToFolder(item.id, folderId);
    } else if (item.type === "folder-reorder") {
      reorderFolders(item.id, folderId);
    }
  };

  const ViewSwitcher = () => (
    <div className="view-toggle" role="group" aria-label="Toggle view">
      <button
        className={view === "comfortable" ? "active" : ""}
        title="Comfortable list"
        onClick={() => setView("comfortable")}
      >
        {React.createElement(MdFormatLineSpacing )}
      </button>
      <button
        className={view === "condensed" ? "active" : ""}
        title="Condensed list"
        onClick={() => setView("condensed")}
      >
        {React.createElement(FaAlignJustify)}
      </button>
      <button
        className={view === "grid" ? "active" : ""}
        title="Grid cards"
        onClick={() => setView("grid")}
      >
        {React.createElement(FaThLarge)}
      </button>
    </div>
  );

  const ListByView = () => {
    const sharedProps = {
      emails: visibleEmails,
      onOpenEmail,
      onToggleStar,
      onDeleteEmail,
      onMarkRead,
      labelEmail,
      onDragStartEmail: (id, ev) => {
        ev.dataTransfer.setData("application/x-mailbox", JSON.stringify({ type: "email", id }));
        ev.dataTransfer.effectAllowed = "move";
      },
    };
    if (view === "condensed") return <InboxCondensed {...sharedProps} onOpenEmail={onOpenEmail} />;
    if (view === "grid") return <InboxGrid {...sharedProps} onOpenEmail={onOpenEmail}/>;
    return <InboxComfortable {...sharedProps} onOpenEmail={onOpenEmail} />;
  };

  return (
    <div className="app-frame">
      <header className="topbar">
        <div className="brand">
          <span className="logo">Mailbox</span>
        </div>
        <div className="search">
          <span className="icon">{React.createElement(FaSearch)}</span>
          <input placeholder="Search" />
        </div>
        <div className="right-utilities">
          <ViewSwitcher />
          <button className="gear" title="Settings">{React.createElement(FaCog)}</button>
          <button className="avatar" title="Account">🪼</button>
        </div>
      </header>

      <div className="content">
        <Sidebar
          folders={folders}
          labels={labels}
          counters={counters}
          activeFolderId={activeFolderId}
          onSelectFolder={setActiveFolderId}
          setFolderOrder={setFolderOrder}
          onDropItem={handleDropOnFolder}
          onOpenCompose={() => setShowCompose(true)}
        />

        <main className="mail-area">
          <div className="toolbar">
            <button title="Filter">{React.createElement(FaFilter)}</button>
            <button title="Refresh">{React.createElement(FaSyncAlt)}</button>
            <button title="Select">{React.createElement(FaCheckSquare)}</button>
            <button title="More">{React.createElement(FaEllipsisV)}</button>
          </div>
          <ListByView />
        </main>
      </div>
      
      {showCompose && (
        <NewMailModal
          onClose={() => setShowCompose(false)}
          onSend={(item) => {
            const id = crypto.randomUUID();
            const now = Date.now();
            setEmails((prev) => ({
              ...prev,
              [id]: {
                id,
                folder: "sent",
                category: "primary",
                read: true,
                starred: false,
                labels: [],
                from: "You",
                to: item.to,
                address:"patalaymamth@gmail.com",
                subject: item.subject || "(no subject)",
                excerpt: item.body.slice(0, 120),
                time: now,
                Date: new Date(now).toLocaleString(),
                avatar: "🦑",
              },
            }));
            setShowCompose(false);
            setShowSentAlert(true);
            setTimeout(() => setShowSentAlert(false), 2500); 
          }}
        />
      )}
      {openEmailId && emails[openEmailId] && (
  <OpenEmailModal
    email={emails[openEmailId]}
    onClose={() => setOpenEmailId(null)}
    onToggleStar={() => onToggleStar(openEmailId)}
    onDelete={() => {
      onDeleteEmail(openEmailId);
      setOpenEmailId(null);
    }}
    onMore={() => {}}
  />
)}
      {showSentAlert && (
        <div className="sent-alert"> Your email has been sent
        </div>
      )}
    </div>
  );
}
