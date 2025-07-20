"use client"

import { useRef, useEffect } from "react"

interface SquaresProps {
  squareSize?: number
  borderColor?: string
  backgroundColor?: string
  hoverFillColor?: string
}

const Squares = ({
  squareSize = 1000,
  borderColor = "#e5e7eb",
  backgroundColor = "#fafafa",
  hoverFillColor = "#f3f4f6",
}: SquaresProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 1

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += squareSize) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0) // +0.5 for crisp lines
        ctx.lineTo(x + 0.5, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += squareSize) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5) // +0.5 for crisp lines
        ctx.lineTo(canvas.width, y + 0.5)
        ctx.stroke()
      }

      // Draw hover effect if there's a hovered square
      if (hoveredSquareRef.current) {
        const { x, y } = hoveredSquareRef.current
        const squareX = x * squareSize
        const squareY = y * squareSize

        ctx.fillStyle = hoverFillColor
        ctx.fillRect(squareX, squareY, squareSize, squareSize)

        // Redraw the border for the hovered square
        ctx.strokeStyle = borderColor
        ctx.strokeRect(squareX + 0.5, squareY + 0.5, squareSize, squareSize)
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      drawGrid()
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const hoveredSquareX = Math.floor(mouseX / squareSize)
      const hoveredSquareY = Math.floor(mouseY / squareSize)

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY }
        drawGrid()
      }
    }

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null
      drawGrid()
    }

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas)

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Initial draw
    resizeCanvas()

    return () => {
      resizeObserver.disconnect()
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [squareSize, borderColor, backgroundColor, hoverFillColor])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default Squares
