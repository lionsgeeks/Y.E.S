


import TransText from "@/components/TransText";

export const CommitteeSection = ({ committee = [] }) => {
    const { selectedLanguage } = "en";

    return (
        <>
            <section
                dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                className={`px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 text-black`}
            >
                <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
                    <TransText en="The Scientific Committee" ar="اللجنة العلمية" fr="Le Comité Scientifique" />
                </h2>
                <div>

                </div>
                {/* Sponsors-like grid: simple responsive rows with equal width cards */}
                <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 mt-6">
                    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 ${selectedLanguage == "ar" ? "direction-rtl" : ""}`}>
                        {committee.map((member, index) => (
                            <a key={index} href={member.linkedin_url || '#'} target="_blank" className="group flex flex-col items-center text-center">
                                <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                                    <img
                                        loading="lazy"
                                        src={`/storage/images/${member.photo_path}`}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-full border group-hover:opacity-90 transition"
                                    />
                                </div>
                                <div className="mt-3">
                                    <div className="text-sm md:text-base font-medium">{member.name}</div>
                                    {member.position && (
                                        <div className="text-xs md:text-sm text-muted-foreground mt-1">{member.position}</div>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* end grid wrapper */}
            </section>
        </>
    );
};
