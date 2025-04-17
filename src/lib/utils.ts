import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRoute = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

export function getRelativeTime(date: string) {
  dayjs.extend(relativeTime)
  dayjs.locale('es')
  return dayjs(date).fromNow()
}
