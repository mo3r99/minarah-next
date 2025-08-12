import { GooglePlaceDetails } from "@/types";

export async function getPlaceDetails(placeId: string): Promise<GooglePlaceDetails | undefined> {    
    try {
      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,location,formattedAddress,addressComponents&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const placeDetails: GooglePlaceDetails = await response.json();
      console.log(placeDetails);
      
      if (placeDetails.location) {
        return placeDetails
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };
