const ucgc = "/assets/images/sponsors/ucgc.jpg";
const lionsgeek = "/assets/images/sponsors/lionsgeek.png";
const jadara = "/assets/images/sponsors/Jadaralogo.png";
const epic = "/assets/images/sponsors/epic-afric.jpg";
const pan = "/assets/images/sponsors/pan.jpeg";
const spo1 = "/assets/images/sponsors/1.jpeg";
const spo2 = "/assets/images/sponsors/2.jpeg";
const spo3 = "/assets/images/sponsors/3.jpeg";
const spo4 = "/assets/images/sponsors/4.jpeg";
const spo5 = "/assets/images/sponsors/5.jpeg";
const Africa_50 = "/assets/images/sponsors/Africa_50.jpg";
// import smala from "../../../assets/images/sponsors/happylogo.webp";

import TransText from "@components/TransText";

const Sponsors = () => {
  const title = {
    en: "They said yes to africa",
    ar: "قالوا نعم لأفريقيا",
    fr: "Ils ont dit oui à l'Afrique"
  };
  const { selectedLanguage } = "en";

  const sponsors = [
    { src: lionsgeek, url: "#" },
    { src: spo1, url: "#" },
    { src: spo2, url: "#" },
    { src: spo3, url: "#" },
    { src: spo4, url: "#" },
    { src: spo5, url: "#" },
    { src: Africa_50, url: "#" },
    { src: ucgc, url: "#" },
    { src: epic, url: "#" },
    { src: pan, url: "#" },
  ];

  const highlights = [
    { title: "LionsGeek", image: lionsgeek, color: "#2e539d", hasImage: true },
    { title: "Partner 1", image: spo1, color: "#b09417", hasImage: true },
    { title: "Partner 2", image: spo2, color: "#f8a205", hasImage: true },
    { title: "Partner 3", image: spo3, color: "#2e539d", hasImage: true },
    { title: "Partner 4", image: spo4, color: "#b09417", hasImage: true },
    { title: "Partner 5", image: spo5, color: "#f8a205", hasImage: true },
    { title: "Africa 50", image: Africa_50, color: "#2e539d", hasImage: true },
    { title: "UCGC", image: ucgc, color: "#b09417", hasImage: true },
    { title: "EPIC", image: epic, color: "#f8a205", hasImage: true },
    { title: "PAN", image: pan, color: "#2e539d", hasImage: true },
  ];

  return (
    <section className="px-8 md:px-12 lg:px-10 pt-8 md:pt-10 lg:pt-14 pb-16 md:pb-20 lg:pb-28">
      <h2
        className={`text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none mb-6 ${selectedLanguage === "ar" && "text-end"}`}
      >
        <TransText {...title} />
      </h2>

      {/* Sponsors carousel cards */}
      <div className="relative group overflow-hidden rounded-3xl bg-white py-8 px-12 mt-8">
        <style>{`
          @keyframes category-scroll {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-33.3333%,0,0); }
          }
        `}</style>
        <div
          className="flex items-stretch gap-20"
          style={{
            width: 'max-content',
            animation: 'category-scroll 20s linear infinite',
            willChange: 'transform',
            transform: 'translate3d(0,0,0)'
          }}
          // onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, idx) => (
            <a key={`s-${idx}`} href={sponsor.url} className="w-[280px] flex items-center justify-center">
              <img
                src={sponsor.src}
                alt="sponsor"
                className="h-16 md:h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
