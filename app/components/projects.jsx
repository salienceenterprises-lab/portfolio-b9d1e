"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='2' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='63' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='2' y='32' width='26' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='34' y='32' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='95' y='32' width='23' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3C/svg%3E")`;

export default function PortfolioProjects({ data }) {
  const list = data?.projects || [];
  if (!list.length) return null;

  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ background: "#100E0C", backgroundImage: BRICK_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#projects{padding:4rem 1.25rem!important;} .ny-proj-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>04</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${BRICK}90`, letterSpacing: "0.3em" }}>04</span>
              <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Projects</h2>
            </div>
            <span style={{ fontFamily: OSWALD, fontSize: "10px", letterSpacing: "0.2em", color: `${GOLD}60`, textTransform: "uppercase" }}>{list.length} featured</span>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="ny-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {list.map((project, i) => {
            const tags = Array.isArray(project.stack) ? project.stack
              : Array.isArray(project.tags) ? project.tags
              : Array.isArray(project.technologies) ? project.technologies
              : Array.isArray(project.tech) ? project.tech
              : [];
            const isHov = hovered === i;
            const accentColor = i % 2 === 0 ? BRICK : GOLD;

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? "#1E1A15" : "#1A1612",
                  border: "1px solid rgba(237,232,224,0.06)",
                  borderTop: `3px solid ${isHov ? accentColor : "rgba(237,232,224,0.08)"}`,
                  padding: "2rem",
                  display: "flex", flexDirection: "column", gap: "1rem",
                  transition: "all 0.3s ease",
                  transform: isHov ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHov ? `0 12px 40px rgba(0,0,0,0.4)` : "none",
                  cursor: "default",
                }}
              >
                {project.imageBase64 && (
                  <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", marginBottom: "1rem", borderBottom: "1px solid rgba(237,232,224,0.06)" }}>
                    <img src={project.imageBase64} alt={project.title || project.name}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  </div>
                )}
                {/* Index + links row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "32px", color: isHov ? accentColor : "rgba(237,232,224,0.08)", lineHeight: 1, transition: "color 0.3s" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{ width: "34px", height: "34px", border: `1px solid ${isHov ? accentColor + "50" : "rgba(237,232,224,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isHov ? accentColor : "rgba(237,232,224,0.3)", textDecoration: "none", transition: "all 0.25s" }}>
                        <FaGithub size={13} />
                      </a>
                    )}
                    {(project.live || project.url || project.link || project.demo) && (
                      <a href={project.live || project.url || project.link || project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{ width: "34px", height: "34px", border: `1px solid ${isHov ? accentColor + "50" : "rgba(237,232,224,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isHov ? accentColor : "rgba(237,232,224,0.3)", textDecoration: "none", transition: "all 0.25s" }}>
                        <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: OSWALD, fontSize: "clamp(1rem,2vw,1.25rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.04em", lineHeight: 1.2 }}>
                  {project.title || project.name}
                </h3>

                {/* Description */}
                {project.description && (
                  <p style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.5)", lineHeight: 1.75, margin: 0, flex: 1 }}>
                    {project.description}
                  </p>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid rgba(237,232,224,0.05)" }}>
                    {tags.map((tag, j) => {
                      const label = typeof tag === "string" ? tag : tag?.name || String(tag);
                      return (
                        <span key={j} style={{ fontFamily: DM, fontSize: "10px", padding: "3px 10px", border: `1px solid ${isHov ? accentColor + "40" : "rgba(237,232,224,0.08)"}`, color: isHov ? accentColor + "CC" : "rgba(237,232,224,0.35)", transition: "all 0.25s" }}>
                          {label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
