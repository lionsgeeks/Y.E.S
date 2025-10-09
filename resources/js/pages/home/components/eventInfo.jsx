
import TransText from "@components/TransText";
import Countdown from "@components/Countdown";
import FacesCarousel from "@components/facesCarousel";
import { Calendar, Clock, MapPin, Download } from "lucide-react";
import { Link } from "@inertiajs/react";
const EventInfo = () => {
  const { selectedLanguage } = "en";

  const eventInformation = [
    {
      icon: <Calendar className="h-5 w-5" />,
      text: {
        en: "June 19-20, 2025",
        ar: "19-20 يونيو 2025",
        fr: "19-20 juin 2025",
      },
    },
    {
      icon: <Clock className="h-5 w-5" />,
      text: {
        en: "9:00 AM - 5:00 PM",
        ar: "9:00 ص - 5:00 م",
        fr: "9h00 - 17h00",
      },
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: {
        en: "Marrakech",
        ar: "مراكش",
        fr: "Marrakech",
      },
    },
  ];

  const text = [
    {
      title: {
        en: "Information About The Event",
        ar: "معلومات عن الحدث",
        fr: "Informations sur l'événement",
      },
      desc: {
        en: "Join us for a vibrant celebration of African youth empowerment! Experience an exciting event featuring inspiring speakers, interactive workshops, and captivating live performances. This is a fantastic opportunity to connect with fellow change-makers, exchange ideas, and celebrate the dynamism of African youth. Don’t miss this enriching experience designed to uplift and inspire the next generation!",
        ar: "انضموا إلينا للاحتفال النابض بتمكين الشباب الأفريقي! عيشوا تجربة مثيرة تتضمن متحدثين ملهمين، ورش عمل تفاعلية، وعروض حية ساحرة. هذه فرصة رائعة للتواصل مع صانعي التغيير الآخرين، وتبادل الأفكار، والاحتفال بحيوية الشباب الأفريقي. لا تفوتوا هذه التجربة الغنية المصممة لرفع معنويات وإلهام الجيل القادم!",
        fr: "Rejoignez-nous pour une célébration vibrante de l'autonomisation des jeunes africains ! Vivez un événement passionnant avec des conférenciers inspirants, des ateliers interactifs et des performances en direct captivantes. C'est une occasion fantastique de se connecter avec d'autres acteurs du changement, d'échanger des idées et de célébrer le dynamisme des jeunes africains. Ne manquez pas cette expérience enrichissante conçue pour élever et inspirer la prochaine génération !",
      },
      aboutBtn: {
        en: "Register to Summit",
        ar: " تسجل في القمة",
        fr: "Inscrivez-vous au Sommet",
      },
      programBtn: {
        en: "Download Program",
        ar: "تحميل البرنامج", 
        fr: "Télécharger le programme",
      },
      contactBtn: {
        en: "Contact Us",
        ar: "اتصل بنا",
        fr: "Contactez-nous",
      },
    },
  ];

  return (
    <section
      className={`py-16 relative md:py-20 lg:py-18 bg-beta z-20 overflow-hidden rounded-2xl flex flex-col lg:items-center gap-12 lg:gap-5 justify-around text-white my-6 lg:my-16 p-6 mx-3 lg:mx-14
        ${selectedLanguage === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <svg
        className={
          "absolute -z-10 lg:w-1/2 scale-[1.25] opacity-[20%] right-0 lg:-top-[10%] "
        }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 264.94 186.06"
      >
        <path
          className="stroke-0 fill-[#2e539d]"
          d="M187.35,101.93c4.25-28.05-13.08-53.79-40.01-56.82l.38,10.43c-22.19-1.03-36.46,15.63-47.67,35.9,4.93,13.5,8.55,27.44,10.79,41.58,18.86,16.59,57.34,15.58,72.78-6.55l-14.06-8.99c-5.32,7.04-15.65,10.79-24.91,10.68-18.55,0-30.17-10.68-32.79-26.23h75.5ZM111.85,87.3c4.89-34.45,54.27-36.25,58.27,0h-58.27Z"
        />
        <path
          className="stroke-0 fill-[#2e539d]"
          d="M234.03,86.93c-10.86-2.25-23.98-3.01-23.98-13.68,0-7.87,6.93-13.11,16.3-13.11,10.68,0,16.3,5.62,17.98,10.86l15.93-4.31c-3.36-14.05-17.04-21.92-32.41-21.92-20.61,0-35.04,12.36-35.04,29.79.2,38.04,53.87,19.94,54.53,40.66,0,8.43-6.94,13.49-19.29,13.49-15.37,0-20.43-6.74-21.93-11.6l-16.67,5.62c3.75,14.24,19.49,21.73,38.22,21.73,25.29,0,37.28-14.05,37.28-30.91,0-14.23-7.68-21.73-30.91-26.6Z"
        />
        <path
          className="stroke-0 fill-[#2e539d]"
          d="M142.2,50.38c-22.14,1.33-36.93,20.02-48.01,40.65,6.01,15.86,10.17,32.52,12.31,49.39l-16.57,2.1c-1.27-9.97-3.29-19.81-6.03-29.43-9.12,23.17-13.89,47.95-13.96,72.98-3.17,0-13.37-.04-16.7-.05.09-33.19,7.84-66.16,22.6-95.91C63.15,61.23,36.4,14.24,1.46,16.82L0,.17c40.49-3.16,69.02,38.32,85.95,71.84,12.79-20.92,32.39-37.45,55.64-38.32.18,4.96.42,11.73.6,16.68Z"
        />
        <path
          className="stroke-0 fill-[#2e539d]"
          d="M104.97,25.26c1.63,10.47-7.27,19.37-17.74,17.74-20.03-4.05-15.51-32.89,4.89-30.54,6.51.98,11.84,6.29,12.86,12.79Z"
        />
      </svg>

      <div
        className={`lg:w-[50%] space-y-2 ${
          selectedLanguage == "ar" && "text-end justify-end z-50"
        }`}
      >
        {text.map(({ title, desc, aboutBtn,programBtn, contactBtn }, index) => (
          <div className="flex flex-col gap-4" key={index}>
            <h1 className="text-2xl font-semibold tracking-tighter md:text-3xl lg:text-4xl/none">
              <TransText {...title} />
            </h1>
            <p
              className={`text-gray-100 md:text-base/relaxed lg:text-lg/snug ${
                selectedLanguage != "ar" && "text-justify"
              }`}
            >
              <TransText {...desc} />
            </p>

            <div
              className={`mt-4 flex flex-col md:flex-row lg:items-center gap-4 ${
                selectedLanguage === "ar" && "flex-row-reverse"
              }`}
            >
              <Link target="_blank" to={"https://www.registration.yesafrica.eventlink.ma/inscription/yes-africa3ZlSqN8"}>
                <button className="bg-alpha border-2 lg:text-lg text-white border-alpha hover:border-white hover:bg-white hover:text-alpha px-8 py-2.5 w-fit rounded-lg lg:font-medium">
                  <TransText {...aboutBtn} />
                </button>
              </Link>
              <a download={true} href={""}>
                <button className="bg-alpha border-2 lg:text-lg flex items-center text-white border-alpha hover:border-white hover:bg-white hover:text-alpha px-8 py-2.5 w-fit rounded-lg lg:font-medium">
                  <Download size={20} className="inline-block mr-2" />
                  <TransText {...programBtn} />
                </button>
              </a>

              <Link to={"/contact"}>
                <button className="bg-transparent border-2 lg:text-lg text-white border-white  hover:border-alpha hover:text-alpha px-8 py-2.5 w-fit rounded-lg font-medium transition-[background-color] duration-[700ms]">
                  <TransText {...contactBtn} />
                </button>
              </Link>
            </div>
          </div>
        ))}
        <div
          className={`lg:w-[40%] flex flex-col gap-3 ${
            selectedLanguage === "ar" ? "items-end" : "items-start"
          }`}
        >
          {eventInformation.map(({ icon, text }, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                selectedLanguage === "ar" && "flex-row-reverse"
              }`}
            >
              {icon}
              <p className="text-gray-100 md:text-base/relaxed lg:text-lg/snug">
                <TransText {...text} />
              </p>
            </div>
          ))}
          <div>
            <Countdown targetDate="2025-06-19T00:09:00" />
          </div>
        </div>
      </div>
      <FacesCarousel
        videos={[
          {
            title:
              "Meet The faces behind YES SUMMIT Episode 1 – Mr. Hamid BEN ELAFDIL, President of Jadara Foundation",
            id: "gTNrjHGoWmQ",
          },
          {
            title:
              "Meet the Faces behin YES Africa Summit : Mahdi Bouziane, Executif Director of LionsGEEK",
            id: "0mg3CiRvgIQ",
          },
          {
            title:
              "MEET THE FACES BEHIND Y.E.S EP3 : M.BA BOCAR ABDOULAYE",
            id: "re_q6h-K7ac?si=CQTan1x_nb74aMS4",
          },
      
        ]}
      />
    </section>
  );
};

export default EventInfo;
