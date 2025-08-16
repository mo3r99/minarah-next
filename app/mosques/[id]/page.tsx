import MosquePage from "@/components/mosques/MosquePage/MosquePage";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  let returnArr: { id: string }[] = [{ id: "1" }];

  for (let i: number = 2; i < 1000; i++) {
    returnArr = returnArr.concat([{ id: `${i}` }]);
  }

  return returnArr;
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Link href={"/mosques"}>
        <span className="text-sm text-gray-500 flex gap-1 items-center mb-4"><ChevronLeft width={16}/>Back</span>
      </Link>
      <MosquePage mosqueId={parseInt(id)} />
    </>
  );
}

export const dynamic = "force-static";
