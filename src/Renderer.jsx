import React from "react";

// 1) Small UI components (presentation layer)
function Screen({ children }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      {children}
    </div>
  );
}

function Text({ value }) {
  return <div style={{ fontSize: 18, marginBottom: 12 }}>{value}</div>;
}

function Button({ label, analyticsId }) {
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

function Spacer({ height = 8 }) {
  return <div style={{ height }} />;
}

// 2) Registry: schema "type" -> React component
const REGISTRY = { Screen, Text, Button, Spacer, };

// 3) The renderer: takes one schema node and renders it
export default function Renderer({ node }) {
  if (!node || typeof node !== "object") return null;

  const { type, props, children } = node;

  if (typeof type !== "string") return <div>Invalid schema node</div>;

  const Component = REGISTRY[type];

  // If server sends an unknown component type, don't crash
  if (!Component) {
    return (
      <div style={{ color: "crimson" }}>
        Unknown component type: <b>{type}</b>
      </div>
    );
  }

  return (
    <Component {...props}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <Renderer key={index} node={child} />
          ))
        : null}
    </Component>
  );
}
