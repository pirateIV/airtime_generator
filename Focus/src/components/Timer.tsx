import { Time } from "@/types";

interface TimeProps {
  timer: Time;
}

const Timer = ({ timer }: TimeProps) => {
  const { minutes, seconds } = timer;

  const time = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;

  return (
    <time
      className={`block text-7xl text-slate-800 font-semibold touch-none dark:text-white`}
      dateTime={time}
    >
      {time}
    </time>
  );
};

export default Timer;
