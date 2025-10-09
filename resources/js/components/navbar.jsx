import React, { useEffect, useRef, useState } from "react";
import TransText from "../components/TransText";
const yeslogo = "/assets/images/yeslogo.png";
const jadara = "/assets/images/sponsors/Jadaralogo.png";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  const navItems = [
    { label: { en: "Home", ar: "الرئيسية", fr: "Accueil" }, path: "/" },
    { label: { en: "About", ar: "حول", fr: "À propos" }, path: "/about" },
    {
      label: { en: "Maps", ar: " خرائط", fr: "Carts" },
      path: "/maps",
    },
    {
      label: { en: "Participate", ar: "المشاركة", fr: "Participer" },
      path: "/participate",
      isDropdown: true,
    }, // Mark "Participate" as a dropdown
    {
      label: { en: "Articles", ar: " المقالات", fr: "Articles" },
      path: "/articles",
    },
    {
      label: { en: "Contact", ar: "اتصل بنا", fr: "Contact" },
      path: "/contact",
    },
  ];
  const LANGUAGES = [
    { label: "Français", code: "fr" },
    { label: "English", code: "en" },
    { label: "العربية", code: "ar" },
  ];
  const logos = [
    {
      image: yeslogo,
      link: "/",
    },
    {
      image: jadara,
      link: "https://jadara.ngo/",
    },
  ];

  return (
    <div className="sticky top-0 z-30">
      <nav className="bg-white border border-gray-200 px-3 sm:px-16 py-4 rounded shadow">
        <div className={`container flex flex-wrap justify-between items-center mx-auto`}>
          <div className="flex items-center gap-10">
            <div className="flex gap-2 items-center">
              {logos.map((element, index) => (
                <a key={index} href={element.link} className="flex items-center">
                  <img
                    className={`${index === 0 ? "lg:w-[5.5vw] md:w-[11vw] w-[20vw]" : "lg:w-[3vw] md:w-[7vw] w-[12vw]"} `}
                    src={element.image}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsToggle(!isToggle)}
              id="menu-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6 text-alpha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className={`w-full md:block md:w-auto ${isToggle ? "" : "hidden"} `} id="mobile-menu">
            <ul className={`flex flex-col items-center mt-4 md:flex-row md:gap-x-8 md:mt-0 md:text-sm md:font-medium`}>
              {navItems.map((item, index) => {
                if (item.isDropdown) {
                  return (
                    <li key={index} className={`relative`} ref={dropdownRef}>
                      <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                        <span className={`${currentPath === "/form" || currentPath === "/participants" ? "text-beta" : "text-alpha hover:text-beta"}`}>
                          <TransText {...item.label} />
                        </span>
                        <svg className={`w-5 h-5 transition-transform transform ${dropdownIsOpen ? "rotate-180" : ""} ${currentPath === "/form" || currentPath === "/participants" ? "text-beta" : "text-alpha"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {dropdownIsOpen && (
                        <ul className="absolute left-0 w-40 mt-2 z-10 bg-white border border-gray-200 shadow-lg rounded">
                          <li>
                            <a href="/form" className={`block px-4 py-2 ${currentPath === "/form" ? "text-beta" : "text-alpha hover:text-beta"}`}>
                              NGO's
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="https://www.registration.yesafrica.eventlink.ma/inscription/yes-africa3ZlSqN8" className={`block px-4 py-2 text-alpha hover:text-beta`}>
                              Participants
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <a href={item.path} className={`${currentPath === item.path ? "text-beta" : "text-alpha hover:text-beta"}`}>
                        <TransText {...item.label} />
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
