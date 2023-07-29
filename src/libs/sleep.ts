import { SleepProps } from './types.js'

const sleep = ({ ms }: SleepProps) => new Promise((r) => setTimeout(r, ms))

export default sleep
