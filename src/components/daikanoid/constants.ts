export const BALL_SIZE = 24
export const BALL_SPEED = 10

export const PADDLE_WIDTH = 96
export const PADDLE_HEIGHT = 24
export const PADDLE_SPEED = 16

export const BRICK_WIDTH = 80
export const BRICK_HEIGHT = 24
export const BRICK_SHADOW_THICKNESS = 3
export const BRICK_SCORE = 10

export const FONT_URL =
  "https://assets.chanhdai.com/fonts/DepartureMono-Regular.otf"

export const SOUND_BOUNCE_URL =
  "https://assets.chanhdai.com/sounds/daikanoid/bounce.mp3"
export const SOUND_BREAK_URL =
  "https://assets.chanhdai.com/sounds/daikanoid/break.mp3"
export const SOUND_GAME_OVER_URL =
  "https://assets.chanhdai.com/sounds/daikanoid/game-over.mp3"

export function uncheckedClamp(
  min: number,
  max: number,
  value: number
): number {
  return Math.min(Math.max(value, min), max)
}
