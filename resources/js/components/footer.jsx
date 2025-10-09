import React from "react";
import TransText from "../components/TransText";

const IconWrapper = ({ children }) => (
  <span className="inline-flex items-center justify-center h-[1.75rem] w-[1.75rem]">
    {children}
  </span>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.74 8.44-4.91 8.44-9.93Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M3 3h3.8l5.05 6.53L17.9 3H21l-7.3 8.53L21 21h-3.8l-5.44-7.03L6.1 21H3l7.74-9.06L3 3Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.84v1.98h.05c.53-.99 1.82-2.04 3.75-2.04 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.43c0-1.53-.03-3.49-2.13-3.49-2.13 0-2.46 1.66-2.46 3.38V23h-4V8.5Z" />
  </svg>
);

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-10 border-t-2 border-gray-100">
        <div className={`flex flex-wrap text-left lg:text-left`}>
          <div className={`w-full lg:w-6/12 px-4`}>
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              <TransText ar="دعنا نبقى على تواصل" en="Let's keep in touch!" fr="Restons en contact !" />
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              <TransText ar="ابحث عنا على أي من هذه المنصات" en="Find us on any of these platforms" fr="Retrouvez-nous sur l'une de ces plateformes." />
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <div className="flex flex-col justify-between gap-2 pt-4">
                <div className="flex gap-3">
                  <a target="blank" href="https://www.facebook.com/profile.php?id=61567349305436" className="text-gray-400 hover:text-blue-500 transition duration-200">
                    <IconWrapper><FacebookIcon /></IconWrapper>
                  </a>
                  <a target="blank" href="https://www.instagram.com/yes_summit_africa/" className="text-gray-400 hover:text-pink-600 transition duration-200">
                    <IconWrapper><InstagramIcon /></IconWrapper>
                  </a>
                  <a target="blank" href="https://x.com/yes_summit?s=21&t=7jqpIPumaHca8lonoHm8Uw" className="text-gray-400 hover:text-black transition duration-200">
                    <IconWrapper><XIcon /></IconWrapper>
                  </a>
                  <a target="blank" href="https://www.linkedin.com/company/yes-summit-africa" className="text-gray-400 hover:text-[#0a66c2] transition duration-200">
                    <IconWrapper><LinkedinIcon /></IconWrapper>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full lg:w-6/12 px-4`}>
            <div className="flex flex-wrap items-top mb-6 gap-5">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  <TransText ar="روابط مفيدة" en="Useful Links" fr="Liens utiles" />
                </span>
                <ul className="list-unstyled text-gray-700">
                  {[
                    [{ en: "Home", ar: "الرئيسية", fr: "Accueil" }, "/"],
                    [{ en: "About", ar: "حول", fr: "À propos" }, "/about"],
                    [{ en: "Articles", ar: "المقالات", fr: "Articles" }, "/articles"],
                  ].map(([name, path], index) => (
                    <a key={index} href={path} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <TransText {...name} />
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
