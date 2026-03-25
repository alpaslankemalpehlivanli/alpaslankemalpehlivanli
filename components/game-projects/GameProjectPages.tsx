'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PhotoModal } from '@/components/achievements/PhotoModal'
import { projects } from '@/content/cv-data'

type Project = (typeof projects)[number]

// ─── Base photo cell ──────────────────────────────────────
function GpxCell({
  src,
  alt,
  onClick,
  className,
  watermark,
  delay,
}: {
  src: string
  alt: string
  onClick: () => void
  className?: string
  watermark?: string
  delay?: number
}) {
  return (
    <div
      className={`gpx-cell${className ? ` ${className}` : ''}`}
      style={delay != null ? { animationDelay: `${delay}s` } : undefined}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={alt}
    >
      <img src={src} alt={alt} />
      <div className="gpx-overlay" aria-hidden />
      {watermark && <span className="gpx-watermark">{watermark}</span>}
    </div>
  )
}

// ─── Left page (shared) ───────────────────────────────────
function GameProjectLeft({ project }: { project: Project }) {
  return (
    <div
      className="gp-left"
      style={{ '--gp-color': project.accentColor } as React.CSSProperties}
    >
      <div className="gp-logo-wrap">
        {project.image ? (
          <img src={project.image} alt={project.title} className="gp-logo-img" />
        ) : (
          <div className="gp-logo-placeholder">
            <span className="gp-logo-ghost">{project.title}</span>
          </div>
        )}
        <div className="gp-logo-stripe" aria-hidden />
        <div className="gp-logo-title-bar">
          <span className="gp-logo-num">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="gp-info">
        <div className="gp-title">{project.title}</div>
        <div className="gp-subtitle">{project.subtitle}</div>
        <div className="gp-tags">
          {project.tags.map(t => (
            <span key={t} className="gp-tag">{t}</span>
          ))}
        </div>
        <div className="gp-meta-row">
          <span className="gp-jam">{project.jam}</span>
          {project.rank && <span className="gp-rank">{project.rank}</span>}
        </div>
        <p className="gp-summary">{project.summary}</p>
        <div className="gp-sar">
          <div className="gp-sar-item">
            <span className="gp-sar-label">SIT</span>
            <span className="gp-sar-text">{project.situation}</span>
          </div>
          <div className="gp-sar-item">
            <span className="gp-sar-label">ACT</span>
            <span className="gp-sar-text">{project.action}</span>
          </div>
          <div className="gp-sar-item">
            <span className="gp-sar-label">RES</span>
            <span className="gp-sar-text">{project.result}</span>
          </div>
        </div>
        {project.links.length > 0 && (
          <div className="gp-links">
            {project.links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="gp-link-btn"
                onClick={e => e.stopPropagation()}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="gp-foot">
        <span>GAME PROJECTS</span>
        <span className="gp-foot-dots">· · ·</span>
        <span>{project.title}</span>
      </div>
    </div>
  )
}

// ─── TUTSAK Album (5 photos) ──────────────────────────────
// Tall left pillar (A) anchors 3 rows; right side splits
// into wide-top (B), mid-pair (C/D), wide-bottom (E).
function TutsakAlbum({ project }: { project: Project }) {
  const [active, setActive] = useState<number | null>(null)
  const p = project.photos

  return (
    <div
      className="gp-right gp-album-tutsak"
      style={{ '--gp-color': project.accentColor } as React.CSSProperties}
    >
      <GpxCell src={p[0]} alt="Visual 1" className="gpx-tk-a" onClick={() => setActive(0)} watermark={project.title} delay={0.05} />
      <GpxCell src={p[1]} alt="Visual 2" className="gpx-tk-b" onClick={() => setActive(1)} delay={0.1} />
      <GpxCell src={p[2]} alt="Visual 3" className="gpx-tk-c" onClick={() => setActive(2)} delay={0.15} />
      <GpxCell src={p[3]} alt="Visual 4" className="gpx-tk-d" onClick={() => setActive(3)} delay={0.2} />
      <GpxCell src={p[4]} alt="Visual 5" className="gpx-tk-e" onClick={() => setActive(4)} delay={0.25} />
      <AnimatePresence>
        {active !== null && (
          <PhotoModal photos={p} initialIndex={active} rankColor={project.accentColor} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── TRICK OR ADMIT Album (6 photos) ─────────────────────
// Double hero (A) dominates top-left spanning 2 rows;
// right column (B/C) flanks it; bottom strip (D/E/F)
// uses unequal widths for a deceptive off-balance feel.
function TrickOrAdmitAlbum({ project }: { project: Project }) {
  const [active, setActive] = useState<number | null>(null)
  const p = project.photos

  return (
    <div
      className="gp-right gp-album-toa"
      style={{ '--gp-color': project.accentColor } as React.CSSProperties}
    >
      <GpxCell src={p[0]} alt="Visual 1" className="gpx-ta-a" onClick={() => setActive(0)} watermark={project.title} delay={0.05} />
      <GpxCell src={p[1]} alt="Visual 2" className="gpx-ta-b" onClick={() => setActive(1)} delay={0.1} />
      <GpxCell src={p[2]} alt="Visual 3" className="gpx-ta-c" onClick={() => setActive(2)} delay={0.15} />
      <GpxCell src={p[3]} alt="Visual 4" className="gpx-ta-d" onClick={() => setActive(3)} delay={0.2} />
      <GpxCell src={p[4]} alt="Visual 5" className="gpx-ta-e" onClick={() => setActive(4)} delay={0.25} />
      <GpxCell src={p[5]} alt="Visual 6" className="gpx-ta-f" onClick={() => setActive(5)} delay={0.3} />
      <AnimatePresence>
        {active !== null && (
          <PhotoModal photos={p} initialIndex={active} rankColor={project.accentColor} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAGTWIN Album (12 photos) ────────────────────────────
// 3-col portrait layout: B spans rows 1–2 as central tall
// panel; F anchors left col rows 3–4; nested 3×2 cluster
// fills the right two cols at the bottom.
// ─── MAGTWIN Album (5 photos) ─────────────────────────────
// Diagonal burst: A wide hero top-left, B tall right col spans
// rows 1–2, C+D fill mid-left, E wide bottom strip.
function MagtwinsAlbum({ project }: { project: Project }) {
  const [active, setActive] = useState<number | null>(null)
  const p = project.photos

  return (
    <div
      className="gp-right gp-album-magtwins"
      style={{ '--gp-color': project.accentColor } as React.CSSProperties}
    >
      <GpxCell src={p[0]} alt="Visual 1" className="gpx-mg-a" onClick={() => setActive(0)} watermark={project.title} delay={0.05} />
      <GpxCell src={p[1]} alt="Visual 2" className="gpx-mg-b" onClick={() => setActive(1)} delay={0.1} />
      <GpxCell src={p[2]} alt="Visual 3" className="gpx-mg-c" onClick={() => setActive(2)} delay={0.15} />
      <GpxCell src={p[3]} alt="Visual 4" className="gpx-mg-d" onClick={() => setActive(3)} delay={0.2} />
      <GpxCell src={p[4]} alt="Visual 5" className="gpx-mg-e" onClick={() => setActive(4)} delay={0.25} />
      <AnimatePresence>
        {active !== null && (
          <PhotoModal photos={p} initialIndex={active} rankColor={project.accentColor} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── ILUNIA Album (11 photos) ─────────────────────────────
// 3-col deep mosaic: 5 outer cells with spanning columns/rows,
// bottom center holds a nested 3×2 cluster of 6 photos.
function IluniaAlbum({ project }: { project: Project }) {
  const [active, setActive] = useState<number | null>(null)
  const p = project.photos

  return (
    <div
      className="gp-right gp-album-ilunia"
      style={{ '--gp-color': project.accentColor } as React.CSSProperties}
    >
      <GpxCell src={p[0]} alt="Visual 1" className="gpx-il-a" onClick={() => setActive(0)} watermark={project.title} delay={0.05} />
      <GpxCell src={p[1]} alt="Visual 2" className="gpx-il-b" onClick={() => setActive(1)} delay={0.1} />
      <GpxCell src={p[2]} alt="Visual 3" className="gpx-il-c" onClick={() => setActive(2)} delay={0.15} />
      <GpxCell src={p[3]} alt="Visual 4" className="gpx-il-d" onClick={() => setActive(3)} delay={0.2} />
      <GpxCell src={p[4]} alt="Visual 5" className="gpx-il-e" onClick={() => setActive(4)} delay={0.25} />
      {/* Nested 3×2 perception cluster */}
      <div className="gpx-nest gpx-il-nest">
        <GpxCell src={p[5]}  alt="Concept 1" className="gpx-il-na" onClick={() => setActive(5)}  delay={0.28} />
        <GpxCell src={p[6]}  alt="Concept 2" className="gpx-il-nb" onClick={() => setActive(6)}  delay={0.31} />
        <GpxCell src={p[7]}  alt="Concept 3" className="gpx-il-nc" onClick={() => setActive(7)}  delay={0.34} />
        <GpxCell src={p[8]}  alt="Concept 4" className="gpx-il-nd" onClick={() => setActive(8)}  delay={0.37} />
        <GpxCell src={p[9]}  alt="Concept 5" className="gpx-il-ne" onClick={() => setActive(9)}  delay={0.4} />
        <GpxCell src={p[10]} alt="Concept 6" className="gpx-il-nf" onClick={() => setActive(10)} delay={0.43} />
      </div>
      <AnimatePresence>
        {active !== null && (
          <PhotoModal photos={p} initialIndex={active} rankColor={project.accentColor} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Exported page pairs ───────────────────────────────────
export function GameProject1Left()  { return <GameProjectLeft    project={projects[0]} /> }
export function GameProject1Right() { return <TutsakAlbum        project={projects[0]} /> }
export function GameProject2Left()  { return <GameProjectLeft    project={projects[1]} /> }
export function GameProject2Right() { return <TrickOrAdmitAlbum  project={projects[1]} /> }
export function GameProject3Left()  { return <GameProjectLeft    project={projects[2]} /> }
export function GameProject3Right() { return <MagtwinsAlbum      project={projects[2]} /> }
export function GameProject4Left()  { return <GameProjectLeft    project={projects[3]} /> }
export function GameProject4Right() { return <IluniaAlbum        project={projects[3]} /> }
