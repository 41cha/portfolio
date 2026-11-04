import { useSyncExternalStore } from 'react'

// Live value of a CSS media query. `fallback` is used when there is no window
// (not needed on this Vite SPA, but keeps the hook safe).
export function useMediaQuery(query, fallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}

// >= 1024px: the desktop layout.
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

// A real mouse is present (not touch). Use it for hover-only effects.
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')
