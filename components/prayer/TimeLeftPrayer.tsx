"use client";

import { PrayerTimeContext } from "@/lib/context/prayerTimeContext";
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
    }, 1000);

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

    const prayers = {
      fajr: prayerTimes.fajr,
      zuhr: prayerTimes.zuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
    };

    const currentTime = time.getHours() * 60 + time.getMinutes();

    for (const prayer in prayers as Record<string, string>) {
      const [hours, minutes] = prayers[prayer as keyof typeof prayers]
        .split(":")
        .map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        setNextPrayer({
          name: prayer,
          time: prayers[prayer as keyof typeof prayers],
          remainingTime: prayerTime - currentTime,
        });
        return {
          name: prayer,
          time: prayers[prayer as keyof typeof prayers],
          remainingTime: prayerTime - currentTime,
        };
      }
    }

    // If no next prayer found today, return Fajr for tomorrow
    const [fajrHours, fajrMinutes] = prayers.fajr.split(":").map(Number);
    const fajrTime = fajrHours * 60 + fajrMinutes;
    const remainingMinutes = 24 * 60 - currentTime + fajrTime;

    setNextPrayer({
      name: "fajr",
      time: prayers.fajr,
      remainingTime: remainingMinutes,
    });

    return {
      name: "fajr",
      time: prayers.fajr,
      remainingTime: remainingMinutes,
    };
  }

  const [hours, minutes] = ((nextPrayer?.remainingTime || 0) / 60).toString().split('.');
  const formattedMinutes = Math.round(((parseFloat(`0.${minutes || '0'}`) * 60)));

  return (
    <>
      <div className="">
        <h1>
          {nextPrayer?.name.substring(0,1).toUpperCase()}{nextPrayer?.name.substring(1)} is in {hours ? hours + ' hours, ' : ''} {formattedMinutes != 0 ? formattedMinutes + ' minutes' : ''}. 
        </h1>
      </div>
    </>
  );
}
