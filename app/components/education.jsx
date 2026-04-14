"use client";
import React from "react";
import { motion } from "framer-motion";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const LEFT_COLORS = [BRICK, GOLD, "#7A8C9E", BRICK, GOLD];

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="education" style={{ background: "#100E0C", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#education{padding:4rem 1.25rem!important;} .ny-edu-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>02</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${BRICK}90`, letterSpacing: "0.3em" }}>02</span>
            <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Education</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="ny-edu-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {items.map((edu, i) => (
            <motion.div key={i} variants={card}>
              <div style={{
                borderLeft: `3px solid ${LEFT_COLORS[i % LEFT_COLORS.length]}`,
                padding: "1.75rem 1.75rem 1.75rem 1.5rem",
                background: "#1A1612",
                border: "1px solid rgba(237,232,224,0.06)",
                borderLeftWidth: "3px",
                borderLeftColor: LEFT_COLORS[i % LEFT_COLORS.length],
                height: "100%", transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1E1A15"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1A1612"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Period badge — period field first */}
                {(edu.period || edu.year || edu.graduationYear || edu.duration) && (
                  <span style={{
                    display: "inline-block", marginBottom: "1rem",
                    fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.18em",
                    padding: "3px 12px",
                    border: `1px solid ${LEFT_COLORS[i % LEFT_COLORS.length]}50`,
                    color: LEFT_COLORS[i % LEFT_COLORS.length], textTransform: "uppercase",
                  }}>
                    {edu.period || edu.year || edu.graduationYear || edu.duration}
                  </span>
                )}

                <h3 style={{ fontFamily: OSWALD, fontSize: "17px", fontWeight: 500, color: CREAM, margin: "0 0 6px", letterSpacing: "0.04em", lineHeight: 1.3 }}>
                  {edu.degree || edu.field || edu.program || edu.title || ""}
                </h3>

                {(edu.institution || edu.school) && (
                  <p style={{ fontFamily: DM, fontSize: "13px", color: GOLD + "CC", margin: "0 0 4px", fontStyle: "italic" }}>
                    {edu.institution || edu.school}
                  </p>
                )}

                {edu.location && (
                  <p style={{ fontFamily: DM, fontSize: "12px", color: "rgba(237,232,224,0.3)", margin: "0 0 10px" }}>
                    {edu.location}
                  </p>
                )}

                {edu.description && (
                  <p style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.5)", lineHeight: 1.7, margin: "0 0 10px" }}>
                    {edu.description}
                  </p>
                )}

                {edu.gpa && (
                  <p style={{ fontFamily: DM, fontSize: "11px", color: `${GOLD}65`, margin: "0 0 10px" }}>GPA: {edu.gpa}</p>
                )}

                {/* Achievements bullets */}
                {Array.isArray(edu.achievements) && edu.achievements.filter(Boolean).length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "0.5rem" }}>
                    {edu.achievements.filter(Boolean).map((a, ai) => (
                      <div key={ai} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: `${LEFT_COLORS[i % LEFT_COLORS.length]}80`, fontSize: "8px", flexShrink: 0, marginTop: "5px" }}>■</span>
                        <span style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.5)", lineHeight: 1.65 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
