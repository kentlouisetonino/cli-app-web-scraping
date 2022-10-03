import chalkAnimation from 'chalk-animation'

import sleep from './sleep.helper.js'

const message = async (isError = false, message) => {
  let title

  if (isError) {
    title = chalkAnimation.pulse(`${message}`)
  } else {
    title = chalkAnimation.neon(`${message}`)
  }

  await sleep()
  title.stop()
}

export default message
