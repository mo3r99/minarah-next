export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface Location {
  coordinates: Coordinates;
  city: string;
  country: string;
  timezone?: string;
  address?: string;
}

export interface LocationPermission {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

export interface GoogleGeocodingResponse {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    navigation_points?: Array<{
      location: {
        latitude: number;
        longitude: number;
      };
    }>;
    place_id: string;
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    types: string[];
  }>;
  status: string;
}

export interface GooglePlacesAutocompleteResponse {
  suggestions: Array<GooglePlacesAutocompletePlace>;
}

export interface GooglePlacesAutocompletePlace {
  placePrediction: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: Array<{
        startOffset?: number;
        endOffset: number;
      }>;
    };
    structuredFormat: {
      mainText: {
        text: string;
        matches: Array<{
          startOffset?: number;
          endOffset: number;
        }>;
      };
      secondaryText: {
        text: string;
      };
    };
    types: string[];
  };
}

export interface GooglePlaceDetails {
    name: string;
    id: string;
    types: string[];
    formattedAddress: string;
    addressComponents: Array<{
        longText: string;
        shortText: string;
        types: string[];
        languageCode: string;
    }>;
    location: {
        latitude: number;
        longitude: number;
    };
    viewport: {
        low: {
            latitude: number;
            longitude: number;
        };
        high: {
            latitude: number;
            longitude: number;
        };
    };
    googleMapsUri: string;
    utcOffsetMinutes: number;
    adrFormatAddress: string;
    iconMaskBaseUri: string;
    iconBackgroundColor: string;
    displayName: {
        text: string;
    };
    primaryTypeDisplayName: {
        text: string;
        languageCode: string;
    };
    primaryType: string;
    shortFormattedAddress: string;
    pureServiceAreaBusiness: boolean;
    addressDescriptor: {
        landmarks: Array<{
            name: string;
            placeId: string;
            displayName: {
                text: string;
                languageCode: string;
            };
            types: string[];
            straightLineDistanceMeters: number;
            travelDistanceMeters: number;
            spatialRelationship?: string;
        }>;
        areas: Array<{
            name: string;
            placeId: string;
            displayName: {
                text: string;
                languageCode: string;
            };
            containment: string;
        }>;
    };
    googleMapsLinks: {
        directionsUri: string;
        placeUri: string;
        photosUri: string;
    };
    timeZone: {
        id: string;
    };
    postalAddress: {
        regionCode: string;
        languageCode: string;
        postalCode: string;
        locality: string;
        addressLines: string[];
    };
}
