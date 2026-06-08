import { useCallback, useEffect, useRef } from 'react'

// Grows a textarea with its content between minHeight and maxHeight.
// adjustHeight(true) resets it back to minHeight (e.g. after sending).
export function useAutoResizeTextarea({ minHeight = 48, maxHeight = 120 }) {
  const textareaRef = useRef(null)

  const adjustHeight = useCallback((reset) => {
    const el = textareaRef.current
    if (!el) return
    if (reset) {
      el.style.height = `${minHeight}px`
      return
    }
    // Collapse first so scrollHeight reflects the true content height.
    el.style.height = `${minHeight}px`
    const next = Math.min(el.scrollHeight, maxHeight)
    el.style.height = `${Math.max(minHeight, next)}px`
  }, [minHeight, maxHeight])

  useEffect(() => {
    const el = textareaRef.current
    if (el) el.style.height = `${minHeight}px`
  }, [minHeight])

  return { textareaRef, adjustHeight }
}
