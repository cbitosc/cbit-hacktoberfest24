"use client";

import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import "./styles/timer.css";
import StackedText from "./StackedText";

const Timer = () => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleViewProblemStatements = () => {
    router.push("/problemstatements");
  };

  return (
    <div suppressHydrationWarning>
      <section
        ref={ref}
        className="py-24 bg-repeaat w-full flex flex-col justify-between items-center"
      >
        <h1 className="text-4xl w-full text-center flex flex-col items-center justify-center">
          <StackedText text="Released!" fontSize="75px" />
          <span className="text-beige mt-7">
            Problem Statements Are Now Available
          </span>
        </h1>
        <div className="flex-col w-full justify-between items-center lg:flex-row">
          <aside className="w-full text-center flex items-center justify-center">
            <motion.div
              className="flex flex-col items-center justify-center mt-10"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.button
                variants={itemVariants}
                onClick={handleViewProblemStatements}
                className="bg-green text-black text-xl py-4 px-8 rounded-xl shadow-lg hover:bg-darkgreen hover:text-white transition-colors duration-300 font-semibold flex items-center gap-2"
              >
                View Problem Statements
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </motion.button>
            </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Timer;