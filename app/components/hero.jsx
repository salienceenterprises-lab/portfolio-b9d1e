"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa";

const BEBAS  = '"Bebas Neue", sans-serif';
const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

// Brick SVG tile
const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='2' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.09)' stroke-width='1'/%3E%3Crect x='63' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.09)' stroke-width='1'/%3E%3Crect x='2' y='32' width='26' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.09)' stroke-width='1'/%3E%3Crect x='34' y='32' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.09)' stroke-width='1'/%3E%3Crect x='95' y='32' width='23' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.09)' stroke-width='1'/%3E%3C/svg%3E")`;

// Word reveal — slides up from clip mask, staggered
const wordVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 16 },
  visible: (i) => ({
    clipPath: "inset(0 0 0% 0)", y: 0,
    transition: { duration: 0.65, delay: 0.6 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioHero({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fadeOut   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const hasPhoto = !!(data?.heroImageBase64 || data?.profile_photo);
  const nameParts  = (data?.name || "Portfolio").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" style={{
      minHeight: "100vh", background: "#100E0C",
      backgroundImage: BRICK_BG,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "68px",
    }}>
      <style>{`
        .ny-cta-primary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:13px 36px; background:${BRICK}; border:2px solid ${BRICK};
          color:${CREAM}; font-family:${OSWALD}; font-size:12px; font-weight:500;
          letter-spacing:0.22em; text-transform:uppercase; text-decoration:none;
          transition:all 0.25s ease;
        }
        .ny-cta-primary:hover { background:transparent; color:${BRICK}; }
        .ny-cta-secondary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:11px 30px; background:transparent; border:1px solid rgba(237,232,224,0.2);
          color:rgba(237,232,224,0.55); font-family:${OSWALD}; font-size:12px; font-weight:400;
          letter-spacing:0.2em; text-transform:uppercase; text-decoration:none;
          transition:all 0.25s ease;
        }
        .ny-cta-secondary:hover { border-color:${CREAM}; color:${CREAM}; }
        .ny-scroll-btn { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; }
        @media (max-width: 767px) {
          .ny-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 3rem 1.25rem 7rem !important; }
          .ny-cta-primary, .ny-cta-secondary { width: 100%; justify-content: center; }
          .ny-hero-photo { display: none !important; }
        }
      `}</style>

      {/* Deep red gradient overlay — bottom half */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", background:"linear-gradient(to top, rgba(14,8,6,0.8), transparent)", pointerEvents:"none" }} />

      {/* Large ghost city initial — architectural watermark */}
      <div style={{
        position: "absolute", right: hasPhoto ? "42%" : "3%", bottom: "5%",
        fontFamily: BEBAS, fontSize: "clamp(14rem, 28vw, 22rem)",
        color: "rgba(192,64,46,0.04)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
      }}>
        NYC
      </div>

      {/* Content */}
      <motion.div style={{ y: parallaxY, opacity: fadeOut, width: "100%", position: "relative", zIndex: 2 }}>
        <div className="ny-hero-grid" style={{
          maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 4rem",
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 420px" : "1fr",
          gap: "5rem", alignItems: "center",
        }}>

          {/* Left: text */}
          <div>
            {/* Title line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "2rem" }}
            >
              <div style={{ width: "36px", height: "3px", background: BRICK }} />
              <span style={{ fontFamily: OSWALD, fontSize: "11px", fontWeight: 400, letterSpacing: "0.35em", textTransform: "uppercase", color: BRICK }}>
                {data?.title || "Portfolio"}
              </span>
            </motion.div>

            {/* Animated red rule — draws across before name */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left" }}
            />

            {/* Name — billboard reveal */}
            <div style={{ marginBottom: "2rem", overflow: "visible" }}>
              {nameParts.map((word, i) => (
                <div key={i} style={{ overflow: "hidden", lineHeight: 0.92 }}>
                  <motion.div
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: BEBAS,
                      fontSize: "clamp(4rem, 12vw, 9.5rem)",
                      letterSpacing: "0.04em",
                      color: i === nameParts.length - 1 ? CREAM : CREAM,
                      display: "block",
                      lineHeight: 0.92,
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.6 + nameParts.length * 0.14 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "2rem", maxWidth: "320px", transformOrigin: "left" }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              style={{ fontFamily: DM, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", fontWeight: 300, color: "rgba(237,232,224,0.55)", lineHeight: 1.8, maxWidth: "500px", marginBottom: "3rem" }}
            >
              {data?.sloganHeroSection || (data?.bio ? data.bio.slice(0, 140) + "…" : "")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
            >
              <button onClick={() => scrollTo("contact")} className="ny-cta-primary">
                <FaEnvelope style={{ fontSize: "11px" }} /> Get In Touch
              </button>
              <button onClick={() => scrollTo("about")} className="ny-cta-secondary">
                View Profile
              </button>
              {(data?.resumeBase64 || data?.resumeUrl || data?.resume_url) && (
                <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resumeUrl || data.resume_url)} download="Resume.pdf" className="ny-cta-secondary">
                  <FaDownload style={{ fontSize: "10px" }} /> Résumé
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: photo */}
          {hasPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
              className="ny-hero-photo"
            >
              {/* Brick-red offset frame */}
              <div style={{ position: "absolute", top: "14px", left: "14px", right: "-14px", bottom: "-14px", border: `2px solid ${BRICK}`, opacity: 0.4, zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, overflow: "hidden", border: `1px solid rgba(237,232,224,0.1)` }}>
                <img
                  src={data.heroImageBase64 || data.profile_photo} alt={data.name}
                  style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4", filter: "brightness(0.95) saturate(0.88)", backgroundImage: BRICK_BG }}
                />
                {/* Name plate */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(16,14,12,0.88)", borderTop: `2px solid ${BRICK}`, padding: "14px 18px" }}>
                  <div style={{ fontFamily: BEBAS, fontSize: "18px", letterSpacing: "0.12em", color: CREAM }}>{data.name}</div>
                  {data?.title && <div style={{ fontFamily: OSWALD, fontSize: "10px", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: BRICK, marginTop: "2px" }}>{data.title}</div>}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button className="ny-scroll-btn" onClick={() => scrollTo("about")}>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <FaArrowDown style={{ color: "rgba(192,64,46,0.5)", fontSize: "14px" }} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
