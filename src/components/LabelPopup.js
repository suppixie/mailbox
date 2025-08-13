import React, { useState } from "react";

export default function LabelPopup({ labels, onChoose, onClose }) {
  const [newLabel, setNewLabel] = useState("");
  return (
    <div className="pop label" onClick={(e)=>e.stopPropagation()}>
      <div className="row"><b>Labels</b></div>
      {labels.map((l)=>(
        <div key={l} className="row option" onClick={()=>onChoose(l)}>{l}</div>
      ))}
      <div className="row create">
        <input
          placeholder="Create new"
          value={newLabel}
          onChange={(e)=>setNewLabel(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==='Enter'){ onChoose(newLabel.trim()); setNewLabel(""); } }}
        />
      </div>
      <div className="actions" style={{marginTop:6}}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}