import { locationData } from "@/lib/context/locationContext";

class GeolocationService {
  async getCurrentLocation() {
    return new Promise<locationData>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            city: '',
            address: ''
          });
        },
        (error) => {
          const errorMessages: { [key: number]: string } = {
            1: 'Location access denied by user',
            2: 'Location information unavailable',
            3: 'Location request timed out'
          };
          reject(new Error(errorMessages[error.code] || 'Unknown location error'));
          console.error(errorMessages[error.code])
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  async detectCity(latitude:number, longitude:number) {
    try {
      // Use reverse geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      const data = await response.json();
      
      return {
        city: data.city || data.locality,
        country: data.countryName,
        region: data.principalSubdivision
      };
    } catch (error) {
      throw new Error('Unable to detect city from coordinates');
    }
  }
}

export const geolocationService = new GeolocationService();