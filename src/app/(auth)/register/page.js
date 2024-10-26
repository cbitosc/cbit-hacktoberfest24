"use client"

import React from "react";
import TypingEffect2 from "@/app/TypingEffect2";
import { Instagram, Linkedin } from "lucide-react";
import "../styles/registration.css"

const page = () => {
  return (
    <div className="background-gradient flex flex-col items-center justify-center min-h-screen bg-darkgrey px-2">
      <div className="w-full max-w-md p-8 space-y-8 glassomorphism rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold lg:text-3xl text-green">
          <TypingEffect2
            text="Uh Oh, you're late..."
            speed={50}
          />
        </h2>
        
        <div className="text-xl text-white">
          <TypingEffect2 text="Registrations are closed" speed={50} />
        </div>

        <p className="text-md text-pink">
          We're sorry, but registrations for CBIT Hacktoberfest Hackathon 2024 are now closed. 

        </p>
        
        <div className="space-y-4">
          <p className="text-white text-sm">Stay updated with our latest announcements:</p>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com/cbit_hackathon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-deeppink hover:text-pink transition-all"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={28} />
            </a>
            
            <a 
              href="https://linkedin.com/company/cbit-hackathon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:text-blue-400 transition-all"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin size={28} />
            </a>
          </div>
          
          <button 
            className="w-full px-4 py-2 text-white bg-green rounded-md hover:bg-pink transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;