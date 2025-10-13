import { useEffect, useState } from "react";
import { CommitteeSection } from "./CommitteeSection";
import TransText from "@/components/TransText";

export const OrganizatesSection = ({ sponsors }) => {
    const selectedLanguage = "en";
    // const [sponsors, setSponsors] = useState([]);

    // useEffect(() => {
    //     const fetchSponsors = async () => {
    //         try {
    //             const res = await fetch("/sponsors");
    //             if (!res.ok) throw new Error("Failed to fetch sponsors");
    //             const data = await res.json();
    //             setSponsors(data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     fetchSponsors();
    // }, []);

    // Group sponsors by name (for handling double logos)
    const groupedSponsors = Object.values(
        sponsors.reduce((acc, sponsor) => {
            if (!acc[sponsor.name]) {
                acc[sponsor.name] = { ...sponsor, paths: [sponsor.path] };
            } else {
                acc[sponsor.name].paths.push(sponsor.path);
            }
            return acc;
        }, {})
    );

    // Filter by type
    const organizers = groupedSponsors.filter(
        (s) => s.type === "organizer"
    );
    console.log(groupedSponsors);

    const techPartners = groupedSponsors.filter(
        (s) => s.type === "technical_partner"
    );

    return (
        <>
            {organizers.length > 0 && (
                <section
                    dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                    className="lg:py-12 flex flex-col justify-center gap-3 md:gap-2 bg-white"
                >
                    {/* ORGANIZERS */}
                    <h2 className="text-3xl md:text-5xl lg:text-5xl/none text-alpha font-bold tracking-tighter px-2 md:px-3 lg:px-14 py-4 md:py-5">
                        <TransText en="The Organizers" ar="منظمون" fr="Organisateurs" />
                    </h2>

                    <div>
                        {organizers.map((org, ind) => (
                            <div
                                key={org.id}
                                className={`px-6 text-justify md:px-10 lg:px-14 py-14 md:py-10 my-8 flex justify-between text-black items-start gap-6 flex-col ${ind % 2 !== 1
                                    ? "lg:flex-row bg-muted-background"
                                    : "lg:flex-row-reverse bg-white"
                                    }`}
                            >
                                {/* Logos */}
                                <div
                                    className={`flex items-center justify-center md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 === 1 ? "bg-muted-background" : "bg-white"
                                        }`}
                                >
                                    {org.paths.map((path, i) => (
                                        <img
                                            key={i}
                                            src={`/${path}`}
                                            alt={org.name}
                                            className={`${org.name === "UCGC"
                                                ? "w-[210px]"
                                                : org.name === "EPIC Africa"
                                                    ? "w-[400px]"
                                                    : "w-[120px] lg:w-[180px] px-5 mix-blend-darken"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Text */}
                                <div className="w-full lg:w-[50%] text-lg leading-7">
                                    <span className="font-bold text-xl">{org.name}</span>
                                    {org.description && (
                                        <p>
                                            <TransText
                                                en={org.description.en}
                                                ar={org.description.ar}
                                                fr={org.description.fr}
                                            />
                                        </p>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* COMMITTEE SECTION */}
                    <CommitteeSection />
                </section>
            )}

            {/* TECHNICAL PARTNERS */}
            {techPartners.length > 0 && (
                <section className="bg-muted-background">
                    <h2 className="text-3xl md:text-5xl lg:text-5xl/none text-alpha font-bold tracking-tighter px-2 md:px-3 lg:px-14 py-7 md:py-8">
                        <TransText
                            en="Technical Partners"
                            ar="الشركاء التقنيون"
                            fr="Partenaires techniques"
                        />
                    </h2>

                    <div>
                        {techPartners.map((org, ind) => (
                            <div
                                key={org.id}
                                className={`text-black px-6 text-justify md:px-10 lg:px-14 py-14 md:py-10 my-8 flex justify-between items-start gap-6 flex-col ${ind % 2 === 1
                                    ? "lg:flex-row bg-muted-background"
                                    : "lg:flex-row-reverse bg-white"
                                    }`}
                            >
                                {/* Logos */}
                                <div
                                    className={`flex items-center justify-center md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 === 1 ? "bg-muted-background" : "bg-white"
                                        }`}
                                >
                                    {org.paths.map((path, i) => (
                                        <img
                                            key={i}
                                            src={`/${path}`}
                                            alt={org.name}
                                            className={`${org.name === "UCGC"
                                                ? "w-[210px]"
                                                : org.name === "EPIC Africa"
                                                    ? "w-[400px]"
                                                    : "w-[120px] lg:w-[180px] px-5"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Text */}
                                <div className="w-full lg:w-[50%] text-lg leading-7">
                                    <span className="font-bold text-xl">{org.name}</span>
                                    {org.description && (
                                        <p>
                                            <TransText
                                                en={org.description.en}
                                                ar={org.description.ar}
                                                fr={org.description.fr}
                                            />
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};
