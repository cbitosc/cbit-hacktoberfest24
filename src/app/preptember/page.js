"use client"
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './preptember.css'
import bgtop from './assets/bg-hero-top.svg'
import Image from 'next/image';
import { FaCircleArrowUp } from "react-icons/fa6";
import TypingEffect from './TypingEffect';
import { collection, getDocs } from '../firebase'
import { db } from '../firebase';
import Link from 'next/link';
import StackedText from '@/components/StackedText';


gsap.registerPlugin(ScrollTrigger);

const ScrollingHeroSection = () => {
  const sectionRef = useRef(null);
  const wordsRef = useRef(null);
  const arrowRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        const videoList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);
  

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current.children;
    const arrow = arrowRef.current;

    gsap.set(words, { x: (i) => (i - 2) * 120 + '%' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    tl.to(words, {
      x: (i) => (i - 5) * 120 + '%',
      ease: 'none',
    });

    gsap.to(arrow, {
      rotation: -180,
      transformOrigin: "center center", 
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div id="cursor">
        <div className="cursor-circle"></div>
      </div>
      <section 
        ref={sectionRef} 
        className="preptember-hero w-full overflow-hidden bg-darkgreen text-beige flex flex-col justify-between"
      >
        <Image src={bgtop} alt="Background Top" />
        
        <div className="min-w-full pt-32 lg:pt-16 flex flex-col items-center justify-center">
  <div
    ref={wordsRef}
    className="relative w-full text-[4rem] sm:text-[8rem] md:text-[9rem] lg:text-[16rem] font-bold"
    style={{ height: '0.8em' }}
  >
    {[...Array(8)].map((_, index) => (
      <div key={index} className="absolute whitespace-nowrap px-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Preptember
      </div>
    ))}
  </div>

  <div className="hidden lg:flex flex-col items-end mb-24 preptember-hero-desc">
    <p className=" p-7 lg:max-w-[550px] lg:ml-[30%] text-xl">
      <span className="text-green">Preptember</span> is the ultimate prep series designed to get you ready for <span className="text-green">Hacktoberfest 2024</span>. Whether you are a hackathon veteren or a first time participant, we will introduce you to the basic technologies you'll need, so you're fully prepared to participate!
    </p>
    <div ref={arrowRef} className='ml-[60%]  inline-block'>
  <FaCircleArrowUp className=' lg:block size-20 text-green' />
</div>
  </div>

  
</div>

<div className="w-full">
  <svg className="" width="100%" height="auto" viewBox="0 0 2822 332" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M581 0H498V82H581V164V246H498V164H415H332V82H249V0H166V82H249V164H166H83V82H0V164H83V246H0V328V410H2822V328V246V164H2739V82H2656V164H2573V82H2490H2407V164H2324V82V0H2241V82H2158V0H2075V82H1992V0H1909V82H1992V164V246H1909V164H1826H1743V82H1660V0H1577V82H1660V164H1577H1494V82H1411V164H1328V82H1245V164H1162V82H1079H996V164H913V82V0H830V82H747V0H664V82H581V0ZM747 164H830H913V246H830V328H664V246H747V164ZM996 246H1079H1162V164H1079H996V246ZM996 246H913V328H996V246ZM747 164V82H664V164H747ZM1245 164V246V328H1328V246V164H1245ZM1411 164H1494V246H1411V164ZM1660 246V164H1743V246H1660ZM1660 246V328H1577V246H1660ZM1909 246H1826V328H1909V246ZM2158 164H2241H2324V246H2241V328H2075V246H2158V164ZM2407 246H2490H2573V164H2490H2407V246ZM2407 246H2324V328H2407V246ZM2158 164V82H2075V164H2158ZM2656 164V246V328H2739V246V164H2656ZM249 246V164H332V246H249ZM249 246V328H166V246H249ZM498 246H415V328H498V246Z" fill="#50DA4C"/>
  </svg>
</div>

      </section>

      <section className="videos min-w-full bg-green py-8 pt-28">
    <div className="container mx-auto lg:px-24">
      <h1 className="my-10 text-4xl w-full text-center flex items-center justify-center">
        <StackedText text="Videos" fontSize="80px" />
      </h1>

      {isLoading ? (
  <div className=' h-screen flex flex-col items-center justify-center'>
  <span class="loader"></span>
</div>
) : videos.length === 0 ? (
  <div className="text-center text-5xl my-40 text-darkgreen font-bold">
    Coming Soon...
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-0">
  {videos.map((video) => (
    <Link href={`/preptember/videos/${video.id}`} key={video.id}>
      <div className="styled-clipped-card cursor-pointer">
        <div className="card-contentt relative">
          
          <div className="relative">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={300}
              height={200}
              layout="responsive"
              className="thumbnail-image"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-darkgreen bg-opacity-50"></div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 22v-20l18 10-18 10z" />
              </svg>
            </div>
          </div>

          <h1 className="text-9xl text-background">
            <span className="text-deeppink">&gt;</span> {video.title}
          </h1>
        </div>
      </div>
    </Link>
  ))}
</div>
)}

    </div>
  </section>


<section className='links min-h-screen bg-darkgrey'>
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-5 lg:mx-0 lg:mt-24">
      <div>
        <h3 className='text-beige text-6xl  mb-12 mt-12  max-w-fit mt-20 lg:mt-0'>
          <span className='text-deeppink'>&gt;</span>
          <TypingEffect text="Resources for Beginners" speed={100}/>
        </h3>
      </div>
      <div className="underline text-green mb-20">
        <ul className="list-disc list-inside text-xl lg:text-3xl">
          <li><a href="https://hacktoberfest.com/" target="_blank" className=" hover:no-underline">Hacktoberfest Official Website</a></li>
          <li><a href="https://github.com/cbitosc" target="_blank" className="hover:no-underline">COSC GitHub</a></li>
          <li><a href="https://cbitosc.substack.com/" target="_blank" className="hover:no-underline">COSC Newsletter</a></li>
          <li><a href="https://github.com/" target="_blank" className="hover:no-underline">GitHub: Getting Started Guide</a></li>
          <li><a href="https://dev.to/" target="_blank" className="hover:no-underline">DEV Community: Hackathon Tips</a></li> 
          <li><a href="https://gitlab.com/" target="_blank" className=" hover:no-underline">Pro Git Book</a></li>
          <li><a href="https://git-scm.com/book/en/v2" target="_blank" className=" hover:no-underline">GitLabs</a></li>
          <li><a href="https://www.codecademy.com/learn/learn-git" target="_blank" className="hover:no-underline">Codecademy: Learn Git</a></li>
          <li><a href="https://www.digitalocean.com/community/tutorial_series/git-and-github-essentials" target="_blank" className=" hover:no-underline">DigitalOcean: Git and GitHub Essentials</a></li>
          <li><a href="https://www.hackerearth.com/practice/" target="_blank" className=" hover:underline">HackerEarth: Practice Coding Challenges</a></li>
          <li><a href="https://guides.github.com/activities/hello-world/" target="_blank" className=" hover:no-underline">GitHub: Hello World Guide</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default ScrollingHeroSection;



