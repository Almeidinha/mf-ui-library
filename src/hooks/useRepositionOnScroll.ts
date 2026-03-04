import { RefObject, useEffect } from "react";

type UseRepositionOnScrollArgs = {
  enabled: boolean;
  onReposition: () => void;
  scrollContainerRef?: RefObject<HTMLElement | null>;
};

export function useRepositionOnScroll({
  enabled,
  onReposition,
  scrollContainerRef,
}: UseRepositionOnScrollArgs) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleScroll: EventListener = () => {
      onReposition();
    };

    const handleResize = () => {
      onReposition();
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    const containerEl = scrollContainerRef?.current;
    containerEl?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      containerEl?.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, onReposition, scrollContainerRef]);
}
