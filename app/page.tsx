'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import FlipBook from '@/components/flipbook/FlipBook'
import { getBookDimensions } from '@/components/flipbook/useFlipBook'
import { CVLeftPage, CVRightPage } from '@/components/cv-book/CVBookPages'
import { AchievementPage1, AchievementPage2, AchievementPage3 } from '@/components/achievements/AchievementsPages'
import {
  GameProject1Left, GameProject1Right,
  GameProject2Left, GameProject2Right,
  GameProject3Left, GameProject3Right,
  GameProject4Left, GameProject4Right,
} from '@/components/game-projects/GameProjectPages'

const BOOK_SPINE_WIDTH = 22
const BOOK_CARD_WIDTH = 230
const INTRO_STAGE_TIMELINE_MS = {
  name: 0,
  role: 80,
  shelf: 700,
  open: 2400,
} as const
const INTRO_REVEAL_TIMINGS = {
  gateDuration: 0.45,
  heroFrameDuration: 0.55,
  nameDuration: 0.95,
  ruleDuration: 0.72,
  roleDuration: 0.68,
  shelfDuration: 1.2,
  bookStagger: 0.3,
  bookDuration: 1.45,
} as const
const INTRO_EXIT_EASE = [0.4, 0, 0.08, 1] as const
const INTRO_FLOW_EASE = [0.22, 1, 0.36, 1] as const
const INTRO_SOFT_EASE = [0.2, 0.65, 0.3, 1] as const
const INTRO_SHELF_EASE = [0.18, 0.72, 0.22, 1] as const
const INTRO_BOOK_EASE = [0.16, 0.72, 0.24, 1] as const

type IntroStage = 'gate' | 'transition' | 'name' | 'role' | 'shelf' | 'open'

const BOOKS = [
  { id: 'comic-1', title: 'PROFILE',       pageCount: 4, cover: '/kapak1.png' as string | undefined, backCover: '/profile_bg.png' as string | undefined, accent: '#E8282B', coverRatio: 1024 / 1365 },
  { id: 'comic-2', title: 'GAME PROJECTS', pageCount: 10, cover: '/kapak2.png' as string | undefined, backCover: '/game_bg.png' as string | undefined, accent: '#2563EB', coverRatio: 334 / 468 },
  { id: 'comic-3', title: 'ACHIEVEMENTS',  pageCount: 6, cover: '/kapak3.png' as string | undefined, backCover: '/achievement_bg.png' as string | undefined, accent: '#F5C518', coverRatio: 356 / 475 },
]

function getLibraryCardWidth(viewportWidth: number) {
  if (viewportWidth < 480) return 108
  if (viewportWidth < 640) return 126
  if (viewportWidth < 860) return 168
  if (viewportWidth < 1080) return 196
  return BOOK_CARD_WIDTH
}

// ─── Unified cover face ────────────────────────────────────
// Used in: library card · zoom transition frame · flipbook page 1
// To add a cover image later: set book.cover = '/covers/game-design.jpg'
function CoverFace({ number, title, src, showFooter = true }: { number: string; title: string; src?: string; showFooter?: boolean }) {
  return (
    <div className="cover-face">
      {src
        ? <img src={src} alt={title} className="cover-face-img" />
        : <div className="cover-face-ghost">{number}</div>
      }
      {showFooter && (
        <div className="cover-face-footer">
          <div className="cover-face-title">{title}</div>
        </div>
      )}
    </div>
  )
}

