class PrayerTimesAPI {
  async getPrayerTimes(latitude:number, longitude:number) {
    const data = {
        fajr: '04:00',
        zuhr: '13:14',
        asr: '18:45',
        maghrib: '21:41',
        isha: '00:45',
    }

    return data;
  }

  async getMonthlyTimes() {
    // Implementation for monthly calendar
  }

  // Transform API response to component-friendly format
  transformPrayerData(apiData:any) {
    return {
      date: apiData.date,
      city: apiData.city.name,
      prayers: {
        fajr: apiData.fajr,
        sunrise: apiData.sunrise,
        dhuhr: apiData.dhuhr,
        asr: apiData.asr,
        maghrib: apiData.maghrib,
        isha: apiData.isha
      },
    };
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }
}

export const prayerTimesApi = new PrayerTimesAPI();