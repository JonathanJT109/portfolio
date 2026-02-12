"use client";

import CountUp from "react-countup";
// TODO: Check for statistics

const stats = [
    {
        num: 4,
        text: "Years of experience",
    },
    {
        num: 4,
        text: "Projects completed",
    },
    // {
    //   num: 4,
    //   text: "Technologies mastered",
    // },
]

const Stats = ({ className = "" }) => {
    return (
        <div className={`flex flex-wrap gap-6 xl:gap-12 justify-center ${className}`}>
            {stats.map((item, index) => {
                return (
                    <div
                        className="flex gap-3 items-center"
                        key={index}>
                        <CountUp
                            end={item.num}
                            duration={5}
                            delay={2}
                            className="text-3xl xl:text-4xl font-extrabold"
                        />
                        <p
                            className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                                } leading-snug text-white/80 text-sm`}
                        >
                            {item.text}
                        </p>
                    </div>
                );
            })}
        </div>
    )
}

export default Stats
