import { ButtonHTMLAttributes } from "react";

import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";

interface SessionSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPaused: boolean;
  className?: string;
}

const SessionSwitcher = ({ isPaused, ...props }: SessionSwitcherProps) => {
  return (
    <button
      className="bg-gray-200 size-11 flex items-center justify-center rounded-full"
      {...props}
    >
      {isPaused ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};

export default SessionSwitcher;
