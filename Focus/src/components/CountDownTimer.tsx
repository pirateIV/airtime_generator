import React from "react";
import {
  Ellipsis,
  Plus,
  Repeat,
  RotateCcwIcon,
  SkipForward,
} from "lucide-react";

import { Time } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Timer from "./Timer";

const CountDownTimer = ({
  timer,
  children,
}: {
  timer: Time;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full text-center">
      <Timer timer={timer} />
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <button className="absolute h-fit p-1 text-slate-400 right-12 inset-y-1/2 -translate-y-1/2 outline-none rounded-full hover:bg-gray-200">
            <span className="sr-only">toggle time menu</span>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white translate-x-[calc(50%-1rem)] rounded-2xl shadow-lg shadow-slate-300">
          <DropdownMenuLabel>
            <div className="flex items-center justify-between">
              <span>Pomodoro</span>&nbsp;
              <button className="flex items-center justify-center size-7 rounded-full hover:bg-gray-200">
                <Repeat size="15" className="text-gray-500" />
              </button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SkipForward className="text-gray-500 fill-gray-500" />
              <span>Complete Timer</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RotateCcwIcon className="text-gray-500" />
              <span>Restart Timer</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus fill="#000" className="text-gray-500" />
              <span>Add Ten Minutes</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className="justify-between">
              Set Minutes
              <input
                type="text"
                className="w-10 pe-0.5 text-end border border-b-2 border-gray-300"
                defaultValue="25"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-between">
              Set Seconds
              <input
                type="text"
                className="w-10 pe-0.5 text-end border border-b-2 border-gray-300"
                defaultValue="00"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div>{children}</div>
    </div>
  );
};

export default CountDownTimer;
