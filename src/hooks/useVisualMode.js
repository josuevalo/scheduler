// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => {
        const sliced = prev.slice(0, prev.length - 1);
        return [...sliced, newMode];
      });
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const sliced = history.slice(0, history.length - 1);
      setHistory(sliced);
      setMode(sliced[sliced.length - 1]);
    }
  }

  return { mode, transition, back };
}
