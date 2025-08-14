import LocationSettings from "@/components/settings/LocationSettings/LocationSettings";
import ThemeToggle from "@/components/settings/ThemeToggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { HeartHandshake, MapPin, SettingsIcon, SunMoon } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-figtree)] font-medium text-2xl flex gap-2 items-center">
        <SettingsIcon />
        Settings
      </h1>

      <div className="max-w-xl">
        <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-xl flex gap-2 items-center mt-6">
          <MapPin width={16} />
          Location
        </h2>
        <LocationSettings className="mt-2" />
      </div>

      <div className="max-w-xl">
        <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-xl flex gap-2 items-center mt-6">
          <SunMoon width={16} />
          Theme
        </h2>
        <ThemeToggle className="mt-2" />
      </div>

      <div className="mb-24 max-w-xl">
        <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-xl flex gap-2 items-center mt-6">
          <HeartHandshake width={16} />
          Support Manarah
        </h2>
        <p className="mt-2">
          Manarah thrives with the support of its community. Your contributions help us add new features, expand our mosque listings, and continue building tools that serve the ummah. Support our mission and be part of the journey.
        </p>

        <p className="font-semibold mt-4">Choose your contribution</p>

        <div className="flex flex-row gap-4 flex-wrap mt-4">
          
          {[1, 2, 5, 10, 15, 20].map(price => {
            return (
              <Button variant={'secondary'} key={price}>£{price}</Button>
            )
          })}
        </div>
      </div>
    </>
  );
}
