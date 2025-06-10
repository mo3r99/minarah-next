"use client"

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type prayerContext = {
  fajr: string;
  sunrise: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

type prayerTimesContextType = {
  prayerTimes: prayerContext;
  setPrayerTimes: Dispatch<SetStateAction<prayerContext>>;
};
export const PrayerTimeContext = createContext<prayerTimesContextType>({
  prayerTimes: {
    fajr: "",
    sunrise: "",
    zuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  },
  setPrayerTimes: () => {},
});

export function PrayerTimesProvider({ children }: { children: ReactNode }) {
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: "",
    sunrise: "",
    zuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  return (
    <PrayerTimeContext.Provider value={{ prayerTimes, setPrayerTimes }}>
      {children}
    </PrayerTimeContext.Provider>
  );
}
