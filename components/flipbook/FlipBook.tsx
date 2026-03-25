'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useFlipBook } from './useFlipBook'

interface FlipBookProps {
  bookId: string
  totalPages: number
  onClose?: () => void
  children: React.ReactNode
}

export default function FlipBook({ bookId, totalPages, onClose, children }: FlipBookProps) {
  const bookRef  = useRef<HTMLDivElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const { currentPage, isSingle, dimensions, isTurning, next, previous } = useFlipBook(bookRef, totalPages)

  // In double mode Turn.js page index skips (1→2→4…); convert to sequential spread numbers.
  const spreadNum   = isSingle ? currentPage : (currentPage === 1 ? 1 : Math.floor(currentPage / 2) + 1)
  const totalSpreads = isSingle ? totalPages  : (Math.floor(totalPages / 2) + 1)

  // Entry animation
  useEffect(() => {
    if (!wrapRef.current) return
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  const isFirst = spreadNum === 1
  const isLast  = spreadNum >= totalSpreads
  const edgeMode = !isSingle
    ? (currentPage === 1
        ? 'start'
        : totalPages % 2 === 0 && currentPage === totalPages
          ? 'end'
          : null)
    : null
  const viewportWidth = edgeMode ? Math.floor(dimensions.w / 2) : dimensions.w

  return (
    <main className="flipbook-root">
      <div ref={wrapRef} className="book-wrap">

        {/* Book */}
        <div
          className={`book-stage${edgeMode ? ` book-stage--${edgeMode}` : ''}`}
          style={
            {
              width: dimensions.w,
              '--book-page-width': `${Math.floor(dimensions.w / 2)}px`,
            } as React.CSSProperties
          }
        >
          <div
            className="book-viewport"
            style={{ width: viewportWidth, height: dimensions.h }}
          >
            <div className="book-canvas">
              <div
                ref={bookRef}
                id="book"
                data-book={bookId}
                style={{ width: dimensions.w, height: dimensions.h }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="book-shadow" style={{ width: viewportWidth * 0.85 }} />

        {/* Progress bar — full book width */}
        <div className="book-progress" style={{ width: dimensions.w }}>
          {Array.from({ length: totalSpreads }, (_, i) => (
            <div key={i} className={`progress-seg${i < spreadNum ? ' progress-seg--on' : ''}`} />
          ))}
        </div>

        {/* Unified nav bar — same width as book */}
        <nav className="flip-nav" style={{ width: dimensions.w }}>

          {/* Left: back to library */}
          <div className="flip-nav-left">
            {onClose && (
              <button className="flip-back-btn" onClick={onClose} aria-label="Back to library">
                ← LIBRARY
              </button>
            )}
          </div>

          {/* Center: prev · counter · next */}
          <div className="flip-nav-center">
            <button
              className={`flip-arrow-btn${isTurning ? ' is-turning' : ''}`}
              onClick={previous}
              disabled={isFirst || isTurning}
              aria-label="Previous page"
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                <path d="M9 2L2 9L9 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <span className="page-counter">
              {String(spreadNum).padStart(2, '0')} / {String(totalSpreads).padStart(2, '0')}
            </span>

            <button
              className={`flip-arrow-btn${isTurning ? ' is-turning' : ''}`}
              onClick={next}
              disabled={isLast || isTurning}
              aria-label="Next page"
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                <path d="M1 2L8 9L1 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Right: spacer for layout balance */}
          <div className="flip-nav-right" />

        </nav>
      </div>
    </main>
  )
}
