import { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import useTimerCountDown from "@/hooks/useTimerCountDown";
import SessionSwitcher from "@/components/SessionSwitcher";
import CountDownTimer from "@/components/CountDownTimer";

type SessionType = "focus" | "break";

const FOCUS_SESSION = 25; // in minutes
const BREAK_SESSION = 5; // in minutes
const MAX_SECONDS = 3600;

const Pomodoro = () => {
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sessionType, setSessionType] = useState<SessionType>("focus");

  const { timer, timeLeft, setTimeLeft } = useTimerCountDown(
    FOCUS_SESSION,
    isSessionActive
  );

  const handleSetNewSession = (state: SessionType, timeLeft: number) => {
    if (!(state === sessionType)) {
      setTimeLeft(timeLeft);
      setSessionType(state);
    }
    return;
  };

  const handleExtendCurrentSession = (mins: number = 5, seconds?: number) => {
    let extendedTime = (timeLeft + mins * 60);
    // if (extendedTime >= MAX_SECONDS) {
    //   console.log(extendedTime, MAX_SECONDS);
    //   setTimeLeft(MAX_SECONDS);
    //   return;
    
      console.log(extendedTime, MAX_SECONDS);
    extendedTime = Math.min(extendedTime, MAX_SECONDS);
    setTimeLeft(extendedTime);

    localStorage.setItem("extendedTime", extendedTime.toString());
  };

  const handleResetSession = () => {
    return sessionType === "focus" ? setTimeLeft(25) : setTimeLeft(5);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSessionActive(true);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen relative flex flex-col items-center">
      {/* <header className="py-2 fixed">
        <ProgressIcon />
      </header> */}
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

      <section className="w-full h-screen flex justify-center">
        <div className="size-[400px] rounded-full m-auto border-8 border-gray-200 bg-white">
          <CircularProgressbarWithChildren
            value={
              (timeLeft /
                (sessionType === "focus"
                  ? FOCUS_SESSION
                  : BREAK_SESSION * 60)) *
              100
            }
            styles={buildStyles({
              pathColor: "#6366f1",
            })}
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

              <button>Complete timer</button>

              <CountDownTimer timer={timer}>
                <button
                  className="absolute -top-10 right-14 py-1 px-2 bg-gray-100 border border-gray-200 text-indigo-500 text-sm font-semibold rounded-full transition-colors focus:ring-1 focus:ring-gray-200 focus:ring-offset-2 hover:bg-gray-200"
                  onClick={() => handleExtendCurrentSession(5)}
                >
                  + 5m
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
      </section>
    </div>
  );
};

export default Pomodoro;
