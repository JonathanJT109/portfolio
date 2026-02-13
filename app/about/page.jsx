"use client";

import { useState, useEffect, useCallback } from "react";
import { MdWorkOutline } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { HiChevronDown } from "react-icons/hi";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { experience, education } from "@/data/resume";

function useScrollCue() {
    const [node, setNode] = useState(null);
    const [showCue, setShowCue] = useState(false);

    const ref = useCallback((el) => setNode(el), []);

    useEffect(() => {
        if (!node) return;
        const viewport = node.querySelector("[data-radix-scroll-area-viewport]");
        if (!viewport) return;

        const check = () => {
            const el =
                viewport.scrollHeight > viewport.clientHeight + 1
                    ? viewport
                    : viewport.firstElementChild?.scrollHeight >
                        viewport.firstElementChild?.clientHeight + 1
                        ? viewport.firstElementChild
                        : viewport;

            const needsScroll = el.scrollHeight > el.clientHeight + 1;
            const threshold = 0.95;
            const scrollRatio = (el.scrollTop + el.clientHeight) / el.scrollHeight;
            setShowCue(needsScroll && scrollRatio < threshold);
        };

        viewport.addEventListener("scroll", check, { passive: true });

        const ro = new ResizeObserver(check);
        ro.observe(viewport);

        check();
        const timer = requestAnimationFrame(check);

        return () => {
            viewport.removeEventListener("scroll", check);
            ro.disconnect();
            cancelAnimationFrame(timer);
        };
    }, [node]);

    return { callbackRef: ref, showCue };
}

const sections = {
    experience: {
        icon: MdWorkOutline,
        other: "education",
        otherLabel: "Education",
    },
    education: {
        icon: RiGraduationCapLine,
        other: "experience",
        otherLabel: "Experience",
    },
};

const Resume = () => {
    const [active, setActive] = useState("experience");
    const { callbackRef: expRef, showCue: expShowCue } = useScrollCue();
    const { callbackRef: eduRef, showCue: eduShowCue } = useScrollCue();

    const current = active === "experience" ? experience : education;
    const { icon: Icon, other, otherLabel } = sections[active];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.25, duration: 0.4, ease: "easeIn" },
            }}
            className="xl:h-full flex flex-col py-6 xl:py-0 overflow-hidden"
        >
            <div className="container mx-auto flex-1 min-h-0 flex flex-col">
                <div className="flex flex-col gap-[40px] text-left flex-1 min-h-0">
                    <button
                        onClick={() => setActive(other)}
                        className="flex flex-col mx-auto items-center gap-2 group cursor-pointer my-5"
                    >
                        <div className="flex items-center gap-4">
                            <Icon className="text-3xl" />
                            <h3 className="text-4xl font-bold">{current.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiArrowsRightLeft className="text-lg text-white/30 group-hover:text-accent transition-colors duration-200" />
                            <span className="text-base text-white/30 group-hover:text-accent transition-colors duration-200">
                                {otherLabel}
                            </span>
                        </div>
                    </button>

                    <AnimatePresence mode="wait">
                        {active === "experience" && (
                            <motion.div
                                key="experience"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="flex-1 min-h-0"
                            >
                                <div className="relative h-full" ref={expRef}>
                                    <ScrollArea className="h-full">
                                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12">
                                            {experience.items.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="border-l-2 border-accent pl-6 py-4 flex flex-col gap-2"
                                                >
                                                    <span className="text-accent text-xs font-semibold uppercase tracking-widest">{item.duration}</span>
                                                    <h3 className="text-xl font-bold leading-tight">
                                                        {item.position}
                                                    </h3>
                                                    <p className="text-white text-sm font-medium">{item.company}</p>
                                                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {item.skills.map((skill, sIndex) => (
                                                            <span key={sIndex} className="text-[11px] bg-white/5 text-white/60 px-2 py-0.5 rounded">{skill}</span>
                                                        ))}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                    <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none flex items-end justify-center pb-1 transition-opacity duration-300 ${expShowCue ? "opacity-100" : "opacity-0"}`}>
                                        <HiChevronDown className="text-white/40 text-xl animate-bounce" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {active === "education" && (
                            <motion.div
                                key="education"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="flex-1 min-h-0"
                            >
                                <div className="relative h-full" ref={eduRef}>
                                    <ScrollArea className="h-full">
                                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12">
                                            {education.items.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="border-l-2 border-accent pl-6 py-4 flex flex-col gap-2"
                                                >
                                                    <span className="text-accent text-xs font-semibold uppercase tracking-widest">{item.duration}</span>
                                                    <h3 className="text-xl font-bold leading-tight">
                                                        {item.degree}
                                                    </h3>
                                                    <p className="text-white text-sm font-medium">{item.institution}</p>
                                                    {item.area && (
                                                        <p className="text-white/60 text-sm italic">{item.area}</p>
                                                    )}
                                                    {item.accomplishments?.length > 0 && (
                                                        <ul className="flex flex-col gap-1.5 mt-1">
                                                            {item.accomplishments.map((acc, accIndex) => (
                                                                <li key={accIndex} className="flex items-start gap-2">
                                                                    <span className="w-[5px] h-[5px] rounded-full bg-accent mt-1.5 shrink-0" />
                                                                    <p className="text-white/60 text-sm">{acc}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                    <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none flex items-end justify-center pb-1 transition-opacity duration-300 ${eduShowCue ? "opacity-100" : "opacity-0"}`}>
                                        <HiChevronDown className="text-white/40 text-xl animate-bounce" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;
