// const ucgc = "/assets/images/sponsors/ucgc.jpg";
// const lionsgeek = "/assets/images/sponsors/lionsgeek.png";
// const jadara = "/assets/images/sponsors/Jadaralogo.png";
// const epic = "/assets/images/sponsors/epic-afric.jpg";
// const pan = "/assets/images/sponsors/pan.jpeg";
// const spo1 = "/assets/images/sponsors/1.jpeg";
// const spo2 = "/assets/images/sponsors/2.jpeg";
// const spo3 = "/assets/images/sponsors/3.jpeg";
// const spo4 = "/assets/images/sponsors/4.jpeg";
// const spo5 = "/assets/images/sponsors/5.jpeg";
// const Africa_50 = "/assets/images/sponsors/Africa_50.jpg";
// import smala from "/assets/images//sponsors/happylogo.webp";

import TransText from "@components/TransText";

const Sponsors = ({ sponsors = [] }) => {
    const title = {
        en: "They said yes to africa",
        ar: "قالوا نعم لأفريقيا",
        fr: "Ils ont dit oui à l'Afrique",
    };
    const { selectedLanguage } = "en";

    // Process sponsors data to filter and format for display
    const processedSponsors = sponsors
        .filter((s) => s.type !== "organizer")
        .map((s) => ({
            src: s.path ? `/storage/images/${s.path}` : null,
            url: s.website_url || "#"
        }))
        .filter((x) => x.src !== null);


    // Duplicate sponsors once only (for smooth infinite scroll)
    const duplicatedSponsors = [...processedSponsors, ...processedSponsors];

    return (
        <section className="px-8 md:px-12 lg:px-10 pt-8 md:pt-10 lg:pt-14 pb-16 md:pb-20 lg:pb-28">
            <h2
                className={`text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none mb-6 ${selectedLanguage === "ar" && "text-end"
                    }`}
            >
                <TransText {...title} />
            </h2>

            {/* Sponsors carousel */}
            <div className="relative overflow-hidden rounded-3xl bg-white py-8 px-12 mt-8">
                <style>{`
                    @keyframes scrollSponsors {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                    }
                `}</style>

                <div
                    className="flex items-center gap-20 w-max animate-[scrollSponsors_20s_linear_infinite]"
                    onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                    onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
                >
                    {processedSponsors.map((sponsor, idx) => (
                        <a
                            key={`s1-${idx}`}
                            href={sponsor.url}
                            className="w-[220px] flex items-center justify-center"
                        >
                            <img
                                src={sponsor.src}
                                alt="sponsor"
                                className="h-16 md:h-28 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </a>
                    ))}

                    {processedSponsors.map((sponsor, idx) => (
                        <a
                            key={`s2-${idx}`}
                            href={sponsor.url}
                            className="w-[220px] flex items-center justify-center"
                        >
                            <img
                                src={sponsor.src}
                                alt="sponsor"
                                className="h-16 md:h-28 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </a>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Sponsors;
