import React from "react";
import type { Mosque } from "@/types";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function MosqueItem({
    mosque,
    className,
    distance,
    ...props
}: React.ComponentProps<"a"> & { mosque: Mosque; distance: number }) {
    const distanceInMi = Math.round(distance * 0.62137 * 10) / 10;

    return (
        <Link
            href={`/mosques/${mosque.id}`}
            className={cn(
                className,
                "my-4 bg-secondary hover:bg-secondary-lighter transition-all duration-300 rounded-xl grid grid-cols-2 cursor-pointer overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1"
            )}
            {...props}
        >
            <div className="relative h-[200px] overflow-hidden">
                <Image
                    src={
                        mosque.imageUrl ||
                        "https://upload.wikimedia.org/wikipedia/commons/6/62/Silhouette_of_the_Mosque.jpg"
                    }
                    fill
                    style={{ objectFit: "cover" }}
                    alt={mosque.imageUrl ? `An image of ${mosque.name}` : "An image of a mosque"}
                    className="transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="px-6 py-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-3">{mosque.name}</h2>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span>
                        {distanceInMi} {distanceInMi === 1 ? "mile" : "miles"} away
                    </span>
                </div>
            </div>
        </Link>
    );
}
