import { Location } from "./location";
import { Notifications } from "./notifications";

export interface Preferences {
  calculationMethod: string;
  timeFormat: string;
  location: Location;
  notifications: Notifications;
  theme: string;
  language: string;
  default: boolean;
  showOnboarding: boolean;
}