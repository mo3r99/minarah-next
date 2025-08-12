import { Coordinates, GoogleGeocodingResponse, Location } from "@/types";
import { env } from "node:process";

class GeolocationService {
  async getCurrentLocation() {
    return new Promise<Coordinates>((resolve, reject) => {
      console.log("getting location.");
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          const errorMessages: { [key: number]: string } = {
            1: "Location access denied by user",
            2: "Location information unavailable",
            3: "Location request timed out",
          };
          reject(
            new Error(errorMessages[error.code] || "Unknown location error")
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  async detectCity(
    latitude: number,
    longitude: number,
    accuracy: number
  ): Promise<Location> {
    try {
      // Use reverse geocoding service
      const apirequest = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
      const response = await fetch(apirequest);

      const data: GoogleGeocodingResponse = await response.json();

      // console.log((await data).results[0].formatted_address);

      return {
        coordinates: {
          latitude,
          longitude,
          accuracy,
        },
        city: (data).results[0].address_components[2].long_name,
        country: (data).results[0].address_components[4].long_name,
        address: (data).results[0].formatted_address,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to detect city from coordinates");
    }
  }
}

export const geolocationService = new GeolocationService();
