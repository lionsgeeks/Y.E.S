const aboutimg = "/assets/images/heroCarousel/hero5.jpg";
import TransText from "@components/TransText";
// import { useAppContext } from "../../../context/AppContext";

const Who = () => {
  const width = "42px";
  const stats = [
    {
      number: "54",
      title: {
        en: "Countries",
        ar: "دولة",
        fr: "Pays"
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
      ),
    },
    {
      number: "10+",
      title: {
        en: "Partners",
        ar: "شريك",
        fr: "Partenaires"
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8"
        >
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      ),
    },
    {
      number: "1,000+",
      title: {
        en: "Attendees",
        ar: "حاضرون",
        fr: "Participants"
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      number: "10+",
      title: {
        en: "Speakers",
        ar: "متحدثون",
        fr: "Intervenants"
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
          />
        </svg>
      ),
    },
  ];


  const { selectedLanguage } = "en";

  const text = [
    {
      title: {
        en: "About Jadara Foundation",
        ar: "حول مؤسسة جدارة",
        fr: "À propos de Jadara Foundation"
      },
      para1: {
        en: "Jadara is a non-profit organization dedicated to empowering underserved youth and fostering social development in Morocco and beyond. With a mission to provide opportunities for education, skill development, and personal growth, Jadara aims to equip young individuals with the tools they need to overcome social barriers and achieve their full potential. The foundation focuses on initiatives that promote inclusivity, resilience, and community engagement, working collaboratively with local and international partners to create sustainable solutions that uplift marginalized communities. Through its various programs and activities, Jadara is committed to transforming lives and building a brighter future for the next generation.",
        ar: "جدارة هي منظمة غير ربحية مكرسة لتمكين الشباب المحرومين وتعزيز التنمية الاجتماعية في المغرب وما وراءه. تهدف جادارة، من خلال مهمتها المتمثلة في توفير الفرص للتعليم، وتطوير المهارات، والنمو الشخصي، إلى تجهيز الشباب بالأدوات اللازمة لتجاوز الحواجز الاجتماعية وتحقيق إمكاناتهم الكاملة. تركز المؤسسة على المبادرات التي تعزز الشمولية، والمرونة، والمشاركة المجتمعية، وتعمل بشكل تعاوني مع الشركاء المحليين والدوليين لإنشاء حلول مستدامة ترفع من مستوى المجتمعات المهمشة. من خلال برامجها وأنشطتها المتنوعة، تلتزم جادارة بتحويل الحياة وبناء مستقبل أكثر إشراقًا للجيل القادم.",
        fr: "Jadara est une organisation à but non lucratif dédiée à l'autonomisation des jeunes défavorisés et à la promotion du développement social au Maroc et au-delà. Avec pour mission de fournir des opportunités d'éducation, de développement des compétences et de croissance personnelle, Jadara vise à doter les jeunes des outils nécessaires pour surmonter les barrières sociales et réaliser leur plein potentiel. La fondation se concentre sur des initiatives qui favorisent l'inclusivité, la résilience et l'engagement communautaire, en collaborant avec des partenaires locaux et internationaux pour créer des solutions durables qui élèvent les communautés marginalisées. À travers ses divers programmes et activités, Jadara s'engage à transformer des vies et à construire un avenir plus brillant pour la prochaine génération."
      }
    },
  ];



  return (
    <section
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
      className="min-h-[50vh]">
      <div
        className={`min-h-[30vh] m-3 flex items-center flex-col justify-between gap-8 lg:gap-0 ${selectedLanguage === "ar" ? "lg:flex-row-reverse text-end" : "lg:flex-row"
          }`}
      >
        <img src={aboutimg} className="lg:w-[50%] object-cover rounded" alt="" />

        {text.map(({ title, para1, para2 }, index) => (
          <div
            className={`flex flex-col gap-4 tracking-wide   ${selectedLanguage === "ar" ? "px-8 md:pl-12 lg:pl-16" : "px-8 md:pr-12 lg:pr-16"
              }`}
            key={index}
          >
            <h1
              className={`lg:text-start text-beta lg:mb-3 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl/none ${selectedLanguage == "ar" ? "flex flex-row-reverse gap-2" : ""
                }`}
            >
              {/* TODO: mafia li ygadha, khaliha mcommentia - oussama */}
              <TransText {...title} />
              {/* <span className="text-alpha"> Jadara Foundation</span> */}
            </h1>
            <p className={`text-muted-foreground  md:text-base/relaxed lg:text-lg/snug ${selectedLanguage != "ar" && "text-justify "}`}>
              <TransText {...para1} />
            </p>
            <p className={`text-muted-foreground  md:text-base/relaxed lg:text-lg/snug ${selectedLanguage != "ar" && "text-justify "}`}>
              <TransText {...para2} />
            </p>
          </div>
        ))}
      </div>


      <div className="bg-muted-background flex items-center justify-around flex-col gap-10 lg:flex-row px-8 md:px-12 lg:px-16 my-8 md:my-10 lg:my-12 py-8 md:py-10 lg:py-12">
        {stats.map(({ icon, number, title }, index) => (
          <div
            key={index}
            className="flex items-center flex-col lg:fle-row justify-center text-alpha text-center gap-3"
          >
            {icon}
            <div>
              <p className="text-2xl text-beta md:text-3xl lg:text-4xl font-bold tracking-wide">{number}</p>
              <p className="text-muted-foreground lg:text-lg font- tracking-wide">
                <TransText {...title} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Who;