// ─── Shell: SVG panel overlay (cross + corner marks) ──────
function PanelOverlay() {
  return (
    <svg
      className="shell-overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Diagonal cross */}
      <line x1="0"   y1="0"   x2="100" y2="100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0"   x2="0"   y2="100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      {/* Corner marks */}
      <line x1="0"   y1="0"   x2="10"  y2="0"   stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="0"   y1="0"   x2="0"   y2="10"  stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0"   x2="90"  y2="0"   stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0"   x2="100" y2="10"  stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="0"   y1="100" x2="10"  y2="100" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="0"   y1="100" x2="0"   y2="90"  stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="100" x2="90"  y2="100" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="100" x2="100" y2="90"  stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// ─── Shell panel ──────────────────────────────────────────
function ShellPanel({ index }: { index: number }) {
  return (
    <div className="shell-panel anim-panel">
      <PanelOverlay />
      <span className="shell-panel-num">{String(index).padStart(2, '0')}</span>
    </div>
  )
}

// ─── Shell: Back cover (hard last page) ───────────────────
function ShellBack({ bookNum, title, src, onClose }: { bookNum: string; title: string; src?: string; onClose?: () => void }) {
  if (src) {
    return (
      <div className="shell-back shell-back--art">
        <img src={src} alt={`${title} back cover`} className="shell-back-art-img" />
      </div>
    )
  }

  return (
    <div className="shell-back">
      <div className="shell-back-panel anim-panel">
        <PanelOverlay />
        {onClose && (
          <button className="shell-back-return anim-panel" onClick={onClose} aria-label="Return to library">
            <svg className="shell-back-return-corners" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0"   y1="0"   x2="18"  y2="0"   stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="0"   y1="0"   x2="0"   y2="18"  stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0"   x2="82"  y2="0"   stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0"   x2="100" y2="18"  stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="0"   y1="100" x2="18"  y2="100" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="0"   y1="100" x2="0"   y2="82"  stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="100" x2="82"  y2="100" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="100" x2="100" y2="82"  stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="shell-back-return-label">← RETURN TO LIBRARY</span>
          </button>
        )}
      </div>
      <div className="shell-back-foot">
        <span className="shell-back-num anim-meta">{bookNum}</span>
      </div>
    </div>
  )
}

// ─── Shell inner layouts (5 variants) ─────────────────────
// Layout A: 2 equal columns
function ShellLayoutA({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-inner">
      <div className="shell-grid shell-grid-2col">
        <ShellPanel index={1} />
        <ShellPanel index={2} />
      </div>
      <ShellPageFoot pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

// Layout B: large top + 2 bottom
function ShellLayoutB({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-inner">
      <div className="shell-grid shell-grid-1-2">
        <ShellPanel index={1} />
        <div className="shell-row">
          <ShellPanel index={2} />
          <ShellPanel index={3} />
        </div>
      </div>
      <ShellPageFoot pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

// Layout C: 3 equal rows
function ShellLayoutC({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-inner">
      <div className="shell-grid shell-grid-3row">
        <ShellPanel index={1} />
        <ShellPanel index={2} />
        <ShellPanel index={3} />
      </div>
      <ShellPageFoot pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

// Layout D: 2 top + large bottom
function ShellLayoutD({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-inner">
      <div className="shell-grid shell-grid-2-1">
        <div className="shell-row">
          <ShellPanel index={1} />
          <ShellPanel index={2} />
        </div>
        <ShellPanel index={3} />
      </div>
      <ShellPageFoot pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

// Layout E: single full panel
function ShellLayoutE({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-inner">
      <div className="shell-grid shell-grid-full">
        <ShellPanel index={1} />
      </div>
      <ShellPageFoot pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

function ShellPageFoot({ pageNum, totalPages }: { pageNum: number; totalPages: number }) {
  return (
    <div className="shell-foot anim-meta">
      <span>{String(pageNum).padStart(2, '0')}</span>
      <span className="shell-foot-dots">· · ·</span>
      <span>{String(totalPages).padStart(2, '0')}</span>
    </div>
  )
}

const INNER_LAYOUTS = [ShellLayoutA, ShellLayoutB, ShellLayoutC, ShellLayoutD, ShellLayoutE]

// ─── Page dispatcher ───────────────────────────────────────
function BookPage({ pageNum, totalPages, bookIndex, onClose }: {
  pageNum: number; totalPages: number; bookIndex: number; onClose?: () => void
}) {
  const book = BOOKS[bookIndex]
  const num  = String(bookIndex + 1).padStart(2, '0')

  if (pageNum === 1)          return <CoverFace title={book.title} number={num} src={book.cover} showFooter={false} />
  if (pageNum === totalPages) return <ShellBack bookNum={num} title={book.title} src={book.backCover} onClose={onClose} />

  // Book 0 (PROFILE) — CV spread
  if (bookIndex === 0 && pageNum === 2) return <CVLeftPage />
  if (bookIndex === 0 && pageNum === 3) return <CVRightPage />

  // Book 1 (GAME PROJECTS) — left/right spread per project
  if (bookIndex === 1 && pageNum === 2) return <GameProject1Left />
  if (bookIndex === 1 && pageNum === 3) return <GameProject1Right />
  if (bookIndex === 1 && pageNum === 4) return <GameProject2Left />
  if (bookIndex === 1 && pageNum === 5) return <GameProject2Right />
  if (bookIndex === 1 && pageNum === 6) return <GameProject3Left />
  if (bookIndex === 1 && pageNum === 7) return <GameProject3Right />
  if (bookIndex === 1 && pageNum === 8) return <GameProject4Left />
  if (bookIndex === 1 && pageNum === 9) return <GameProject4Right />

  // Book 2 (ACHIEVEMENTS) — one page per achievement
  if (bookIndex === 2 && pageNum === 2) return <AchievementPage1 />
  if (bookIndex === 2 && pageNum === 3) return <AchievementPage2 />
  if (bookIndex === 2 && pageNum === 4) return <AchievementPage3 />

  const Layout = INNER_LAYOUTS[(pageNum - 2) % INNER_LAYOUTS.length]
  return <Layout pageNum={pageNum} totalPages={totalPages} />
}

// ─── Main ──────────────────────────────────────────────────
export default function Home() {
  const [selected, setSelected]         = useState<number | null>(null)
  const [flipbookReady, setFlipbookReady] = useState(false)
  const [introStage, setIntroStage] = useState<IntroStage>('gate')
  const [introSequenceStarted, setIntroSequenceStarted] = useState(false)
  // coverSize = single-page dimensions (9:16) used for the zoom transition frame
  const [coverSize, setCoverSize] = useState({ w: 253, h: 450 })
  const [libraryCardWidth, setLibraryCardWidth] = useState(BOOK_CARD_WIDTH)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const syncLayout = () => {
      const { w, h, single } = getBookDimensions()
      setCoverSize({ w: single ? w : Math.floor(w / 2), h })
      setLibraryCardWidth(getLibraryCardWidth(window.innerWidth))
    }

    syncLayout()
    window.addEventListener('resize', syncLayout)

    return () => window.removeEventListener('resize', syncLayout)
  }, [])

  useEffect(() => {
    if (!introSequenceStarted) return

    const timers = [
      window.setTimeout(() => setIntroStage('name'), INTRO_STAGE_TIMELINE_MS.name),
      window.setTimeout(() => setIntroStage('role'), INTRO_STAGE_TIMELINE_MS.role),
      window.setTimeout(() => setIntroStage('shelf'), INTRO_STAGE_TIMELINE_MS.shelf),
      window.setTimeout(() => setIntroStage('open'), INTRO_STAGE_TIMELINE_MS.open),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [introSequenceStarted])

  function openBook(i: number)  { setFlipbookReady(false); setSelected(i) }
  function closeBook()          { setFlipbookReady(false); setSelected(null) }
  function startIntro() {
    if (introSequenceStarted) return
    setIntroSequenceStarted(true)
    setIntroStage('transition')
  }

  const book = selected !== null ? BOOKS[selected] : null
  const showHero = introStage === 'name' || introStage === 'role' || introStage === 'shelf' || introStage === 'open'
  const showRole = introStage === 'role' || introStage === 'shelf' || introStage === 'open'
  const showShelf = introStage === 'shelf' || introStage === 'open'
  const introIsOpen = introStage === 'open'
  const revealTimings = INTRO_REVEAL_TIMINGS
  const bookSpineWidth = Math.max(12, Math.round(libraryCardWidth * (BOOK_SPINE_WIDTH / BOOK_CARD_WIDTH)))
  const heroFrameInitial = { opacity: 0 }
  const heroFrameAnimate = { opacity: 1 }
  const ruleInitial = prefersReducedMotion ? { opacity: 0, scaleX: 0.3 } : { opacity: 0, scaleX: 0.08 }
  const ruleAnimate = { opacity: 1, scaleX: 1 }
  const shelfInitial = prefersReducedMotion ? { opacity: 0, y: 10 } : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(10px)' }
  const shelfAnimate = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  const bookInitial = prefersReducedMotion ? { opacity: 0, y: 14, scale: 0.98 } : { opacity: 0, y: 26, scale: 0.95, filter: 'blur(8px)' }
  const bookAnimate = prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }

  return (
    <div className="root-shell">

      {/* ── Library ─────────────────────────────────────── */}
      <AnimatePresence>
        {selected === null && (
          <motion.main
            className="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AnimatePresence>
              {introStage === 'gate' && (
                <motion.div
                  className="entry-gate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.button
                    type="button"
                    className="entry-gate-btn"
                    onClick={startIntro}
                    aria-label="Open portfolio"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  >
                    <motion.span
                      className="entry-gate-identity"
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 52 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.span
                        layoutId="identity-name"
                        className="entry-gate-name"
                        transition={{ layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }}
                      >
                        ALPASLAN KEMAL PEHLİVANLI
                      </motion.span>
                      <span className="entry-gate-idrule" aria-hidden="true" />
                      <motion.span
                        layoutId="identity-role"
                        className="entry-gate-role"
                        transition={{ layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }}
                      >
                        Game Designer
                      </motion.span>
                    </motion.span>
                    <motion.span
                      className="entry-gate-cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      <span className="entry-gate-icon" aria-hidden="true">
                        <ArrowDown strokeWidth={1.6} />
                      </span>
                      <span className="entry-gate-hint">Enter Portfolio</span>
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {showHero && (
              <>
                {/* ── Hero başlık ─────────────────────────── */}
                <motion.header
                  className="library-hero"
                  layout="position"
                  initial={heroFrameInitial}
                  animate={heroFrameAnimate}
                  transition={{ duration: revealTimings.heroFrameDuration, ease: INTRO_SOFT_EASE }}
                >
                  <motion.div
                    layoutId="identity-name"
                    className="library-hero-name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      opacity: { duration: 0.45 },
                      layout: { duration: 0.62, ease: INTRO_FLOW_EASE },
                    }}
                  >
                    ALPASLAN KEMAL PEHLİVANLI
                  </motion.div>

                  {showRole && (
                    <motion.div
                      key="hero-rule"
                      className="library-hero-rule"
                      initial={ruleInitial}
                      animate={ruleAnimate}
                      transition={{
                        duration: revealTimings.ruleDuration,
                        ease: INTRO_SOFT_EASE,
                      }}
                    />
                  )}

                  {showRole && (
                    <motion.div
                      layoutId="identity-role"
                      key="hero-role"
                      className="library-hero-role"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        opacity: { duration: 0.45 },
                        layout: { duration: 0.62, ease: INTRO_FLOW_EASE },
                      }}
                    >
                      Game Designer
                    </motion.div>
                  )}
                </motion.header>

                {showShelf && (
                  <motion.div
                    className="library-shelf"
                    initial={shelfInitial}
                    animate={shelfAnimate}
                    transition={{
                      duration: revealTimings.shelfDuration,
                      ease: INTRO_SHELF_EASE,
                    }}
                  >
                    {BOOKS.map((b, i) => {
                      const cardHeight = Math.round((libraryCardWidth - bookSpineWidth) / b.coverRatio)
                      return (
                        <motion.div
                          key={b.id}
                          className="book-item"
                          initial={bookInitial}
                          animate={bookAnimate}
                          transition={{
                            duration: revealTimings.bookDuration,
                            delay: i * revealTimings.bookStagger,
                            ease: INTRO_BOOK_EASE,
                          }}
                          whileHover={introIsOpen && !prefersReducedMotion ? { y: -6 } : undefined}
                          style={{
                            '--book-accent': b.accent,
                            '--book-spine-width': `${bookSpineWidth}px`,
                          } as CSSProperties}
                        >
                          <motion.button
                            type="button"
                            layoutId={`cover-${b.id}`}
                            className="book-cover"
                            onClick={() => openBook(i)}
                            disabled={!introIsOpen}
                            style={{
                              width: libraryCardWidth,
                              height: cardHeight,
                              cursor: introIsOpen ? 'pointer' : 'default',
                              border: 'none',
                              padding: 0,
                              background: 'transparent',
                            } as CSSProperties}
                          >
                            <div className="book-cover-spine" />
                            <CoverFace number={`0${i + 1}`} title={b.title} src={b.cover} showFooter={false} />
                          </motion.button>
                          <motion.div
                            className="book-item-label"
                            animate={{ opacity: selected !== null ? 0 : 1 }}
                            transition={{ duration: 0.15 }}
                          >{b.title}</motion.div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </>
            )}
          </motion.main>
        )}
      </AnimatePresence>

      {/* ── Reading stage ───────────────────────────────── */}
      <AnimatePresence>
        {book && (
          <>
            <motion.div
              className="reading-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="reading-stage">
              <AnimatePresence>
                {!flipbookReady && (
                  <motion.div
                    layoutId={`cover-${book.id}`}
                    className="reading-frame"
                    style={{ width: coverSize.w, height: coverSize.h }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    onLayoutAnimationComplete={() => setFlipbookReady(true)}
                  >
                    <CoverFace number={`0${selected! + 1}`} title={book.title} src={book.cover} showFooter={false} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {flipbookReady && (
                  <motion.div
                    style={{ position: 'absolute', inset: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FlipBook bookId={book.id} totalPages={book.pageCount} onClose={closeBook}>
                      {Array.from({ length: book.pageCount }, (_, i) => {
                        const isHard = i === 0 || i === book.pageCount - 1
                        const isCVSpread = selected === 0 && !isHard
                        return (
                          <div
                            key={i}
                            className={`page${isHard ? ' hard' : ''}${isCVSpread ? ' cv-page' : ''}`}
                            data-page-num={i + 1}
                          >
                            <BookPage
                              pageNum={i + 1}
                              totalPages={book.pageCount}
                              bookIndex={selected!}
                              onClose={closeBook}
                            />
                          </div>
                        )
                      })}
                    </FlipBook>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
