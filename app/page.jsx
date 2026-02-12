"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import DownloadBtn from "@/components/DownloadBtn";
import {
  typedWords,
  TYPE_SPEED,
  DELETE_SPEED,
  PAUSE_AFTER_TYPE,
  PAUSE_AFTER_DELETE,
} from "@/data/home";

function useTyper(words) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (display.length < currentWord.length) {
        const t = setTimeout(
          () => setDisplay(currentWord.slice(0, display.length + 1)),
          TYPE_SPEED,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (display.length > 0) {
        const t = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          DELETE_SPEED,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }
  }, [display, phase, wordIndex, words]);

  return display;
}

const Home = () => {
  const typedText = useTyper(typedWords);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.25, duration: 0.4, ease: "easeIn" },
      }}
      className="xl:h-full flex flex-col"
    >
      <div className="container mx-auto xl:flex-1 xl:min-h-0 flex flex-col justify-between py-6 xl:py-0">
        <div className="flex flex-col xl:flex-row items-center xl:items-center xl:justify-between xl:flex-1 xl:min-h-0">
          <div className="order-2 xl:order-none text-center xl:text-left max-w-[600px]">
            <h1 className="h1 mb-3">
              Hello, I&apos;m<br />
              <span className="text-accent">{typedText}</span>
              <span className="text-accent animate-pulse">|</span>
            </h1>
            <h2 className="text-xl font-semibold mb-3">Computer &amp; Data Scientist</h2>
            <p className="text-white/80 text-left mb-8 xl:mb-0">
              Computer &amp; Data Science graduate with hands-on experience building AI-driven systems, machine learning models, and web applications. From research in deep learning to developing enterprise tools at Roche, I bring a practical, problem-solving approach to every project.
            </p>
          </div>
          <div className="order-1 xl:order-none mb-6 xl:mb-0">
            <Photo />
          </div>
        </div>

        <div className="xl:pb-10">
          <div className="border-t border-white/20 mb-5" />
          <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-6">
            <div className="flex flex-col xl:flex-row items-center gap-5">
              <Socials
                containerStyles="flex gap-4"
                iconStyles="w-[44px] h-[44px] border border-accent rounded-full flex justify-center items-center text-accent text-lg hover:bg-accent hover:text-primary hover:transition-all duration-500"
              />
              <DownloadBtn btnStyles="uppercase flex items-center gap-2" />
            </div>
            <Stats />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
