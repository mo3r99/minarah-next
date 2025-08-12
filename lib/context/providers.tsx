import { ReactNode } from "react";
import LocationContextProvider from "./locationContext";
import { PrayerTimesProvider } from "./prayerTimeContext";
import OnboardingProvider from "./onboardingContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocationContextProvider>
      <PrayerTimesProvider>
        <OnboardingProvider>{children}</OnboardingProvider>
      </PrayerTimesProvider>
    </LocationContextProvider>
  );
}
