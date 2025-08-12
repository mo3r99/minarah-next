"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { storageService } from "../services/storage/storageService";
import OnboardingSwiper from "@/components/onboarding/OnboardingSwiper";

interface OnboardingContextType {
  shouldShowOnboarding: boolean | null;
  completeOnboarding: () => void;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState<
    boolean | null
  >(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenOnboarding = !storageService.getPreferences().showOnboarding;
      setShouldShowOnboarding(!hasSeenOnboarding);
    }
  });

  function completeOnboarding() {
    storageService.savePreferences({ showOnboarding: false });
    setShouldShowOnboarding(false);
  }

  return (
    <OnboardingContext.Provider
      value={{ shouldShowOnboarding, completeOnboarding }}
    >
      {shouldShowOnboarding && (
        <OnboardingSwiper setComplete={completeOnboarding} />
      )}
      {children}
    </OnboardingContext.Provider>
  );
}
