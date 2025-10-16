
import TransText from "@/components/TransText";


export const AboutSection = () => {
    const { selectedLanguage } = "en";

    return (
        <>
            <div
className={`w-full h-[50vh] bg-muted-background relative z-10 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-[url('/assets/images/africa4.jpg')] bg-[position:center_10%]`}
            >

                <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50%  to-alpha opacity-85 -z-10"></div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl/none">
                    <TransText
                        en="Youth Empowerment Summit Africa"
                        ar="Youth Empowerment Summit Africa"
                        fr="Youth Empowerment Summit Africa" />
                </h1>
                <p className="lg:text-2xl text-2xl lg:w-[62.5%] ">
                    <TransText
                        ar="من 70 مليون شاب أفريقي خارج التعليم أو العمل إلى 70 مليون صانع"
                        en="From 70 Million African NEETs to 70 Million Doers"
                        fr="De 70 Millions de NEETs Africains à 70 Millions de Faiseurs"
                    />

                </p>
            </div>
            <section
                className={`px-8 md:px-12 bg-muted-background lg:px-16 py-16 md:py-20 lg:py-10 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6 `}
            >
                <h1
                    className={`text-3xl text-alpha font-bold tracking-tighter md:text-5xl lg:text-6xl/none ${selectedLanguage == "ar" ? 'text-end' : ''}`}>
                    <TransText en="About Yes Africa" ar=" Yes Africa حول " fr="À propos de Yes Africa" />
                </h1>

                <div

                    className={`flex flex-wrap gap-4 md:gap-6 lg:gap-12 ${selectedLanguage == "ar" ? "flex-row-reverse" : "flex-row"}`}
                >
                    <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
                        <h2 className={`}text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none ${selectedLanguage == "ar" ? 'text-end' : ''}`}>
                            <TransText en="Our Mission" ar="مهمتنا" fr="Notre mission" />
                        </h2>
                        <p
                            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                            className={`text-muted-foreground md:text-base/relaxed lg:text-lg/snug `}>
                            <TransText
                                en="Y.E.S Africa (Youth Empowerment Summit Africa) is a crucial initiative dedicated to addressing the growing challenge of NEET (Not in Education, Employment, or Training) youth in Africa, with projections estimating this number to exceed 70 million by 2025. This alarming trend poses significant risks not only to the future of these young individuals but also to the continent as a whole. Our mission is to transform this staggering statistic from 70 million NEETs to 70 million Doers by fostering collaboration among civil society leaders, local communities, and private sector stakeholders."
                                ar="تعتبر Y.E.S Africa (قمة تمكين الشباب في إفريقيا) مبادرة حاسمة تهدف إلى معالجة التحدي المتزايد للشباب غير المنخرطين في التعليم أو العمل أو التدريب (NEET) في إفريقيا، حيث تشير التوقعات إلى أن هذا العدد سيتجاوز 70 مليونًا بحلول عام 2025. يشكل هذا الاتجاه المقلق مخاطر كبيرة ليس فقط على مستقبل هؤلاء الشباب ولكن أيضًا على القارة ككل. مهمتنا هي تحويل هذا الرقم المذهل من 70 مليون شاب عاطل إلى 70 مليون فاعل من خلال تعزيز التعاون بين قادة المجتمع المدني والمجتمعات المحلية وأصحاب المصلحة في القطاع الخاص."
                                fr="Y.E.S Africa (Youth Empowerment Summit Africa) est une initiative cruciale dédiée à relever le défi croissant des jeunes NEET (ni en éducation, ni en emploi, ni en formation) en Afrique, avec des projections estimant que ce nombre dépassera 70 millions d'ici 2025. Cette tendance alarmante représente des risques importants non seulement pour l'avenir de ces jeunes, mais aussi pour l'ensemble du continent. Notre mission est de transformer cette statistique stupéfiante de 70 millions de NEET en 70 millions d'acteurs en favorisant la collaboration entre les leaders de la société civile, les communautés locales et les parties prenantes du secteur privé."
                            />
                        </p>
                    </div>

                    <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
                        <h2 className={`}text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none ${selectedLanguage == "ar" ? 'text-end' : ''}`}>
                            <TransText en="Our Vision" ar="رؤيتنا" fr="Notre vision" />
                        </h2>
                        <p
                            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                            className={`text-muted-foreground md:text-base/relaxed lg:text-lg/snug ${selectedLanguage != "ar" && "text-justify "}`}>
                            <TransText
                                en="Our vision is to empower youth across Africa by providing them with the skills and opportunities necessary to become active contributors to their communities and the global economy. Y.E.S Africa aims to serve as a marketplace dedicated to funding innovative programs that focus on reducing the proportion of NEET youth. By partnering with African and international donors, we strive to create a sustainable support system for youth empowerment."
                                ar="رؤيتنا هي تمكين الشباب في جميع أنحاء إفريقيا من خلال تزويدهم بالمهارات والفرص اللازمة ليصبحوا مساهمين نشطين في مجتمعاتهم والاقتصاد العالمي. تهدف Y.E.S Africa إلى أن تكون منصة مخصصة لتمويل البرامج المبتكرة التي تركز على تقليل نسبة الشباب غير المنخرطين في التعليم أو العمل أو التدريب. من خلال الشراكة مع المانحين الأفارقة والدوليين، نسعى إلى إنشاء نظام دعم مستدام لتمكين الشباب."
                                fr="Notre vision est d'autonomiser les jeunes à travers l'Afrique en leur fournissant les compétences et les opportunités nécessaires pour devenir des contributeurs actifs à leurs communautés et à l'économie mondiale. Y.E.S Africa vise à servir de place de marché dédiée au financement de programmes innovants axés sur la réduction de la proportion des jeunes NEET. En collaborant avec des donateurs africains et internationaux, nous nous efforçons de créer un système de soutien durable pour l'autonomisation des jeunes."
                            />
                        </p>
                    </div>

                    <div className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
                        <h2 className={`}text-xl text-beta font-medium tracking-tighter md:text-2xl lg:text-3xl/none ${selectedLanguage == "ar" ? 'text-end' : ''}`}>
                            <TransText en="Our Approach" ar="نهجنا" fr="Notre approche" />
                        </h2>
                        <p
                            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                            className={`text-muted-foreground md:text-base/relaxed lg:text-lg/snug ${selectedLanguage != "ar" && "text-justify "}`}>
                            <TransText
                                en="Through targeted training programs, Y.E.S Africa will strengthen the capacity of NGOs working in the field of youth empowerment. The capacity-building program will focus on key areas, including:
        - Technical and financial project development
        - Constructing the logical framework of a project
        - Risk assessment and planning
        - Monitoring and evaluation tools for projects
        - Impact measurement tools for projects
        - Sharing key success factors for project calls
        By equipping NGOs with these essential skills, we empower them to effectively implement impactful projects that address the needs of NEET youth. Y.E.S Africa serves as a platform for exchanging experiences, sharing best practices, and fostering collaboration among stakeholders committed to creating a brighter future for young people on the continent. Together, we can turn the tide for millions, transforming them into active participants in society and the economy."
                                ar="من خلال برامج تدريبية مستهدفة، ستعمل Y.E.S Africa على تعزيز قدرات المنظمات غير الحكومية العاملة في مجال تمكين الشباب. سيركز برنامج بناء القدرات على المجالات الرئيسية التالية:
        - تطوير المشاريع الفنية والمالية
        - إنشاء الإطار المنطقي للمشروع
        - تقييم المخاطر والتخطيط
        - أدوات الرصد والتقييم للمشاريع
        - أدوات قياس التأثير للمشاريع
        - مشاركة العوامل الرئيسية لنجاح المشاريع
        من خلال تزويد المنظمات غير الحكومية بهذه المهارات الأساسية، فإننا نمكنها من تنفيذ مشاريع فعالة تلبي احتياجات الشباب غير المنخرطين في التعليم أو العمل أو التدريب. توفر Y.E.S Africa منصة لتبادل الخبرات ومشاركة أفضل الممارسات وتعزيز التعاون بين أصحاب المصلحة الملتزمين بخلق مستقبل أكثر إشراقًا للشباب في القارة. معًا، يمكننا تغيير المسار لملايين الشباب وتحويلهم إلى مشاركين نشطين في المجتمع والاقتصاد."
                                fr="Grâce à des programmes de formation ciblés, Y.E.S Africa renforcera la capacité des ONG travaillant dans le domaine de l'autonomisation des jeunes. Le programme de renforcement des capacités se concentrera sur des domaines clés, notamment:
        - Développement technique et financier des projets
        - Construction du cadre logique d'un projet
        - Évaluation des risques et planification
        - Outils de suivi et d'évaluation des projets
        - Outils de mesure d'impact des projets
        - Partage des facteurs clés de succès des appels à projets
        En dotant les ONG de ces compétences essentielles, nous leur permettons de mettre en œuvre efficacement des projets percutants qui répondent aux besoins des jeunes NEET. Y.E.S Africa sert de plateforme d'échange d'expériences, de partage des meilleures pratiques et de renforcement de la collaboration entre les parties prenantes engagées dans la création d'un avenir meilleur pour les jeunes du continent. Ensemble, nous pouvons inverser la tendance et transformer des millions de jeunes en acteurs actifs de la société et de l'économie."
                            />
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};
