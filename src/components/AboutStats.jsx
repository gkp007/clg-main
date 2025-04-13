import { useEffect } from "react";

const AboutStats = () => {
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
    <section className="bg-gradient-to-br from-[#fefefe] via-[#f9f9f9] to-[#f2f2f2] py-14 px-6 md:px-20 text-center overflow-hidden">
      {/* Glowing Badge */}
      <div className="inline-block bg-[#0ABAB5] text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-[#0ABAB580] animate-pulse">
        About Us
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 fade-up opacity-0 translate-y-6 transition-all duration-700">
        We are <span className="font-bold text-black bg-gradient-to-r from-[#0ABAB5] to-[#4AB19D] bg-clip-text text-transparent">passionate about empowering learners</span> worldwide with high-quality, accessible & engaging education.
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto fade-up opacity-0 translate-y-6 transition-all duration-700 delay-150">
        Our mission: offering a diverse range of courses tailored to spark curiosity and career growth.
      </p>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-14 fade-up opacity-0 translate-y-6 transition-all duration-700 delay-300">
        {[
          { value: "25+", label: "Years of eLearning Education Experience" },
          { value: "56k", label: "Students Enrolled in LMSZONE Courses" },
          { value: "170+", label: "Experienced Teacher’s Service" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-lg px-6 py-8 w-64 transform hover:scale-105 hover:rotate-1"
          >
            <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#0ABAB5] to-[#4AB19D] bg-clip-text text-transparent animate-pulse">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-3 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats; 