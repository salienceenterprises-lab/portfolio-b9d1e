"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const ACCENT = [BRICK, GOLD, "#7A8C9E", BRICK, GOLD];

export default function PortfolioCommunity({ data }) {
  const list = data?.community || data?.volunteering || data?.involvement || [];
  if (!list.length) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="community" style={{ background: "#100E0C", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#community{padding:4rem 1.25rem!important;} .ny-comm-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>06</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${BRICK}90`, letterSpacing: "0.3em" }}>06</span>
            <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Community</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="ny-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
          {list.map((item, i) => {
            const accentColor = ACCENT[i % ACCENT.length];
            return (
              <motion.div key={i} variants={card}>
                <div style={{ background: "#1A1612", border: "1px solid rgba(237,232,224,0.06)", borderLeft: `3px solid ${accentColor}`, padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#1E1A15"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1A1612"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>

                  <h3 style={{ fontFamily: OSWALD, fontSize: "clamp(1rem,1.8vw,1.2rem)", fontWeight: 600, color: CREAM, margin: "0 0 6px", letterSpacing: "0.04em", lineHeight: 1.25 }}>
                    {item.title || item.role || item.name}
                  </h3>

                  {(item.organization || item.company) && (
                    <p style={{ fontFamily: DM, fontSize: "12px", fontStyle: "italic", color: `${accentColor}CC`, margin: "0 0 1rem" }}>
                      {item.organization || item.company}
                    </p>
                  )}

                  {item.description && (
                    <p style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.5)", lineHeight: 1.75, margin: "0 0 1rem", flex: 1 }}>
                      {item.description}
                    </p>
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(237,232,224,0.05)" }}>
                    {(item.duration || item.years || item.period) && (
                      <span style={{ fontFamily: OSWALD, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,232,224,0.25)" }}>
                        {item.duration || item.years || item.period}
                      </span>
                    )}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: OSWALD, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: `${accentColor}90`, textDecoration: "none", transition: "color 0.2s", marginLeft: "auto" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                        onMouseLeave={(e) => e.currentTarget.style.color = `${accentColor}90`}>
                        View <FaExternalLinkAlt size={9} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
