"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { projects, profiles } from "@/data/projects";

const SWIPE_THRESHOLD = 80;

const textVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
};

const Work = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const project = projects[activeIndex];
    const swiperRef = useRef(null);
    const pointerStart = useRef(null);
    const sliding = useRef(false);
    const autoplayTimer = useRef(null);

    const scheduleNext = useCallback((delay = 5000) => {
        clearTimeout(autoplayTimer.current);
        autoplayTimer.current = setTimeout(() => {
            if (!swiperRef.current) return;
            if (swiperRef.current.activeIndex < projects.length - 1) {
                swiperRef.current.slideNext();
            } else {
                swiperRef.current.slideTo(0);
            }
        }, delay);
    }, []);

    useEffect(() => {
        scheduleNext();
        return () => clearTimeout(autoplayTimer.current);
    }, [scheduleNext]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
        // Default auto-advance after 5s; manual interactions call scheduleNext(15000) separately
        scheduleNext();
        sliding.current = true;
        setTimeout(() => { sliding.current = false; }, 500);
    };

    const onPointerDown = useCallback((e) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
    }, []);

    const onPointerUp = useCallback((e) => {
        if (!pointerStart.current || !swiperRef.current || sliding.current) return;
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;
        pointerStart.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx < 0) swiperRef.current.slideNext();
            else swiperRef.current.slidePrev();
            scheduleNext(15000);
        }
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.25, duration: 0.4, ease: "easeIn" },
            }}
            className="min-h-[calc(100dvh-80px)] xl:min-h-0 xl:h-full flex flex-col"
        >
            <div
                className="container mx-auto flex-1 min-h-0 flex flex-col py-6 xl:py-0"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
            >
                {/* Center wrapper — vertically centers the content block */}
                <div className="xl:flex-1 xl:min-h-0 flex items-center">
                    <div className="flex flex-col xl:flex-row xl:items-start gap-8 xl:gap-12 w-full">
                        {/* Left — project info */}
                        <div className="w-full xl:w-[45%] flex flex-col order-2 xl:order-none xl:mt-4 select-none">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex flex-col"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-accent font-extrabold text-5xl xl:text-6xl leading-none">
                                            {String(activeIndex + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-xs xl:text-sm uppercase tracking-[3px] text-white/40 mt-2">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl xl:text-5xl font-bold leading-tight text-white mb-4 xl:mt-4">
                                        {project.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((item, index) => (
                                            <span
                                                key={index}
                                                className="text-xs xl:text-sm bg-white/10 text-white/80 px-3 py-1.5 rounded-md"
                                            >
                                                {item.name}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-white/60 text-sm xl:text-base leading-relaxed mb-5 xl:mt-4">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-3 mb-5">
                                        {project.live && (
                                            <Link href={project.live} target="_blank">
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger className="w-[44px] h-[44px] rounded-full border border-white/20 flex justify-center items-center group hover:border-accent transition-all duration-300">
                                                            <BsArrowUpRight className="text-white/60 text-lg group-hover:text-accent transition-colors duration-300" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Live project</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Link>
                                        )}
                                        {project.github && (
                                            <Link href={project.github} target="_blank">
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger className="w-[44px] h-[44px] rounded-full border border-white/20 flex justify-center items-center group hover:border-accent transition-all duration-300">
                                                            <BsGithub className="text-white/60 text-lg group-hover:text-accent transition-colors duration-300" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>GitHub Repository</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right — image slider */}
                        <div className="w-full xl:w-[55%] order-1 xl:order-none">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                speed={500}
                                allowTouchMove={false}
                                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                                onSlideChange={handleSlideChange}
                            >
                                {projects.map((proj, index) => (
                                    <SwiperSlide key={index} className="w-full">
                                        <div className="h-[300px] xl:h-[460px] relative rounded-lg overflow-hidden">
                                            <div className="absolute inset-0 bg-black/5 z-10" />
                                            <Image
                                                src={proj.image}
                                                fill
                                                className="object-cover"
                                                alt={proj.title}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* Bottom zone — navigation + profiles */}
                <div className="pb-8 mt-auto pt-2 shrink-0">
                    <WorkSliderBtns
                        swiperRef={swiperRef}
                        activeIndex={activeIndex}
                        totalSlides={projects.length}
                        onManualNav={() => scheduleNext(15000)}
                    />
                    <div className="border-t border-white/20 mt-4 xl:mt-10 mb-5" />
                    <div className="flex items-center gap-6">
                        {profiles.map((profile, index) => (
                            <Link
                                key={index}
                                href={profile.href}
                                target="_blank"
                                className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors duration-300 text-sm"
                            >
                                <span className="text-lg"><profile.icon /></span>
                                <span>{profile.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Work;
