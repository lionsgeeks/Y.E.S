


const diop = "/assets/images//comittee-scientifique/DIOP.jfif";
const benelfadil = "/assets/images//comittee-scientifique/BENELAFDIL.jpg";
const boujanoui = "/assets/images//comittee-scientifique/BOUJANOUI.jpg";
const boutzil = "/assets/images//comittee-scientifique/BOUTZIL.jfif";
const diedhiou = "/assets/images//comittee-scientifique/Diedhiou.jfif";
const mbassi = "/assets/images//comittee-scientifique/Mbassi.jpg";
const bakor = "/assets/images//comittee-scientifique/bakor.jpg";
const bening = "/assets/images//comittee-scientifique/bening.jpg";
const santos = "/assets/images//comittee-scientifique/SANTOS.jfif";
const barba = "/assets/images//comittee-scientifique/BARBA.jfif";
const diffo = "/assets/images//comittee-scientifique/DIFFO.jfif";
import TransText from "@/components/TransText";

export const CommitteeSection = () => {
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
                <div
                    className={`flex flex-wrap gap-4 mt-4 md:gap-6 lg:gap-12 ${selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
                        }`}
                >
                    {[
                        {
                            name: "M. Jean Pierre ELONG MBASSI",
                            job: { en: "Secretary General of the United Cities and Local Governments of Africa - President of the Scientific Committee", ar: "الأمين العام للمدن والحكومات المحلية في أفريقيا - رئيس اللجنة العلمية", fr: "Secrétaire Général des Cités et Gouvernements Locaux Unis d'Afrique - Président du Comité Scientifique" },
                            image: mbassi,
                            linkedin: "https://www.linkedin.com/in/jean-pierre-elong-mbassi-9b2b3ab9",
                        },
                        {
                            name: "M. Hamid BEN ELAFDIL",
                            job: {
                                en: "Talent and Startup Finder & Social Entrepreneur & President of Jadara Foundation",
                                ar: "مكتشف المواهب والشركات الناشئة & رائد أعمال اجتماعي & رئيس مؤسسة جدارة",
                                fr: "Détecteur de talents et de startups & Entrepreneur social & Président de la Fondation Jadara"
                            },
                            image: benelfadil,
                            linkedin: "https://www.linkedin.com/in/hamidbenelafdil",
                        },
                        {
                            name: "Mme. Ileana SANTOS",
                            job: {
                                en: "Strategy Consultant and Co-founder of Je M'engage pour l'Afrique",
                                ar: "استشارية في الاستراتيجية وعضو مؤسس في مؤسسة أنا ألتزم من أجل أفريقيا",
                                fr: "Consultante en stratégie et Co-fondatrice de Je M'engage pour l'Afrique"
                            },
                            image: santos,
                            linkedin: "https://www.linkedin.com/in/ileana-santos-243b31108",
                        },
                        {
                            name: "Salaheddine BAKOR",
                            job: {
                                en: "Deputy Secretary General of the Pan-African Youth Union",
                                ar: "نائب الأمين العام لاتحاد الشباب الإفريقي",
                                fr: "Secrétaire Général Adjoint de l'Union Panafricaine de la Jeunesse"
                            },
                            image: bakor,
                            linkedin: "https://www.linkedin.com/in/salaheddine-bakor-01913359/"
                        },
                        {
                            name: "BENING AHMED WIISICHONG",
                            job: {
                                en: "General Secretary of the Pan-African Youth Union",
                                ar: "الأمين العام لاتحاد الشباب الإفريقي",
                                fr: "Secrétaire Général de l'Union Panafricaine de la Jeunesse"
                            },
                            image: bening,
                            linkedin: "https://www.linkedin.com/in/bening-ahmed-wiisichong-76663828/"
                        },
                        {
                            name: "Mme Hasnaâ BOUTZIL",
                            job: {
                                en: "Speaker, trainer, moderator, coach, strategy and development advisor",
                                ar: "متحدثة، مدربة، معدة، مدربة، مستشارة في الاستراتيجية والتطوير",
                                fr: "Conférencière, formatrice, modératrice, coach, conseillère en stratégie et développement"
                            },
                            image: boutzil,
                            linkedin: "https://www.linkedin.com/in/hasna%C3%A2-boutzil-9787ab24",
                        },
                        {
                            name: "M. Cheikh MAMINA DIEDHIOU",
                            job: {
                                en: "Senior ESG Officer - AFRICA 50",
                                ar: "المسؤول الرئيسي للبيئة والمجتمع والحوكمة - أفريقيا 50",
                                fr: "Responsable ESG Senior - AFRICA 50"
                            },
                            image: diedhiou,
                            linkedin: "https://www.linkedin.com/in/cheikh-mamina-diedhiou-14b2931a",
                        },

                        {
                            name: "Mme Khadija BOUJANOUI",
                            job: {
                                en: "Director of the Support Department at 2M, President of the Gender Equality and Diversity Committee - President of Lions Geek",
                                ar: "مديرة قسم الدعم في 2M، رئيسة لجنة المساواة بين الجنسين والتنوع - رئيسة Lions Geek",
                                fr: "Directrice du Département Support chez 2M, Présidente du Comité de l'Égalité des Genres et de la Diversité - Présidente de Lions Geek"
                            },
                            image: boujanoui,
                            linkedin: "https://www.linkedin.com/in/khadija-boujanoui",
                        },


                        {
                            name: "M. Abdou SOULEYE DIOP",
                            job: {
                                en: "Managing Partner - FORVIS MAZARS",
                                ar: "العضو المدير - فورفيس مازارز",
                                fr: "Associé Directeur - FORVIS MAZARS"
                            },
                            image: diop,
                            linkedin: "https://www.linkedin.com/in/abdoudiop",
                        },



                    ].map(({ name, job, image, linkedin }, index) => (
                        <div
                            key={index}
                            className="flex items-center flex-col w-full md:w-[calc(calc(100%-calc(2*3rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
                        >
                            <a href={linkedin}
                                target="_blank"
                                className="flex items-center justify-center"
                            >
                                <img
                                    loading="lazy"
                                    className="mb-3 aspect-square object-cover w-[140px] border rounded-full"
                                    src={image}
                                    alt={`${name}'s image`}
                                />
                            </a>
                            <h2 className="text-base capitalize font-medium tracking-tighter md:text-lg lg:text-xl/none text-center">
                                {name}
                            </h2>
                            <p className="text-muted-foreground text-sm/relaxed text-balance lg:text-base/snug text-center mt-3">
                                <TransText {...job} />
                            </p>
                        </div>
                    ))}



                </div>
            </section>
        </>
    );
};