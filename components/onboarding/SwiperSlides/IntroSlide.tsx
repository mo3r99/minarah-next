import Image from "next/image";
import React from "react";
import NextSlideBtn from "../nextSlideBtn/NextSlideBtn";

import { EmblaCarouselType } from 'embla-carousel'
import slide1img from "@/assets/onboarding/slide1alt1.png";

export default function IntroSlide({api}:{api: EmblaCarouselType | undefined}) {
  return (
    <div className="embla__slide flex flex-col items-center justify-center p-8 text-center">
      <Image src={slide1img} width={540} height={540} alt="Picture of Mosque" />
      <h2 className="text-3xl font-bold mt-6 mb-3">Welcome to Minarah!</h2>
      <p className="text-xl text-gray-600">
        Your local mosque Salah times, all in one place.
      </p>
      <NextSlideBtn className={'fixed bottom-8'} emblaApi={api} disabled={false} />
    </div>
  );
}
