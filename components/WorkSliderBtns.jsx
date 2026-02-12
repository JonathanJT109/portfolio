"use client";

import { useState } from "react";
import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const WorkSliderBtns = ({ containerStyles, btnStyles, iconsStyles }) => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  swiper.on("slideChange", () => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  });

  return (
    <div className={containerStyles}>
      <button
        className={`${btnStyles} ${isBeginning ? "opacity-0 pointer-events-none" : ""}`}
        onClick={() => swiper.slidePrev()}
      >
        <PiCaretLeftBold className={iconsStyles} />
      </button>
      <button
        className={`${btnStyles} ${isEnd ? "opacity-0 pointer-events-none" : ""}`}
        onClick={() => swiper.slideNext()}
      >
        <PiCaretRightBold className={iconsStyles} />
      </button>
    </div>
  );
};

export default WorkSliderBtns;
