"use client";
import React from "react";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

export default function PortfolioFooter({ data }) {
  return (
    <footer style={{ background: "#080604", borderTop: `1px solid rgba(192,64,46,0.15)`, padding: "2.5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        {/* Left — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "3px", height: "20px", background: BRICK }} />
          <span style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "17px", letterSpacing: "0.12em", color: "rgba(237,232,224,0.5)" }}>
            {data?.name?.split(" ")[0] || "Portfolio"}
          </span>
        </div>

        {/* Center — copyright */}
        <span style={{ fontFamily: OSWALD, fontSize: "9px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(237,232,224,0.2)" }}>
          © {new Date().getFullYear()} {data?.name} — All Rights Reserved
        </span>

        {/* Right — Salience badge */}
        <span style={{ fontFamily: OSWALD, fontSize: "9px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(237,232,224,0.2)" }}>
          Built with <span style={{ fontWeight: 700, color: BRICK }}>Salience</span>
        </span>
      </div>
    </footer>
  );
}
