'use client'

import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number // Speed in ms per character, default 100
}

export default function TypingText({ text, speed = 100 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex(index + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [index, text, speed])

  return <span>{displayedText}</span>
}