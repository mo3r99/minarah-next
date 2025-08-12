import Image from "next/image";

import slide3img from "@/assets/onboarding/slide3.png";
import { Button } from "@/components/ui/button";

import { MouseEventHandler } from "react";
import { Check } from "lucide-react";

export default function EndSlide({setComplete}:{setComplete: MouseEventHandler<HTMLButtonElement>}) {
  return (
    <div className="embla__slide flex flex-col items-center justify-center p-8 text-center">
      <Image src={slide3img} width={540} height={540} alt="Picture of Mosque" />
      <h2 className="text-3xl font-bold mt-6 mb-3">All Set!</h2>
      <p className="text-xl text-gray-600">
        You can now view local Salah times in your area.
      </p>
      <Button className={'absolute bottom-8'} onClick={setComplete}><Check />Complete</Button>
    </div>
  );
}
