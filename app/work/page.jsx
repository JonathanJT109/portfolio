"use client";

import { motion } from "framer-motion"
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"

import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Frontend",
    title: "Portfolio Website",
    description: "I developed a portfolio website using Next.js and Tailwind CSS to highlight my skills and share my story. The site serves as a dynamic platform that reflects my personality and showcases my work in an engaging and visually appealing way.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "UI" },
    ],
    image: "/portfolio_preview.png",
    live: "",
    github: "https://github.com/JonathanJT109/portfolio.git",
  },
  {
    num: "02",
    category: "Data Science",
    title: "US Household Income",
    description: "I visualized U.S. household income data using Tableau, creating an interactive dashboard that presents insights at both the state and national levels. The project features a clear layout, allowing users to easily compare income trends across different states while also understanding the broader national context.",
    stack: [
      { name: "Tableau" },
      { name: "Data Visualization" },
    ],
    image: "/us_household_income_preview.png",
    live: "https://public.tableau.com/app/profile/jgonz/viz/shared/XQG5MP2ZT",
    github: "",
  },
  {
    num: "03",
    category: "Data Science",
    title: "Salary after College",
    description: "I created a fun, interactive tool that showcases the salaries of recent graduates using various datasets. This project allows users to explore and compare salary information based on factors like degree, location, and field of study.",
    stack: [
      { name: "R" },
      { name: "R Shiny" },
      { name: "Data Visualization" },
    ],
    image: "/salary_after_college_preview.png",
    live: "https://2nzrlb-jonathan-gonzalez0martinez.shinyapps.io/Project/",
    github: "https://github.com/JonathanJT109/Salary_Analysis_Project",
  },
  {
    num: "04",
    category: "Low-Level Programming",
    title: "Tokenizer in C++",
    description: "I developed a simple tokenizer in C++, marking the first step toward building a transpiler. This project breaks down input code into manageable tokens, enabling easier parsing and analysis.",
    stack: [
      { name: "C++" },
    ],
    image: "/cpp_tokenizer_preview.png",
    live: "",
    github: "https://github.com/JonathanJT109/uml-class-diagram",
  },
]

const profiles = [
  { icon: <FaGithub />, label: "/jt-gonz", href: "https://github.com/jt-gonz" },
]

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  }

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
      <div className="container mx-auto xl:flex-1 xl:min-h-0 flex flex-col
        justify-between py-6 xl:py-0">
        <div className="flex flex-col xl:flex-row xl:items-center gap-8 xl:gap-12
          xl:flex-1 xl:min-h-0">

          {/* Left — project info */}
          <div className="w-full xl:w-[45%] flex flex-col order-2 xl:order-none">
            {/* Number + category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-accent font-extrabold text-5xl xl:text-6xl leading-none">
                {project.num}
              </span>
              <span className="text-xs xl:text-sm uppercase tracking-[3px] text-white/40 mt-2">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl xl:text-5xl font-bold leading-tight text-white mb-4">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-white/60 text-sm xl:text-base leading-relaxed mb-5
              xl:min-h-[200px]">
              {project.description}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((item, index) => (
                <span
                  key={index}
                  className="text-xs xl:text-sm bg-white/10 text-white/80 px-3 py-1.5 rounded-md"
                >
                  {item.name}
                </span>
              ))}
            </div>

            {/* Separator + links */}
            <div className="border-t border-white/20 mb-5"></div>
            <div className="flex items-center gap-3">
              {project.live !== "" && (
                <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[44px] h-[44px] rounded-full
                        border border-white/20 flex justify-center items-center group
                        hover:border-accent transition-all duration-300">
                        <BsArrowUpRight className="text-white/60 text-lg
                          group-hover:text-accent transition-colors duration-300"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )}
              {project.github !== "" && (
                <Link href={project.github} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[44px] h-[44px] rounded-full
                        border border-white/20 flex justify-center items-center group
                        hover:border-accent transition-all duration-300">
                        <BsGithub className="text-white/60 text-lg
                          group-hover:text-accent transition-colors duration-300"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )}
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
              {projects.map((proj, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[300px] xl:h-[460px] relative rounded-lg overflow-hidden
                      border border-white/10">
                      <div className="absolute inset-0 bg-black/5 z-10"></div>
                      <Image
                        src={proj.image}
                        fill
                        className="object-cover"
                        alt={proj.title}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0
                  bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between
                  xl:w-max xl:justify-none xl:right-4 xl:bottom-4"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[18px]
                  w-[40px] h-[40px] flex justify-center items-center transition-all
                  rounded-full"
              />
            </Swiper>
          </div>
        </div>

        {/* Bottom zone — profiles */}
        <div className="xl:pb-8 mt-8 xl:mt-0 pt-2">
          <div className="border-t border-white/20 mb-5"></div>
          <div className="flex items-center gap-6">
            {profiles.map((profile, index) => (
              <Link
                key={index}
                href={profile.href}
                target="_blank"
                className="flex items-center gap-2 text-white/40 hover:text-accent
                  transition-colors duration-300 text-sm"
              >
                <span className="text-lg">{profile.icon}</span>
                <span>{profile.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work
