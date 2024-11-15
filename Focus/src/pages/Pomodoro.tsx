import { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SessionSwitcher from "@/components/SessionSwitcher";
import CountDownTimer from "@/components/CountDownTimer";

type SessionType = "pomodoro" | "shortBreak" | "longBreak";

type TimerState = {
  timeLeft: number;
  sessionType: SessionType;
  autoStartSession: boolean;
  isSessionActive: boolean;
  isSessionPaused: boolean;
};

const initialPomodoroTime = 25;

const Pomodoro = () => {
  const [{ timeLeft, isSessionActive, sessionType }, setTimerState] =
    useState<TimerState>({
      timeLeft: initialPomodoroTime * 60,
      sessionType: "pomodoro",
      autoStartSession: false,
      isSessionActive: true,
      isSessionPaused: false,
    });

  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  return (
    <div className="min-h-screen relative flex flex-col items-center dark:bg-slate-950">
      <section className="w-full h-screen flex justify-center">
        <div className="size-[400px] rounded-full m-auto border-8 border-gray-200 bg-white dark:bg-transparent dark:border-slate-800">
          <CircularProgressbarWithChildren
            value={50}
            styles={buildStyles({
              pathColor: "#6366f1",
            })}
          >
            <div className="relative flex flex-col items-center justify-center size-full">
              <div className="space-x-10 mb-4 absolute top-20">
                <button
                  className="uppercase disabled:text-gray-400 disabled:cursor-not-allowed dark:text-slate-100 dark:disabled:text-slate-600"
                  // onClick={() => handleSetNewSession("focus", 25)}
                  // disabled={sessionType === "focus"}
                >
                  Focus
                </button>
                <button
                  className="uppercase disabled:text-gray-400 disabled:cursor-not-allowed dark:text-slate-100 dark:disabled:text-slate-600"
                  // onClick={() => handleSetNewSession("break", 5)}
                  // disabled={sessionType === "break"}
                >
                  Break
                </button>
              </div>

              <button>Complete timer</button>

              <CountDownTimer timer={{ minutes, seconds }}>
                <button
                  className="absolute -top-10 right-14 py-1 px-2 bg-gray-100 border border-gray-200 text-indigo-500 text-sm font-semibold rounded-full transition-colors focus:ring-1 focus:ring-gray-200 focus:ring-offset-2 hover:bg-gray-200 dark:text-white dark:border-indigo-300 dark:bg-indigo-500"
                  // onClick={() => handleExtendCurrentSession(5)}
                >
                  + 5m
                </button>
              </CountDownTimer>

              <div className="pb-24 absolute bottom-0">
                <SessionSwitcher
                  isPaused={isSessionActive}
                  onClick={() =>
                    setTimerState((prev) => ({
                      ...prev,
                      isSessionActive: !isSessionActive,
                    }))
                  }
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
