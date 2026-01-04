'use client'

import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
}

export default function TypingText({ text, speed = 150 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayedText}</span>
}
