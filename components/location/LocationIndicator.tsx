"use client";

import { LocationContext } from "@/lib/context/locationContext";
import React, { useContext } from "react";

function LocationIndicator({ ...props }: React.ComponentPropsWithRef<"p">) {
  const { location } = useContext(LocationContext);

  return (
    <p className={props.className} {...props}>
      {props.children}{" "}
      {location.address
        ? location.address
        : location.city
        ? location.city
        : location.country
        ? location.country
        : location.coordinates.latitude + " " + location.coordinates.longitude}
    </p>
  );
}

export default LocationIndicator;
