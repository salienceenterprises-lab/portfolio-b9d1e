"use client";
import React from "react";
import { motion } from "framer-motion";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

export default function PortfolioSkills({ data }) {
  const skills = data?.skills || [];
  if (!skills.length) return null;

  // Normalize: flat array or grouped array
  const groups = (() => {
    if (typeof skills[0] === "object" && skills[0] !== null && (skills[0].items || skills[0].category || skills[0].skills)) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return [{ category: "Expertise", items: skills }];
  })();

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
  const pill    = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

  // Color cycling for pill borders
  const PILL_COLORS = [
    { border: `${BRICK}50`, color: `${BRICK}CC` },
    { border: `${GOLD}40`,  color: `${GOLD}CC`  },
    { border: "rgba(122,140,158,0.35)", color: "rgba(122,140,158,0.8)" },
  ];

  return (
    <section id="skills" style={{ background: "#161210", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#skills{padding:4rem 1.25rem!important;} .ny-skills-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Ghost text watermark */}
      <div style={{ position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>05</div>

      {/* Horizontal gold rule accent */}
      <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: "1px", background: `linear-gradient(90deg, ${GOLD}15, transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: GOLD, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${GOLD}70`, letterSpacing: "0.3em" }}>05</span>
            <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Skills</h2>
          </motion.div>
        </div>

        {groups.length === 1 ? (
          /* Flat pill cloud */
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {groups[0].items.map((skill, i) => {
              const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
              const col = PILL_COLORS[i % PILL_COLORS.length];
              return (
                <motion.span key={i} variants={pill}
                  style={{ fontFamily: DM, fontSize: "13px", padding: "8px 18px", border: `1px solid ${col.border}`, color: col.color, background: "rgba(237,232,224,0.02)", letterSpacing: "0.02em" }}>
                  {label}
                </motion.span>
              );
            })}
          </motion.div>
        ) : (
          /* Grouped grid */
          <div className="ny-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.5rem" }}>
            {groups.map((group, gi) => {
              const accentColor = gi % 2 === 0 ? BRICK : GOLD;
              return (
                <motion.div key={gi}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: gi * 0.07 }}
                  style={{ background: "#1A1612", border: "1px solid rgba(237,232,224,0.06)", borderLeft: `3px solid ${accentColor}`, padding: "1.75rem" }}>

                  <div style={{ fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: `${accentColor}CC`, marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(237,232,224,0.06)" }}>
                    {group.category}
                  </div>
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {group.items.map((skill, si) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <motion.div key={si} variants={pill}
                          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid rgba(237,232,224,0.04)" }}>
                          <span style={{ color: `${accentColor}70`, fontSize: "8px", flexShrink: 0 }}>■</span>
                          <span style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.6)", lineHeight: 1.4 }}>{label}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
