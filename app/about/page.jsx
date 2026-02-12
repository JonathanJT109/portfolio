"use client";

// TODO: Add Acomplisments section
// TODO: Make the tabs a carousel when sm or lg?

import { useState, useEffect, useCallback } from "react";
import { RiGraduationCapLine } from "react-icons/ri"
import { MdWorkOutline } from "react-icons/md"
import { HiChevronDown } from "react-icons/hi"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

function useScrollCue() {
  const [node, setNode] = useState(null);
  const [showCue, setShowCue] = useState(false);

  // Callback ref — fires whenever the DOM element mounts/unmounts
  const ref = useCallback((el) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const viewport = node.querySelector("[data-radix-scroll-area-viewport]");
    if (!viewport) return;

    const check = () => {
      // Radix may scroll on the viewport or its first child — pick whichever overflows
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

    // Initial check + deferred re-check for post-mount layout
    check();
    const timer = requestAnimationFrame(check);

    return () => {
      viewport.removeEventListener("scroll", check);
      ro.disconnect();
      cancelAnimationFrame(timer);
    };
  }, [node]);

  return { ref, showCue };
}

const experience = {
  title: "My Experience",
  description: "In my work experience, I've applied my teamwork, communication, and discipline. I've also tackled various challenges in programming and other fields, which has given me practical insights and a well-rounded approach to problem-solving.",
  items: [
    {
      company: "University of Indianapolis",
      position: "Student Researcher",
      duration: "May 2024 - Dec 2025",
      skills: ["Python", "Data Analysis", "Deep Learning", "Statistics"],
      bullets: [
        "Developed and evaluated machine learning models, including linear models and CNNs, to simulate neuronal responses to auditory stimuli",
        "Achieved a model performance of R\u00B2 = 0.57, demonstrating statistically meaningful predictive capability on experimental data",
        "Performed data cleaning, preprocessing, and feature engineering on time-series sensory datasets",
      ],
    },
    {
      company: "University of Indianapolis",
      position: "Mathematics & Engineering Tutor",
      duration: "Nov 2022 - Dec 2025",
      skills: ["Python", "C++", "R", "SQL"],
      bullets: [
        "Providing individual and group tutoring sessions to students in a variety of math courses",
        "Assisted students with C++, Python, and problem-solving techniques",
        "Assessing student understanding and adapting teaching methods to meet individual student needs",
      ],
    },
    {
      company: "Roche",
      position: "Roche Academy Intern",
      duration: "May 2025 - Aug 2025",
      skills: ["Python", "AWS", "Deep Learning", "SQL", "Git"],
      bullets: [
        "Designed and implemented an AI-driven system to support engineers with instrument troubleshooting using structured and unstructured data",
        "Redesigned the help-article creation workflow, increasing productivity by 125x compared to previous systems",
        "Implemented an AI agent architecture integrating an LLM, task-specific tools, and decision logic to automate information retrieval",
      ],
    },
    {
      company: "Exploradoor Inc.",
      position: "IT Assistant",
      duration: "May 2022 - Oct 2024",
      skills: ["HTML", "CSS", "JavaScript", "Figma", "Google Solutions"],
      bullets: [
        "Supported data-driven digital tools and internal software systems",
        "Followed structured processes for system configuration, troubleshooting, and documentation",
        "Improved operational efficiency through reliable technical support and clear communication",
      ],
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
      area: "Computer & Data Science Major",
      duration: "Aug 2022 - Dec 2025",
      accomplishments: [
        "Dean's List recognition for multiple semesters",
        "Conducted undergraduate research on auditory neuron modeling",
        "Served as Mathematics & Engineering tutor for peers",
      ],
    },
    {
      institution: "West Lafayette Jr/Sr High School",
      degree: "High School Diploma",
      duration: "Sep 2019 - May 2022",
      accomplishments: [
        "Graduated with Honors distinction",
        "Participated in STEM-focused extracurricular activities",
        "Developed foundational programming skills",
      ],
    },
  ]
}

const Resume = () => {
  const expScroll = useScrollCue();
  const eduScroll = useScrollCue();

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
          className="flex flex-col gap-8"
        >
          <TabsList className="flex flex-row justify-center gap-4 sm:gap-6 mx-auto w-auto">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <div className="w-full">
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
                <div className="relative" ref={expScroll.ref}>
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] pb-12">
                      {experience.items.map((item, index) => {
                        return (
                           <li
                            key={index}
                            className="bg-[#232329] py-8
                            px-10 rounded-xl flex flex-col justify-start
                            items-start gap-1"
                          >
                            <h3
                              className="text-2xl w-full mb-1"
                            >
                              {item.position}
                            </h3>
                            <p className="text-white/80 text-base font-bold">{item.company}</p>
                            <span className="text-accent text-sm font-semibold uppercase">{item.duration}</span>
                            <ul className="mt-3 flex flex-col gap-2 text-left w-full">
                              {item.bullets.map((bullet, bIndex) => (
                                <li key={bIndex} className="flex items-start gap-2">
                                  <span className="w-[6px] h-[6px] rounded-full bg-accent mt-2 shrink-0"></span>
                                  <p className="text-white/60 text-sm">{bullet}</p>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.skills.map((skill, sIndex) => (
                                <span key={sIndex} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-md">{skill}</span>
                              ))}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                  <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none flex items-end justify-center pb-1 transition-opacity duration-300 ${expScroll.showCue ? "opacity-100" : "opacity-0"}`}>
                    <HiChevronDown className="text-white/40 text-xl animate-bounce" />
                  </div>
                </div>
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
                <div className="relative" ref={eduScroll.ref}>
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] pb-12">
                      {education.items.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="bg-[#232329] py-8
                            px-10 rounded-xl flex flex-col justify-start
                            items-start gap-1"
                          >
                            <h3
                              className="text-xl w-full mb-2
                              text-center lg:text-left"
                            >
                              {item.degree}
                            </h3>
                            <p className="text-white/80 text-base font-bold">{item.institution}</p>
                            {item.area && (
                              <p className="text-white/90 italic">{item.area}</p>
                            )}
                            <span className="text-accent font-semibold uppercase">{item.duration}</span>
                            {item.accomplishments && item.accomplishments.length > 0 && (
                              <ul className="mt-3 flex flex-col gap-2 text-left w-full">
                                {item.accomplishments.map((acc, accIndex) => (
                                  <li key={accIndex} className="flex items-start gap-2">
                                    <span className="w-[6px] h-[6px] rounded-full bg-accent mt-2 shrink-0"></span>
                                    <p className="text-white/60 text-sm">{acc}</p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                  <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none flex items-end justify-center pb-1 transition-opacity duration-300 ${eduScroll.showCue ? "opacity-100" : "opacity-0"}`}>
                    <HiChevronDown className="text-white/40 text-xl animate-bounce" />
                  </div>
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
