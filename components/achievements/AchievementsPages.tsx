'use client'

import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { PhotoModal } from './PhotoModal'

// ─── Rank color map ───────────────────────────────────────
const RANK_COLORS: Record<1 | 2 | 3, string> = {
  1: '#F5C518',
  2: '#9DB8D2',
  3: '#C8834A',
}

// ─── Stagger animation variants ──────────────────────────
const COMIC_EASE = [0.25, 0.46, 0.45, 0.94] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: COMIC_EASE } },
}

// ─── Photo slot ───────────────────────────────────────────
function PhotoSlot({
  src,
  index,
  onClick,
}: {
  src: string | null
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      className={`ach-photo-slot${!src ? ' ach-photo-slot--empty' : ''}`}
      variants={item}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`Photo ${index + 1}`}
      whileHover={src ? { scale: 1.03 } : {}}
      transition={{ duration: 0.18 }}
    >
      {src ? (
        <>
          <img src={src} alt={`Photo ${index + 1}`} />
          <div className="ach-photo-overlay" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 1.5L14.5 8L3 14.5V1.5Z" fill="currentColor"/>
            </svg>
          </div>
        </>
      ) : (
        <>
          <span className="ach-photo-num">{String(index + 1).padStart(2, '0')}</span>
          <span className="ach-photo-plus">+</span>
        </>
      )}
    </motion.div>
  )
}

// ─── Achievement page template ────────────────────────────
interface AchievementPageProps {
  rankNum: 1 | 2 | 3
  rankLabel: string
  event: string
  subtitle: string
  stat: string
  bullets: string[]
  mainPhoto: string | null
  photos: (string | null)[]
  videoLink?: string
}

function AchievementPage({
  rankNum,
  rankLabel,
  event,
  subtitle,
  stat,
  bullets,
  mainPhoto,
  photos,
  videoLink,
}: AchievementPageProps) {
  const color = RANK_COLORS[rankNum]
  const [activePhoto, setActivePhoto] = useState<number | null>(null)

  return (
    <motion.div
      className="ach-page"
      style={{ '--ach-color': color } as CSSProperties}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Ana fotoğraf ── */}
      <motion.div className="ach-main-wrap" variants={item}>
        {mainPhoto
          ? <img src={mainPhoto} alt={event} className="ach-main-img" />
          : (
            <div className="ach-main-empty">
              <span className="ach-main-plus">+</span>
              <span className="ach-main-label">MAIN PHOTO</span>
            </div>
          )
        }
        <div className="ach-rank-badge">
          <span className="ach-rank-num">{rankLabel}</span>
          <span className="ach-rank-sub">PLACE</span>
        </div>
      </motion.div>

      {/* ── Event bilgisi ── */}
      <motion.div className="ach-event-row" variants={item}>
        <div className="ach-event-name">{event}</div>
        <div className="ach-event-meta">
          <span className="ach-event-sub">{subtitle}</span>
          <span className="ach-stat-tag">{stat}</span>
          {videoLink && (
            <a
              href={videoLink}
              target="_blank"
              rel="noreferrer"
              className="ach-video-btn"
              onClick={e => e.stopPropagation()}
            >
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden>
                <path d="M1 1L8 5L1 9V1Z" fill="currentColor"/>
              </svg>
              WATCH
            </a>
          )}
        </div>
      </motion.div>

      {/* ── Highlights ── */}
      <motion.div className="ach-bullets" variants={item}>
        {bullets.map((b, i) => (
          <div key={i} className="ach-bullet">
            <span className="ach-bullet-pip" aria-hidden>▶</span>
            <span>{b}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Photo grid ── */}
      <motion.div className="ach-section-label" variants={item}>PHOTOS</motion.div>
      <motion.div className="ach-photo-grid" variants={container}>
        {photos.map((src, i) => (
          <PhotoSlot
            key={i}
            src={src}
            index={i}
            onClick={() => setActivePhoto(i)}
          />
        ))}
      </motion.div>

      {/* ── Footer ── */}
      <motion.div className="ach-foot" variants={item}>
        <span className="ach-foot-left">ACHIEVEMENTS</span>
        <span className="ach-foot-dots">· · ·</span>
        <span className="ach-foot-right">{rankLabel} PLACE</span>
      </motion.div>

      {/* ── Photo modal ── */}
      <AnimatePresence>
        {activePhoto !== null && (
          <PhotoModal
            photos={photos}
            initialIndex={activePhoto}
            rankColor={color}
            onClose={() => setActivePhoto(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Exported pages ───────────────────────────────────────

export function AchievementPage1() {
  return (
    <AchievementPage
      rankNum={1}
      rankLabel="1ST"
      event="GLOBAL GAME JAM"
      subtitle="GGConvention · Jan 2026"
      stat="LOCAL 1ST / 60 TEAMS"
      mainPhoto="/projects/game3/trick or admit.jpeg"
      bullets={[
        'Led design of Trick or Admit — asymmetric psychological deduction game built on evidence-driven dialogue systems.',
        'Delivered complete playable build within 48 hours, ranking 1st locally among 60 competing teams.',
      ]}
      photos={[
        '/achievements/achievement1/1.png',
        '/achievements/achievement1/2.png',
        '/achievements/achievement1/3.jpeg',
      ]}
    />
  )
}

export function AchievementPage2() {
  return (
    <AchievementPage
      rankNum={3}
      rankLabel="3RD"
      event="AYAZJAM 2025"
      subtitle="Game Jam · Dec 2025"
      stat="3RD / 50 TEAMS"
      mainPhoto="/projects/game2/tutsak.jpeg"
      bullets={[
        'Narrative courtroom puzzle TUTSAK — evidence manipulation and high-stakes player choice systems.',
        'Designed core game and level mechanics focused on evidence reinterpretation and branching consequences.',
      ]}
      photos={[
        '/achievements/achievement2/1.jpeg',
        '/achievements/achievement2/2.JPG',
        '/achievements/achievement2/3.JPG',
      ]}
    />
  )
}

export function AchievementPage3() {
  return (
    <AchievementPage
      rankNum={2}
      rankLabel="2ND"
      event="L'ORÉAL BRANDSTORM"
      subtitle="Istanbul Finals · May 2025"
      stat="2ND / 200 TEAMS · TOP 4"
      mainPhoto="/achievements/achievement3/achievement3.png"
      videoLink="https://www.youtube.com/watch?v=Ab5HMRR4nso"
      bullets={[
        'Developed Virtual Grooming League — an innovative VR-based beauty and care solution for L\'Oréal Brandstorm 2025.',
        'Placed 2nd among 200 teams as team "Wise Legion of the Future", selected as top 4 finalist in Istanbul.',
      ]}
      photos={[
        '/achievements/achievement3/1.jpg',
        '/achievements/achievement3/2.jpg',
        '/achievements/achievement3/3.jpg',
      ]}
    />
  )
}
