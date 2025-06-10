import { ReactNode } from "react";
import LocationContextProvider from "./locationContext";
import { PrayerTimesProvider } from "./prayerTimeContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocationContextProvider>
      <PrayerTimesProvider>{children}</PrayerTimesProvider>
    </LocationContextProvider>
  );
}
