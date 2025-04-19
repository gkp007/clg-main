import { useState, useEffect } from "react";
import { FaHome, FaInfoCircle, FaUserPlus, FaSignInAlt } from "react-icons/fa"; // import icons

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", icon: <FaHome /> },
    { label: "Counselings", icon: <FaUserPlus /> },
    
    { label: "Login/Signup", icon: <FaSignInAlt /> },
    { label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <nav
      className={`w-full overflow-x-hidden left-0 right-0 top-0 z-50 transition-all duration-100 ${
        isSticky
          ? "fixed bg-light-orange shadow-md animate-fadeDown"
          : "relative bg-light-orange1"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          {/* You can add a brand name here if needed */}
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-[16px] text-orange font-bold items-center">
          {navItems.map(({ label, icon }) => (
            <li
              key={label}
              className={`flex items-center gap-2 cursor-pointer ${
                active === label
                  ? "text-orange-500 underline"
                  : "text-black"
              }`}
              onClick={() => setActive(label)}
            >
              {icon} {label}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-orange-500 text-xl font-bold"
          >
            {toggle ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {toggle && (
        <ul className="md:hidden bg-green-50 px-6 pb-4 flex flex-col gap-4 animate-slideDown text-[16px] font-medium">
          {navItems.map(({ label, icon }) => (
            <li
              key={label}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setActive(label);
                setToggle(false);
              }}
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;