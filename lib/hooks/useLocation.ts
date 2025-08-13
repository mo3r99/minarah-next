import { useState } from "react";
import { geolocationService } from "../services/location/geolocation";
import { Location } from "@/types";
import { useContext } from "react";
import { LocationContext } from "../context/locationContext";

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export default function useLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLocation } = useContext(LocationContext);

  const requestLocation = async (): Promise<Location | null> => {
    setLoading(true);

    try {
      const coords: Coordinates = await geolocationService.getCurrentLocation();
      if (
        coords.latitude &&
        coords.latitude != 0 &&
        coords.longitude &&
        coords.longitude != 0
      ) {
        const location = await geolocationService.detectCity(
          coords.latitude,
          coords.longitude,
          coords.accuracy
        );
        setLocation(location);
        return location;
      } else {
        console.log('Incompatible value. Aborting reverse geocoding.', coords.latitude, coords.latitude == 0, coords.longitude, coords.longitude == 0)
        return null;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to get location"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, requestLocation };
}
