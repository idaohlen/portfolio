import { useRef, useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'

export default function PageTransition({ children, ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{flex: '1', display: 'flex'}}
      {...props}
    >
      {children}
    </div>
  )
}