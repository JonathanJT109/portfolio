"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaEnvelope } from "react-icons/fa";

/** Options shown in the contact form service dropdown */
const serviceOptions = [
    "Web Development",
    "Data Analysis",
    "Tutoring",
    "Other",
];

const ErrorTooltip = ({ message }) => (
    <span className="absolute bottom-full mb-1 left-1 z-10 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-lg pointer-events-none select-none">
        {message}
    </span>
);

const STORAGE_KEY = "contact_form";

function useSessionField(key, initial = "") {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return initial;
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed[key] ?? initial;
            }
        } catch { }
        return initial;
    });

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            const data = saved ? JSON.parse(saved) : {};
            data[key] = value;
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch { }
    }, [key, value]);

    return [value, setValue];
}

const Contact = () => {
    const [firstname, setFirstname] = useSessionField("firstname");
    const [lastname, setLastname] = useSessionField("lastname");
    const [email, setEmail] = useSessionField("email");
    const [service, setService] = useSessionField("service");
    const [message, setMessage] = useSessionField("message");
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!firstname.trim()) newErrors.firstname = "Required";
        if (!lastname.trim()) newErrors.lastname = "Required";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Valid email required";
        }
        if (!service) newErrors.service = "Required";
        if (!message.trim()) newErrors.message = "Required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSending(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from_name: `${firstname.trim()} ${lastname.trim()}`,
                    from_email: email.trim(),
                    service,
                    message: message.trim(),
                }),
            });
            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Sent!",
                    text: "Thank you for reaching out. I'll get back to you as soon as possible.",
                    background: "#1c1c22",
                    color: "white",
                    padding: "2rem",
                    confirmButtonColor: "#DA5353",
                    iconColor: "#DA5353",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setFirstname("");
                        setLastname("");
                        setEmail("");
                        setService("");
                        setMessage("");
                        setErrors({});
                        try { sessionStorage.removeItem(STORAGE_KEY); } catch { }
                    }
                });
            } else {
                throw new Error(data.message);
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Failed to send message. Please try again later.",
                background: "#1c1c22",
                color: "white",
                padding: "2rem",
                confirmButtonColor: "#DA5353",
                iconColor: "#DA5353",
            });
        } finally {
            setSending(false);
        }
    };

    const clearError = (field) => {
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const errorBorder = "border-red-500/80 focus:border-red-500";

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.25, duration: 0.4, ease: "easeIn" },
            }}
            className="xl:h-full flex flex-col py-6 xl:py-0"
        >
            <div className="container mx-auto max-w-[800px]">
                <div className="text-center mb-8">
                    <h3 className="text-4xl font-bold text-accent mb-3">
                        Wanna work together?
                    </h3>
                    <p className="text-white/60 max-w-[540px] mx-auto mb-6">
                        If you&apos;re interested in collaborating, please fill out the form
                        below with your details and project ideas.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-white/80">
                        <FaEnvelope className="text-accent text-lg" />
                        <span>jonathangon.2014@gmail.com</span>
                    </div>
                </div>

                <div className="border-t border-white/10 mb-8" />

                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                            {errors.firstname && <ErrorTooltip message={errors.firstname} />}
                            <Input
                                type="text"
                                placeholder="First Name"
                                name="firstname"
                                value={firstname}
                                className={errors.firstname ? errorBorder : ""}
                                onChange={(e) => {
                                    setFirstname(e.target.value);
                                    clearError("firstname");
                                }}
                            />
                        </div>
                        <div className="relative">
                            {errors.lastname && <ErrorTooltip message={errors.lastname} />}
                            <Input
                                type="text"
                                placeholder="Last Name"
                                name="lastname"
                                value={lastname}
                                className={errors.lastname ? errorBorder : ""}
                                onChange={(e) => {
                                    setLastname(e.target.value);
                                    clearError("lastname");
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                            {errors.email && <ErrorTooltip message={errors.email} />}
                            <Input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                className={errors.email ? errorBorder : ""}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearError("email");
                                }}
                            />
                        </div>
                        <div className="relative">
                            {errors.service && <ErrorTooltip message={errors.service} />}
                            <Select
                                value={service}
                                onValueChange={(val) => {
                                    setService(val);
                                    clearError("service");
                                }}
                            >
                                <SelectTrigger className={`w-full ${errors.service ? errorBorder : ""}`}>
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a service</SelectLabel>
                                        {serviceOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="relative">
                        {errors.message && <ErrorTooltip message={errors.message} />}
                        <Textarea
                            className={`h-[200px] ${errors.message ? errorBorder : ""}`}
                            placeholder="Type your message here."
                            name="message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                clearError("message");
                            }}
                        />
                    </div>
                    <Button
                        size="md"
                        className="w-full md:w-auto md:self-end"
                        type="submit"
                        disabled={sending}
                    >
                        {sending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </motion.section>
    );
};

export default Contact;
