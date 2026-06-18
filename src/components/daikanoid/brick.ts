import type p5 from "p5"

import { Colors } from "./colors"
import { BRICK_HEIGHT, BRICK_SHADOW_THICKNESS, BRICK_WIDTH } from "./constants"

export class Brick {
  p: p5
  c: p5.Color | string = Colors.brick
  x: number
  y: number
  w: number
  h: number

  constructor(p: p5, x: number, y: number, w: number, h: number) {
    this.p = p
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  color(c: p5.Color | string): this {
    this.c = c
    return this
  }

  show() {
    this.p.strokeWeight(4)
    this.p.stroke(Colors.background)
    this.p.fill(this.c.toString())
    this.p.rect(this.x, this.y, this.w, this.h)
    this.p.noStroke()

    this.p.fill(Colors.brickHighlight)
    this.p.rect(this.x + 2, this.y + 2, this.w - 4, BRICK_SHADOW_THICKNESS)
    this.p.rect(
      this.x + 2,
      this.y + 2 + BRICK_SHADOW_THICKNESS,
      BRICK_SHADOW_THICKNESS,
      this.h - 4 - BRICK_SHADOW_THICKNESS
    )

    this.p.fill(Colors.brickShadow)
    this.p.rect(
      this.x + 2,
      this.y + this.h - 5,
      this.w - 4,
      BRICK_SHADOW_THICKNESS
    )
    this.p.rect(
      this.x + this.w - 5,
      this.y + 2,
      BRICK_SHADOW_THICKNESS,
      this.h - 4 - BRICK_SHADOW_THICKNESS
    )
  }
}

export function resetGame(p: p5, state: { score: number; bricks: Brick[] }) {
  const b = (col: number, row: number, c: string = Colors.brick) =>
    new Brick(
      p,
      col * BRICK_WIDTH,
      row * BRICK_HEIGHT,
      BRICK_WIDTH,
      BRICK_HEIGHT
    ).color(c)

  state.score = 0

  // ChanhDai logo (8×4 grid).
  // _XX_XXX_
  // X___X__X
  // X___X__X
  // _XX_XXX_
  const cs = 1
  const rs = 0
  state.bricks = [
    // Logo row 0 → Brick rows 0-2: _XX_XXX_.
    b(cs + 1, rs + 0),
    b(cs + 2, rs + 0),
    b(cs + 4, rs + 0),
    b(cs + 5, rs + 0),
    b(cs + 6, rs + 0),
    b(cs + 1, rs + 1),
    b(cs + 2, rs + 1),
    b(cs + 4, rs + 1),
    b(cs + 5, rs + 1),
    b(cs + 6, rs + 1),
    b(cs + 1, rs + 2),
    b(cs + 2, rs + 2),
    b(cs + 4, rs + 2),
    b(cs + 5, rs + 2),
    b(cs + 6, rs + 2),
    // Logo row 1 → Brick rows 3-5: X___X__X.
    b(cs + 0, rs + 3),
    b(cs + 4, rs + 3),
    b(cs + 7, rs + 3),
    b(cs + 0, rs + 4),
    b(cs + 4, rs + 4),
    b(cs + 7, rs + 4),
    b(cs + 0, rs + 5),
    b(cs + 4, rs + 5),
    b(cs + 7, rs + 5),
    // Logo row 2 → Brick rows 6-8: X___X__X.
    b(cs + 0, rs + 6),
    b(cs + 4, rs + 6),
    b(cs + 7, rs + 6),
    b(cs + 0, rs + 7),
    b(cs + 4, rs + 7),
    b(cs + 7, rs + 7),
    b(cs + 0, rs + 8),
    b(cs + 4, rs + 8),
    b(cs + 7, rs + 8),
    // Logo row 3 → Brick rows 9-11: _XX_XXX_.
    b(cs + 1, rs + 9),
    b(cs + 2, rs + 9),
    b(cs + 4, rs + 9),
    b(cs + 5, rs + 9),
    b(cs + 6, rs + 9),
    b(cs + 1, rs + 10),
    b(cs + 2, rs + 10),
    b(cs + 4, rs + 10),
    b(cs + 5, rs + 10),
    b(cs + 6, rs + 10),
    b(cs + 1, rs + 11),
    b(cs + 2, rs + 11),
    b(cs + 4, rs + 11),
    b(cs + 5, rs + 11),
    b(cs + 6, rs + 11),
  ]
}
