"use client"

import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import "./styles/mentors.css";
import TypingEffect from '@/app/preptember/TypingEffect';
import StackedText from './StackedText';

const mentors = [
  {
    name: "Sai Kiran",
    position: "President",
    linkedinProfile: "https://www.linkedin.com/in/matta-sai-kiran-goud-06858626b/",
    githubProfile: "https://github.com/SaiKiranMatta",
    id: `sai-kiran`
  },
  {
    name: "Akil Krishna",
    position: "Vice President",
    linkedinProfile: "https://www.linkedin.com/in/akil-krishna-76744625b/",
    githubProfile: "https://github.com/akil-krsna",
    id: "akil"
  },
  {
    name: "G Harshith",
    position: "General Secretary",
    linkedinProfile: "https://www.linkedin.com/in/gharshith209/",
    githubProfile: "https://github.com/Harsh-hit",
    id: "harshith"
  },
  {
    name: "Nithin Konda",
    position: "General Secretary",
    linkedinProfile: "https://www.linkedin.com/in/nithin-konda-4093081bb/",
    githubProfile: "https://github.com/NithinKonda",
    id: "nithin"
  },
  {
    name: "G Ritesh",
    position: "General Secretary",
    linkedinProfile: "https://www.linkedin.com/in/ritesh-garlapati-003a8126a/",
    githubProfile: "https://github.com/Riteshgarlapati",
    id: "ritesh"
  },
  {
    name: "Sameekruth Talari",
    position: "Joint Secretary",
    linkedinProfile: "https://www.linkedin.com/in/sameekruth-talari/",
    githubProfile: "https://github.com/sameekruth27",
    id: "sameekruth"
  },
  {
    name: "Mahathi Arya",
    position: "Joint Secretary",
    linkedinProfile: "https://www.linkedin.com/in/arya-mahathi-062a2926a/",
    githubProfile: "https://github.com/Mahathi-Arya",
    id: "mahathi"
  },
  {
    name: "Sri Guru Datta",
    position: "Joint Secretary",
    linkedinProfile: "https://www.linkedin.com/in/sri-guru-datta-p/",
    githubProfile: "https://github.com/pupperemeritus",
    id: "guru"
  },
  {
    name: "Adhit Simhadri",
    position: "Joint Secretary",
    linkedinProfile: "https://www.linkedin.com/in/adhitsimhadri/",
    githubProfile: "https://github.com/adhit-420",
    id: "adhit"
  },
  {
    name: "Kousik Reddy",
    position: "Head of External Affairs",
    linkedinProfile: "https://www.linkedin.com/in/kousik-reddy-921028252/",
    githubProfile: "https://github.com/Kousik1Reddy",
    id: "koushik"
  }
];

const MentorCard = ({ mentor, index }) => {
  return (
    <div
      id={mentor.id}
      className={`card ${index % 2 === 0 ? 'card-up' : 'card-down'}`}
    >
      <div className="card-content">
        <div className="description">
          <h4><span className='text-deeppink'>&gt;</span> <TypingEffect text={mentor.name}/></h4>
          <p>{mentor.position}</p>
          <div className="social-links">
            <a href={mentor.linkedinProfile} target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href={mentor.githubProfile} target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mentors = () => {
  return (
    <div className="wrapper bg-darkgrey">
      <div className="container px-5">
        <h1 className='my-9 text-4xl w-full text-center flex items-center justify-center'>
          <StackedText text="Mentors" fontSize='80px' />
        </h1>
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="row">
            {mentors.slice(rowIndex * 5, (rowIndex + 1) * 5).map((mentor, index) => (
              <MentorCard key={mentor.id} mentor={mentor} index={index + rowIndex * 5} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
