import chalkAnimation, { Animation } from 'chalk-animation'
import sleep from './sleep.js'
import { MessageProps } from './types.js'

export default async function message({
  isError = false,
  message,
}: MessageProps) {
  let title: Animation

  if (isError) {
    title = chalkAnimation.pulse(`${message}`)
  } else {
    title = chalkAnimation.neon(`${message}`)
  }

  await sleep({ ms: 1000 })
  title.stop()
}
