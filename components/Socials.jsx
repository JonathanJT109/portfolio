import Link from "next/link";

import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa"

const socials = [
  { icon: <FaGithub />, path: "https://github.com/JonathanJT109" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/jtgonz/" },
  { icon: <FaYoutube />, path: "https://www.youtube.com/@JonathanJT109" },
  // { icon: <FaTwitter />, path: "" },
]

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return <Link key={index} href={item.path} target="_blank" className={iconStyles}>
          {item.icon}
        </Link>
      })}
    </div>
  )
}

export default Socials
