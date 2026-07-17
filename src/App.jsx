import React from "react";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#333" }}>MDGN App Loaded ✅</h1>
      <p style={{ color: "#666", marginTop: "10px" }}>
        If you see this screen, React and Cordova are working correctly.
      </p>
      <p style={{ color: "#999", fontSize: "14px", marginTop: "20px" }}>
        Next step: replace this placeholder with your real app screens.
      </p>
    </div>
  );
}
