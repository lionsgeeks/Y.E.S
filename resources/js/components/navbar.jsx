import React, { useEffect, useRef, useState } from "react";
import TransText from "../components/TransText";
import { Link } from "@inertiajs/react";
const yeslogo = "/assets/images/yeslogo.png";
// const jadara = "/assets/images/sponsors/Jadaralogo.png";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  const [lang, setLang] = useState(typeof window !== "undefined" ? (localStorage.getItem("lang") || "en") : "en");
  const isAr = typeof window !== "undefined" ? ((localStorage.getItem("lang") || "en") === "ar") : false;
  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
    if (langRef.current && !langRef.current.contains(event.target)) {
      setLangDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // init dir based on saved language
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", (localStorage.getItem("lang") || "en") === "ar" ? "rtl" : "ltr");
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const changeLang = (code) => {
    setLang(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", code);
      const evt = new Event("language:change");
      window.dispatchEvent(evt);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
      }
    }
  };

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
    {
      label: { en: "Advocacy", ar: "مرافعة", fr: "plaidoyer" },
      path: "/plaidoyer",
    },
  ];
  const LANGUAGES = [
    { label: "fr", code: "fr" },
    { label: "en", code: "en" },
    { label: "ar", code: "ar" },
  ];
  const logos = [
    {
      image: yeslogo,
      link: "/",
    },
    // {
    //   image: jadara,
    //   link: "https://jadara.ngo/",
    // },
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

          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown (desktop) */}

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
                            <Link href="/form" className={`block px-4 py-2 ${currentPath === "/form" ? "text-beta" : "text-alpha hover:text-beta"}`}>
                              NGO's
                            </Link>
                          </li>
                          <li>
                            <Link target="_blank" href="/participants" className={`block px-4 py-2 text-alpha hover:text-beta`}>
                              Participants
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li className="" key={index}>
                      <Link href={item.path} className={`${currentPath === item.path ? "text-beta" : "text-alpha hover:text-beta"}`}>
                        <TransText {...item.label} />
                      </Link>
                    </li>
                  );
                }
              })}
                 <div className="relative  hidden md:block" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className=" py-1.5  rounded text-sm text-alpha hover:text-beta flex items-center gap-2"
              >
                {LANGUAGES.find((l) => l.code === lang)?.label || "English"}
                <svg className={`w-4 h-4 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              {langDropdownOpen && (
                <ul className={`absolute mt-2 w-12 bg-white border rounded shadow z-20 ${isAr ? "left-0 text-right" : "right-0 text-left"}`}>
                  {LANGUAGES.map((l) => (
                    <li key={l.code}>
                      <button
                        onClick={() => {
                          changeLang(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full ${isAr ? "text-right" : "text-left"} px-3 py-2 text-sm ${lang === l.code ? "bg-alpha text-white" : "text-alpha hover:bg-gray-50"}`}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
              {/* Mobile language dropdown at end */}
              <li className="md:hidden w-full mt-3">
                <select
                  value={lang}
                  onChange={(e) => changeLang(e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm text-alpha ${isAr ? "text-right" : ""}`}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
