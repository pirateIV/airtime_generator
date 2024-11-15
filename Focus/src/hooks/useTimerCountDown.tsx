import { Time } from "@/types";
import { formatCountdownTime } from "@/helpers";
import { useEffect, useState } from "react";

const useTimerCountDown = (time: number, isSessionActive: boolean) => {
  const [timeLeft, setTimeLeft] = useState(time * 60);

  const [timer, setTimer] = useState<Time>({
    hour: "00",
    minutes: "25",
    seconds: "00",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    setTimer(formatCountdownTime(timeLeft));

    interval = setInterval(() => {
      if (isSessionActive) {
        clearInterval(interval);
        return;
      }

      setTimeLeft(timeLeft - 1);
      setTimer(formatCountdownTime(timeLeft));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isSessionActive]);

  const resetTimer = (newCountDown: number) => {
    setTimeLeft(newCountDown * 60);
  };

  return { timer, timeLeft, setTimeLeft: resetTimer };
};

export default useTimerCountDown;
