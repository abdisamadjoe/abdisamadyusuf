"use client"

import type { SVGMotionProps } from "motion/react"
import { motion } from "motion/react"

// const circle1 =
//   "M 12 6 C 15.315 6 18 8.685 18 12 C 18 15.315 15.315 18 12 18 C 8.685 18 6 15.315 6 12 C 6 8.685 8.685 6 12 6 Z"

// Larger circle to create a more pronounced animation effect
const circle1 =
  "M12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z"

const infinity =
  "M 6 16 C 11 16 13 8 18 8 C 23.333 8 23.333 16 18 16 C 13 16 11 8 6 8 C 0.667 8 0.667 16 6 16 Z"

// const circle2 =
//   "M 12 18 C 15.315 18 18 15.315 18 12 C 18 8.685 15.315 6 12 6 C 8.685 6 6 8.685 6 12 C 6 15.315 8.685 18 12 18 Z"

// Larger circle to create a more pronounced animation effect
const circle2 =
  "M12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"

export function MobiusLoopIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <motion.path
        animate={{
          d: [circle1, infinity, circle2],
          // d: [circle1, infinity, circle2, infinity, circle1],
        }}
        transition={{
          d: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            // duration: 6,
            // ease: "easeInOut",
            // repeat: Infinity,
            // times: [0, 0.25, 0.5, 0.75, 1.0],
          },
        }}
      />
    </motion.svg>
  )
}
