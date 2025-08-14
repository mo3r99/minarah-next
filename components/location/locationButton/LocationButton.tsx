import React, { useState } from "react";
import { Button, buttonVariants } from "../../ui/button";
import { LoaderCircle, MapPin, MapPinOff } from "lucide-react";
import useLocation from "@/lib/hooks/useLocation";

import type { Location } from "@/types";

import { VariantProps } from "class-variance-authority";

function LocationButton({ ...props } : React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const { loading, error, requestLocation } = useLocation();
  const [locationValue, setLocationValue] = useState<Location | undefined>(undefined);

  function locationClickHandle() {
    requestLocation().then(location => setLocationValue(location ? location : undefined)).catch(err => console.warn(err));
  }

  return (
    <Button disabled={loading || typeof error == "string" || typeof locationValue != "undefined" } onClick={locationClickHandle} {...props}>
      {loading && <LoaderCircle className="animate-spin" />}
      {error && <MapPinOff />}
      {!loading && !error && <MapPin />}
      {!error && !locationValue ? 'Get Location' : locationValue ? locationValue.address?.substring(0, 18) + '...' : error && 'Unable to Get Location' }
    </Button>
  );
}

export default LocationButton;
