import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/asset";
const AboutSection = () => {
  const imageRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <div
              ref={imageRef}
              className={`transition-all duration-1000 ease-out transform ${
                show ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
              }`}
            >
              <img
                src={assets.About1}
                alt="About Restaurant"
                className="w-full rounded-xl shadow-lg active:scale-95 transition-transform duration-200 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-3">
              About Our Restaurant
            </h2>

            <h5 className="text-lg md:text-xl font-medium text-gray-600 mb-5">
              Experience The Best Taste & Quality
            </h5>

            <p className="text-gray-700 text-base leading-relaxed">
              Welcome to our restaurant where passion meets flavor. We believe
              that food is not just about taste, but about creating
              unforgettable experiences. Our chefs carefully select the freshest
              ingredients to prepare delicious meals that satisfy your cravings
              and warm your heart. From traditional recipes to modern culinary
              creations, every dish is crafted with love and dedication. Our
              cozy environment and friendly service make every visit special.
              Whether you are here for a family dinner, a romantic evening, or a
              celebration with friends, we promise a memorable dining experience
              filled with quality, comfort, and authentic flavors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
