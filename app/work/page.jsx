"use client";

// TODO: Fix preview photos
// TODO: What to do with the arrows? Make the swiper a loop?

import { motion } from "framer-motion"
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"

import { BsArrowUpRight, BsGithub } from "react-icons/bs"

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
    description: "I created a fun, interactive tool that showcases the salaries of recent graduates using various datasets. This project allows users to explore and compare salary information based on factors like degree, location, and field of study. The engaging interface makes it easy to understand the earning potential for new graduates, providing valuable insights for students and educators alike.",
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
      className="min-h-[80vh] flex flex-col justify-center py-12
      xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div
            className="w-full xl:w-[50%] flex flex-col
            xl:justify-between order-2 xl:order-none"
          >
            <div className="flex flex-col gap-[20px]">
              <div
                className="text-8xl leading-none font-extrabold text-transparent
                text-outline">
                {project.num}
              </div>
              <h2
                className="text-[42px] font-bold leading-none text-white
                  hover:text-accent transition-all duration-500 capitalize"
              >
                {project.title}
              </h2>
              <span className="text-accent text-sm">{project.category} Project</span>
              <p className="text-white/60 xl:min-h-[170px]">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ", "}
                    </li>
                  )
                })}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                {project.live !== "" && <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full
                        bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl 
                          group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                }

                {project.github !== "" && <Link href={project.github} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full
                        bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl 
                          group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                }

              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              speed={500}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center
                      items-center bg-pink-50/20">
                      <div className="absolute top-0 bottom-0 w-full h-full
                        bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 
                bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between
                xl:w-max xl:justify-none" btnStyles="bg-accent hover:bg-accent-hover
                text-primary text-[22px] w-[44px] h-[44px] flex justify-center
                items-center transition-all xl:rounded-lg"/>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work
