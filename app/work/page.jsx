"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { projects, profiles } from "@/data/projects";

const Work = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const project = projects[activeIndex];

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.25, duration: 0.4, ease: "easeIn" },
            }}
            className="xl:h-full flex flex-col"
        >
            <div className="container mx-auto xl:flex-1 xl:min-h-0 flex flex-col py-6 xl:py-0">
                {/* Center wrapper — vertically centers the content block */}
                <div className="xl:flex-1 xl:min-h-0 flex items-center">
                    <div className="flex flex-col xl:flex-row xl:items-start gap-8 xl:gap-12 w-full">
                        {/* Left — project info */}
                        <div className="w-full xl:w-[45%] flex flex-col order-2 xl:order-none xl:mt-4">
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

                            <p className="text-white/60 text-sm xl:text-base leading-relaxed mb-5 xl:mt-4 xl:min-h-[170px]">
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
                        </div>

                        {/* Right — image slider */}
                        <div className="w-full xl:w-[55%] order-1 xl:order-none">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                speed={500}
                                className="xl:h-[520px]"
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
                                <WorkSliderBtns
                                    containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none xl:right-4 xl:bottom-4"
                                    btnStyles="bg-accent hover:bg-accent-hover text-primary text-[18px] w-[40px] h-[40px] flex justify-center items-center transition-all rounded-full"
                                />
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* Bottom zone — profiles */}
                <div className="xl:pb-8 mt-8 xl:mt-0 pt-2 shrink-0">
                    <div className="border-t border-white/20 mb-5" />
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
