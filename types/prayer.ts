export enum PrayerName {
  FAJR = 'fajr',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  MAGHRIB = 'maghrib',
  ISHA = 'isha'
}

export enum CalculationMethod {
  MUSLIM_WORLD_LEAGUE = 'MWL',
  ISLAMIC_SOCIETY_OF_NORTH_AMERICA = 'ISNA',
  EGYPTIAN_GENERAL_AUTHORITY = 'Egypt',
  UMM_AL_QURA_UNIVERSITY = 'Makkah',
  UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI = 'Karachi',
  INSTITUTE_OF_GEOPHYSICS_TEHRAN = 'Tehran'
}

export interface PrayerStartTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface JamaahTimes {
  fajr: string;
  zuhr: string;
  jumuah: string;
  asr: string;
  maghrib: string;
  isha: string;
}