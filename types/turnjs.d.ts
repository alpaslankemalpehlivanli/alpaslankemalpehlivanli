interface TurnOptions {
  width?: number
  height?: number
  display?: 'double' | 'single'
  page?: number
  pages?: number
  autoCenter?: boolean
  gradients?: boolean
  acceleration?: boolean
  elevation?: number
  inclination?: number
  duration?: number
  when?: {
    turning?: (e: Event, page: number, view: number[]) => void
    turned?: (e: Event, page: number, view: number[]) => void
    start?: (e: Event, page: unknown, corner: string) => void
    first?: (e: Event) => void
    last?: (e: Event) => void
    missing?: (e: Event, pages: number[]) => void
  }
}

interface JQuery {
  turn(options?: TurnOptions): JQuery
  turn(method: 'next' | 'previous' | 'resize' | 'stop' | 'destroy'): JQuery
  turn(method: 'page', page: number): JQuery
  turn(method: 'display', mode: 'single' | 'double'): JQuery
  turn(method: 'size', width: number, height: number): JQuery
  turn(method: 'page'): number
  turn(method: 'pages'): number
  turn(method: 'display'): string
  turn(method: 'animating'): boolean
  turn(method: string, ...args: unknown[]): unknown
}
