import MosquePageLoading from "@/components/mosques/MosquePage/MosquePageLoading";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function loading() {
  return (
    <>
      <Link href={"/mosques"}>
        <span className="text-sm text-gray-500 flex gap-1 items-center mb-4">
          <ChevronLeft width={16} />
          Back
        </span>
      </Link>
      <MosquePageLoading />
    </>
  );
}
