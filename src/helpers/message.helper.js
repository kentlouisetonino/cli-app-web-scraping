import chalkAnimation from 'chalk-animation'

import sleep from './sleep.helper.js'

const message = async (isError = false, message) => {
  if (isError) {
    const title = chalkAnimation.pulse(`${message}`)
    await sleep()
    title.stop()
  } else {
    const title = chalkAnimation.neon(`${message}`)
    await sleep()
    title.stop()
  }
}

export default message
