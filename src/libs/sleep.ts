interface SleepProps {
  ms: number
}

const sleep = ({ ms }: SleepProps) => new Promise((r) => setTimeout(r, ms))

export default sleep
