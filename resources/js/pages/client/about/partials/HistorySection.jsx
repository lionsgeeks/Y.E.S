
import TransText from "@/components/TransText";


export const HistorySection = () => {
    const { selectedLanguage } = "en";

    return (
        <>
            <section
                className={`bg-muted-background px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 ${selectedLanguage == "ar" && "text-end"
                    }`}
            >
                <h2 className="text-xl text-alpha font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
                    <TransText en="Our History" ar="تاريخنا" />
                </h2>
                <div
                    className={`flex flex-wrap gap-4 md:gap-6 lg:gap-12 ${selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"
                        }`}
                >
                    {[
                        {
                            period: "2010 - 2015",
                            description: {
                                en: "Our organization was founded in 2010 with the goal of bringing together the brightest minds in science and technology. In the early years, we focused on building a strong foundation and establishing our presence in the community.",
                                ar: "تأسست منظمتنا في عام 2010 بهدف جمع أذكى العقول في مجال العلوم والتكنولوجيا. في السنوات الأولى ، ركزنا على بناء أساس قوي وتأسيس وجودنا في المجتمع.",
                            },
                        },
                        {
                            period: "2016 - 2021",
                            description: {
                                en: "During this period, we expanded our reach and began organizing larger-scale events and conferences. We established partnerships with leading universities and research institutions, and our work gained recognition on the global stage.",
                                ar: "خلال هذه الفترة ، وسعنا نطاقنا وبدأنا في تنظيم أحداث ومؤتمرات على نطاق أوسع. أقمنا شراكات مع جامعات ومؤسسات بحثية رائدة ، وحظي عملنا بالاعتراف على المستوى العالمي.",
                            },
                        },
                        {
                            period: "2022 - Present",
                            description: {
                                en: "In recent years, we have continued to grow and evolve, adapting to the changing needs of the scientific community. We have launched new initiatives and programs to support emerging researchers and entrepreneurs, and our impact has only continued to expand.",
                                ar: "في السنوات الأخيرة ، استمرينا في النمو والتطور ، والتكيف مع احتياجات المجتمع العلمي المتغيرة. لقد أطلقنا مبادرات وبرامج جديدة لدعم الباحثين ورواد الأعمال الناشئين ، ولم يتوقف تأثيرنا إلا عن التوسع.",
                            },
                        },
                    ].map(({ period, description }, index) => (
                        <div key={index} className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
                            <h2 className="text-lg text-beta font-medium tracking-tighter md:text-xl lg:text-2xl/none">
                                {period}
                            </h2>
                            <p className="text-muted-foreground text-base/relaxed text-balance lg:text-lg/snug">
                                <TransText {...description} />
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
