'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { experience } from '@/content/cv-data'

const primaryExperience = experience[0]
const workRole = primaryExperience?.role.toUpperCase() ?? 'CO-FOUNDER / GAME DESIGNER'
const workPeriod = primaryExperience?.period.toUpperCase() ?? '07/2025 — PRESENT'
const workCompanyLine = [primaryExperience?.org, primaryExperience?.location].filter(Boolean).join(' · ')

export default function CVPage() {
  return (
    <motion.div
      className="cv-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Halftone dot texture — classic print feel */}
      <div className="cv-halftone" aria-hidden />

      {/* Top navigation bar */}
      <div className="cv-topbar">
        <Link href="/" className="cv-back-btn">
          ◄ BACK TO LIBRARY
        </Link>
        <span className="cv-issue-label">ISSUE #CV · GAME DESIGNER PORTFOLIO · 2026</span>
      </div>

      {/* Main 2-column comic grid */}
      <div className="cv-grid">

        {/* ── LEFT: Portrait panel ────────────────────────── */}
        <div className="cv-panel cv-portrait-panel">
          <img
            src="/profile/profile.jpg"
            alt="Alpaslan Kemal Pehlivanlı"
            className="cv-photo"
          />
          <div className="cv-name-block">
            <div className="cv-name-line1">ALPASLAN KEMAL</div>
            <div className="cv-name-line2">PEHLİVANLI</div>
            <div className="cv-name-title">GAME DESIGNER</div>
          </div>
        </div>

        {/* ── RIGHT: Content panels ────────────────────────── */}
        <div className="cv-right-col">

          {/* Education */}
          <div className="cv-panel cv-edu-panel">
            <div className="cv-caption-box">EDUCATION</div>
            <div className="cv-panel-body">
              <div className="cv-edu-row">
                <span className="cv-edu-school">Middle East Technical University</span>
                <span className="cv-edu-tag">2021 – PRESENT</span>
              </div>
              <div className="cv-edu-sub">
                B.Sc. Industrial Engineering · Ankara, Turkey · 3rd Year
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="cv-panel cv-work-panel">
            <div className="cv-caption-box">WORK EXPERIENCE</div>
            <div className="cv-panel-body">
              <div className="cv-work-header">
                <span className="cv-work-role">{workRole}</span>
                <span className="cv-work-date">{workPeriod}</span>
              </div>
              <div className="cv-work-company">{workCompanyLine}</div>
              <ul className="cv-bullets cv-bullets-dense">
                {primaryExperience?.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills + Contact row */}
          <div className="cv-bottom-row">
            <div className="cv-panel cv-skills-panel">
              <div className="cv-caption-box">SKILLS &amp; INTERESTS</div>
              <div className="cv-panel-body">
                <div className="cv-skill-row">
                  <span className="cv-skill-key">TOOLS</span>
                  <span>Unreal Engine 5 · Game Design · Level Design · Systems Design</span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-key">DATA</span>
                  <span>KPI · A/B Testing · Retention Analysis</span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-key">LANG</span>
                  <span>Turkish (Native) · English (C1) · Chinese (HSK2)</span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-key">FUN</span>
                  <span>Chess · Fencing · Drums · Orienteering · Football</span>
                </div>
              </div>
            </div>

            <div className="cv-panel cv-contact-panel">
              <div className="cv-caption-box">CONTACT</div>
              <div className="cv-panel-body cv-contact-body">
                <div className="cv-contact-item">
                  <span className="cv-contact-bullet">▸</span>Ankara, Turkey
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-bullet">▸</span>kemal.pehlivanli@tigerone.studio
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-bullet">▸</span>linkedin.com/in/alpaslankemal
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-bullet">▸</span>tigerone.studio
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Achievements strip */}
      <div className="cv-achievements">
        <div className="cv-award cv-award-gold">
          <span className="cv-award-rank">1ST</span>
          <span className="cv-award-name">Global Game Jam GGConvention 2026</span>
        </div>
        <div className="cv-award-sep" />
        <div className="cv-award cv-award-bronze">
          <span className="cv-award-rank">3RD</span>
          <span className="cv-award-name">AyazJam 2025 · 50 Teams</span>
        </div>
        <div className="cv-award-sep" />
        <div className="cv-award cv-award-silver">
          <span className="cv-award-rank">2ND</span>
          <span className="cv-award-name">L&apos;Oréal Brandstorm 2025 · 200 Teams</span>
        </div>
      </div>
    </motion.div>
  )
}
