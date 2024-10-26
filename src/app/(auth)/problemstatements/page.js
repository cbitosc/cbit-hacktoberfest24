"use client";

import React from "react";
import TypingEffect2 from "@/app/TypingEffect2";
import "../styles/registration.css"

const Prob = () => {
  return (
    <div className="background-gradient flex flex-col items-center min-h-screen bg-darkgrey px-4 py-24">
      <div className="w-full max-w-4xl space-y-8 rounded-lg shadow">
        <h2 className="text-xl font-bold lg:text-3xl text-green">
          <TypingEffect2 text="Problem Statements" speed={50} />
        </h2>
        
        <div className="glassomorphism rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink text-center">
              Problem Statement Selection is Now Closed
            </h1>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prob;