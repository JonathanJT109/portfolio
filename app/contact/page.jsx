"use client";

// TODO: What to do after submitting form?
// TODO: Handle required fields

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(765) 631-3209",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Address",
    description: "jonathangon.2014@gmail.com",
  },
]

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch("/api/form", {
      method: "POST",
      body: formData,
    })
    const data = await response.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Thank you for submitting the form. I'll get back to you as soon as possible.",
        background: "#1c1c22",
        color: "white",
        padding: "2rem",
        confirmButtonColor: "#DA5353",
        iconColor: "#DA5353",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to submit form. Please try again later.",
        background: "#1c1c22",
        color: "white",
        padding: "2rem",
        confirmButtonColor: "#DA5353",
        iconColor: "#DA5353",
      })
    }
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
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              className="flex flex-col gap-4 p-10 bg-[#27272c] rounded-xl"
              onSubmit={handleSubmit}
            >
              <h3 className="text-4xl text-accent">Wanna work together?</h3>
              <p className="text-white/60 mb-2">
                If you're interested in collaborating, please fill out the form linked below with your details and project ideas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="firstname" placeholder="First Name" name="name" required />
                <Input type="lastname" placeholder="Last Name" name="lastname" required />
                <Input type="email" placeholder="Email Address" name="email" required />
                <Input type="phone" placeholder="Phone Number" />
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel value="default">Select a service</SelectLabel>
                    <SelectItem value="web_development">Web Development</SelectItem>
                    <SelectItem value="data_analysis">Data Analysis</SelectItem>
                    <SelectItem value="tutoring">Tutoring</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                className="h-[200px]"
                placeholder="Type your message here."
                name="message"
                required
              />
              <Button size="md" className="mx-auto" type="submit">
                Send Message
              </Button>
            </form>
          </div>
          <div
            className="flex-1 flex items-center xl:justify-end order-1 
            xl:order-none mb-8 xl:mb-0 mx-auto"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w[72px] xl:h-[72px] bg-[#27272c]
                      text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="lg:text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              }
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact
