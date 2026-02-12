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

import { FaEnvelope } from "react-icons/fa";

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
      className="xl:h-full flex flex-col py-6 xl:py-0"
    >
      <div className="container mx-auto max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-accent mb-3">Wanna work together?</h3>
          <p className="text-white/60 max-w-[540px] mx-auto mb-6">
            If you&apos;re interested in collaborating, please fill out the form below with your details and project ideas.
          </p>
          <div className="flex items-center justify-center gap-3 text-white/80">
            <FaEnvelope className="text-accent text-lg" />
            <span>jonathangon.2014@gmail.com</span>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Form */}
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input type="firstname" placeholder="First Name" name="name" required />
            <Input type="lastname" placeholder="Last Name" name="lastname" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input type="email" placeholder="Email Address" name="email" required />
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
          </div>
          <Textarea
            className="h-[200px]"
            placeholder="Type your message here."
            name="message"
            required
          />
          <Button size="md" className="w-full md:w-auto md:self-end" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </motion.section>
  );
}

export default Contact
