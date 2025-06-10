"use client";

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { LocationContext } from "./locationContext";
import { prayerTimesApi } from "../services/calculations/prayerTimesApi";

export interface prayerType {
  fajr: string;
  sunrise: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

type prayerTimesContextType = {
  prayerTimes: prayerType;
  setPrayerTimes: Dispatch<SetStateAction<prayerType>>;
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

  const { location } = useContext(LocationContext);

  useEffect(() => {
    prayerTimesApi
      .getPrayerTimes(location.latitude, location.longitude)
      .then((times) => {
        if (
          times.fajr &&
          times.zuhr &&
          times.asr &&
          times.maghrib &&
          times.isha
        ) {
          setPrayerTimes(times);
        }
      });
  }, [location]);

  return (
    <PrayerTimeContext.Provider value={{ prayerTimes, setPrayerTimes }}>
      {children}
    </PrayerTimeContext.Provider>
  );
}
