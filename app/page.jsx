"use client";
import { Button } from "@/components/ui/button"

// Components
import Socials from "@/components/Socials"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"
import { document } from "postcss"
import DownloadBtn from "@/components/DownloadBtn";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between
          xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <h1 className="h1 mb-3">
              Hello I&apos;m<br />
              <span className="text-accent">Jonathan</span>
            </h1>
            <span className="text-xl font-semibold">Computer and Data Scientist</span>
            <p className="max-w-[500px] mt-4 mb-6 xl:mb-12 text-white/80">
              Hi, I’m Jonathan Gonzalez, a Computer Scientist with expertise in Python, Java, and C++, specializing in web development and data analysis. I'm always on the lookout for new technologies to enhance my workflow.
            </p>
            <div className="border border-white/50 my-6"></div>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <DownloadBtn btnStyles="uppercase flex items-center gap-2" />
              <div className="mb-8 xl:mb-0">
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
          <div className="order-1 xl:order-none mb-8 mt-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  )
}

export default Home
