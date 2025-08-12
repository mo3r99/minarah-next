import React from "react";
import { Button, buttonVariants } from "../../ui/button";
import { LoaderCircle, MapPin, MapPinOff } from "lucide-react";
import useLocation from "@/lib/hooks/useLocation";

import { VariantProps } from "class-variance-authority";

function LocationButton({ ...props } : React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const { loading, error, requestLocation } = useLocation();

  function locationClickHandle() {
    requestLocation();
  }

  return (
    <Button disabled={loading || typeof error == "string"} onClick={locationClickHandle} {...props}>
      {loading && <LoaderCircle className="animate-spin" />}
      {error && <MapPinOff />}
      {!loading && !error && <MapPin />}
      {!error ? 'Get Location' : 'Unable to Get Location' }
    </Button>
  );
}

export default LocationButton;
