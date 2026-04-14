"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaArrowRight } from "react-icons/fa";

const OSWALD = '"Oswald", "Arial Narrow", sans-serif';
const DM     = '"DM Sans", system-ui, sans-serif';
const BRICK  = "#C0402E";
const GOLD   = "#D4973A";
const CREAM  = "#EDE8E0";

const BRICK_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='2' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='63' y='2' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='2' y='32' width='26' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='34' y='32' width='55' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3Crect x='95' y='32' width='23' height='24' fill='none' stroke='rgba(192%2C64%2C46%2C0.055)' stroke-width='1'/%3E%3C/svg%3E")`;

export default function PortfolioContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputBase = (field) => ({
    width: "100%",
    background: "rgba(237,232,224,0.03)",
    border: "none",
    borderBottom: `2px solid ${focused === field ? BRICK : "rgba(237,232,224,0.1)"}`,
    color: CREAM,
    fontSize: "14px",
    padding: "12px 0",
    outline: "none",
    transition: "border-color 0.25s ease",
    fontFamily: DM,
    fontWeight: 300,
    boxSizing: "border-box",
    letterSpacing: "0.02em",
  });

  const socials = [
    data?.github   && { icon: <FaGithub size={15} />,   href: data.github,            label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={15} />,  href: data.linkedin,          label: "LinkedIn" },
    data?.website  && { icon: <FaGlobe size={15} />,     href: data.website,           label: "Website" },
    data?.email    && { icon: <FaEnvelope size={15} />,  href: `mailto:${data.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <section id="contact" style={{ background: "#161210", backgroundImage: BRICK_BG, padding: "8rem 2rem 9rem", position: "relative", overflow: "hidden", borderTop: `1px solid rgba(192,64,46,0.15)` }}>
      <style>{`@media(max-width:767px){#contact{padding:4rem 1.25rem 9rem!important;}}`}</style>
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: '"Bebas Neue",sans-serif', fontSize: "22vw", color: "rgba(192,64,46,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>07</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "2px", background: BRICK, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "80px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: OSWALD, fontSize: "11px", color: `${BRICK}90`, letterSpacing: "0.3em" }}>07</span>
            <h2 style={{ fontFamily: OSWALD, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: CREAM, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Contact</h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="ny-two-col">
          <style>{`@media(max-width:767px){.ny-two-col{display:block!important;}.ny-two-col>*:first-child{margin-bottom:3rem;}}`}</style>

          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ borderLeft: `3px solid ${BRICK}`, paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: DM, fontSize: "clamp(0.95rem,1.6vw,1.05rem)", fontWeight: 300, color: "rgba(237,232,224,0.6)", lineHeight: 1.9, margin: 0 }}>
                Ready to connect? Whether you have an opportunity, a question, or just want to say hello — reach out and let's talk.
              </p>
            </div>

            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: DM, fontSize: "14px", fontWeight: 400, color: "rgba(237,232,224,0.65)", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = CREAM}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,232,224,0.65)"}>
                <FaArrowRight style={{ color: BRICK, fontSize: "11px", flexShrink: 0 }} />
                {data.email}
              </a>
            )}

            {socials.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: "40px", height: "40px", border: "1px solid rgba(237,232,224,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(237,232,224,0.35)", textDecoration: "none", transition: "all 0.25s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRICK; e.currentTarget.style.color = BRICK; e.currentTarget.style.background = "rgba(192,64,46,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,232,224,0.1)"; e.currentTarget.style.color = "rgba(237,232,224,0.35)"; e.currentTarget.style.background = "transparent"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(16,14,12,0.7)", border: "1px solid rgba(237,232,224,0.07)", borderTop: `3px solid ${GOLD}`, padding: "2.5rem" }}>

            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", background: BRICK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "20px", color: CREAM, fontFamily: OSWALD }}>✓</div>
                <h3 style={{ fontFamily: OSWALD, fontSize: "18px", fontWeight: 600, color: CREAM, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Message Sent</h3>
                <p style={{ fontFamily: DM, fontSize: "13px", color: "rgba(237,232,224,0.45)" }}>I'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: OSWALD, fontSize: "8px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(237,232,224,0.3)", marginBottom: "8px" }}>Your Name</label>
                  <input type="text" placeholder="First Last" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputBase("name")} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: OSWALD, fontSize: "8px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(237,232,224,0.3)", marginBottom: "8px" }}>Email Address</label>
                  <input type="email" placeholder="you@example.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputBase("email")} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: OSWALD, fontSize: "8px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(237,232,224,0.3)", marginBottom: "8px" }}>Message</label>
                  <textarea rows={4} placeholder="Tell me about your opportunity…" required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputBase("message"), resize: "none" }} />
                </div>
                <button type="submit" disabled={status === "sending"}
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: BRICK, color: CREAM, border: "none", padding: "13px 36px", fontFamily: OSWALD, fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.6 : 1, transition: "all 0.25s ease", width: "fit-content" }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BRICK; e.currentTarget.style.border = `2px solid ${BRICK}`; e.currentTarget.style.padding = "11px 34px"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = BRICK; e.currentTarget.style.color = CREAM; e.currentTarget.style.border = "none"; e.currentTarget.style.padding = "13px 36px"; }}>
                  {status === "sending" ? "Sending…" : <>Send Message <FaArrowRight style={{ fontSize: "10px" }} /></>}
                </button>
                {status === "error" && (
                  <p style={{ fontFamily: DM, fontSize: "12px", color: BRICK, margin: 0 }}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
