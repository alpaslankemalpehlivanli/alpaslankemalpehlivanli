'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface PhotoModalProps {
  photos: (string | null)[]
  initialIndex: number
  rankColor: string
  onClose: () => void
}

export function PhotoModal({ photos, initialIndex, rankColor, onClose }: PhotoModalProps) {
  const [index, setIndex]   = useState(initialIndex)
  const [mounted, setMounted] = useState(false)
  const dirRef = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  const hasPrev = index > 0
  const hasNext = index < photos.length - 1
  const src     = photos[index]

  function prev() {
    if (!hasPrev) return
    dirRef.current = -1
    setIndex(i => i - 1)
  }

  function next() {
    if (!hasNext) return
    dirRef.current = 1
    setIndex(i => i + 1)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  if (!mounted) return null

  return createPortal(
    <motion.div
      className="phm-backdrop"
      style={{ '--phm-color': rankColor } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="phm-container"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.93,    opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Üst bar ── */}
        <div className="phm-topbar">
          <div className="phm-counter">
            <span className="phm-counter-cur">{String(index + 1).padStart(2, '0')}</span>
            <span className="phm-counter-sep"> / </span>
            <span className="phm-counter-tot">{String(photos.length).padStart(2, '0')}</span>
          </div>
          <button className="phm-close-btn" onClick={onClose} aria-label="Kapat">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
            </svg>
          </button>
        </div>

        {/* ── Fotoğraf çerçevesi ── */}
        <div className="phm-frame">
          {/* Köşe işaretleri */}
          <div className="phm-corner phm-corner-tl" aria-hidden />
          <div className="phm-corner phm-corner-tr" aria-hidden />
          <div className="phm-corner phm-corner-bl" aria-hidden />
          <div className="phm-corner phm-corner-br" aria-hidden />

          <AnimatePresence mode="wait" initial={false} custom={dirRef.current}>
            <motion.div
              key={index}
              className="phm-photo-wrap"
              custom={dirRef.current}
              variants={{
                enter:  (d: number) => ({ opacity: 0, x: d * 36 }),
                center: { opacity: 1, x: 0 },
                exit:   (d: number) => ({ opacity: 0, x: d * -36 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {src
                ? <img src={src} alt={`Fotoğraf ${index + 1}`} className="phm-img" />
                : (
                  <div className="phm-empty">
                    <span className="phm-empty-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="phm-empty-text">PHOTO COMING SOON</span>
                  </div>
                )
              }
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigasyon ── */}
        <div className="phm-nav">
          <button
            className={`phm-arrow${!hasPrev ? ' phm-arrow--off' : ''}`}
            onClick={prev}
            disabled={!hasPrev}
            aria-label="Önceki fotoğraf"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square"/>
            </svg>
            <span>PREV</span>
          </button>

          <div className="phm-dots">
            {photos.map((_, i) => (
              <button
                key={i}
                className={`phm-dot${i === index ? ' phm-dot--on' : ''}`}
                onClick={() => {
                  dirRef.current = i > index ? 1 : -1
                  setIndex(i)
                }}
                aria-label={`Fotoğraf ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`phm-arrow${!hasNext ? ' phm-arrow--off' : ''}`}
            onClick={next}
            disabled={!hasNext}
            aria-label="Sonraki fotoğraf"
          >
            <span>NEXT</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square"/>
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
