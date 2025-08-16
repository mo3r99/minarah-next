import React, { useEffect } from "react";
import NextSlideBtn from "../nextSlideBtn/NextSlideBtn";

import { EmblaCarouselType } from "embla-carousel";
import LocationButton from "@/components/location/locationButton/LocationButton";
import PlacesAutocomplete from "@/components/location/PlacesAutoComplete";
import Image from "next/image";

import slide2img from "@/assets/onboarding/location.png";
import { useContext } from "react";
import { LocationContext } from "@/lib/context/locationContext";
import { useState } from "react";

export default function LocationSlide({
  api,
}: {
  api: EmblaCarouselType | undefined;
}) {
  const { location } = useContext(LocationContext);
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      location.coordinates.latitude == 0 ||
      location.coordinates.longitude == 0
    ) {
      setContinueDisabled(true);
    } else {
      setContinueDisabled(false);
    }
  }, [location]);

  return (
    <div className="embla__slide flex flex-col gap-4 items-center justify-center p-8 text-center h-screen relative">
      <Image src={slide2img} width={540} height={540} alt="Picture of Mosque" />

      <div>
        <h2 className="text-2xl font-bold mt-6 mb-3">Select Location</h2>
        <p className="text-gray-600">
          Minarah requires your location to show your local prayer times.
        </p>
      </div>

      <div className="flex flex-col gap-2 flex-1/2">
        <LocationButton variant="secondary" />
        <span className="text-sm text-zinc-500">OR</span>
        <PlacesAutocomplete />
      </div>
      <NextSlideBtn
        className={"fixed bottom-8"}
        emblaApi={api}
        disabled={continueDisabled}
      />
    </div>
  );
}
