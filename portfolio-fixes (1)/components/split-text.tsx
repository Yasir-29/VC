"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: "chars" | "words" | "lines"
  from?: { opacity?: number; y?: number; x?: number }
  to?: { opacity?: number; y?: number; x?: number }
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "center" | "right"
  onLetterAnimationComplete?: () => void
}

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold, rootMargin })

  const elements = splitType === "chars" ? text.split("") : text.split(" ")

  return (
    <div
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          className={splitType === "chars" ? "inline-block" : "inline-block mr-2"}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration,
            delay: index * (delay / 1000),
            ease,
          }}
          onAnimationComplete={() => {
            if (index === elements.length - 1) {
              onLetterAnimationComplete?.()
            }
          }}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </div>
  )
}

export default SplitText
