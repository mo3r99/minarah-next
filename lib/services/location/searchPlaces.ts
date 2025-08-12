import { GooglePlacesAutocompleteResponse } from "@/types";

export const searchPlaces = async (searchInput: string) => {
    if (!searchInput.trim()) {
      return;
    }

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
          } as Record<string, string>,
          body: JSON.stringify({
            input: searchInput,
            locationBias: {
              rectangle: {
                low: {
                  latitude: 49.959999905,
                  longitude: -7.57216793459,
                },
                high: {
                  latitude: 58.6350001085,
                  longitude: 1.68153079591,
                },
              },
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GooglePlacesAutocompleteResponse = await response.json();
      console.log(data);
      return data.suggestions || []
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };