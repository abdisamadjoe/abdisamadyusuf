import type p5 from "p5"

import type { Brick } from "./brick"

export interface GameState {
  canvas: any | null

  enableGame: boolean
  enableSounds: boolean

  score: number
  bricks: Brick[]

  soundBounce: p5.MediaElement | null
  soundBreak: p5.MediaElement | null
  soundGameOver: p5.MediaElement | null
  // ballImage: p5.Image | null
  // paddleImage: p5.Image | null
}
