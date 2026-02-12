import { FaGithub } from "react-icons/fa";

export const projects = [
    {
        category: "Low-Level Programming",
        title: "Auditory Processing",
        description:
            "The Pure Tone Neural Analysis project is designed to analyze neural responses to auditory stimuli, specifically pure tones. The project processes neural data, computes firing rates, and visualizes the relationship between auditory stimuli and neural activity.",
        stack: [{ name: "Python" }],
        image: "/auditory_processing.png",
        live: "",
        github: "https://github.com/quynhanh16/Auditory_Processing",
    },
    {
        category: "Frontend",
        title: "Portfolio Website",
        description:
            "I developed a portfolio website using Next.js and Tailwind CSS to highlight my skills and share my story. The site serves as a dynamic platform that reflects my personality and showcases my work in an engaging and visually appealing way.",
        stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "UI" }],
        image: "/portfolio_preview.png",
        live: "",
        github: "https://github.com/jt-gonz/portfolio.git",
    },
    {
        category: "Game Development",
        title: "Platformer",
        description:
            "In a world of minimalist geometry, a small, adventurous block named Blocky dreams of exploring the vast, floating landscapes beyond its home. One day, a powerful gust of wind sweeps Blocky away to an unknown region filled with perilous platforms and sharp, menacing spikes...",
        stack: [{ name: "JavaScript" }, { name: "THREE.JS" }],
        image: "/platformer.png",
        live: "https://joyeleke.github.io/Platformer/",
        github: "https://github.com/Joyeleke/Platformer",
    },
    {
        category: "Low-Level Programming",
        title: "EV GrandPrix Simulator",
        description:
            "The team behind this project aims to design, develop, and prototype an platform that emulates the stresses of a gokart racing around a track. This is to be done using only the powertrain for the kart (motor, batteries, controllers, etc) to ensure that the components will endure the race.",
        stack: [{ name: "Python" }, { name: "LISP" }],
        image: "/ev_simulator.jpeg",
        live: "",
        github: "https://github.com/reyessanchezo/evGrandPrix-Simulator",
    },
    {
        category: "Data Science",
        title: "US Household Income",
        description:
            "I visualized U.S. household income data using Tableau, creating an interactive dashboard that presents insights at both the state and national levels. The project features a clear layout, allowing users to easily compare income trends across different states while also understanding the broader national context.",
        stack: [{ name: "Tableau" }, { name: "Data Visualization" }],
        image: "/us_household_income_preview.png",
        live: "https://public.tableau.com/app/profile/jgonz/viz/shared/XQG5MP2ZT",
        github: "",
    },
    {
        category: "Data Science",
        title: "Salary after College",
        description:
            "I created a fun, interactive tool that showcases the salaries of recent graduates using various datasets. This project allows users to explore and compare salary information based on factors like degree, location, and field of study.",
        stack: [
            { name: "R" },
            { name: "R Shiny" },
            { name: "Data Visualization" },
        ],
        image: "/salary_after_college_preview.png",
        live: "https://2nzrlb-jonathan-gonzalez0martinez.shinyapps.io/Project/",
        github: "https://github.com/jt-gonz/Salary_Analysis_Project",
    },
    {
        category: "Low-Level Programming",
        title: "Tokenizer in C++",
        description:
            "I developed a simple tokenizer in C++, marking the first step toward building a transpiler. This project breaks down input code into manageable tokens, enabling easier parsing and analysis.",
        stack: [{ name: "C++" }],
        image: "/cpp_tokenizer_preview.png",
        live: "",
        github: "https://github.com/jt-gonz/uml-class-diagram",
    },
];

export const profiles = [
    {
        icon: FaGithub,
        label: "/jt-gonz",
        href: "https://github.com/jt-gonz",
    },
];
