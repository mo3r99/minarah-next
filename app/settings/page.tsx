import LocationSettings from "@/components/settings/LocationSettings/LocationSettings";
import { MapPin, SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-figtree)] font-medium text-2xl flex gap-2 items-center">
        <SettingsIcon />
        Settings
      </h1>
      <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-xl flex gap-2 items-center mt-4">
        <MapPin width={16} />
        Location
      </h2>
      <LocationSettings className="mt-2"/>
    </>
  );
}
