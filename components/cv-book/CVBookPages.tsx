'use client'

import { Mail, Link2, Globe } from 'lucide-react'
import { experience } from '@/content/cv-data'

const primaryExperience = experience[0]
const workRole = primaryExperience?.role.toUpperCase() ?? 'CO-FOUNDER / GAME DESIGNER'
const workDateLine = `${primaryExperience?.period ?? '07/2025 — Present'} · ${primaryExperience?.location ?? 'Ankara, Turkey'}`.toUpperCase()

// ─── Left page: Portrait + Name ──────────────────────────
export function CVLeftPage() {
  return (
    <div className="cvb-left">

      {/* Full-bleed photo */}
      <div className="cvb-photo-wrap">
        <img src="/profile/profile.jpg" alt="Alpaslan Kemal Pehlivanlı" className="cvb-photo" />
        {/* Halftone corner overlay */}
        <div className="cvb-halftone-corner" aria-hidden />
        {/* Red accent stripe at top */}
        <div className="cvb-photo-stripe" aria-hidden />
      </div>

      {/* Name block */}
      <div className="cvb-name-block">
        {/* Speed lines */}
        <div className="cvb-speed-lines" aria-hidden />
        <div className="cvb-name-inner">
          <div className="cvb-name-1">ALPASLAN</div>
          <div className="cvb-name-2">KEMAL</div>
          <div className="cvb-name-3">PEHLİVANLI</div>
          <div className="cvb-name-divider" aria-hidden />
          <div className="cvb-name-role">
            <span className="cvb-role-pip" aria-hidden />
            GAME DESIGNER
            <span className="cvb-role-pip" aria-hidden />
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Right page: CV Sections ──────────────────────────────
export function CVRightPage() {
  return (
    <div className="cvb-right">

      {/* ── 01 EDUCATION ─────────────────────────────── */}
      <div className="cvb-panel">
        <div className="cvb-cap">
          <span>EDUCATION</span>
        </div>
        <div className="cvb-edu-body">
          <img src="/profile/metu_logo.png" alt="METU" className="cvb-edu-logo" />
          <div>
            <div className="cvb-edu-school">MIDDLE EAST TECHNICAL UNIVERSITY</div>
            <div className="cvb-edu-degree">B.Sc. Industrial Engineering</div>
            <div className="cvb-edu-meta">2021 – Present · Ankara, Turkey</div>
          </div>
        </div>
      </div>

      {/* ── 02 WORK EXPERIENCE ───────────────────────── */}
      <div className="cvb-panel cvb-panel-grow">
        <div className="cvb-cap">
          <span>WORK EXPERIENCE</span>
        </div>
        <div className="cvb-work-body">
          <div className="cvb-work-header">
            <img src="/profile/t1_studios_logo.png" alt="TigerOne Studios" className="cvb-work-logo" />
            <div className="cvb-work-info">
              <div className="cvb-work-role">{workRole}</div>
              <div className="cvb-work-company">{primaryExperience?.org ?? 'TigerOne Studios'}</div>
              <div className="cvb-work-date">{workDateLine}</div>
            </div>
          </div>
          <ul className="cvb-bullets cvb-bullets-dense">
            {primaryExperience?.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 03 PROFESSIONAL SKILLS ───────────────────── */}
      <div className="cvb-panel">
        <div className="cvb-cap">
          <span>PROFESSIONAL SKILLS</span>
        </div>
        <div className="cvb-skills-body">
          <div className="cvb-skill-row">
            <span className="cvb-skill-key">ENGINE</span>
            <span>Unreal Engine 5</span>
          </div>
          <div className="cvb-skill-row">
            <span className="cvb-skill-key">DESIGN</span>
            <span>Game Design · Level Design · Systems Design</span>
          </div>
          <div className="cvb-skill-row">
            <span className="cvb-skill-key">DATA</span>
            <span>KPI · A/B Testing · Retention</span>
          </div>
        </div>
      </div>

      {/* ── 04 LANGUAGES ─────────────────────────────── */}
      <div className="cvb-panel">
        <div className="cvb-cap">
          <span>LANGUAGES</span>
        </div>
        <div className="cvb-lang-body">
          <div className="cvb-lang-item">
            <span className="cvb-skill-key">TR</span>
            <span className="cvb-lang-val">Turkish · Native</span>
          </div>
          <div className="cvb-lang-item">
            <span className="cvb-skill-key">EN</span>
            <span className="cvb-lang-val">English · C1</span>
          </div>
          <div className="cvb-lang-item">
            <span className="cvb-skill-key">ZH</span>
            <span className="cvb-lang-val">Chinese · A2 · HSK2 180</span>
          </div>
        </div>
      </div>

      {/* ── 05 INTERESTS ─────────────────────────────── */}
      <div className="cvb-panel">
        <div className="cvb-cap">
          <span>INTERESTS</span>
        </div>
        <div className="cvb-interests-body">
          {['Mobile Games','Computer Games','Drums','Chess','Fencing','Travelling','Football','Volleyball','Orienteering'].map(t => (
            <span key={t} className="cvb-interest-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* ── 06 CONTACT ───────────────────────────────── */}
      <div className="cvb-panel cvb-panel-last">
        <div className="cvb-cap">
          <span>CONTACT</span>
        </div>
        <div className="cvb-contact-body">
          <a href="mailto:kemal.pehlivanli@tigerone.studio" className="cvb-clink">
            <Mail className="cvb-icon" />
            <span>kemal.pehlivanli@tigerone.studio</span>
          </a>
          <a href="https://www.linkedin.com/in/alpaslankemal" target="_blank" rel="noreferrer" className="cvb-clink">
            <Link2 className="cvb-icon" />
            <span>linkedin.com/in/alpaslankemal</span>
          </a>
          <a href="https://tigerone.studio" target="_blank" rel="noreferrer" className="cvb-clink">
            <Globe className="cvb-icon" />
            <span>tigerone.studio</span>
          </a>
        </div>
      </div>

    </div>
  )
}
