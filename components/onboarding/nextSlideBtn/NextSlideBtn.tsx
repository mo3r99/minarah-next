import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { useCallback } from "react";

import { EmblaCarouselType } from "embla-carousel";
import { ArrowRight } from "lucide-react";

export default function NextSlideBtn({
  disabled,
  emblaApi,
  className,
  ...props
}: {
  disabled: boolean | undefined;
  props?: ComponentProps<"button"> | undefined;
  className?: string;
  emblaApi: EmblaCarouselType | undefined;
}) {
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Button
      {...props}
      className={className}
      disabled={typeof disabled != "undefined" ? disabled : false}
      onClick={scrollNext}
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 3rem)",
      }}
    >
      Continue
      <ArrowRight />
    </Button>
  );
}
