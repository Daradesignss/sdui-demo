import React from "react";

// Small UI components (presentation layer)
export function Screen({ children }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      {children}
    </div>
  );
}

export function Text({ value }) {
  return <div style={{ fontSize: 18, marginBottom: 12 }}>{value}</div>;
}

export function Button({ label, analyticsId }) {
  return (
    <button
      onClick={() => {
        console.log("analytics event:", analyticsId);
        alert(`Clicked: ${label}`);
      }}
      style={{ padding: "8px 12px", cursor: "pointer" }}
    >
      {label}
    </button>
  );
}

export function Spacer({ height = 8 }) {
  return <div style={{ height }} />;
}
