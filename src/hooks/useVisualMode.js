import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition (newMode, replace = false) {
    if (replace) {
      history.pop()
    }
   setHistory([...history, newMode])
    setMode(newMode);
    
  }
  function back() { 
    if (history.length > 1){
    history.pop()
    setMode(history[history.length -1])
  }
}

  return { mode, transition, back };
  
}

