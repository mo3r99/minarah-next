import EndSlide from "./SwiperSlides/EndSlide";
import IntroSlide from "./SwiperSlides/IntroSlide";
import LocationSlide from "./SwiperSlides/LocationSlide";

import useEmblaCarousel from "embla-carousel-react";

export default function OnboardingSwiper({
  setComplete,
}: {
  setComplete: VoidFunction;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  return (
    <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden md:mx-auto md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:my-auto z-[52]">
      <div className="embla h-screen bg-slate-50" ref={emblaRef}>
        <div className="embla__container">
          <IntroSlide api={emblaApi} />
          <LocationSlide api={emblaApi} />
          <EndSlide setComplete={setComplete} />
        </div>
      </div>
    </div>
  );
}
