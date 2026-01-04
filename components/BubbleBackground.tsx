'use client'

import { useEffect, useRef } from 'react'

interface Bubble {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize bubbles
    const numBubbles = 50
    const minSpeed = 0.5; // Ensure they never stop
    
    bubblesRef.current = Array.from({ length: numBubbles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Random velocity but ensuring it's not zero
      vx: (Math.random() - 0.5) * 2 || minSpeed,
      vy: (Math.random() - 0.5) * 2 || minSpeed,
      radius: Math.random() * 5 + 1,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubblesRef.current.forEach((bubble) => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - bubble.x
        const dy = mouseRef.current.y - bubble.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Disperse if close
        if (distance < 150) {
          const force = (150 - distance) / 150
          bubble.vx -= (dx / distance) * force * 0.2
          bubble.vy -= (dy / distance) * force * 0.2
        }

        // Update position
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        // Bounce off edges
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.vx *= -1
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.vy *= -1

        // --- KEY CHANGES HERE ---
        // 1. Removed damping (the 0.99 multiplier)
        // 2. Add a tiny bit of "constant speed" logic if they slow down too much
        const speed = Math.sqrt(bubble.vx ** 2 + bubble.vy ** 2)
        if (speed < minSpeed) {
          bubble.vx *= 1.1
          bubble.vy *= 1.1
        }
        // Limit max speed so they don't fly off like bullets
        if (speed > 2) {
          bubble.vx *= 0.95
          bubble.vy *= 0.95
        }

        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(231, 116, 189, 0.3)'
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      // Changed z-index to -10 to ensure it's behind everything
      // Added absolute/fixed positioning and inset-0
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: 'transparent' }}
    />
  )
}