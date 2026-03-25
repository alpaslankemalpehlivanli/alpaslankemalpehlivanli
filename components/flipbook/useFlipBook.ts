'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
const TURN_SCRIPT_VERSION = 'keep-all-pages-v1'

// Each page is 3:4 portrait (magazine ratio — matches Turn.js default demos).
// Single display  → book = 1 page  → ratio 3:4  (w = h × 3/4)
// Double display  → book = 2 pages → ratio 3:2  (w = h × 3/2)
export function getBookDimensions() {
  if (typeof window === 'undefined') return { w: 600, h: 800, single: true }
  const vw = window.innerWidth
  const vh = window.innerHeight
  const single = vw < 768

  const navBelow = 90 // progress + nav bar height reserve
  const maxW     = Math.floor(vw * 0.97)

  if (single) {
    const maxH = Math.floor((vh - navBelow) * 0.97)
    const h    = Math.min(maxH, Math.floor(maxW * 4 / 3))
    const w    = Math.floor(h * 3 / 4)
    return { w, h, single }
  }

  // Double: book width = 2 × page width, each page 3:4 → book ratio 3:2
  const maxH = Math.min(Math.floor((vh - navBelow) * 0.95), 920)
  const h    = Math.min(maxH, Math.floor(maxW * 2 / 3))
  const w    = Math.floor(h * 3 / 2)
  return { w, h, single }
}

export function useFlipBook(bookRef: RefObject<HTMLDivElement | null>, totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isTurning, setIsTurning] = useState(false)
  const [isSingle, setIsSingle] = useState(false)
  const [dimensions, setDimensions] = useState({ w: 900, h: 600 })
  const initializedRef = useRef(false)
  const jqRef = useRef<JQueryStatic | null>(null)

  const next = useCallback(() => {
    const $ = jqRef.current
    if (!$ || !bookRef.current) return
    $(bookRef.current).turn('next')
  }, [bookRef])

  const previous = useCallback(() => {
    const $ = jqRef.current
    if (!$ || !bookRef.current) return
    const el = bookRef.current
    // Turn.js's built-in previous() lands on the right (odd) page of the
    // previous spread, making the counter skip inconsistently vs next().
    // Instead, always navigate to the LEFT (even) page of the previous spread.
    const view = $(el).turn('view') as [number | false, number | false]
    const leftPage = (view[0] !== false ? view[0] : view[1]) as number
    if (!leftPage || leftPage <= 1) return
    $(el).turn('page', Math.max(1, leftPage - 2))
  }, [bookRef])

  const goTo = useCallback((page: number) => {
    const $ = jqRef.current
    if (!$ || !bookRef.current) return
    $(bookRef.current).turn('page', page)
  }, [bookRef])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    const host = bookRef.current

    const dims = getBookDimensions()
    setDimensions({ w: dims.w, h: dims.h })
    setIsSingle(dims.single)

    async function init() {
      const jQueryModule = await import('jquery')
      const jQuery = jQueryModule.default as JQueryStatic
      jqRef.current = jQuery
      ;(window as unknown as Record<string, unknown>).$ = jQuery
      ;(window as unknown as Record<string, unknown>).jQuery = jQuery

      await new Promise<void>((resolve) => {
        const turnState = window as unknown as {
          __turnScriptVersion?: string
        }

        if (
          turnState.__turnScriptVersion === TURN_SCRIPT_VERSION &&
          (jQuery.fn as unknown as Record<string, unknown>).turn
        ) {
          resolve()
          return
        }

        delete (jQuery.fn as unknown as Record<string, unknown>).turn

        document
          .querySelectorAll('script[data-turnjs-script="true"]')
          .forEach((node) => node.remove())

        const script = document.createElement('script')
        script.src = `/turn.min.js?v=${TURN_SCRIPT_VERSION}`
        script.dataset.turnjsScript = 'true'
        script.onload = () => {
          turnState.__turnScriptVersion = TURN_SCRIPT_VERSION
          resolve()
        }
        document.head.appendChild(script)
      })

      if (!host) return
      const el = host
      const { w, h, single } = getBookDimensions()

      jQuery(el).turn({
        width: w,
        height: h,
        autoCenter: true,
        gradients: true,
        acceleration: true,
        elevation: 50,
        display: single ? 'single' : 'double',
        duration: 700,
        when: {
          turning(_e, page) {
            setCurrentPage(page)
            setIsTurning(true)
          },
          turned(_e, page) {
            setCurrentPage(page)
            setIsTurning(false)
          },
        },
      })

      function onKey(e: KeyboardEvent) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          jQuery(el).turn('next')
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const view = jQuery(el).turn('view') as [number | false, number | false]
          const leftPage = (view[0] !== false ? view[0] : view[1]) as number
          if (leftPage && leftPage > 1) jQuery(el).turn('page', Math.max(1, leftPage - 2))
        }
      }
      window.addEventListener('keydown', onKey)

      let resizeTimer: ReturnType<typeof setTimeout>
      function onResize() {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          const { w: nw, h: nh, single: ns } = getBookDimensions()
          setDimensions({ w: nw, h: nh })
          setIsSingle(ns)
          try {
            jQuery(el).turn('size', nw, nh)
            jQuery(el).turn('display', ns ? 'single' : 'double')
          } catch {
            // ignore
          }
        }, 150)
      }
      window.addEventListener('resize', onResize)

      ;(el as unknown as { _turnCleanup?: () => void })._turnCleanup = () => {
        window.removeEventListener('keydown', onKey)
        window.removeEventListener('resize', onResize)
        clearTimeout(resizeTimer)
        try { jQuery(el).turn('destroy') } catch { /* ignore */ }
      }
    }

    init()

    return () => {
      if (host) {
        ;(host as unknown as { _turnCleanup?: () => void })._turnCleanup?.()
      }
    }
  }, [bookRef])

  return { currentPage, totalPages, isSingle, isTurning, dimensions, next, previous, goTo }
}
