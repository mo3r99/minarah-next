import { Mosque, MosqueAmenity, Mosques } from "@/types";

class JamaahTimesAPI {
  async getMosquesAndJamaahTimes(latitude?: number, longitude?: number, city?: string) {
    console.log(
      "latitude and longitude input to getJamaahTimes(): ",
      latitude,
      longitude,
      city
    );

    const masjidNoor: Mosque = {
      id: "1",
      name: "Masjid E Noor",
      address: {
        name: "87",
        street: "Stamford Street",
        city: "Manchester",
        postcode: "M16 9JE",
      },
      coordinates: {
        latitude: 53.46090726211178,
        longitude: -2.2632168608239573,
      },
      distance: 3.4,
      congregationTimes: {
        fajr: "04:40",
        jumuah: "13:30",
        zuhr: "13:30",
        asr: "19:45",
        maghrib: "21:41",
        isha: "22:50",
      },
      amenities: [MosqueAmenity.ABLUTION_FACILITIES, MosqueAmenity.PARKING, MosqueAmenity.WHEELCHAIR_ACCESS],
      contact: { phone: "0161 227 8687", website: "http://www.masjidenoor.com/" },
      lastUpdated: "2025-06-12 12:43",
    };

    const houghEndHall: Mosque = {
      id: "2",
      name: "Hough End Hall Academy and Mosque",
      address: {
        name: "95",
        street: "Nell Lane",
        city: "Manchester",
        postcode: "M21 7SW",
      },
      coordinates: {
        latitude: 53.43577384385521,
        longitude: -2.265115286606161,
      },
      distance: 1.3,
      congregationTimes: {
        fajr: "04:40",
        jumuah: "13:30",
        zuhr: "13:30",
        asr: "19:45",
        maghrib: "21:41",
        isha: "22:50",
      },
      amenities: [MosqueAmenity.ABLUTION_FACILITIES, MosqueAmenity.PARKING, MosqueAmenity.WOMENS_SECTION],
      contact: { phone: "07930 161072" },
      lastUpdated: "2025-06-12 12:46",
    };

    const didsburyMosque: Mosque = {
      id: "2",
      name: "Didsbury Central Mosque",
      address: {
        name: "271",
        street: "Burton Road",
        city: "Manchester",
        postcode: "M20 2WA",
      },
      coordinates: {
        latitude: 53.42270299216246,
        longitude: -2.246813673430739,
      },
      distance: 0.7,
      congregationTimes: {
        fajr: "04:40",
        jumuah: "13:30",
        zuhr: "13:30",
        asr: "19:45",
        maghrib: "21:41",
        isha: "22:50",
      },
      amenities: [MosqueAmenity.ABLUTION_FACILITIES, MosqueAmenity.WHEELCHAIR_ACCESS, MosqueAmenity.WOMENS_SECTION, MosqueAmenity.PARKING],
      contact: { phone: "0161 434 2254", website: "http://www.didsburymosque.com/" },
      lastUpdated: "2025-06-12 12:48",
    };

    const data: Mosques = [masjidNoor, houghEndHall, didsburyMosque];

    return data;
  }

  async getMonthlyTimes() {
    // Implementation for monthly calendar
  }

  // Transform API response to component-friendly format
  // transformPrayerData(apiData) {
  //   return {
  //     date: apiData.date,
  //     city: apiData.city.name,
  //     prayers: {
  //       fajr: apiData.fajr,
  //       sunrise: apiData.sunrise,
  //       dhuhr: apiData.dhuhr,
  //       asr: apiData.asr,
  //       maghrib: apiData.maghrib,
  //       isha: apiData.isha
  //     },
  //   };
  // }

  getAuthToken() {
    return localStorage.getItem("authToken");
  }
}

export const jamaahTimesApi = new JamaahTimesAPI();
