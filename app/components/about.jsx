"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='2' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.06)' stroke-width='1'/%3E%3Crect x='63' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.06)' stroke-width='1'/%3E%3Crect x='2' y='32' width='26' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.06)' stroke-width='1'/%3E%3Crect x='34' y='32' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.06)' stroke-width='1'/%3E%3Crect x='95' y='32' width='23' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.06)' stroke-width='1'/%3E%3C/svg%3E")`;

const SectionLabel = ({ num, title, delay = 0 }) => (
  <div style={{ marginBottom: "4rem" }}>
    <motion.div
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }}
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
    >
      <span style={{ fontFamily: OSWALD, fontSize: "11px", fontWeight: 400, letterSpacing: "0.3em", color: `${BRICK}90` }}>{num}</span>
      <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {title}
      </h2>
    </motion.div>
  </div>
);

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  icon: <FaMapMarkerAlt />, link: null },
    { label: "Email",    value: data.email,      icon: <FaEnvelope />,    link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, icon: <FaGithub />, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, icon: <FaLinkedin />, link: data.linkedin },
    { label: "Website",  value: data.website,   icon: <FaGlobe />,       link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" style={{ background: "#161210", backgroundImage: BRICK_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Ghost floor number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>01</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionLabel num="01" title="About" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="ny-two-col">
          <style>{`@media(max-width:767px){.ny-two-col{display:block!important;}}`}</style>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ borderLeft: `3px solid ${BRICK}`, paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: DM, fontSize: "clamp(1rem,1.8vw,1.1rem)", fontWeight: 300, color: "rgba(237,232,224,0.72)", lineHeight: 1.85, margin: 0 }}>
                {data.bio}
              </p>
            </div>

            {data.skills?.length > 0 && (() => {
              // Flatten grouped or flat skill arrays
              const flatSkills = data.skills.flatMap((s) =>
                typeof s === "object" && s !== null && Array.isArray(s.items) ? s.items
                : typeof s === "object" && s !== null && Array.isArray(s.skills) ? s.skills
                : [s]
              ).filter(Boolean);
              if (!flatSkills.length) return null;
              return (
                <div>
                  <p style={{ fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}90`, marginBottom: "1rem" }}>Skills at a Glance</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {flatSkills.slice(0, 8).map((skill, i) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <span key={i} style={{
                          padding: "5px 14px", fontFamily: DM, fontSize: "12px", fontWeight: 400,
                          border: `1px solid ${i % 2 === 0 ? "rgba(192,64,46,0.35)" : "rgba(212,151,58,0.25)"}`,
                          color: i % 2 === 0 ? `${BRICK}CC` : `${GOLD}CC`,
                          background: i % 2 === 0 ? "rgba(192,64,46,0.05)" : "rgba(212,151,58,0.04)",
                        }}>{label}</span>
                      );
                    })}
                    {flatSkills.length > 8 && (
                      <span style={{ padding: "5px 14px", border: "1px solid rgba(237,232,224,0.1)", color: "rgba(237,232,224,0.3)", fontFamily: DM, fontSize: "12px" }}>+{flatSkills.length - 8}</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ border: "1px solid rgba(237,232,224,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "2rem", background: "rgba(16,14,12,0.6)" }}>
            <div style={{ fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}80`, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(237,232,224,0.06)" }}>
              Contact Info
            </div>
            {infoRows.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: i < infoRows.length - 1 ? "1px solid rgba(237,232,224,0.05)" : "none" }}>
                <span style={{ color: `${BRICK}80`, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <div style={{ fontFamily: OSWALD, fontSize: "8px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(237,232,224,0.3)", marginBottom: "3px" }}>{row.label}</div>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.65)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = CREAM}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,232,224,0.65)"}
                    >{row.value}</a>
                  ) : (
                    <span style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.65)" }}>{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
