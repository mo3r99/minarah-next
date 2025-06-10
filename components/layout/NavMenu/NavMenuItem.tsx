"use client";

import {
  CalendarDays,
  HomeIcon,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type Icons = "home" | "settings" | "jamaah" | "calendar";

export default function NavMenuItem({ icon }: { icon: Icons }) {
  const pathname = usePathname();

  let iconElement: ReactElement<LucideIcon>, iconText: string;
  let active = pathname.substring(1) === icon;

  switch (icon) {
    case "home":
      active = pathname == "/";
      iconElement = <HomeIcon strokeWidth={active ? 2 : 1.5}/>;
      iconText = "Home";
      break;
    case "settings":
      iconElement = <Settings strokeWidth={active ? 2 : 1.5} />;
      iconText = "Settings";
      break;
    case "jamaah":
      iconElement = <Users strokeWidth={active ? 2 : 1.5} />;
      iconText = "Congregation";
      break;
    case "calendar":
      iconElement = <CalendarDays strokeWidth={active ? 2 : 1.5} />;
      iconText = "Calendar";
      break;
  }

  return (
    <li
      className={`flex flex-col items-center justify-center gap-1 ${
        active ? "text-black" : "text-gray-500"
      }`}
    >
      <Link href={icon == 'home' ? '/' : icon} className="flex flex-col items-center justify-center">
        {iconElement}
        <span className={`text-xs ${active ? "text-black font-medium" : "text-gray-500"}`}>
          {iconText}
        </span>
      </Link>
    </li>
  );
}
