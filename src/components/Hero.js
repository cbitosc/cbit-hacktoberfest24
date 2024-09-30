import React from 'react';
import './styles/Hero.css';

const Hero = () => {
  return (
    <section className='hero flex flex-col items-center justify-center gap-8'>
      <div className='hero-content flex'>
        <img src="/assets/logo1.png" alt="Logo" className="hero-logo" />
        <div className='flex flex-col gap-3'>
          <h1 className='px-2 text-3xl text-lightgreen font-sm '>
            PRESENTS
          </h1>
          <p className="text-9xl font-bold glowing-heading">
            Hacktoberfest 2024!
          </p>
          <p className="text-3xl text-lightgreen font-sm glowing-paragraph">
            A month-long celebration of all things open-source
          </p>
        </div>
      </div>
      <div className='event-info flex gap-10'>
        <p className='text-3xl text-lightgreen font-semibold glowing-heading-2'></p>
        <button>REGISTER NOW</button>
      </div>
    </section>
  );
}

export default Hero;


