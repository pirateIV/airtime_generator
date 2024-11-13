import { Time } from "@/types";

const formatTime = (time: number) => {
  return String(Math.floor(time)).padStart(2, "0");
};

export const formatCountdownTime = (countDown: number): Time => {
  let hour = formatTime(countDown / 3600);
  let minutes = formatTime((countDown / 60) % 60);
  let seconds = formatTime(countDown % 60);

  return { hour, minutes, seconds };
};
