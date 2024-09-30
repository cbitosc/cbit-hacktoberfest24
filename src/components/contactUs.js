"use client"
import React from "react";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import StackedText from "./StackedText";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import cn from "@/utils/cn";

const ContactUs = () => {
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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const ContactItem = ({ title, children }) => (
    <motion.div 
      className="bg-darkgreen  rounded-lg p-6 custom-shadow shadow-lg w-full lg:w-1/3 min-h-[150px] h-full"
      variants={itemVariants}
    >
      <h2 className="text-3xl font-semibold">{title}</h2>
      {children}
    </motion.div>
  );

  return (
    <section className="about contact-bg flex flex-col items-center justify-center p-4">
      <div className="about-content flex flex-col items-center text-center text-white w-full">
        <h1 className="my-10 text-4xl w-full text-center flex items-center justify-center">
          <StackedText text="Contact" fontSize="80px" />
        </h1>
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="lg:mb-14 flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0 items-center w-full mt-8"
        >
          <ContactItem title="Location">
            <p className="mt-2">
              Chaitanya Bharathi Institute of Technology, Gandipet, Hyderabad
            </p>
          </ContactItem>
          <ContactItem title="Email">
            <a className="text-green hover:text-pink underline" href='mailto:cosc@cbit.ac.in'>
              <p className="mt-2">cosc@cbit.ac.in</p>
            </a>
          </ContactItem>
          <ContactItem title="Phone">
            <p className="mt-2">
              <a className="text-green hover:text-pink underline" href="tel:+916281657674">Meghana: +91 6281657674</a>
            </p>
            <p className="mt-2">
              <a className="text-green hover:text-pink underline" href="tel:+917416939873">Srilekha: +91 7416939873</a>
            </p>
          </ContactItem>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;