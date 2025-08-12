import { Location, Preferences } from "@/types";
import { access } from "fs";

function deepMergePreferences(
  defaults: Preferences,
  overrides: Partial<Preferences>
): Preferences {
  return {
    ...defaults,
    ...overrides,
    location: {
      ...defaults.location,
      ...(overrides.location || {}),
    },
    notifications: {
      ...defaults.notifications,
      ...(overrides.notifications || {}),
    },
  };
}

// Utility function to validate loaded preferences
function isValidPreferences(obj: Preferences): obj is Preferences {
  if (typeof obj !== "object" || obj === null) return false;
  if (typeof obj.calculationMethod !== "string") return false;
  if (typeof obj.timeFormat !== "string") return false;
  if (
    !obj.location ||
    typeof obj.location.coordinates.latitude !== "number" ||
    typeof obj.location.coordinates.longitude !== "number" ||
    typeof obj.location.city !== "string" ||
    typeof obj.location.address !== "string" ||
    typeof obj.location.country !== "string" ||
    typeof obj.location.timezone !== "string"
  )
    return false;
  if (
    !obj.notifications ||
    typeof obj.notifications.enabled !== "boolean" ||
    typeof obj.notifications.beforeMinutes !== "number"
  )
    return false;
  if (typeof obj.theme !== "string") return false;
  if (typeof obj.language !== "string") return false;
  if (typeof obj.default !== "boolean") return false;
  if (typeof obj.showOnboarding !== "boolean") return false;
  return true;
}

class PreferencesService {
  private readonly storageKey: string;
  private readonly defaults: Preferences;

  constructor() {
    this.storageKey = "minarah-preferences";
    this.defaults = {
      calculationMethod: "ISNA",
      timeFormat: "12h",
      location: {
        coordinates: {
          latitude: 0,
          longitude: 0,
          accuracy: 0,
        },
        city: "",
        address: "",
        country: "",
        timezone: "",
      },
      notifications: {
        enabled: false,
        beforeMinutes: 10,
      },
      theme: "auto",
      language: "en",
      default: true,
      showOnboarding: true,
    };
  }

  getPreferences(): Preferences {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        this.savePreferences(this.defaults, true);
        return this.defaults;
      }

      const parsed = JSON.parse(stored);
      if (!isValidPreferences(parsed)) {
        console.warn("Invalid stored preferences. Reverting to defaults.");
        this.savePreferences(this.defaults, true);
        return this.defaults;
      }

      return deepMergePreferences(this.defaults, parsed);
    } catch (error) {
      console.error("Error loading preferences:", error);
      return this.defaults;
    }
  }

  savePreferences(
    preferences: Partial<Preferences>,
    isDefault = false
  ): Preferences {
    try {
      const current = isDefault ? this.defaults : this.getPreferences();
      const updated = deepMergePreferences(current, preferences);

      updated.default = isDefault;
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error("Error saving preferences:", error);
      throw new Error("Unable to save settings");
    }
  }

  resetPreferences(): Preferences {
    localStorage.removeItem(this.storageKey);
    return this.defaults;
  }

  setDefaultPreferences(): Preferences {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        this.savePreferences(this.defaults, true);
        return this.defaults;
      }

      const parsed = JSON.parse(stored);

      parsed.default = true;
      localStorage.setItem(this.storageKey, JSON.stringify(parsed));
      return parsed;
    } catch (err) {
      console.warn(err);
      throw new Error("Unable to set default key in preferences!")
    }
  }

  // saveLocation(location: Location) {
  //   console.log('updating location to ', location)
  //   try {
  //     const current = this.getPreferences();
  //     const updated = {
  //       ...current,
  //       default: false,
  //       location: {
  //         coordinates: {
  //           latitude: location.coordinates.latitude,
  //           longitude: location.coordinates.longitude,
  //           accuracy: location.coordinates.accuracy,
  //         },
  //         address: location.address ? location.address : '',
  //         city: location.city,
  //         country: location.country ? location.country : "",
  //         timezone: location.timezone ? location.timezone : "",
  //       },
  //     };

  //     localStorage.setItem(this.storageKey, JSON.stringify(updated));
  //     return updated;
  //   } catch (error) {
  //     console.error("Unable to save location preferences", error);
  //     throw new Error("Unable to save preferences");
  //   }
  // }
}

export const storageService = new PreferencesService();
