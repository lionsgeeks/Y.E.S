import { Head } from "@inertiajs/react"; // ✅ Add this for page titles
import TransText from "@components/TransText";
import AutoCarousel from "@components/AutoCarousel";

const hero1 = "/assets/images/heroCarousel/hero1.jpg";
const hero3 = "/assets/images/heroCarousel/hero3.jpg";
const hero4 = "/assets/images/heroCarousel/hero4.jpg";


const Hero = () => {
  // ✅ Example: use default language (you can later link it to your context or settings)
  const selectedLanguage = "en";

  const slides = [
    {
      img: hero1,
      title: {
        en: "Youth Empowerment Summit, Africa",
        ar: "Youth Empowerment Summit, Africa",
        fr: "Youth Empowerment Summit, Africa",
      },
      desc: {
        en: "Y.E.S Africa (Youth Empowerment Summit Africa) is a crucial initiative addressing the growing challenge of NEET (Not in Education, Employment, or Training) youth in Africa, projected to exceed 70 million by 2025. This alarming trend threatens not only the future of these young individuals but also the continent as a whole. Y.E.S Africa aims to transform this situation from 70 million NEETs to 70 million Doers by fostering collaboration among civil society leaders, local communities, and private sector stakeholders.",
        ar: "قمة تمكين الشباب في أفريقيا هي مبادرة هامة تتصدى للتحدي المتزايد للشباب الذين لا يتلقون التعليم أو التدريب أو يعملون في أفريقيا، والمتوقع أن يتجاوز عددهم 70 مليون بحلول عام 2025...",
        fr: "Y.E.S Africa (Sommet de l'Autonomisation des Jeunes, Afrique) est une initiative cruciale qui répond au défi croissant des jeunes NEET (Non scolarisés, Non en emploi, Non en formation) en Afrique...",
      },
    },
    {
      img: hero4,
      title: {
        en: "Youth Empowerment Summit, Africa",
        ar: "Youth Empowerment Summit, Africa",
        fr: "Youth Empowerment Summit, Africa",
      },
      desc: {
        en: "A substantial and focused investment in Africa's human capital, paired with comprehensive reforms aimed at enhancing the business environment, is essential for African governments to attract increased foreign investment. This dual approach not only bolsters economic growth but also mitigates the potential for political instability that often accompanies high unemployment rates.",
        ar: "إن الاستثمار الكبير والمركّز في رأس المال البشري في أفريقيا...",
        fr: "Un investissement substantiel et ciblé dans le capital humain de l'Afrique...",
      },
    },
    {
      img: hero3,
      title: {
        en: "Youth Empowerment Summit, Africa",
        ar: "Youth Empowerment Summit, Africa",
        fr: "Youth Empowerment Summit, Africa",
      },
      desc: {
        en: "Join us at Y.E.S Africa and be part of the solution! Our initiative focuses on empowering the youth of Africa by creating opportunities for education, employment, and skills development. Together, we can turn the tide on the NEET crisis, transforming young lives and building a brighter future for the continent. Through collaboration and innovation, we aim to cultivate a new generation of leaders and change-makers, ensuring that every young person has the chance to thrive. Let’s work together to make the vision of 70 million Doers a reality!",
        ar: "انضموا إلينا في قمة تمكين الشباب في أفريقيا وكونوا جزءًا من الحل...",
        fr: "Rejoignez-nous à Y.E.S Africa et faites partie de la solution...",
      },
    },
  ];

  const renderedSlides = slides.map((s) => () => (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url(${s.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPosition:"center 30%"
      }}
    >
      <div className={`flex items-center w-full h-full bg-black/40 text-white ${selectedLanguage === "ar" ? "flex-row-reverse" : ""}`}>
        <div className={`lg:w-[40%] ${selectedLanguage === "ar" ? "lg:mr-24 mr-5" : "lg:ml-24 ml-5"}`}>
          <div className={`${selectedLanguage === "ar" ? "text-end" : ""}`}>
            <h1 className={`lg:text-5xl text-xl gap-1 font-bold flex flex-col`}>
              <span>
                <TransText en="Youth" ar="Youth" fr="Youth" />
              </span>
              <span>
                <TransText en="Empowerment" ar="Empowerment" fr="Empowerment" />
              </span>
              <span>
                <TransText en="Summit" ar="Summit" fr="Summit" />
                <span className="text-xl lg:text-3xl font-normal mx-6">
                  <TransText en="Africa" ar="Africa" fr="Africa" />
                </span>
              </span>
            </h1>
            <br />
            <p
              className={`lg:text-lg ${selectedLanguage !== "ar" && "text-justify"} whitespace-pre-line`}
            >
              <TransText en={s.desc.en} ar={s.desc.ar} fr={s.desc.fr} />
            </p>

          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* ✅ Inertia-friendly page title */}
      <Head title="Hero Section" />

      <div className="h-[80vh] cursor-grab">
        <AutoCarousel
          slides={renderedSlides}
          className="h-full"
          intervalMs={3000}
          transitionMs={400}
        />
      </div>
    </>
  );
};

export default Hero;
