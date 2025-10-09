
import TransText from "@components/TransText";
const  playstore = "/assets/images/play_store_logo.png";
const  applestore = "/assets/images/app_store_logo.png";
const  heroAppMockup = "/assets/images/app-mockup2.jpg";
const MobileApp = () => {
  const { selectedLanguage } = "en";
  return (
    <div dir={selectedLanguage === "ar" ? "rtl" : "ltr"} className="lg:h-[80vh] flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 items-center lg:px-14 overflow-hidden">
      <div className="lg:w-1/2 w-full lg:h-full lg:p-0 p-12  flex flex-col justify-center space-y-6">
        <p className="text-xl text-gray-700 font-medium text-center lg:text-start">
          <TransText
            en="— Stay Connected, Stay Informed"
            fr="– Restez connecté, restez informé"
            ar="– كن على اتصال، وابقَ على اطلاع"
          />
        </p>
        <h1 className="lg:text-5xl text-xl text-center lg:text-start font-bold text-gray-900 leading-tight">
          <TransText
            en="Download the Y.E.S Africa Summit App Now!"
            fr="Téléchargez dès maintenant l’application Y.E.S Africa Summit !"
            ar="حمّل تطبيق Y.E.S Africa Summit الآن!"
          />
        </h1>
        <p className="text-lg text-center lg:text-start text-gray-600 lg:w-4/5">
          <TransText
            en="Make the most of your summit experience with the official Y.E.S Africa
          Summit mobile app. Get instant access to event schedules, speaker
          info, networking tools, and live session updates — all in one place."
            fr="Optimisez votre expérience du sommet grâce à l’application mobile officielle Y.E.S Africa Summit.
Accédez rapidement aux programmes, aux informations sur les intervenants, aux outils de networking, et recevez des mises à jour en temps réel."
            ar="استمتع بتجربة القمة على أكمل وجه مع التطبيق الرسمي لقمة Y.E.S Africa.
يمكنك الوصول مباشرة إلى الجداول الزمنية، معلومات المتحدثين، أدوات التواصل، والتحديثات المباشرة."
          />
        </p>
        <p className="text-lg text-center lg:text-start text-gray-600 lg:w-4/5">
          <TransText
            en="Download the app today and be ready for the summit!"
            fr="Téléchargez l’application aujourd’hui et soyez prêt pour le sommet !"
            ar="حمّل التطبيق الآن وكن جاهزًا للقمة!"
          />
        </p>
        <div className="flex gap-4 mt-6">
          <a
            href="#"
            target="_blank"
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={playstore}
              alt="Download on Google Play"
              className="h-14 object-contain "
            />
          </a>
          <a
            href="#"  
            target="_blank"
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={applestore}
              alt="Download on the App Store"
              className="h-14 object-contain "
            />
          </a>
        </div>
        <div className="flex items-center lg:flex-row flex-col  gap-4 mt-8">
          <div className="flex -space-x-2">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User 1"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User 2"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/68.jpg"
              alt="User 3"
            />
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 ring-2 ring-white text-gray-700 text-base font-semibold">
              10K+
            </div>
          </div>
          <span className="text-gray-700 font-semibold text-lg">
            Summit Attendees <br /> Already Connected!
          </span>
        </div>
      </div>

      {/* Right Section (App Mockup) */}
      <div className="w-1/2 h-full lg:p-0 py-20 flex items-center justify-center relative pr-10">
        {/* Abstract background elements - keeping them for visual interest */}
        <div className="absolute top-[20%] right-4 w-52  aspect-square border-l-8 border-t-8 border-alpha rounded-full transform rotate-45 opacity-50"></div>
        <div
          className="absolute bottom-20 -left-8 w-40 aspect-square
         border-r-8 border-b-8 border-beta rounded-full transform -rotate-30 opacity-50"
        ></div>

        <img
          src={heroAppMockup}
          alt="Y.E.S Africa Summit App Mockup"
          className="lg:h-[80%] h-full object-contain rounded-3xl border-8 border-gray-800 shadow-2xl relative z-10"
        />
        <div className="absolute top-[27%] left-[60%] bg-white  px-3 py-2 rounded-lg shadow-md flex items-center text-sm font-medium text-gray-700 z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lg:h-4 lg:w-4 w-8 h-8 mr-1 text-beta"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Live Session Updates
        </div>
        <div className="absolute top-[60%] left-[10%] bg-white px-3 py-2 rounded-lg shadow-md flex items-center text-sm font-medium text-gray-700 z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lg:h-4 lg:w-4 w-8 h-8 mr-1 text-alpha"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Networking Made Easy
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
