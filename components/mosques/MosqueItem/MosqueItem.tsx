import React from "react";

import type { Mosque } from "@/types";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";

export default function MosqueItem({
  mosque,
  className,
  distance,
  ...props
}: React.ComponentProps<"div"> & { mosque: Mosque; distance: number }) {

    const distanceInMi = Math.round(distance * 0.62137 * 10) / 10;
  return (
    <div
      className={cn(
        className,
        "my-2 bg-secondary hover:bg-secondary-lighter transition-all rounded-xl grid grid-cols-2 grid-rows-1"
      )}
      {...props}
    >
      <Image
        src={
          mosque.imageUrl
            ? mosque.imageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/6/62/Silhouette_of_the_Mosque.jpg"
        }
        width={250}
        height={250}
        alt={
          mosque.imageUrl
            ? `An image of ${mosque.name}`
            : "An image of a mosque"
        }
        className="w-full h-[150px] object-cover rounded-xl"
      />
      <div className="px-4 py-2 relative">
        <h2 className="text-xl">{mosque.name}</h2>
        <p className="text-sm absolute bottom-4">{distanceInMi} {distanceInMi == 1 ? `mile` : `miles`} away</p>
      </div>
    </div>
  );
}
