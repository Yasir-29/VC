"use client"

import "./shiny-text.css"
import type React from "react"

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`

  return (
    <span
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
      data-text={text}
    >
      {text}
    </span>
  )
}

export default ShinyText
