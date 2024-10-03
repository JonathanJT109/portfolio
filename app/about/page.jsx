"use client";

// TODO: Add Acomplisments section
// TODO: Make the tabs a carousel when sm or lg?

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaPython
} from "react-icons/fa"
import { SiR, SiTableau, SiTailwindcss } from "react-icons/si"
import { PiFileSqlDuotone } from "react-icons/pi";
import { GoGraph } from "react-icons/go"
import { RiGraduationCapLine, RiNextjsLine } from "react-icons/ri"
import { MdWorkOutline } from "react-icons/md"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";

const experience = {
  title: "My Experience",
  description: "In my work experience, I've applied my teamwork, communication, and discipline. I've also tackled various challenges in programming and other fields, which has given me practical insights and a well-rounded approach to problem-solving.",
  items: [
    {
      company: "University of Indianapolis",
      position: "Research Assistant",
      duration: "May 2024 - Present",
      description: "Collaborated with a professor to create models that simulate how neurons respond to auditory stimuli. Through thorough investigations into neuronal behavior, I designed and implemented computational solutions, including linear and convolutional neural networks, and regularly engaged in discussions to ensure clarity on project requirements and alignment on research objectives."
    },
    {
      company: "Exploradoor Inc.",
      position: "IT Assistant",
      duration: "2022 - Present",
      description: "As an IT Assistant at Exploradoor, I have enhanced the company's online visibility by strategically leveraging digital advertising platforms. I conducted thorough research on various promotional methods, both traditional and online, to boost our marketing efforts. Additionally, I implemented and managed Google solutions, significantly optimizing collaboration and productivity within the organization.",
    },
    {
      company: "Kirby Risk",
      position: "Production Build",
      duration: "May 2024 - August 2024",
      description: "As a Production Builder at Kirby Risk from May to August 2024, I produced and tested electrical harnesses by assembling and connecting wires and plugs according to detailed manuals, ensuring their functionality before integration into Caterpillar machines. I adapted to dynamic work conditions by rapidly learning and memorizing various harness designs, showcasing my troubleshooting skills and attention to precision.",
    },
    {
      company: "Univesity of Indianapolis",
      position: "Mathematics & Engineering Tutor",
      duration: "November 2022 - December 2023",
      description: "As a Mathematics & Engineering Tutor at the University of Indianapolis, I provided individual and group tutoring sessions across various math courses. I assessed student understanding and adapted my teaching methods to effectively meet their unique needs, fostering a supportive learning environment.",
    },
    {
      company: "Purdue's Institute for National Security",
      position: "Mobile App Research",
      duration: "February 2023 - May 2023",
      description: "During my Mobile App Research role at Purdue’s Institute for National Security from February to May 2023, I designed proposals, a business model, and prototype samples for a network app intended for the Air Force Research Lab Midwest Regional Hub. I actively participated in weekly meetings with the project team to discuss app design features and financial models, contributing to the development of a comprehensive project strategy.",
    },
  ]
}

const education = {
  title: "My Education",
  description: "Throughout my education, I've dedicated countless hours to studying and embrace the philosophy of \"never stop learning.\" I strive to be at the top of my class while also supporting my peers who may be struggling. My passion for learning extends beyond the classroom, particularly in programming, where I enjoy exploring new languages and tackling coding challenges.",
  items: [
    {
      institution: "University of Indianapolis",
      degree: "Bachelor's in Sciences",
      area: "Major in Computer Science and Data Science",
      duration: "Aug 2022 - (Exp) Dec 2025",
    },
    {
      institution: "West Lafayette Jr/Sr High School",
      degree: "High School Diploma with Honors",
      duration: "2019-2022",
    },
  ]
}

const skills = {
  icon: "/",
  title: "My Skills",
  description: "Throughout my academic journey, I’ve picked up some great skills like teamwork, collaboration, and communication. But I didn’t stop there—I’ve spent time outside of school diving into all sorts of interesting topics. This has helped me gain knowledge not just in tech but in other areas too. It’s been a fun way to learn and develop a mix of skills that I can use in school and beyond!",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS 3",
    },
    {
      icon: <FaJs />,
      name: "javaScript",
    },
    {
      icon: <FaReact />,
      name: "reactJs",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <FaNodeJs />,
      name: "nodeJs",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind",
    },
    {
      icon: <FaPython />,
      name: "Python",
    },
    {
      icon: <SiR />,
      name: "R",
    },
    {
      icon: <SiTableau />,
      name: "Tableau",
    },
    {
      icon: <PiFileSqlDuotone />,
      name: "SQL",
    },
    {
      icon: <GoGraph />,
      name: "Data Analysis & Visualization",
    },
    {
      icon: <RiNextjsLine />,
      name: "NextJS",
    },
  ]
}

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.25,
          duration: 0.4,
          ease: "easeIn",
        }
      }}
      className="min-h-[80vh] flex items-center justify-center py-12
      xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex xl:mt-20 xl:flex-col w-full xl:max-w-[380px] mx-auto
            xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <div className="min-h-[75vh] w-full">
            <TabsContent
              value="experience"
              className="w-full"
            >
              <div
                className="flex flex-col gap-[25px] text-center xl:text-left"
              >
                <div className="flex mx-auto items-center gap-5">
                  <MdWorkOutline className="text-3xl" />
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                </div>
                <p
                  className="text-white/60 mx-7"
                >
                  {experience.description}
                </p>
                <div className="border border-white/50 my-0"></div>
                <span></span>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] py-6
                          px-10 rounded-xl flex flex-col justify-center
                          items-center lg:items-start gap-1"
                        >
                          <h3
                            className="text-2xl max-w-[260px] mb-1
                            text-center mx-auto"
                          >
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3 mx-auto">
                            <span className="w-[6px] h-[6px] rounded-full
                              bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                          <p className="text-white/60 mx-[8%] text-left mt-3 mb-5">
                            {item.description}
                          </p>
                          <span className="text-accent text-sm mx-auto font-semibold uppercase">{item.duration}</span>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent
              value="education"
              className="w-full"
            >
              <div
                className="flex flex-col gap-[30px] text-center xl:text-left"
              >
                <div className="flex mx-auto items-center gap-5">
                  <RiGraduationCapLine className="text-3xl" />
                  <h3 className="text-4xl font-bold">{education.title}</h3>
                </div>
                <p
                  className="text-white/60 mx-7"
                >
                  {education.description}
                </p>
                <div className="border border-white/50 my-0"></div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] py-8
                          px-10 rounded-xl flex flex-col justify-center
                          items-center lg:items-start gap-1"
                        >
                          <h3
                            className="text-xl max-w-[260px] mb-2
                            text-center lg:text-left"
                          >
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full
                              bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                          <p className="text-white/90 italic">{item.area}</p>
                          <span className="text-accent font-semibold uppercase">{item.duration}</span>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent
              value="skills"
              className="w-full h-full"
            >
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <div className="flex mx-auto items-center gap-5">
                    <FiTool className="text-3xl" />
                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                  </div>
                  <p
                    className="text-white/60 mx-7"
                  >
                    {skills.description}
                  </p>
                  <div className="border border-white/50 my-0"></div>
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grids-cols-4
                    gap-4 xl:gap-[30px]">
                      {skills.skillList.map((skill, index) => {
                        return (
                          <li key={index}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger
                                  className="w-full h-[150px] bg-[#232329]
                                rounded-xl flex justify-center items-center
                                group"
                                >
                                  <div
                                    className="text-6xl group-hover:text-accent
                                  transition-all duration-300"
                                  >
                                    {skill.icon}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-accent px-2 rounded-lg">
                                  <p className="capitalize">{skill.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume
