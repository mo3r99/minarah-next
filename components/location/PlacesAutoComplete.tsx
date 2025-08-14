"use client"

import React, { useState, useEffect, useContext } from "react";
import { Input } from "../ui/input";
import {
    GooglePlaceDetails,
  GooglePlacesAutocompletePlace,
  GooglePlacesAutocompleteResponse,
  Location,
} from "@/types";
import { searchPlaces } from "@/lib/services/location/searchPlaces";
import { getPlaceDetails } from "@/lib/services/location/getPlaceDetails";
import { LocationContext } from "@/lib/context/locationContext";

const PlacesAutocomplete = ({...props}) => {
  const [input, setInput] = useState<HTMLInputElement["value"]>("");
  const [predictions, setPredictions] = useState<
    GooglePlacesAutocompleteResponse["suggestions"] | []
  >([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<GooglePlacesAutocompletePlace | null>(null);
  const [blur, setBlur] = useState(true);
  const [predictionsShowing, setPredictionsShowing] = useState(false);

  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPredictionsShowing(!blur);
    }, 300);
    return () => clearTimeout(timer);
  }, [blur, setPredictionsShowing]);

  // Debounce the API calls
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      searchPlaces(input)
        .then((data) => {
          setPredictions(data ? data : []);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [input]);

  const handlePlaceSelect = async (place: GooglePlacesAutocompletePlace) => {
    setSelectedPlace(place);
    setInput(place.placePrediction?.text?.text || "");
    setPredictions([]);

    setLoading(true);
    const placeDetails: GooglePlaceDetails | undefined = await getPlaceDetails(place.placePrediction.placeId);

    if (placeDetails) {
        const lct: Location = {
            coordinates: {
                latitude: placeDetails.location.latitude,
                longitude: placeDetails.location.longitude,
                accuracy: 60,
            },
            city: placeDetails.addressComponents[2].shortText,
            country: placeDetails.addressComponents[3].shortText,
            address: placeDetails.formattedAddress,
        }
        setLocation(lct);
    } else {
        console.error('Unable to get location from coordinates provided by Google Maps Places API')
    }
  };

  return (
    <div {...props}>
      <div className="relative">
        {!selectedPlace && (
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => setBlur(true)}
            onFocus={() => setBlur(false)}
            placeholder="Search for places..."
            className="w-[250px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
          />
        )}

        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-[var(--primary)] border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {predictionsShowing && !selectedPlace && predictions.length > 0 && (
        <div className="absolute w-[250px] mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto z-[54]">
          {predictions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handlePlaceSelect(suggestion)}
              className="px-2 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-sm text-gray-800">
                {suggestion.placePrediction?.text?.text}
              </div>
              {suggestion.placePrediction?.structuredFormat?.secondaryText
                ?.text && (
                <div className="text-xs text-gray-600">
                  {
                    suggestion.placePrediction.structuredFormat.secondaryText
                      .text
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className="p-4 w-[250px] bg-primary-foreground rounded-lg">
          <h3 className="font-semibold text-black mb-2">Selected Place:</h3>
          <p className="text-black">
            {selectedPlace.placePrediction?.text?.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
