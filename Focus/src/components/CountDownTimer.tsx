import { Time } from "@/types";
import { Ellipsis } from "lucide-react";
import React from "react";

const CountDownTimer = ({
  timer,
  children,
}: {
  timer: Time;
  children: React.ReactNode;
}) => {
  const { hour, minutes, seconds } = timer;

  const time = `${hour !== "00" ? `${hour}:` : ""}${minutes}:${seconds}`;

  return (
    <div className="relative w-full text-center">
      <time
        className={`block text-slate-800 font-semibold touch-none ${
          hour !== "00" ? "text-6xl" : "text-7xl"
        }`}
        dateTime={time}
      >
        {time}
      </time>
      <button className="absolute h-fit text-slate-400 right-14 inset-y-1/2 -translate-y-1/2">
        <span className="sr-only">toggle time menu</span>
        <Ellipsis />
      </button>
      <div>{children}</div>
    </div>
  );
};

export default CountDownTimer;
