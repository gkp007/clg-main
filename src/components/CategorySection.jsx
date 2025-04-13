const categories = [
  {
    id: "01",
    title: "WordPress Development",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "🧩",
    width: "w-1/3",
    row: 1,
  },
  {
    id: "02",
    title: "Web Development",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "🌀",
    width: "w-1/2",
    row: 1,
  },
  {
    id: "03",
    title: "App Development",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "📱",
    width: "w-1/4",
    row: 1,
  },
  {
    id: "04",
    title: "Java Script",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "🟡",
    width: "w-[60%]",
    row: 2,
  },
  {
    id: "05",
    title: "Graphics Designer",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "🎨",
    width: "w-1/4",
    row: 2,
  },
  {
    id: "06",
    title: "WordPress Development",
    description: "This introductory course is for students with little to no English.",
    courses: "4+ Courses",
    icon: "🧩",
    width: "w-[55%]",
    row: 2,
  },
];

const CategorySection = () => {
  return (
    <section className="bg-gradient-to-tr from-[#fff1ec] to-[#ffe4d4] py-12 px-4 md:px-16 text-center">
      <div className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 animate-bounce">
        Categories
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-black mb-10 leading-tight">
        Choice Favourite Course <br />
        <span className="text-orange-500">Admission path</span>
      </h2>

      {/* Desktop layout */}
      <div className="hidden md:block space-y-8">
        {[1, 2].map((row) => (
          <div key={row} className="flex gap-6 justify-center">
            {categories
              .filter((item) => item.row === row)
              .map((item) => (
                <div
                  key={item.id}
                  className={`relative ${item.width} bg-white rounded-xl p-6 shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(255,106,0,0.4)] hover:ring-2 hover:ring-orange-200 group cursor-pointer`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 my-2">{item.description}</p>
                  <div className="text-sm font-semibold text-orange-500 mt-4">
                    {item.courses}
                  </div>
                  <span className="absolute bottom-4 right-4 text-[#f0dcdc] font-bold text-2xl">
                    {item.id}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-6 shadow-md relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 my-2">{item.description}</p>
            <div className="text-sm font-semibold text-orange-500 mt-4">
              {item.courses}
            </div>
            <span className="absolute bottom-4 right-4 text-[#f0dcdc] font-bold text-2xl">
              {item.id}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="mt-10 bg-gradient-to-r from-orange-500 to-red-400 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all font-semibold">
        See All Category
      </button>
    </section>
  );
};

export default CategorySection;