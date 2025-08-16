import LocationSettings from "@/components/settings/LocationSettings/LocationSettings";
import ThemeToggle from "@/components/settings/ThemeToggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { getAppVersion } from "@/lib/utils/utils";
import { HeartHandshake, MapPin, SettingsIcon, SunMoon } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-figtree)] font-medium text-2xl flex gap-2 items-center mt-4">
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

      <div className="max-w-xl">
        <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-xl flex gap-2 items-center mt-6">
          <HeartHandshake width={16} />
          Support Manarah
        </h2>
        <p className="mt-2">
          Manarah thrives with the support of its community. Your contributions
          help us add new features, expand our mosque listings, and continue
          building tools that serve the ummah. Support our mission and be part
          of the journey.
        </p>

        <p className="font-semibold mt-4">Choose your contribution</p>

        <div className="flex flex-row gap-4 flex-wrap mt-4">
          {[1, 2, 5, 10, 15, 20].map((price) => {
            return (
              <Button variant={"secondary"} key={price}>
                £{price}
              </Button>
            );
          })}
        </div>

        <p className="font-semibold mt-4">Are you a developer?</p>
        <p className="mt-2">
          Why not contribute to the building of Manarah on{" "}
          <Link
            className="text-blue-600"
            href={"https://www.github.com/mo3r99/minarah-next"}
            target="_blank"
          >
            GitHub
          </Link>
          ?
        </p>
      </div>

      <div className="mb-24 mt-8 max-w-xl text-center">
        <p className="text-sm font-light">
          Minrah v{getAppVersion()} {process.env.BUILD_ID}
        </p>
        {/* <p className="text-sm font-light">
          Brought to you by{" "}
          <Link className="text-blue-600" href="https://www.almasjid.co.uk/">
            Al Masjid
          </Link>
        </p> */}
        <p className="text-sm font-light mt-2">
          © 2025 Muhammad Rauf. All rights reserved.
        </p>
      </div>
    </>
  );
}
