// LandingPage.js
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import Button from './button';

function LandingPage() {
  useEffect(() => {
    const options = {
      strings: [
        'Full Stack Developer',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    };

    const typed = new Typed('.typed-text', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-screen mt-20 flex flex-col items-center justify-center p-8 px-16">
      <div className="flex flex-col lg:flex-row items-center w-full space-y-12 lg:space-y-0 lg:space-x-16">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Sumit Tiwari
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            <span className="typed-text"></span>
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Crafting scalable, intelligent web applications with passion and precision.
          </p>

          <div className='w-full flex justify-center items-center lg:justify-start'>
            <Button>
              <a href="#contact">
                Get in touch
              </a>
            </Button>
          </div>

        </div>

        {/* Right Section */}
        <div className="relative lg:w-1/2 flex justify-center">
          <div className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-full overflow-hidden shadow-xl">
            {/* Placeholder for your profile picture */}
            <img
              src="\profile.jpg"
              alt="Profile"
              className="object-cover w-full "
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
