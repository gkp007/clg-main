import React, { useEffect } from "react";
import { counseling } from "../assets";

const points = [
  "Applicant must be a resident of Odisha.",
  "Family income should be below ₹2.5 Lakhs annually.",
  "Must have passed the OJEE exam for current year.",
];

const EligibilitySection = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-up").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <div>
           <h2 className="text-2xl text-center md:text-4xl font-extrabold  text-orange mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        Personalized <span className="text-black ">College Counseling </span>
      </h2>
      <p className="text-gray-500 text-center mt-10 mb-0">
        Our mission: offering scholarship for a diverse range of courses.
            </p>
            
    <section className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">

          
          

      {/* Left: Text + Points */}
      <div className="w-full md:w-1/2 z-10">
        <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-green-300 animate-pulse">
          Eligibility
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 fade-up opacity-0 translate-y-6 transition-all duration-700">
          Check If You Qualify
        </h2>

        <ul className="space-y-4">
          {points.map((point, index) => (
            <li
              key={index}
              className="fade-up opacity-0 translate-y-6 transition-all duration-700 delay-150 bg-white border border-purple-200 rounded-xl px-5 py-4 flex items-start gap-3 shadow-md hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 group"
            >
              <span className="text-green-500 text-xl mt-1 group-hover:animate-pulse">✔️</span>
              <p className="text-gray-700 font-medium">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Illustration */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 z-10 fade-up opacity-0 translate-y-6 transition-all duration-700 delay-300">
        <img src={counseling} alt="Eligibility illustration" className="w-full max-w-lg mx-auto drop-shadow-lg" />
      </div>
            </section>
            </div>
  );
};

export default EligibilitySection;
