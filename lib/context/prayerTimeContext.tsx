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
import { prayerTimesApi } from "@/lib/api/prayerTimes/prayerTimesApi";
import { Mosques, PrayerStartTimes } from "@/types";
import { jamaahTimesApi } from "../api/prayerTimes/jamaahTimesApi";

type prayerTimesContextType = {
  prayerTimes: PrayerStartTimes;
  setPrayerTimes: Dispatch<SetStateAction<PrayerStartTimes>>;
  mosques: Mosques;
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
  mosques: [],
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

  const [mosques, setMosques] = useState<Mosques>([]);

  const { location } = useContext(LocationContext);

  useEffect(() => {
    if (location.coordinates.latitude != 0) {
      prayerTimesApi
        .getPrayerTimes(
          location.coordinates.latitude,
          location.coordinates.longitude
        )
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

      jamaahTimesApi
        .getMosquesAndJamaahTimes()
        .then((mosques) => setMosques(mosques.mosques))
        .catch((err) => console.warn(err));
    }
  }, [location]);

  return (
    <PrayerTimeContext.Provider value={{ prayerTimes, setPrayerTimes, mosques }}>
      {children}
    </PrayerTimeContext.Provider>
  );
}
