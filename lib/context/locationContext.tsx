"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { storageService } from "../services/storage/storageService";
// import { geolocationService } from "../services/location/geolocation";
import GetLocation from "@/components/location/GetLocation";
import { Location, Preferences } from "@/types";

type locationContextType = {
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
};

export const defaultLocation = {
  coordinates: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  },
  timezone: "",
  country: "",
  city: "",
  address: "",
};

export const LocationContext = createContext<locationContextType>({
  location: defaultLocation,
  setLocation: () => {},
});

export default function LocationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [location, setLocation] = useState<Location>(defaultLocation);

  useEffect(() => {
    const localStorage = storageService.getPreferences();
    
    if (!localStorage.default && localStorage.location.coordinates.latitude != 0) {
      setLocation(localStorage.location);
    }
  }, [])

  useEffect(() => {
  // When the location changes, save it in the preferences.
    const prefs: Partial<Preferences> = {
      location,
    };

    if (location.coordinates.latitude == 0 || location.coordinates.longitude == 0 || location.coordinates.accuracy == 0) {
      console.warn("Invalid location. This will not be saved");
    } else {
      storageService.savePreferences(prefs);
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
