"use client"

import LocationButton from "@/components/location/locationButton/LocationButton";
import PlacesAutocomplete from "@/components/location/PlacesAutoComplete";
import { LocationContext } from "@/lib/context/locationContext";
import React, { useContext } from "react";

export default function LocationSettings({...props}:React.ComponentProps<"div">) {
  const { location } = useContext(LocationContext);
  return (
    <div {...props}>
      <p>Current Location: {location.address}</p>
      <p className="mt-4 font-semibold">Update location</p>
      <div className="flex flex-col w-full mx-auto max-w-[250px] gap-2 flex-1/2 items-stretch text-center mt-2">
        <LocationButton variant={'secondary'}/>
        <span className="text-sm text-zinc-500">OR</span>
        <PlacesAutocomplete className={'mx-auto'}/>
      </div>
    </div>
  );
}