import React from "react";
import { REGISTRY } from "./sdui/componentRegistry";

// The renderer: takes one schema node and renders it
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
