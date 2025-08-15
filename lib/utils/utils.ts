import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeRemainingToSalahAsString(
  remainingTime: number | undefined,
  nextPrayerName: string | undefined
) {
  const [hours, minutes] = ((remainingTime || 0) / 60).toString().split(".");
  const formattedHours = parseInt(hours);
  const formattedMinutes = Math.round(parseFloat(`0.${minutes || "0"}`) * 60);

  const timeString = {
    prayer: `${nextPrayerName
      ?.substring(0, 1)
      .toUpperCase()}${nextPrayerName?.substring(1)}`,
    hours: "",
    and: "",
    minutes: "",
  };

  if (formattedHours > 1) {
    timeString.hours = `${formattedHours} hours`;
  } else if (formattedHours == 1) {
    timeString.hours = `an hour`;
  }

  if (formattedHours > 0 && formattedMinutes > 1) {
    timeString.and = " and ";
  } else {
    timeString.and = "";
  }

  if (formattedMinutes > 1) {
    timeString.minutes = `${formattedMinutes} minutes`;
  } else if (formattedMinutes == 1) {
    timeString.minutes = `a minute`;
  }

  return `${timeString.prayer} begins in ${timeString.hours}${timeString.and}${timeString.minutes}`;
}

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // the shortest distance over the earth’s surface between two points using the ‘Haversine’ formula
  const r = 6371; // radius of earth in km
  const p = Math.PI / 180;

  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

import packageJSON from '@/package.json';

export const getAppVersion = () => packageJSON.version;