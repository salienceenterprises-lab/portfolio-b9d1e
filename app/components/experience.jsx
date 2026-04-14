"use client";
import React from "react";
import { motion } from "framer-motion";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='2' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='63' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='2' y='32' width='26' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='34' y='32' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='95' y='32' width='23' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3C/svg%3E")`;

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{ background: "#161210", backgroundImage: BRICK_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        @media(max-width:767px){
          #experience { padding: 4rem 1.25rem !important; }
          .ny-exp-timeline { padding-left: 2rem !important; }
          .ny-exp-dot { left: -2.35rem !important; }
        }
      `}</style>
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>03</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${BRICK}90`, letterSpacing: "0.3em" }}>03</span>
            <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Experience</h2>
          </motion.div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Vertical spine */}
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${BRICK}, ${GOLD}60, transparent)`, transformOrigin: "top" }} />

          <div className="ny-exp-timeline" style={{ paddingLeft: "3rem" }}>
            {items.map((exp, i) => {
              // Resolve bullets: highlights (builder) → responsibilities → bullets
              const bullets = Array.isArray(exp?.highlights) && exp.highlights.length ? exp.highlights
                : Array.isArray(exp?.responsibilities) && exp.responsibilities.length ? exp.responsibilities
                : Array.isArray(exp?.bullets) && exp.bullets.length ? exp.bullets
                : [];

              // Stack tags: stack (builder) → tags → tech
              const stack = Array.isArray(exp?.stack) ? exp.stack
                : Array.isArray(exp?.tags) ? exp.tags
                : Array.isArray(exp?.tech) ? exp.tech
                : [];

              const accentColor = i % 2 === 0 ? BRICK : GOLD;

              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  style={{ position: "relative", paddingBottom: i < items.length - 1 ? "4rem" : "0" }}
                >
                  {/* Square dot */}
                  <div className="ny-exp-dot" style={{ position: "absolute", left: "-3.4rem", top: "6px", width: "10px", height: "10px", background: accentColor }} />

                  {/* Period — builder field first */}
                  <div style={{ fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: `${accentColor}CC`, marginBottom: "0.6rem" }}>
                    {exp.period || exp.duration || exp.startDate || ""}
                  </div>

                  {/* Role */}
                  <h3 style={{ fontFamily: OSWALD, fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 600, color: CREAM, margin: "0 0 4px", letterSpacing: "0.04em" }}>
                    {exp.role || exp.title || exp.position || ""}
                  </h3>

                  {/* Company */}
                  {(exp.company || exp.organization || exp.employer) && (
                    <p style={{ fontFamily: DM, fontSize: "13px", fontStyle: "italic", color: `${GOLD}CC`, margin: "0 0 1rem" }}>
                      {exp.company || exp.organization || exp.employer}
                    </p>
                  )}

                  {/* Description as paragraph */}
                  {exp.description && (
                    <p style={{ fontFamily: DM, fontSize: "14px", color: "rgba(237,232,224,0.55)", lineHeight: 1.8, margin: `0 0 ${bullets.length ? "1rem" : "0"}`, maxWidth: "660px" }}>
                      {exp.description}
                    </p>
                  )}

                  {/* Highlights / bullets */}
                  {bullets.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "660px" }}>
                      {bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: "12px", fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.5)", lineHeight: 1.7 }}>
                          <span style={{ color: `${BRICK}80`, flexShrink: 0, marginTop: "5px", fontSize: "8px" }}>■</span>{b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack tags */}
                  {stack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
                      {stack.map((t, j) => (
                        <span key={j} style={{ fontFamily: DM, fontSize: "10px", padding: "3px 10px", border: "1px solid rgba(237,232,224,0.1)", color: "rgba(237,232,224,0.45)" }}>
                          {typeof t === "string" ? t : t?.name || String(t)}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
