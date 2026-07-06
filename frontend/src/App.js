import React, { useEffect } from "react";

// The vanilla portfolio lives directly in public/index.html.
// React mounts into a hidden #root and does nothing.
export default function App() {
  useEffect(() => {
    const r = document.getElementById("root");
    if (r) r.style.display = "none";
  }, []);
  return null;
}
