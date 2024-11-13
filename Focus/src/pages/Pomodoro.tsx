import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import useTimerCountDown from "@/hooks/useTimerCountDown";
import SessionSwitcher from "@/components/SessionSwitcher";
import CountDownTimer from "@/components/CountDownTimer";
import ProgressIcon from "@/components/icons/ProgressIcon";

type SessionType = "focus" | "break";

const FOCUS_SESSION_IN_MINS = 25;
const BREAK_SESSION_IN_MINS = 5;

const Pomodoro = () => {
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sessionType, setSessionType] = useState<SessionType>("focus");

  const { timer, timeLeft, setTimeLeft } = useTimerCountDown(
    FOCUS_SESSION_IN_MINS,
    isSessionActive
  );

  const handleSetNewSession = (state: SessionType, timeLeft: number) => {
    if (!(state === sessionType)) {
      setTimeLeft(timeLeft);
      setSessionType(state);
    }
    return;
  };

  const handleExtendCurrentSession = (mins: number) => {
    const extendedTime = (timeLeft + mins * 60) / 60;
    setTimeLeft(extendedTime);

    localStorage.setItem("extendedTime", extendedTime.toString());
  };

  const handleResetSession = () => {
    return sessionType === "focus" ? setTimeLeft(25) : setTimeLeft(5);
  };

  useEffect(() => {
    if (timeLeft < 0) {
      setIsSessionActive(true);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <header>
        <ProgressIcon />
      </header>
      {/* <h1 className="text-4xl">Pomodoro</h1>

      <div className="p-5 space-x-5">
        <button
          type="button"
          onClick={() => handleNewSession("focus", 25)}
          disabled={sessionType === "focus"}
          className="bg-slate-700 text-white py-2 px-3.5 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Focus
        </button>
        <button
          type="button"
          onClick={() => handleNewSession("break", 5)}
          disabled={sessionType === "break"}
          className="bg-sky-500 text-white py-2 px-3.5 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Break
        </button>

        <button
          type="button"
          onClick={() => setIsSessionActive(!isSessionActive)}
          className="bg-blue-500 text-white py-2 px-3.5 rounded-md"
        >
          Play
        </button>

        <button
          type="button"
          onClick={() => handleExtendCurrentSession(10)}
          className="bg-red-500 text-white py-2 px-3.5 rounded-md"
        >
          Add 10 minutes
        </button>

        <button
          type="button"
          onClick={() => handleResetSession()}
          className="bg-amber-500 text-white py-2 px-3.5 rounded-md"
        >
          Restart Timer
        </button>
      </div>

      <div className="text-9xl">
        {timer.hour !== "00" && `${timer.hour}:`}
        {timer.minutes}:{timer.seconds}
      </div> */}

      <div className="size-[400px] rounded-full border-8 border-gray-200 bg-white">
        <CircularProgressbarWithChildren
          value={
            (timeLeft /
              (sessionType === "focus"
                ? FOCUS_SESSION_IN_MINS
                : BREAK_SESSION_IN_MINS * 60)) *
            100
          }
        >
          <div className="relative flex flex-col items-center justify-center size-full">
            <div className="space-x-10 mb-4 absolute top-20">
              <button
                className="uppercase disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={() => handleSetNewSession("focus", 25)}
                disabled={sessionType === "focus"}
              >
                Focus
              </button>
              <button
                className="uppercase disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={() => handleSetNewSession("break", 5)}
                disabled={sessionType === "break"}
              >
                Break
              </button>
            </div>

            <CountDownTimer timer={timer}>
              <button
                className="absolute -top-10 right-14 py-1 px-2 bg-gray-200 border border-gray-300 text-gray-600 text-sm font-semibold rounded-full transition-colors focus:ring-1 focus:ring-gray-300 focus:ring-offset-2 hover:bg-gray-300"
                onClick={() => handleExtendCurrentSession(10)}
              >
                + 10m
              </button>
            </CountDownTimer>

            <div className="pb-24 absolute bottom-0">
              <SessionSwitcher
                isPaused={isSessionActive}
                onClick={() => setIsSessionActive(!isSessionActive)}
                aria-label={`start or resume ${sessionType} session`}
              />
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default Pomodoro;
