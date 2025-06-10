import { locationData } from "@/lib/context/locationContext";

interface Notifications {
  enabled: boolean;
  beforeMinutes: number;
}

interface Preferences {
  calculationMethod: string;
  timeFormat: string;
  location: locationData;
  notifications: Notifications;
  theme: string;
  language: string;
  default: boolean;
}

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
function isValidPreferences(obj:Preferences): obj is Preferences {
  if (typeof obj !== "object" || obj === null) return false;
  if (typeof obj.calculationMethod !== "string") return false;
  if (typeof obj.timeFormat !== "string") return false;
  if (
    !obj.location ||
    typeof obj.location.latitude !== "number" ||
    typeof obj.location.longitude !== "number" ||
    typeof obj.location.city !== "string" ||
    typeof obj.location.address !== "string"
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
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        city: "",
        address: "",
      },
      notifications: {
        enabled: false,
        beforeMinutes: 10,
      },
      theme: "auto",
      language: "en",
      default: true,
    };
  }

  getPreferences(): Preferences {
    console.log('getting preferences.')
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        this.savePreferences(this.defaults, true)
        return this.defaults;
      }

      const parsed = JSON.parse(stored);
      if (!isValidPreferences(parsed)) {
        console.warn("Inalid stored preferences. Reverting to defaults.");
        this.savePreferences(this.defaults, true);
        return this.defaults;
      }

      return deepMergePreferences(this.defaults, parsed);
    } catch (error) {
      console.error("Error loading preferences:", error);
      return this.defaults;
    }
  }

  savePreferences(preferences: Partial<Preferences>, isDefault=false): Preferences {
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
}

export const storageService = new PreferencesService();
