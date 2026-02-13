"use client";

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const WorkSliderBtns = ({ swiperRef, activeIndex, totalSlides, onManualNav }) => {
  const isBeginning = activeIndex === 0;
  const isEnd = activeIndex === totalSlides - 1;

  const handleClick = (action) => {
    action();
    onManualNav?.();
  };

  return (
    <div className="flex items-center justify-center gap-3 xl:gap-5">
      <button
        className={`text-white/40 hover:text-accent text-sm xl:text-lg transition-colors duration-200 ${isBeginning ? "opacity-0 pointer-events-none" : ""}`}
        onClick={() => handleClick(() => swiperRef.current?.slidePrev())}
      >
        <PiCaretLeftBold />
      </button>
      <div className="flex items-center gap-2 xl:gap-4">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(() => swiperRef.current?.slideTo(i))}
            className={`text-xs xl:text-base font-mono transition-all duration-200 px-1 ${
              i === activeIndex
                ? "text-accent"
                : "text-white/20 hover:text-white/50"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <button
        className={`text-white/40 hover:text-accent text-sm xl:text-lg transition-colors duration-200 ${isEnd ? "opacity-0 pointer-events-none" : ""}`}
        onClick={() => handleClick(() => swiperRef.current?.slideNext())}
      >
        <PiCaretRightBold />
      </button>
    </div>
  );
};

export default WorkSliderBtns;
