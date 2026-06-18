// Inspired by departuremono.com

"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"
import p5 from "p5"

import { Ball } from "./ball"
import { resetGame } from "./brick"
import { Colors, loadColors } from "./colors"
import {
  FONT_URL,
  SOUND_BOUNCE_URL,
  SOUND_BREAK_URL,
  SOUND_GAME_OVER_URL,
} from "./constants"
import { Paddle } from "./paddle"
import type { GameState } from "./types"
import { UI } from "./ui"

export function Daikanoid(
  props: Omit<React.ComponentPropsWithRef<"canvas">, "children">
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    loadColors()

    const el = canvasRef.current!

    const state: GameState = {
      canvas: null,

      enableGame: false,
      enableSounds: !shouldReduceMotion,

      score: 0,
      bricks: [],

      soundBounce: null,
      soundBreak: null,
      soundGameOver: null,

      // ballImage: null,
      // paddleImage: null,
    }

    let font: p5.Font
    let sketch: p5
    let paddle: Paddle
    let ball: Ball
    let ui: UI

    function game(p: any) {
      sketch = p

      p.preload = () => {
        font = p.loadFont(FONT_URL)

        state.soundBounce = p.createAudio(SOUND_BOUNCE_URL)
        state.soundBreak = p.createAudio(SOUND_BREAK_URL)
        state.soundGameOver = p.createAudio(SOUND_GAME_OVER_URL)

        // state.ballImage = p.loadImage("/assets/ball.png")
        // state.paddleImage = p.loadImage("/assets/paddle.png")
      }

      p.setup = () => {
        state.canvas = p.createCanvas(800, 600, p.P2D, el)
        paddle = new Paddle(p, state)
        ball = new Ball(p, state)
        ui = new UI(p, state)

        p.imageMode(p.CENTER)
        p.textFont(font)
        p.background(Colors.background)
        p.fill(Colors.foreground)
        p.noStroke()

        resetGame(p, state)

        state.canvas?.mouseClicked(() => {
          state.enableGame = true
          ball.reset()
          return false
        })

        state.canvas?.touchStarted(() => {
          state.enableGame = true
          return false
        })
      }

      p.draw = () => {
        p.background(Colors.background)

        if (state.bricks.length === 0) {
          p.fill(Colors.foreground)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(80)
          p.text("404", p.width / 2, p.height / 2 - 11)
          return
        }

        paddle.show()
        paddle.move()

        ball.show()
        if (state.enableGame) {
          ball.move()
          ball.checkEdges()
          ball.checkPaddle(paddle)
        }

        for (const brick of state.bricks) {
          brick.show()
        }
        p.noStroke()

        ball.checkBricks(state.bricks)
        ui.show()
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (state.bricks.length === 0) {
          state.enableGame = false
          ball.reset()
          resetGame(sketch, state)
          return
        }

        state.enableGame = true
        ball.reset()
      }
    }
    window.addEventListener("keypress", handleKeyPress)

    const p5Instance = new p5(game)

    return () => {
      window.removeEventListener("keypress", handleKeyPress)
      p5Instance.remove()
    }
  }, [shouldReduceMotion])

  return <canvas ref={canvasRef} {...props} />
}
