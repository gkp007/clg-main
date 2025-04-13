import { FaUniversity, FaPlaneDeparture, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const cards = [
  {
    icon: <FaUniversity />,
    title: "Full College Cost",
    desc: "Comprehensive fees for students during the course of study",
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Transportation Costs",
    desc: "The cost for each student's round trip from home to campus",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    icon: <FaBookOpen />,
    title: "Learning Equipment",
    desc: "All equipment to support learning activities for each student",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ScholarshipSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-gray-100 py-20 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-start gap-8 mb-14"
        >
          <div>
            <p className="text-sm text-orange-500 font-semibold uppercase tracking-wide">
              About Us
            </p>
            <h2 className="text-4xl font-bold mt-1 text-gray-900 leading-snug">
              Free <span className="text-orange-400">Scholarship</span> <br />
              Provided By <span className="text-gray-800">Schdent</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl text-base">
            Have the opportunity to go to school or college without worrying about the cost. Just focus on your studies and assignments—we’ve got the rest covered.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative group bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`text-2xl ${card.bg} ${card.color} p-4 rounded-full mb-5 transition-all duration-300 group-hover:scale-110 shadow-sm`}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;