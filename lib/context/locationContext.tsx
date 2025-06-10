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

export interface locationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  city: string;
  address: string;
}

type locationContextType = {
  location: locationData;
  setLocation: Dispatch<SetStateAction<locationData>>;
};

export const LocationContext = createContext<locationContextType>({
  location: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    city: "",
    address: "",
  },
  setLocation: () => {},
});

export default function LocationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [location, setLocation] = useState<locationData>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    city: "",
    address: "",
  });
  const [preferencesDefault, setPreferencesDefault] = useState(false);

  useEffect(() => {
    setPreferencesDefault(storageService.getPreferences().default)
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {preferencesDefault && (
        <GetLocation />
      )}
      {children}
    </LocationContext.Provider>
  );
}
