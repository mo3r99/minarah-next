import { storageService } from "@/lib/services/storage/storageService";
import { Mosque, MosqueAmenity, MosqueApiResponse, Mosques } from "@/types";

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
  amenities: [
    MosqueAmenity.ABLUTION_FACILITIES,
    MosqueAmenity.PARKING,
    MosqueAmenity.WHEELCHAIR_ACCESS,
  ],
  contact: {
    phone: "0161 227 8687",
    website: "http://www.masjidenoor.com/",
    emasjidLive: "https://emasjidlive.co.uk/listen/masjidenoor_manchester",
  },
  lastUpdated: "2025-06-12 12:43",
  imageUrl:
    "https://www.genuki.org.uk/sites/default/files/styles/max_650x650/public/media/images/LAN/churches/Stretford/jame.jpg?itok=onPAkvEp",
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
  amenities: [
    MosqueAmenity.ABLUTION_FACILITIES,
    MosqueAmenity.PARKING,
    MosqueAmenity.WOMENS_SECTION,
    MosqueAmenity.WHEELCHAIR_ACCESS,
  ],
  contact: { phone: "07930 161072" },
  lastUpdated: "2025-06-12 12:46",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Hough_End_Hall.jpg",
};

const didsburyMosque: Mosque = {
  id: "3",
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
  amenities: [
    MosqueAmenity.ABLUTION_FACILITIES,
    MosqueAmenity.WHEELCHAIR_ACCESS,
    MosqueAmenity.WOMENS_SECTION,
    MosqueAmenity.PARKING,
  ],
  contact: {
    phone: "0161 434 2254",
    website: "http://www.didsburymosque.com/",
  },
  lastUpdated: "2025-06-12 12:48",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/5/5d/Didsbury_mosque.jpg",
};

const data: Mosques = [masjidNoor, houghEndHall, didsburyMosque];

const dummyData: MosqueApiResponse = {
  mosques: data,
  total: 3,
  limit: 3,
  page: 1,
};

class JamaahTimesAPI {
  async getMosquesAndJamaahTimes(
    latitude?: number,
    longitude?: number,
    city?: string
  ) {
    console.log(
      "latitude and longitude input to getJamaahTimes(): ",
      latitude,
      longitude,
      city
    );

    storageService.saveMosqueData(dummyData.mosques);
    return dummyData;
  }

  async getMosqueData(id:number):Promise<Mosque | undefined> {
    await new Promise(resolve => setTimeout(resolve, Math.random()*1000));
    return dummyData.mosques.find(mosque => parseInt(mosque.id) == id);
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
}

export const jamaahTimesApi = new JamaahTimesAPI();
