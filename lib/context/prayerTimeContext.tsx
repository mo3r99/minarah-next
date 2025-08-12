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
import { PrayerStartTimes } from "@/types";

type prayerTimesContextType = {
  prayerTimes: PrayerStartTimes;
  setPrayerTimes: Dispatch<SetStateAction<PrayerStartTimes>>;
};
export const PrayerTimeContext = createContext<prayerTimesContextType>({
  prayerTimes: {
    fajr: "",
    sunrise: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  },
  setPrayerTimes: () => {},
});

export function PrayerTimesProvider({ children }: { children: ReactNode }) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerStartTimes>({
    fajr: "",
    sunrise: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  const { location } = useContext(LocationContext);

  useEffect(() => {
    prayerTimesApi
      .getPrayerTimes(location.coordinates.latitude, location.coordinates.longitude)
      .then((times) => {
        if (
          times.fajr &&
          times.dhuhr &&
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
