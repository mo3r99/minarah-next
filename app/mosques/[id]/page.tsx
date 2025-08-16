
import MosquePage from "@/components/mosques/MosquePage/MosquePage";
import { jamaahTimesApi } from "@/lib/api/prayerTimes/jamaahTimesApi";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
// //   let returnArr: { id: string }[] = [{ id: "1" }];

// //   for (let i: number = 2; i < 4; i++) {
// //     returnArr = returnArr.concat([{ id: `${i}` }]);
// //   }

//   return [{id: '1'}, {id: '2'}, {id: '3'}];
// }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mosque = await jamaahTimesApi.getMosqueData(parseInt(id));

  if (!mosque) {
    return notFound();
  }

  return (
    <>
      <Link href={"/mosques"}>
        <span className="text-sm text-gray-500 flex gap-1 items-center mb-4"><ChevronLeft width={16}/>Back</span>
      </Link>
      <MosquePage mosque={mosque} />
    </>
  );
}