"use client";

import { PrayerTimeContext } from "@/lib/context/prayerTimeContext";
import { timeRemainingToSalahAsString } from "@/lib/utils/utils";
import { PrayerStartTimes } from "@/types";
import { useContext, useEffect, useState } from "react";

interface Prayer {
  name: string;
  time: string;
  remainingTime: number;
}

export default function TimeLeftPrayer() {
  const { prayerTimes } = useContext(PrayerTimeContext);

  const [time, setTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<Prayer>();

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
      calculateNextPrayer();
    }, 10000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    calculateNextPrayer();
  }, [prayerTimes, time]);

  function calculateNextPrayer() {
    /* example data:
        fajr: '04:00',
        sunrise: '04:40',
        zuhr: '13:14',
        asr: '18:45',
        maghrib: '21:41',
        isha: '00:45',
    */

    const currentTime = time.getHours() * 60 + time.getMinutes();

    for (const prayer in prayerTimes as PrayerStartTimes) {
      const [hours, minutes] = prayerTimes[prayer as keyof typeof prayerTimes]
        .split(":")
        .map(Number);
    
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        setNextPrayer({
          name: prayer,
          time: prayerTimes[prayer as keyof typeof prayerTimes],
          remainingTime: prayerTime - currentTime,
        });

        return {
          name: prayer,
          time: prayerTimes[prayer as keyof typeof prayerTimes],
          remainingTime: prayerTime - currentTime,
        };
      }
    }

    // If no next prayer found today, return Fajr for tomorrow
    const [fajrHours, fajrMinutes] = prayerTimes.fajr.split(":").map(Number);
    const fajrTime = fajrHours * 60 + fajrMinutes;
    const remainingMinutes = 24 * 60 - currentTime + fajrTime;

    setNextPrayer({
      name: "fajr",
      time: prayerTimes.fajr,
      remainingTime: remainingMinutes,
    });

    return {
      name: "fajr",
      time: prayerTimes.fajr,
      remainingTime: remainingMinutes,
    };
  }

  return (
    <>
        <h1>
          {timeRemainingToSalahAsString(nextPrayer?.remainingTime, nextPrayer?.name)}.
        </h1>
    </>
  );
}
