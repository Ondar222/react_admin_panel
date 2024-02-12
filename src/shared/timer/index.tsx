import { Row } from "antd";
import { FC, useEffect, useState } from "react";

interface ITimer {
  started: boolean,
  from: number,
  to: number
}

const Timer: FC<ITimer> = ({ started = false, from = 300, to = 0 }) => {
  const [isStarted, setIsStarted] = useState<boolean>(started)
  const [timer, setTimer] = useState<number>(from)

  useEffect(() => {
    if (isStarted && timer != to) {
      setTimer((prev) => prev - 1)
    }
  }, [timer])

  return <Row>{timer}</Row>
}

export { Timer }