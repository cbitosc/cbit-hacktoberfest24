"use client";

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import StackedText from './StackedText';
import "./styles/about.css";

const About = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const boxVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const BoxContent = ({ title, content }) => (
        <motion.div
            className="bg-darkgreen bg-opacity-80 rounded-lg p-6 custom-shadow custom-pink-shadow shadow-lg w-full lg:w-1/3 flex flex-col"
            variants={boxVariants}
        >
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>
            <p className="flex-grow">{content}</p>
        </motion.div>
    );

    return (
        <section className="about flex flex-col items-center justify-center p-4 w-full">
            <div className="about-content flex flex-col items-center text-center text-white w-full max-w-6xl">
                <h1 className="my-10 text-4xl w-full text-center flex items-center justify-center">
                    <StackedText text="About" fontSize="80px" />
                </h1>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="lg:mb-14 flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0 items-stretch w-full mt-8"
                >
                    <BoxContent
                        title="What is Hacktoberfest?"
                        content="Hacktoberfest, is a month-long global celebration of all things open source, presented by DigitalOcean, Cloudflare, and Quira. Hacktoberfest celebrates giving back to these projects, honing skills, and recognizing the people who make open source exceptional."
                    />
                    <BoxContent
                        title="Why We're Thrilled?"
                        content="The CBIT Hacktoberfest '24 is a thrilling 24-hour hackathon that inspires students and enthusiasts through community, collaboration and skill-building. Participants will embrace the spirit of open source while diving into innovation and teamwork."
                    />
                    <BoxContent
                        title="Who Are We?"
                        content="We are the Chaitanya Bharathi Institute of Technology Open Source Community (COSC) in Hyderabad. Our mission is to promote open source values, provide a platform for students to explore and contribute to tech, that crafts experiences that nurture a lifelong love for open source."
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default About;