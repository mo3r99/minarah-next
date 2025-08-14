"use client";

import { cn } from "@/lib/utils/utils";
import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle({ ...props }: React.ComponentProps<"div">) {
  const options = [
    { name: "Light", icon: <Sun width={16} className="mr-1"/> },
    { name: "Dark", icon: <Moon width={16} className="mr-1" /> },
    { name: "Device", icon: <MonitorSmartphone width={16} className="mr-1" /> },
  ];
  const [selected, setSelected] = useState("Light");

  return (
    <div
      className={cn(
        "flex border border-black rounded-full overflow-hidden mx-auto max-w-[300px]",
        props.className
      )}
    >
      {options.map((option) => (
        <button
          key={option.name}
          onClick={() => setSelected(option.name)}
          className={`flex-1 flex flex-row items-center justify-center px-4 py-2 text-center text-sm transition-colors ${
            selected === option.name ? "bg-white" : "bg-[var(--secondary)]"
          } ${
            selected === option.name ? "text-black" : "text-black"
          } border-none`}
          style={{
            borderRight:
              option !== options[options.length - 1]
                ? "1px solid transparent"
                : "none",
          }}
        >
          {option.icon}
          {option.name}
        </button>
      ))}
    </div>
  );
}
