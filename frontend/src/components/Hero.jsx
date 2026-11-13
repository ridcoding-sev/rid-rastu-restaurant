import React, { useState, useEffect } from "react";
import { assets } from "../assets/asset";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [assets.Home1, assets.Home2, assets.Home3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>

      {/* Top Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
        Online Catering Available Across East Coast - Order Now →
      </div>

      {/* HERO WRAPPER */}
      <div className=" mx-auto h-[400px] md:h-[500px] lg:h-[560px] relative overflow-hidden">

        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide}
              alt={`Hero Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-white text-[20px] md:text-[30px] lg:text-[50px] font-light tracking-wide">
            WHERE TASTE MEETS
          </h1>

          <p className="text-red-500 text-[25px] md:text-[50px] lg:text-[70px] font-serif italic mt-2">
            elegance
          </p>

          <button
            onClick={() => (window.location.href = "/menu")}
            className="mt-8 bg-red-600 hover:bg-red-700 active:scale-95 transition-all duration-300 text-white px-8 py-3 rounded-full font-semibold tracking-widest"
          >
            EXPLORE NOW
          </button>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-600 scale-125"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>


        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl"
        >
          ❯
        </button>

      </div>
    </div>
  );
};

export default Hero;