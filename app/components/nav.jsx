"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const OSWALD  = '"Oswald", "Arial Narrow", sans-serif';
const BRICK   = "#C0402E";
const CREAM   = "#EDE8E0";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  const allLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "email" },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    if (l.key === "email") return !!data?.email;
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = activeLinks.map((l) => l.href.replace("#", ""));
      const sorted = ids.map((id) => document.getElementById(id)).filter(Boolean).sort((a, b) => a.offsetTop - b.offsetTop);
      let current = sorted[0]?.id ?? "";
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].offsetTop - 120) { current = sorted[i].id; break; }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  return (
    <>
      <style>{`
        .ny-nav-link {
          text-decoration: none; position: relative;
          font-family: ${OSWALD}; font-size: 12px; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(237,232,224,0.45); transition: color 0.2s;
          padding-bottom: 3px; white-space: nowrap;
        }
        .ny-nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: ${BRICK};
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .ny-nav-link:hover, .ny-nav-link.ny-active { color: ${CREAM}; }
        .ny-nav-link:hover::after, .ny-nav-link.ny-active::after { transform: scaleX(1); }

        /* Responsive nav */
        .ny-desktop-links { display: flex; align-items: center; gap: 1.6rem; }
        .ny-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        @media (max-width: 767px) {
          .ny-desktop-links { display: none !important; }
          .ny-hamburger { display: flex !important; align-items: center; justify-content: center; }
          .ny-nav-inner { padding: 0 1.25rem !important; }
        }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: scrolled ? "rgba(16,14,12,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(192,64,46,0.18)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <div className="ny-nav-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#about" onClick={(e) => go(e, "#about")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "4px", height: "28px", background: BRICK, flexShrink: 0 }} />
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "20px", letterSpacing: "0.12em", color: CREAM }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </a>

          {/* Desktop links */}
          <div className="ny-desktop-links">
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                className={`ny-nav-link${active === link.href.replace("#", "") ? " ny-active" : ""}`}>
                {link.label}
              </a>
            ))}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: OSWALD, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: BRICK, textDecoration: "none",
                  border: `1px solid ${BRICK}`,
                  padding: "6px 16px", transition: "all 0.25s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = BRICK; e.currentTarget.style.color = CREAM; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BRICK; }}
              >
                <FaDownload style={{ fontSize: "10px" }} /> Résumé
              </a>
            )}
          </div>

          {/* Hamburger */}
          <button className="ny-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", height: "2px", background: CREAM, transition: "all 0.3s",
                  transform: i === 0 && mobileOpen ? "rotate(45deg) translate(5px,5px)" : i === 2 && mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
                  opacity: i === 1 && mobileOpen ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: "rgba(16,14,12,0.98)", borderBottom: `2px solid ${BRICK}`, overflow: "hidden" }}
            >
              <div style={{ padding: "0.5rem 1.5rem 1.5rem" }}>
                {activeLinks.map((link, i) => (
                  <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(237,232,224,0.06)",
                      borderLeft: active === link.href.replace("#", "") ? `3px solid ${BRICK}` : "3px solid transparent",
                      paddingLeft: "10px",
                      fontFamily: OSWALD, fontSize: "13px", fontWeight: 400,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: active === link.href.replace("#", "") ? BRICK : "rgba(237,232,224,0.5)",
                      textDecoration: "none", transition: "color 0.2s",
                    }}>
                    {link.label}
                  </a>
                ))}
                {resumeSource && (
                  <a
                    href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                    download="Resume.pdf"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      marginTop: "1.2rem",
                      background: BRICK, color: CREAM,
                      fontFamily: OSWALD, fontSize: "11px", fontWeight: 500,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      textDecoration: "none", padding: "13px 20px",
                    }}
                  >
                    <FaDownload style={{ fontSize: "10px" }} /> Download Résumé
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
