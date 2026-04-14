"use client";
import React from "react";
import portfolioData from "../profile.json";
import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioEducation from "./components/education";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioCommunity from "./components/community";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";

export default function DeployedPortfolio() {
  const data = portfolioData;
  if (!data) return <div style={{ color: "#EDE8E0", padding: "40px", background: "#100E0C" }}>Loading…</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 68px; }
        @keyframes ny-line-draw { from{transform:scaleX(0);} to{transform:scaleX(1);} }
        @keyframes ny-clip-up { from{clip-path:inset(0 0 100% 0);} to{clip-path:inset(0 0 0% 0);} }
        @keyframes ny-fade-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes ny-card-glow { 0%,100%{box-shadow:0 0 0 transparent;} 50%{box-shadow:4px 0 20px rgba(192,64,46,0.15);} }
        /* Responsive nav */
        .ny-desktop-links { display: flex; align-items: center; gap: 2rem; }
        .ny-hamburger { display: none; }
        .ny-mobile-menu { display: none; }
        @media (max-width: 767px) {
          .ny-desktop-links { display: none !important; }
          .ny-hamburger { display: flex !important; }
          .ny-mobile-menu { display: block !important; }
          .ny-hero-photo { display: none !important; }
          .ny-two-col { display: block !important; }
          .ny-two-col > * { margin-bottom: 2.5rem; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#100E0C", color: "#EDE8E0" }}>
        <PortfolioNav data={data} />
        <PortfolioHero data={data} />
        <PortfolioAbout data={data} />
        <PortfolioEducation data={data} />
        <PortfolioExperience data={data} />
        <PortfolioProjects data={data} />
        <PortfolioSkills data={data} />
        <PortfolioCommunity data={data} />
        <PortfolioContact data={data} />
        <PortfolioFooter data={data} />
      </div>
    </>
  );
}
