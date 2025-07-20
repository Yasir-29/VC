"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollFloatProps {
  children: string
  scrollContainerRef?: React.RefObject<HTMLElement>
  containerClassName?: string
  textClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
}

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "easeOut",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 })

  const words = children.split(" ")

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <div className={`inline-block text-[clamp(1.6rem,4vw,3rem)] ${textClassName}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 50, scaleY: 1.2 }}
            animate={isInView ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: 50, scaleY: 1.2 }}
            transition={{
              duration: animationDuration,
              delay: index * stagger,
              ease: ease,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default ScrollFloat
