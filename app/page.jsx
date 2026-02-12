"use client";
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Components
import Socials from "@/components/Socials"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"
import DownloadBtn from "@/components/DownloadBtn";

const typedWords = ["Jonathan", "a Developer", "a Scientist"];
const TYPE_SPEED = 100;
const DELETE_SPEED = 60;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

function useTyper(words) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (display.length < currentWord.length) {
        const t = setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length + 1));
        }, TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        // Finished typing — pause
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (display.length > 0) {
        const t = setTimeout(() => {
          setDisplay(display.slice(0, -1));
        }, DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        // Finished deleting — move to next word
        const t = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
      }
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
        transition: {
          delay: 0.25,
          duration: 0.4,
          ease: "easeIn",
        }
      }}
      className="xl:h-full flex flex-col"
    >
      <div className="container mx-auto xl:flex-1 xl:min-h-0 flex flex-col pb-8">
        <div className="flex flex-col xl:flex-row items-center justify-between
          xl:flex-1 xl:min-h-0 py-2 xl:py-0">
          {/* text with social icons on the left */}
          <div className="order-2 xl:order-none text-center xl:text-left">
            <h1 className="h1 mb-5">
              Hello, I&apos;m<br />
              <span className="text-accent">{typedText}</span>
              <span className="text-accent animate-pulse">|</span>
            </h1>
            {/* Subtitle + description row with icons on the left */}
            <div className="flex gap-6">
              {/* Vertical social icons — xl only */}
              <div className="hidden xl:flex pt-1">
                <Socials
                  containerStyles="flex flex-col gap-4"
                  iconStyles="w-9 h-9 border
                  border-accent rounded-full flex justify-center items-center
                  text-accent text-base hover:bg-accent hover:text-primary
                  hover:transition-all duration-500"
                />
              </div>
              <div>
                <span className="text-xl font-semibold">Computer &amp; Data Scientist</span>
                <p className="max-w-[500px] mt-2 mb-2 text-white/80 text-left">
                  Hi, I'm Jonathan Gonzalez, a Computer Scientist with expertise in Python, Java, and C++, specializing in web development and data analysis. I'm always on the lookout for new technologies to enhance my workflow.
                </p>
              </div>
            </div>
            {/* Separator + download button — full width of social+description area */}
            <div className="border border-white/50 my-4"></div>
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6">
              <DownloadBtn btnStyles="uppercase flex items-center gap-2" />
              {/* Mobile social icons — horizontal */}
              <div className="mb-4 xl:hidden">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border
                  border-accent rounded-full flex justify-center items-center
                  text-accent text-base hover:bg-accent hover:text-primary
                  hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-4 mt-2 xl:mb-0">
            <Photo />
          </div>
        </div>
        <Stats />
      </div>
    </motion.section>
  )
}

export default Home
