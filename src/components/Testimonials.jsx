import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    text: "Incredible results and smooth collaboration.",
  },
  {
    name: "Mary Lane",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Great communication throughout the process!",
  },
  {
    name: "Anna Grace",
    role: "Designer",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    text: "Beautiful design work. Very creative!",
  },
  {
    name: "Tom Ray",
    role: "Developer",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    text: "Clean and performant code. Impressive!",
  },
  {
    name: "Elisa Green",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    text: "Delivered above expectations. 10/10!",
  },
  {
    name: "Brian Lowe",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "Robust architecture and scalable solution.",
  },
];

const Testimonials = () => {
  const columnCount = (window.innerWidth >= 1024) ? 3 : (window.innerWidth >= 640 ? 2 : 1);

  return (
    <div className="app bg-gradient-to-tr from-[#fff0e6] to-[#ffffff]">
     <div className="text-center mb-16 ">

         <div className="inline-block bg-[#009933] text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md shadow-[#b3ffcc] animate-pulse">
        Testimonials
      </div>
      
        <h2 className="text-4xl font-extrabold md:text-4xl text-orange mb-10 leading-tight racking-tight">
          🌟 Electronic Product Launch Roadmap
        </h2>
        <p className="text-gray-600 mt-2">Your step-by-step innovation journey</p>
      </div>
      <div className="columns-container ">
        {Array.from({ length: columnCount }).map((_, colIdx) => (
          <div key={colIdx} className="scroll-column">
            <div
              className={`scroll-inner ${
                colIdx % 2 === 0 ? "scroll-up" : "scroll-down"
              }`}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div className="testimonial-card bg-white rounded-xl p-6 mx-8 shadow-sm transition-all duration-300 transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,106,0,0.4)] group cursor-pointer " key={idx}>
                  <img src={t.image} alt={t.name} />
                  <div className="content">
                    <p className="name">{t.name}</p>
                    <p className="role">{t.role}</p>
                    <p className="text">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;