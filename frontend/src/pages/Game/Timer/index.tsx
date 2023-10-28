import React, { useEffect, useState } from "react"
import TimerPresenter from "./presenter"

type Props = {
  initialTime: string
  setNowPhase: React.Dispatch<React.SetStateAction<number>>
}

const Timer = ({ initialTime, setNowPhase }: Props) => {
  const [minutes, setMinutes] = useState(parseInt(initialTime.split(":")[0]))
  const [seconds, setSeconds] = useState(parseInt(initialTime.split(":")[1]))

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (minutes > 0 || seconds > 0) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }, 1000)
    } else {
      console.log("Timer has finished.")
      setNowPhase((prev: number) => prev + 1)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [minutes, seconds])

  return <TimerPresenter minutes={minutes} seconds={seconds} />
}

export default Timer
