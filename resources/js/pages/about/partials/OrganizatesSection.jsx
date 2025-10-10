


const ucgc = "/assets/images/sponsors/ucgc.jpg";
const lionsgeek = "/assets/images/sponsors/lionsgeek.png";
const jadara = "/assets/images/sponsors/Jadaralogo.png";
const epic = "/assets/images/sponsors/epic-afric.jpg";
const pan = "/assets/images/sponsors/pan.jpeg";
const kamlin = "/assets/images/sponsors/kamlin.jpeg";
const Méditerranée = "/assets/images/sponsors/Méditerranée.jpg";
const RMed = "/assets/images/sponsors/RMed_Logo_IECD.png";
import { CommitteeSection } from "./CommitteeSection";
import TransText from "@/components/TransText";

export const OrganizatesSection = () => {
    const { selectedLanguage } = "en";

    const organizers = [
        {
            logo: jadara,
            title: "Jadara Foundation",
            text: (
                <TransText
                    en="a Moroccan non-profit association recognized as serving the public good, created in 2002. Its mission is to allow every young person to choose and build their future with confidence and ambition, without being subjected to social, territorial, disability, or gender determinism. Every year, we search for, mobilize, and identify young people to inspire, guide, support them financially, provide them with a mentor, and develop their transversal skills. To achieve this, we deploy social ascent programs supported by educational partners, impact-driven companies, committed volunteers, and donors who are sensitive to our cause. The Foundation, with over two decades of experience, has developed a robust model that positions it today as a key player in the third sector. This long journey has been marked by impact and sustainable successes, allowing the Foundation to consolidate its reputation as a catalyst for social ascent in Morocco. Today, as a reliable third-sector actor, the Foundation continues to work with determination to contribute to significant and lasting changes, further strengthening its position as a trusted partner and engine for social progress that has transformed the lives of over 2,750 young people in Morocco."
                    ar="جمعية مغربية غير ربحية معترف بها كمؤسسة ذات منفعة عامة، تأسست في عام 2002. مهمتها هي تمكين كل شاب من اختيار وبناء مستقبله بثقة وطموح، دون أن يكون خاضعًا للتحديدات الاجتماعية أو الجغرافية أو الإعاقة أو الجنس. كل عام، نبحث عن شباب، ونجمعهم، ونعرفهم لنبث فيهم الإلهام، ونوجههم، وندعمهم ماليًا، ونوفر لهم مرشدًا، ونعمل على تطوير مهاراتهم العابرة للتخصصات. لتحقيق ذلك، نشرع في تنفيذ برامج للارتقاء الاجتماعي بدعم من شركاء تربويين، وشركات تسعى لتحقيق التأثير، ومتطوعين ملتزمين، ومانحين مهتمين بقضيتنا. على مدار أكثر من عقدين من الخبرة، وضعت المؤسسة نموذجًا قويًا جعلها اليوم لاعبًا رئيسيًا في القطاع الثالث. لقد تميزت هذه المسيرة الطويلة بتأثيرها ونجاحاتها المستدامة، مما ساعد المؤسسة على تعزيز سمعتها كحافز للارتقاء الاجتماعي في المغرب. اليوم، بصفتها لاعبًا موثوقًا في القطاع الثالث، تواصل المؤسسة عملها بإصرار للمساهمة في إحداث تغييرات هامة ودائمة، مما يعزز مكانتها كشريك موثوق ومحرّك للتقدم الاجتماعي الذي غيّر حياة أكثر من 2750 شابًا في المغرب."
                    fr=" une association marocaine à but non lucratif reconnue d’utilité publique, créée en 2002. Sa mission est de permettre à chaque jeune de choisir et de construire son avenir avec confiance et ambition, sans être soumis aux déterminismes sociaux, territoriaux, du handicap ou du genre. Chaque année, nous recherchons, mobilisons et identifions des jeunes pour les inspirer, les guider, les soutenir financièrement, leur fournir un mentor et développer leurs compétences transversales. Pour ce faire, nous déployons des programmes d'ascension sociale soutenus par des partenaires éducatifs, des entreprises à impact, des bénévoles engagés et des donateurs sensibles à notre cause. Forte de plus de vingt ans d'expérience, la Fondation a développé un modèle robuste qui en fait aujourd’hui un acteur clé du secteur tertiaire. Ce long parcours a été marqué par des impacts et des succès durables, permettant à la Fondation de consolider sa réputation de catalyseur de l'ascension sociale au Maroc. Aujourd'hui, en tant qu'acteur fiable du secteur tertiaire, la Fondation continue de travailler avec détermination pour contribuer à des changements significatifs et durables, renforçant ainsi sa position de partenaire de confiance et moteur du progrès social qui a transformé la vie de plus de 2 750 jeunes au Maroc."
                />
            ),
            Technical: false
        },
        // {
        //     logo: pan,
        //     title: "Pan-African Youth Union",
        //     text: (
        //         <TransText en="The Pan-African Youth Union (PYU) is a continental organization dedicated to empowering African youth and promoting unity, peace, and sustainable development. Founded in 1962 in Conakry, Guinea, originally as the Pan-African Youth Movement (PYM), it played a crucial role in mobilizing youth for Africa’s decolonization. Today, UPJ unites national youth councils, civil society organizations, and regional platforms to foster African integration and strengthen the values of the African Union (AU). Working alongside governments and development partners, it continues to adapt to the evolving challenges of African youth, ensuring their active participation in shaping the continent’s future."
        //             fr="L'Union panafricaine de la jeunesse (UPJ) est une organisation continentale dédiée à l'autonomisation des jeunes africains et à la promotion de l'unité, de la paix et du développement durable. Fondée en 1962 à Conakry, en Guinée, à l'origine sous le nom de Mouvement panafricain de la jeunesse (MPJ), elle a joué un rôle crucial dans la mobilisation des jeunes pour la décolonisation de l'Afrique. Aujourd'hui, le PUY réunit les conseils nationaux de la jeunesse, les organisations de la société civile et les plateformes régionales pour favoriser l'intégration africaine et renforcer les valeurs de l'Union africaine (UA). En collaborant avec les gouvernements et les partenaires au développement, il continue de s'adapter aux défis évolutifs des jeunes africains, garantissant leur participation active à la construction de l'avenir du continent."
        //             ar="الاتحاد الإفريقي للشباب (PYU) هو منظمة قارية مكرسة لتمكين الشباب الإفريقي وتعزيز الوحدة والسلام والتنمية المستدامة. تأسست في عام 1962 في كوناكري، غينيا، تحت اسم حركة الشباب الإفريقي (MPJ)، ولعبت دوراً حاسماً في تحفيز الشباب من أجل تحرر إفريقيا من الاستعمار. اليوم، يوحد PUY مجالس الشباب الوطنية، ومنظمات المجتمع المدني، والمنصات الإقليمية لتعزيز التكامل الإفريقي وتقوية قيم الاتحاد الإفريقي (UA). يعمل الاتحاد جنباً إلى جنب مع الحكومات والشركاء في التنمية، ويستمر في التكيف مع التحديات المتزايدة التي يواجهها الشباب الإفريقي، مما يضمن مشاركتهم الفعالة في تشكيل مستقبل القارة." />
        //     ),
        //     Technical: false

        // },

        //     {
        //       logo: epic,
        //       title: "EPIC-Africa",
        //       text: (
        //         <TransText
        //           en="EPIC-Africa is a nonprofit organization dedicated to strengthening African civil society by promoting transparency, accountability, and collaboration. It supports civil society organizations (CSOs) through research, data analysis, and initiatives like the African CSO Platform. EPIC-Africa fosters partnerships to enhance the impact of CSOs in building a better future for Africa. Recognized as a thought leader, the organization has contributed to global discussions on the role of international NGOs and locally-led development. Its intellectual leadership is reflected in its publications, including research reports, articles, book chapters, and interviews."
        //           ar="EPIC-Africa هي منظمة غير ربحية مكرسة لتعزيز المجتمع المدني الأفريقي من خلال تعزيز الشفافية والمساءلة والتعاون. تدعم المنظمة منظمات المجتمع المدني (OSC) عبر الأبحاث وتحليل البيانات ومبادرات مثل منصة المنظمات المدنية الأفريقية. تعزز EPIC-Africa الشراكات لزيادة تأثير المنظمات المدنية في بناء مستقبل أفضل لأفريقيا.
        // معروفة كجهة فكرية رائدة، ساهمت المنظمة في مناقشات عالمية حول دور المنظمات الدولية غير الحكومية والتنمية المحلية. يظهر قيادتها الفكرية من خلال منشوراتها، بما في ذلك تقارير الأبحاث والمقالات وفصول الكتب و المقابلات."
        //           fr="EPIC-Africa est une organisation à but non lucratif dédiée au renforcement de la société civile africaine en promouvant la transparence, la responsabilité et la collaboration. Elle soutient les organisations de la société civile (OSC) à travers la recherche, l'analyse de données et des initiatives telles que la Plateforme des OSC africaines. EPIC-Africa favorise les partenariats pour accroître l'impact des OSC dans la construction d'un avenir meilleur pour l'Afrique. Reconnu comme un leader d'opinion, l'organisation a contribué à des discussions mondiales sur le rôle des ONG internationales et le développement dirigé localement. Son leadership intellectuel se reflète dans ses publications, telles que des rapports de recherche, des articles, des chapitres de livres et des interviews."
        //         />
        //       ),
        //       Technical: false
        //     },




    ];

    const tech_partners = [

        {
            logo: lionsgeek,
            title: "LionsGeek",
            text: (
                <TransText
                    en="LionsGeek is the result of a partnership between 2M, MolenGeek, Charlewood, the Belgian Radio and Television RTBF; as well as the Ministry of Economic Inclusion, Small Business, Employment, and Skills, the Wallonia-Brussels Region, through the General Delegation of Wallonia-Brussels in Morocco, and the Association for the Promotion of Education and Training Abroad (APEFE). It is an association focused on an inclusive action in favor of young people in NEET (Not in Education, Employment, or Training) situations. LionsGeek offers diverse support tailored to the needs of each individual, centered around three main areas of intervention: a full-time training program, an incubator for project holders, and a coworking space.  LionsGeek aims to meet the various expectations of young people and the job market through long-term training, short courses, and certification programs in multimedia and digital fields."
                    ar="LionsGeek هو ثمرة شراكة بين 2M، MolenGeek، Charlewood، وإذاعة التلفزيون البلجيكي RTBF؛ بالإضافة إلى وزارة الإدماج الاقتصادي، والمشاريع الصغيرة، والتوظيف، والمهارات، ومنطقة والونيا بروكسل، من خلال الوفد العام لوالونيا-بروكسل في المغرب، والجمعية من أجل تعزيز التعليم والتكوين في الخارج (APEFE). هي جمعية موجهة نحو العمل الشامل لصالح الشباب في وضع NEET (ليس في التعليم، أو العمل، أو التدريب). يقدم LionsGeek دعمًا متنوعًا ومناسبًا لاحتياجات كل فرد، مع التركيز على ثلاث محاور رئيسية: برنامج تدريب بدوام كامل، حاضنة لحاملي المشاريع، ومساحة للعمل المشترك. يهدف LionsGeek إلى تلبية مختلف توقعات الشباب وسوق العمل من خلال برامج تدريبية طويلة، ودورات قصيرة، وبرامج تدريب معتمدة في مجالات الوسائط المتعددة والرقمنة."
                    fr="LionsGeek est le résultat d'un partenariat entre 2M, MolenGeek, Charlewood, la Radio et Télévision belge RTBF, ainsi que le Ministère de l'Inclusion économique, des Petites entreprises, de l'Emploi et des Compétences, la Région Wallonie-Bruxelles, à travers la Délégation générale Wallonie-Bruxelles au Maroc, et l'Association pour la Promotion de l'Éducation et de la Formation à l'Étranger (APEFE). Il s'agit d'une association axée sur une action inclusive en faveur des jeunes en situation NEET (Ni en éducation, ni en emploi, ni en formation). LionsGeek offre un soutien diversifié adapté aux besoins de chaque individu, centré sur trois principaux domaines d'intervention : un programme de formation à temps plein, un incubateur pour les porteurs de projets, et un espace de coworking. LionsGeek vise à répondre aux différentes attentes des jeunes et du marché du travail à travers des formations longues, des cours courts et des programmes de certification dans les domaines des médias et du numérique."
                />
            ),
            Technical: false
        },


        {
            logo: Méditerranée,
            logo2: RMed,
            title: "IECD",
            text: (
                <TransText
                    en="The Mediterranean New Chance Network is a project led by the European Institute for Cooperation and Development (IECD), an international solidarity organization founded in 1988 and recognized as a public-interest entity. Its mission is to unite and strengthen innovative and sustainable socio-professional integration programs in the Mediterranean region, in order to offer new opportunities to young people in vulnerable situations."
                    ar="(IECD)شبكة المتوسط فرصة جديدة هي مشروع يقوده المعهد الأوروبي للتعاون والتنمية ، وهي منظمة تضامن دولي تأسست عام 1988 ومعترف بها كمؤسسة ذات منفعة عامة. وتتمثل مهمتها في توحيد وتعزيز البرامج المبتكرة والمستدامة للإدماج الاجتماعي والمهني في منطقة البحر الأبيض المتوسط، وذلك من أجل توفير فرص جديدة للشباب في أوضاع هشة."
                    fr="Le réseau Méditerranée Nouvelle Chance est un projet piloté par l’Institut européen de coopération et développement (IECD), organisation de solidarité internationale fondée en 1988 et reconnue d'utilisé publique. Il a pour mission de Fédérer et renforcer les dispositifs innovants et durables de l'insertion socio-professionnelle dans la région méditerranéenne, afin d'offrir de nouvelles chances aux jeunes en situation de vulnérabilité"
                />
            ),
            Technical: false
        },
        {
            logo: kamlin,
            logo2: "Lab",
            title: "Kamlin Lab",
            text: (
                <TransText
                    en="Kamlin Lab transforms social action by combining innovation and commitment. We provide associations with digital tools and tailored training to strengthen their impact, visibility, and access to funding. Through our hybrid platform, we connect associations with strategic partners and facilitate their professionalization. By integrating technology at the core of our solutions, we optimize the management, communication, and field engagement of civil society actors. Kamlin Lab: the digital lever that energizes civil society and amplifies its impact!"
                    ar="يحول Kamlin Lab العمل الاجتماعي من خلال الجمع بين الابتكار والالتزام. نحن نقدم للجمعيات أدوات رقمية وتدريبًا مخصصًا لتعزيز تأثيرها ورؤيتها وإمكانية وصولها إلى التمويل. من خلال منصتنا الهجينة، نربط الجمعيات بشركاء استراتيجيين ونسهل احترافهم. من خلال دمج التكنولوجيا في صميم حلولنا، نقوم بتحسين إدارة الجهات الفاعلة في المجتمع المدني واتصالها ومشاركتها الميدانية. Kamlin Lab: الرافعة الرقمية التي تنشط المجتمع المدني وتضخم تأثيره!"
                    fr="Kamlin Lab transforme l’action sociale en alliant innovation et engagement. Nous offrons aux associations des outils digitaux et des formations sur mesure pour renforcer leur impact, leur visibilité et leur accès aux financements. Grâce à notre plateforme hybride, nous connectons les associations à des partenaires stratégiques et facilitons leur professionnalisation. En intégrant la technologie au cœur de nos solutions, nous optimisons la gestion, la communication et l’engagement terrain des acteurs issus de la société civile. Kamlin Lab : le levier numérique qui dynamise la société civile et amplifie son impact !"
                />
            ),
            Technical: false
        }
    ]


    return (
        <>
            <section
                dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                className={`lg:py-12 flex flex-col justify-center gap-3 md:gap-2 bg-white  `}
            >



                <h2 className="text-3xl md:text-5xl lg:text-5xl/none  text-alpha font-bold tracking-tighter px-2 md:px-3 lg:px-14 py-4 md:py-5 ">
                    <TransText en="The Organizers" ar="منظمون" fr="Organisateurs" />
                </h2>
                <div>
                    {organizers.map((org, ind) => (
                        <>

                            <div
                                key={ind}
                                className={` px-6 text-justify md:px-10 lg:px-14 py-14 md:py-10 my-8 flex justify-between  text-black items-start gap-6 flex-col ${ind % 2 != 1
                                    ? "lg:flex-row bg-muted-background"
                                    : "lg:flex-row-reverse bg-white"
                                    }`}
                            >

                                <div
                                    className={`flex items-center justify-center  md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 == 1 ? "bg-muted-background" : "bg-white"
                                        }`}
                                >

                                    {org.logo2 && (
                                        <img
                                            src={org.logo2}
                                            alt=""
                                            className={` ${org.logo2 == ucgc ? "w-[210px]" : org.logo2 == epic ? "w-[400px]  " : "w-[120px] lg:w-[180px] px-5 mix-blend-darken"
                                                }`}
                                        />
                                    )}

                                    <img
                                        src={org.logo}
                                        alt=""
                                        className={` ${org.logo == ucgc ? "w-[210px]" : org.logo == epic ? "w-[400px]  " : "w-[120px] lg:w-[180px]"
                                            }`}
                                    />
                                </div>

                                <div className="w-full lg:w-[50%] text-lg leading-7">
                                    {org.Technical == true && <h1 className="p-1 text-xs font-bold rounded-lg font-sans bg-alpha text-white  w-fit"><TransText en="Technical partner" fr="Partenaire technique" ar="شريك تقني" /></h1>}
                                    <span className="font-bold text-xl">{org.title}: </span>
                                    <p>{org.text}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

                <CommitteeSection />


                <h2 className="text-3xl md:text-5xl bg-muted-background lg:text-5xl/none  text-alpha font-bold tracking-tighter px-2 md:px-3 lg:px-14 py-7 md:py-8">
                    <TransText en="Technical Partners" ar="الشركاء التقنيون" fr="Partenaires techniques" />
                </h2>
                <div>
                    {tech_partners.map((org, ind) => (
                        <>

                            <div
                                key={ind}
                                className={`text-black px-6 text-justify md:px-10 lg:px-14 py-14 md:py-10 my-8 flex justify-between items-start gap-6 flex-col ${ind % 2 == 1
                                    ? "lg:flex-row bg-muted-background"
                                    : "lg:flex-row-reverse bg-white"
                                    }`}
                            >

                                <div
                                    className={`flex items-center justify-center  md:bg-transparent w-full lg:w-[40%] sticky top-[75px] ${ind % 2 == 1 ? "bg-muted-background" : "bg-white"
                                        }`}
                                >

                                    {org.logo2 && (
                                        <img
                                            src={org.logo2}
                                            alt=""
                                            className={` ${org.logo2 == ucgc ? "w-[210px]" : org.logo2 == epic ? "w-[400px]  " : "w-[120px] lg:w-[180px] px-5"
                                                }`}
                                        />
                                    )}

                                    <img
                                        src={org.logo}
                                        alt=""
                                        className={` ${org.logo == ucgc ? "w-[210px]" : org.logo == epic ? "w-[400px]  " : "w-[120px] lg:w-[180px]"
                                            }`}
                                    />
                                </div>

                                <div className="w-full lg:w-[50%] text-lg leading-7">
                                    {org.Technical == true && <h1 className="p-1 text-xs font-bold rounded-lg font-sans bg-alpha text-white  w-fit"><TransText en="Technical partner" fr="Partenaire technique" ar="شريك تقني" /></h1>}
                                    <span className="font-bold text-xl">{org.title}: </span>
                                    <p>{org.text}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </section>
        </>
    );
};
