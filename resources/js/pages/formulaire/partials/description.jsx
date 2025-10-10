import React from "react";
import TransText from "@components/TransText";
import { router } from "@inertiajs/react";

const Description = () => {
  const { selectedLanguage } = "en";
  const docs = {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSewPV6To23bNyjIlBZjAz_2IGq33bEOkbCBOjfBHdOlAwcwtA/viewform",
    fr: "https://docs.google.com/forms/d/e/1FAIpQLScSAoRrStJMmYN8vI11oY2H1B4jTtfZqTcdcNK2Xtc_hSanIA/viewform",
    ar: "https://docs.google.com/forms/d/e/1FAIpQLScIxRPbs8aTPmZh4Yi1E_qkU3BoNCEvX0kPWhEUFi5pHMCCqA/viewform",
    pr: "https://docs.google.com/forms/d/e/1FAIpQLSfWoQkJBDXGCPPOlTfybBg4IiqAl5_yNLc-FUnypzvSPeDPTg/viewform",
    sw: "https://docs.google.com/forms/d/e/1FAIpQLSc63QYGfgEVQW8hksFmNYYP2I1Vpba8lpDr4YQWLea0jH3xfw/viewform",
  };
  const goToDocs = () => {
    window.open(docs[selectedLanguage], '_blank');;
  };
  const pdfDocs = {
    ar: "/documents/YES Africa - دعوة للتعبير عن الاهتمام من قبل المنظمات غير الحكومية.pdf",
    fr: "/documents/AMI_aux_OSCs_Africaines-Y.E.S Africa.pdf",
    en: "/documents/Call_for_African_NGOs-Y.E.S_Africa.pdf",
    pr: "/documents/Apelo_às_ONG_africanas-YES_Africa.pdf",
    sw: "/documents/Wito_kwa_NGOs_za_Kiafrika-YES Africa.pdf"
  }
  return (
    <div
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
      className="flex flex-col gap-5 p-12"
    >
      <div className="font-bold text-2xl  ">
        <h1>
          <TransText
            en="Call for Expression of Interest for Civil Society Organizations:"
            ar="دعوة لإبداء الاهتمام لمنظمات المجتمع المدني"
            fr="Appel à Manifestation d’Intérêt pour les Organisations de la Société Civile :"
            pr="Chamada para Manifestação de Interesse para Organizações da Sociedade Civil:"
            sw="Wito wa Kuonyesha Nia kwa Mashirika ya Asasi za Kiraia:"
          />
        </h1>
        <h1 className="font-medium">
          <TransText
            en="Y.E.S Africa Giving Wings to NEET Youth to Help Africa Soar"
            fr="Y.E.S Africa, Donnons des ailes aux jeunes NEET pour que l’Afrique prenne son envol"
            ar="Y.E.S Africa لنمنح الشباب من غير العاملين وغير المتعلمين وغير المتدربين أجنحة لكي   تحلق إفريقيا "
            pr="Y.E.S Africa – Dê Asas aos Jovens NEET para que a África Alce o Seu Voo"
            sw="Y.E.S Africa – Kutoa Mabawa kwa Vijana NEET ili Afrika Iweze Kupaa"
          />
        </h1>
      </div>
      <div>
        <h1 className="text-lg font-bold">
          <TransText
            en="Context"
            fr="Contexte"
            sw="Muktadha"
            pr="Contexto"
            ar="السياق"
          />
        </h1>
        <p>
          <TransText
            en="Africa is currently experiencing unprecedented demographic growth,
          with a constantly increasing young population. This demographic trend
          represents both a challenge and an opportunity for the continent, as
          many young people find themselves unemployed, uneducated, or lacking
          training (NEETs). It is crucial to implement initiatives that offer
          these young people new perspectives."
            ar="تشهد إفريقيا اليوم نموًا ديموغرافيًا غير مسبوق مع تزايد مستمر في عدد السكان الشباب. يمثل هذا النمو الديموغرافي تحديًا وفرصة في نفس الوقت للقارة، حيث يجد العديد من الشباب أنفسهم بلا عمل أو تعليم أو تدريب (NEETs)، مما يجعل من الضروري اعتماد مبادرات تفتح لهم آفاقًا جديدة."
            pr="A África está atualmente passando por um crescimento demográfico sem precedentes, com uma população jovem em constante aumento. Essa demografia representa tanto um desafio quanto uma oportunidade para o continente, já que muitos jovens encontram-se sem emprego, educação ou formação (NEETs). Tornou-se crucial implementar iniciativas que ofereçam novas perspectivas para esses jovens."
            fr="L'Afrique connaît aujourd'hui une croissance démographique sans précédent avec une population jeune en constante augmentation, cette démographie représente à la fois un défi et une opportunité pour le continent, alors que de nombreux jeunes se retrouvent sans emploi, ni éducation, ni formation (NEETs), il devient crucial de mettre en place des initiatives leur offrant des perspectives."
            sw="Afrika inakumbana na ongezeko la idadi ya watu lisilo la kawaida, huku idadi ya vijana ikiendelea kuongezeka kwa kasi. Hii demografia inawakilisha changamoto na fursa kwa bara, kwani vijana wengi wanajikuta hawana ajira, elimu, au mafunzo (NEETs). Hivyo, ni muhimu kuanzisha mipango inayowapa matumaini mapya."
          />
        </p>
        <p>
          <TransText
            en="While governments across African countries and Social and Solidarity
          Economy actors are deploying strategies to enhance youth empowerment,
          these efforts cannot scale to meet the challenge without significant
          funding. Today, development aid to Africa is estimated, according to
          OECD databases, at $90 billion, with $75 billion coming from states
          and $15 billion from international NGOs."
            fr="Certes les gouvernements des différents pays africains et les acteurs de l’Economie Sociale et Solidaire déploient des stratégies pour renforcer l’autonomisation des jeunes, mais ces efforts ne peuvent passer à l’échelle de l’enjeu sans des financements conséquents. Aujourd’hui, l’aide au développement à destination de l’Afrique est estimée selon les bases de données de l’OCDE à 90 Milliards de $ répartis comme suit : 75 Milliards proviennent des Etats et 15 Milliards des ONG Internationales."
            sw="Ingawa serikali za nchi mbalimbali za Afrika na wadau wa Uchumi wa Kijamii na Ushirikiano wanaweka mikakati ya kuimarisha uwezeshaji wa vijana, juhudi hizi haziwezi kufikia kiwango kinachohitajika bila ufadhili mkubwa. Leo, misaada ya maendeleo kwa Afrika inakadiriwa kulingana na data za OECD kuwa ni Dola bilioni 90, ambapo Dola bilioni 75 zinatoka kwa serikali na Dola bilioni 15 kutoka kwa NGOs za kimataifa."
            pr="Embora os governos dos diversos países africanos e os atores da Economia Social e Solidária estejam desenvolvendo estratégias para reforçar a capacitação dos jovens, esses esforços não podem alcançar a escala necessária sem financiamentos significativos. Hoje, a ajuda ao desenvolvimento destinada à África é estimada, de acordo com as bases de dados da OCDE, em 90 bilhões de dólares, sendo 75 bilhões provenientes dos Estados e 15 bilhões de ONGs internacionais."
            ar="بالرغم من سعي حكومات البلدان الإفريقية المختلفة والجهات الفاعلة في الاقتصاد الاجتماعي والتضامني إلى تنفيذ استراتيجيات لتعزيز تمكين الشباب، إلا أن هذه الجهود لا يمكن أن تحقق الأثر المرجو دون توفير تمويلات كبيرة. تُقدّر المساعدات التنموية الموجهة إلى إفريقيا اليوم، وفقًا لبيانات منظمة التعاون الاقتصادي والتنمية (OECD) ، بحوالي 90 مليار دولار، حيث يأتي 75 مليار دولار منها من الدول و15 مليار دولار من المنظمات غير الحكومية الدولية."
          />
        </p>
        <p>
          <TransText
            en="The Y.E.S Africa project is positioned as a flagship initiative aimed
          at transforming this demographic dynamic into a positive force. By
          facilitating the exchange of experiences and mobilizing funding, we
          aim to create a support ecosystem for young Africans and reduce the
          number of NEETs across the continent. We connect various stakeholders,
          such as NGOs, donors, governments, and private companies, to
          strengthen the capacities of NGOs, enabling every young African to
          contribute fully to the economic and social growth of their country."
            fr="Le projet Y.E.S Africa se positionne comme une initiative phare visant à transformer cette dynamique démographique en une force positive, en facilitant l'échange d'expériences et la mobilisation de financements, nous cherchons à créer un écosystème de soutien pour les jeunes Africains et à réduire le nombre de NEETs à travers le continent, et nous connectons divers acteurs tels que les ONG, les bailleurs de fonds, les gouvernements et les entreprises privées pour renforcer les capacités des ONGs, permettant ainsi à chaque jeune Africain de contribuer pleinement à la croissance économique et sociale de son pays."
            pr="O projeto Y.E.S Africa posiciona-se como uma iniciativa central para transformar essa dinâmica demográfica em uma força positiva. Ao facilitar a troca de experiências e a mobilização de financiamentos, buscamos criar um ecossistema de apoio para os jovens africanos e reduzir o número de NEETs em todo o continente, conectando diversos atores como ONGs, financiadores, governos e empresas privadas para fortalecer as capacidades das ONGs, permitindo que cada jovem africano contribua plenamente para o crescimento econômico e social de seu país."
            sw="Mradi wa Y.E.S Africa unajitokeza kama mpango mkuu unaolenga kubadilisha hali hii ya demografia kuwa nguvu chanya, kwa kuwezesha kubadilishana uzoefu na kuchochea ufadhili. Tunatafuta kuunda mfumo wa kusaidia vijana wa Kiafrika na kupunguza idadi ya NEETs kote barani, na tunawaunganisha wadau mbalimbali kama vile NGOs, wafadhili, serikali, na kampuni binafsi ili kuimarisha uwezo wa NGOs, hivyo kumwezesha kila kijana wa Kiafrika kuchangia kikamilifu katika ukuaji wa kiuchumi na kijamii wa nchi yake."
            ar="يتمحور مشروع Y.E.S Africa كمبادرة رائدة تهدف إلى تحويل هذا النمو الديموغرافي إلى قوة إيجابية. من خلال تسهيل تبادل الخبرات وحشد التمويلات، نسعى إلى خلق نظام بيئي يدعم الشباب ويقلل من عدد  غير العاملين وغير المتعلمين وغير المتدربين في جميع أنحاء القارة. كما يمثل المشروع حلقة وصل بين مختلف الجهات الفاعلة مثل المنظمات غير الحكومية ,الممولين, الحكومات والشركات الخاصة لتعزيز قدرات المنظمات غير الحكومية، مما يتيح لكل شاب أفريقي المساهمة الكاملة في النمو الاقتصادي والاجتماعي لبلاده."
          />
        </p>
        <p>
          <TransText
            en="As part of the Youth Empowerment Summit for Africa (YES Africa), we
          are launching a call for expression of interest directed at Civil
          Society Organizations (CSOs) working in the field of NEET youth
          empowerment in Africa through various levers to enhance the skills of
          human development professionals, facilitate the exchange of
          experiences, and mobilize funding for innovative and impactful
          initiatives"
            fr="Dans le cadre du Youth Empowerment Summit for Africa (YES Africa), nous lançons un appel à manifestation d’intérêt à l’intention des Organisations de la Société Civile (OSC) œuvrant dans les domaines de l’autonomisation des jeunes en situation de NEET en Afrique par différents leviers en vue de renforcer les capacités des professionnels du développement humain, faciliter l'échange d'expériences et, mobiliser des financements pour des initiatives innovantes et impactantes."
            ar="يتمحور مشروع Y.E.S Africa كمبادرة رائدة تهدف إلى تحويل هذا النمو الديموغرافي إلى قوة إيجابية. من خلال تسهيل تبادل الخبرات وحشد التمويلات، نسعى إلى خلق نظام بيئي يدعم الشباب ويقلل من عدد  غير العاملين وغير المتعلمين وغير المتدربين في جميع أنحاء القارة. كما يمثل المشروع حلقة وصل بين مختلف الجهات الفاعلة مثل المنظمات غير الحكومية ,الممولين, الحكومات والشركات الخاصة لتعزيز قدرات المنظمات غير الحكومية، مما يتيح لكل شاب أفريقي المساهمة الكاملة في النمو الاقتصادي والاجتماعي لبلاده."
            pr="No âmbito do Youth Empowerment Summit for Africa (YES Africa), lançamos um chamado para manifestação de interesse destinado às Organizações da Sociedade Civil (OSC) que atuam na capacitação de jovens em situação de NEET na África, por meio de diferentes alavancas, com o objetivo de fortalecer as capacidades dos profissionais de desenvolvimento humano, facilitar a troca de experiências e mobilizar financiamentos para iniciativas inovadoras e impactantes."
            sw="Katika mfumo wa Mkutano wa Uwezeshaji Vijana kwa Afrika (YES Africa), tunazindua wito wa kuonyesha nia kwa Mashirika ya Asasi za Kiraia (OSC) yanayofanya kazi katika nyanja za uwezeshaji wa vijana katika hali ya NEET barani Afrika kupitia mbinu mbalimbali, kwa lengo la kuimarisha uwezo wa wataalamu wa maendeleo ya kibinadamu, kuwezesha kubadilishana uzoefu, na kuchochea ufadhili kwa mipango bunifu na yenye athari kubwa. "
          />
        </p>
        <p>
          <TransText
            en="YES Africa’s mission is to create a dynamic and collaborative network
          that allows CSOs to maximize their impact, benefit from shared
          resources, and participate in large-scale projects aimed at
          facilitating the social and professional integration of NEETs on a
          continental scale."
            ar="تهدف YES Africa إلى إنشاء شبكة ديناميكية وتعاونية تمكن منظمات المجتمع المدني من زيادة تأثيرها، والاستفادة من الموارد المشتركة، والمشاركة في مشاريع كبيرة النطاق بهدف تسهيل الاندماج الاجتماعي والمهني للشباب غير العاملين وغير المتعلمين وغير المتدربين على مستوى القارة."
            pr="O YES Africa tem a missão de criar uma rede dinâmica e colaborativa que permita às OSCs maximizar seu impacto, beneficiar-se de recursos compartilhados e participar de projetos de grande escala, com o objetivo de facilitar a integração social e profissional dos NEETs em uma escala continental."
            fr="YES Africa a pour mission de créer un réseau dynamique et collaboratif permettant aux OSCs de maximiser leur impact, de bénéficier de ressources partagées et de participer à des projets de grande envergure en vue de faciliter d’intégration sociale et professionnelle des NEETs à une échelle continentale."
            sw="YES Africa inalenga kuunda mtandao wenye nguvu na ushirikiano unaowawezesha OSCs kuongeza athari zao, kunufaika na rasilimali za pamoja, na kushiriki katika miradi mikubwa kwa lengo la kuwezesha ujumuishaji wa kijamii na kitaaluma wa NEETs kwa kiwango cha bara."
          />
        </p>
      </div>
      <div>
        <h1 className="text-lg font-bold">
          <TransText
            en="The objectives of the Y.E.S Africa project are:"
            fr="Les objectifs du projet Y.E.S Africa sont :"
            ar="أهداف مشروع Y.E.S Africa : "
            pr="Os objetivos do projeto Y.E.S Africa são:"
            sw="Malengo ya mradi wa Y.E.S Africa ni:"
          />
        </h1>
        <ul className="list-disc px-10">
          <li>
            <TransText
              en="To build a network of African actors and donors committed to the
            economic empowerment of youth in Africa."
              fr="Constituer un réseau d'acteurs africains et de bailleurs de fonds engagés sur la thématique de l'autonomisation économique des jeunes en Afrique."
              ar="تكوين شبكة من الجهات الفاعلة والجهات المانحة الملتزمة بموضوع التمكين الاقتصادي للشباب في أفريقيا"
              pr="Constituir uma rede de atores africanos e financiadores comprometidos com a temática da capacitação econômica dos jovens na África."
              sw="Kuunda mtandao wa wadau wa Kiafrika na wafadhili waliojitolea kwenye mada ya uwezeshaji wa kiuchumi wa vijana barani Afrika."
            />
          </li>
          <li>
            <TransText
              en="To identify opportunities, challenges, and potentials on the
            continent in terms of youth empowerment."
              fr="Identifier les opportunités, les défis et les potentialités du continent en termes d'autonomisation des jeunes."
              ar="تحديد الفرص والتحديات والإمكانات في القارة فيما يتعلق بتمكين الشباب"
              sw="Kutambua fursa, changamoto, na uwezo wa bara katika suala la uwezeshaji wa vijana."
              pr="Identificar oportunidades, desafios e potencialidades do continente em termos de capacitação dos jovens."
            />
          </li>
          <li>
            <TransText
              en="To share best practices among African actors engaged in youth
            empowerment"
              fr="Partager les meilleures pratiques entre les acteurs africains engagés pour l'autonomisation des jeunes."
              ar="الاستفادة من أفضل الممارسات بين الجهات الفاعلة على المستوى الأفريقي الملتزمة بتمكين الشباب"
              sw="Kushiriki mbinu bora kati ya wadau wa Kiafrika waliojitolea kwa uwezeshaji wa vijana."
              pr="Compartilhar melhores práticas entre os atores africanos engajados na capacitação dos jovens."
            />
          </li>
          <li>
            <TransText
              en="To support African actors in better structuring their youth
            empowerment projects or programs to increase their impact and ensure
            funding for scaling up."
              fr="Accompagner les acteurs africains à mieux structurer leurs projets ou programmes d'autonomisation des jeunes pour en augmenter l'impact et assurer le financement de leur mise en échelle"
              ar="مواكبة الفاعلين لتحسين هيكلة مشاريعهم وبرامجهم المتعلقة بتمكين الشباب، والمساهمة في زيادة تأثيرها وضمان تمويلها على المستوى الإفريقي"
              pr="Acompanhar os atores africanos na melhor estruturação de seus projetos ou programas de capacitação dos jovens para aumentar seu impacto e garantir o financiamento para sua ampliação."
              sw="Kusaidia wadau wa Kiafrika kuimarisha miradi yao au mipango ya uwezeshaji wa vijana ili kuongeza athari zake na kuhakikisha ufadhili wa kupanua wigo wake."
            />
          </li>
          <li>
            <TransText
              en="To mobilize impact investors for African youth empowerment projects."
              fr="Mobiliser des acteurs du financement à impact pour les projets africains d'autonomisation des jeunes."
              ar="تحفيز الجهات الممولة ذات التأثير لاستثمار في المشاريع الإفريقية لتمكين الشباب"
              pr="Mobilizar atores de financiamento com impacto para projetos africanos de capacitação dos jovens."
              sw="Kuchochea ushiriki wa wadau wa ufadhili wenye athari kwa miradi ya Kiafrika ya uwezeshaji wa vijana."
            />
          </li>
          <li>
            <TransText
              en="To assist institutional and associative actors engaged in youth
            empowerment in fundraising"
              sw="Kusaidia wadau wa kitaasisi na kijamii waliojitolea kwa vijana ili kupata fedha."
              ar="مواكبة الفاعلين المؤسساتيين والجمعويين المتعهدين بدعم الشباب لزيادة التمويل"
              fr="Accompagner les acteurs institutionnels et associatifs engagés en faveur des jeunes à lever des fonds."
              pr="Acompanhar os atores institucionais e associativos engajados em favor dos jovens na captação de recursos."
            />
          </li>
          <li>
            <TransText
              en="To produce a multilingual guide for actors engaged in youth
            empowerment in Africa"
              ar="إنتاج دليل متعدد اللغات للجهات الفاعلة الملتزمة بدعم تمكين الشباب في إفريقيا"
              fr="Produire un guide multilingue pour les acteurs engagés en faveur de l'autonomisation des jeunes en Afrique."
              pr="Produzir um guia multilíngue para os atores engajados na capacitação dos jovens na África."
              sw="Kuzalisha mwongozo wa lugha nyingi kwa wadau waliojitolea kwa uwezeshaji wa vijana barani Afrika."
            />
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-bold">
          <TransText
            en="Selection Criteria"
            ar="معايير الاختيار"
            fr="Critères de Sélection"
            pr="Critérios de Seleção"
            sw="Vigezo vya Uteuzi"
          />
        </h1>
        <h1>
          <TransText
            en="Interested NGOs must meet the following criteria:"
            fr="Les ONG intéressées doivent répondre aux critères suivants :"
            ar="يجب أن تستوفي المنظمات غير الحكومية المهتمة المعايير التالية:"
            sw="Mashirika yasiyo ya kiserikali yanayovutiwa yanapaswa kutimiza vigezo vifuatavyo:"
            pr="As ONGs interessadas devem atender aos seguintes critérios:"
          />
        </h1>
        <ul className="list-disc px-10">
          <li>
            <TransText
              en="Be a legally registered NGO."
              fr="Être une ONG légalement enregistrée."
              ar="أن تكون منظمة غير حكومية مسجلة قانونيًا"
              pr="Ser uma ONG registrada legalmente."
              sw="Kuwa shirika lisilo la kiserikali lililosajiliwa kisheria."
            />
          </li>
          <li>
            <TransText
              en="Have proven experience in empowering NEET youth."
              fr="Avoir une expérience avérée dans l’autonomisation des jeunes en situation de NEET."
              ar="أن تكون لها خبرة مثبتة في تمكين الشباب غير العاملين وغير المتعلمين وغير المتدربين"
              sw="Kuwa na uzoefu wa kuthibitika katika kuwezesha vijana walioko katika hali ya NEET."
              pr="Ter experiência comprovada na capacitação de jovens em situação de NEET."
            />
          </li>
          <li>
            <TransText
              en="Present innovative projects with significant and sustainable impact."
              ar="تقديم مشاريع مبتكرة لها تأثير كبير ومستدام"
              fr="Présenter des projets innovants et ayant un impact significatif et durable."
              pr="Apresentar projetos inovadores com impacto significativo e duradouro."
              sw="Kuwasilisha miradi bunifu yenye athari kubwa na ya kudumu."
            />
          </li>
          <li>
            <TransText
              en="Demonstrate good governance and financial transparency."
              ar="التحلي بقيم الحكامة الجيدة والشفافية المالية"
              fr="Démontrer une bonne gouvernance et transparence financière."
              pr="Demonstrar boa governança e transparência financeira."
              sw="Kuonyesha uwajibikaji mzuri wa utawala na uwazi wa kifedha."
            />
          </li>
          <li>
            <TransText
              en="Show capacity to implement projects with measurable impact."
              fr="Montrer une capacité à implémenter des projets avec un impact mesurable."
              pr="Mostrar capacidade de implementar projetos com impacto mensurável."
              ar="القدرة على تنفيذ مشاريع ذات تأثير قابل للقياس"
              sw="Kuonyesha uwezo wa kutekeleza miradi yenye athari inayopimika."
            />
          </li>
          <li>
            <TransText
              en="Be an NGO willing to implement projects supported by African and
            international donors."
              ar="أن تكون منظمة غير حكومية مرجحة لتنفيذ مشاريع بدعم من الممولين الأفارقة والدوليين"
              fr="Être une ONG prédisposée à implémenter des projets soutenus par les bailleurs de fonds africains et internationaux."
              pr="Ser uma ONG predisposta a implementar projetos apoiados por financiadores africanos e internacionais."
              sw="Kuwa shirika lisilo la kiserikali lililoko tayari kutekeleza miradi inayoungwa mkono na wafadhili wa Kiafrika na wa kimataifa."
            />
          </li>
          <li>
            <TransText
              en="Be available for the capacity-building program."
              fr="Être disponible pour le programme de renforcement des capacités."
              ar="أن تكون متاحة للمشاركة في برنامج تعزيز القدرات."
              pr="Estar disponível para o programa de fortalecimento de capacidades."
              sw="Kuwa inapatikana kwa programu ya kujenga uwezo"
            />

          </li>
          <li>
            <TransText
              en="Have the capacity to assign a representative to fully participate in
        the summit to be held in 19 and 20 of June 2025 in Morocco, either physically
        or digitally."
              ar="القدرة على تعيين ممثل للمشاركة بشكل كامل في القمة التي ستعقد يومي 19 و20 يونيو 2025 في المغرب، سواء بشكل حضوري أو عن بعد"
              fr="Avoir la capacité de détacher un représentant pour participer pleinement au sommet qui se tiendra les 19 et 20 juin 2025 au Maroc, de manière physique et/ou digitale."
              pr="Ter capacidade para destacar um representante para participar plenamente na cimeira que se realizará nos dias 19 e 20 de junho de 2025 em Marrocos, de forma física e/ou digital."
              sw="Kuwa na uwezo wa kutwaa mwakilishi ili kushiriki kikamilifu katika mkutano huo utakaofanyika Juni 19 na 20, 2025 nchini Moroko, kwa njia halisi na/au dijitali."
            />

          </li>
        </ul>
      </div>
      <div>
        <ol className="list-decimal px-10">
          <li>
            <span className="font-bold">
              <TransText
                en="Submission of Documents:"
                fr="Soumission des Dossiers :"
                ar="تقديم الملفات"
                pr="Submissão de Documentos:"
                sw="Uwasilishaji wa Nyaraka:"
              />
            </span>{" "}
            <TransText
              en="Interested NGOs must complete the application form available on our
            website, including:"
              fr="Les ONGs intéressées doivent remplir le formulaire de candidature disponible sur notre site web, incluant :"
              ar="يجب على المنظمات غير الحكومية المهتمة تعبئة نموذج التقديم المتاح على موقعنا الإلكتروني، بما في ذلك:"
              sw="Mashirika yasiyo ya kiserikali yanayovutiwa yanapaswa kujaza fomu ya maombi inayopatikana kwenye tovuti yetu, ikijumuisha:"
              pr="As ONGs interessadas devem preencher o formulário de candidatura disponível em nosso site, incluindo:"
            />
            <ol className="list-disc px-5">
              <li>
                <TransText
                  en="A description of the NGO and its activities."
                  fr="Une description de l’ONG et de ses activités."
                  ar="وصف المنظمة غير الحكومية وأنشطتها."
                  sw="Maelezo ya shirika na shughuli zake."
                  pr="Uma descrição da ONG e de suas atividades"
                />
              </li>
              <li>
                <TransText
                  en="A list of projects and impact results with evaluation reports."
                  ar="قائمة بالمشاريع المنجزة ونتائجها المؤثرة مع تقارير التقييم."
                  fr="Une liste des projets et des résultats d'impact avec des rapports d’évaluation"
                  pr="Uma lista de projetos e resultados de impacto com relatórios de avaliação."
                  sw="Orodha ya miradi na matokeo ya athari pamoja na ripoti za tathmini."
                />
              </li>
              <li>
                <TransText
                  en="A summary of the proposed project, including objectives,
                expected results, target of the project, and anticipated impact."
                  fr="Un résumé du projet proposé, incluant les objectifs, les résultats attendus, cible du projet et l’impact prévu"
                  ar="ملخص عن المشروع المقترح، بما في ذلك الأهداف، النتائج المتوقعة، المستهدفين، والتأثير المتوقع."
                  pr="Um resumo do projeto proposto, incluindo objetivos, resultados esperados, público-alvo do projeto e impacto previsto."
                  sw="Muhtasari wa mradi unaopendekezwa, ukiwemo malengo, matokeo yanayotarajiwa, walengwa wa mradi, na athari inayotarajiwa"
                />
              </li>
              <li>
                <TransText
                  en="Administrative documents (NGO statutes, etc.)."
                  ar="الوثائق الإدارية (النظام الأساسي للمنظمة غير الحكومية، إلخ)."
                  fr="oLes documents administratifs (statuts de l'ONG, etc.)."
                  pr="Documentos administrativos (estatutos da ONG, etc.)."
                  sw="Nyaraka za utawala (katiba ya shirika, n.k.)."
                />
              </li>
            </ol>
          </li>
          <li>
            <span className="font-bold">
              <TransText
                en="Pre-selection:"
                fr="Pré-sélection :"
                ar="الاختيار الأولي"
                sw="Uteuzi wa Awali:"
                pr="Pré-seleção:"
              />
            </span>
            <TransText
              en="Applications will
            be evaluated by a scientific committee based on the criteria
            mentioned above. Additional documents may be requested after
            pre-selection."
              fr="Les dossiers seront évalués par un comité scientifique basé sur les critères mentionnés ci-dessus. Des documents supplémentaires peuvent être demandés après la pré-sélection."
              ar="ستتم تقييم الملفات من قبل لجنة علمية بناءً على المعايير المذكورة أعلاه. قد يتم طلب مستندات إضافية بعد الفرز الأولي"
              sw="Nyaraka zitapitiwa na kamati ya kisayansi kulingana na vigezo vilivyotajwa hapo juu. Nyaraka za ziada zinaweza kuhitajika baada ya uteuzi wa awali."
              pr="Os documentos serão avaliados por um comitê científico com base nos critérios mencionados acima. Documentos adicionais podem ser solicitados após a pré-seleção."
            />
          </li>
          <li>
            <span className="font-bold">
              <TransText
                en="Interview:"
                fr="Entretien :"
                ar="المقابلة"
                sw="Mahojiano:"
                pr="Entrevista:"
              />{" "}
            </span>
            <TransText
              en="Online meetings will
            be organized to present the project in more detail and complete
            applications if necessary"
              fr="Des réunions en ligne seront organisées pour présenter plus en détail le projet et compléter les candidatures, si nécessaire."
              ar="ستُعقد اجتماعات عن بعد  لتقديم المشروع بمزيد من التفاصيل واستكمال الترشحات، إذا لزم الأمر."
              pr="Reuniões online serão organizadas para apresentar o projeto com mais detalhes e completar as candidaturas, se necessário."
              sw="Mikutano ya mtandaoni itaratibiwa ili kuwasilisha mradi kwa kina zaidi na kukamilisha maombi, ikiwa ni lazima."
            />
          </li>
          <li>
            <span className="font-bold">
              <TransText
                en="Evaluation:"
                fr="Évaluation :"
                ar="التقييم"
                sw="Tathmini:"
                pr="Avaliação:"
              />{" "}
            </span>
            <TransText
              en="Applications will be evaluated by a scientific committee based on
            the criteria mentioned above."
              fr="Les dossiers seront évalués par un comité scientifique basé sur les critères mentionnés ci-dessus."
              pr="Os documentos serão avaliados por um comitê científico com base nos critérios mencionados acima."
              sw="Nyaraka zitapitiwa na kamati ya kisayansi kulingana na vigezo vilivyotajwa hapo juu."
              ar="سيتم تقييم الملفات من قبل لجنة علمية بناءً على المعايير المذكورة أعلاه."
            />
          </li>
          <li>
            {" "}
            <span className="font-bold">
              <TransText
                en="Final Selection:"
                fr="Sélection Finale :"
                ar="الاختيار النهائي"
                sw="Uchaguzi wa Mwisho:"
                pr="Seleção Final:"
              />{" "}
            </span>
            <TransText
              en="Selected NGOs will be announced and receive confirmation emails."
              fr="Les ONGs sélectionnées seront annoncées et recevront des courriels de confirmation."
              ar="سيتم الإعلان عن المنظمات غير الحكومية المختارة وستتلقى رسائل تأكيد عبر البريد الإلكتروني."
              pr="As ONGs selecionadas serão anunciadas e receberão e-mails de confirmação."
              sw="Mashirika yatakayochaguliwa yatatangazwa na yatapokea barua pepe za uthibitisho."
            />
          </li>
        </ol>
      </div>
      <div>
        <h1 className="font-bold">
          <TransText
            en="Submission of Applications :"
            fr="Soumission des Candidatures"
            ar="تقديم الطلبات"
            sw="Uwasilishaji wa Maombi"
            pr="Submissão das Candidaturas"
          />{" "}
        </h1>
        {/* <p className="">
          <TransText
            en="Interested NGOs are invited to complete the application form available on our website at the following address:"
            fr="Les ONG intéressées sont invitées à remplir le formulaire de candidature disponible sur notre site web à l'adresse suivante :"
            ar="تدعى المنظمات غير الحكومية المهتمة إلى تعبئة نموذج التقديم المتاح على موقعنا الإلكتروني عبر الرابط التالي:"
            pr="As ONGs interessadas são convidadas a preencher o formulário de candidatura disponível em nosso site no seguinte endereço:"
            sw="Mashirika yasiyo ya kiserikali yanayovutiwa yanakaribishwa kujaza fomu ya maombi inayopatikana kwenye tovuti yetu kwa anuani ifuatayo:"
          />
        </p> */}

        <a target="_blank" href={"/formulaire"} className="underline text-blue-800">
          <TransText
            en="Youth Empowerment Summit - YES Africa. Call for African NGOs"
            fr="Sommet sur l'autonomisation des jeunes - YES Africa - Appel aux ONG africaines"
            ar="قمة تمكين الشباب - YES Africa - دعوة للتعبير عن الاهتمام من قبل المنظمات غير الحكومية"
            pr="Cimeira da Capacitação dos Jovens - YES Africa - Apelo às ONG africanas."
            sw="Mkutano wa Uwezeshaji Vijana - YES Africa -Wito kwa NGOs za Kiafrika."
          />
        </a>
        {/* <button onClick={() => goToDocs()} className="underline text-blue-800">
          <TransText
            en="Youth Empowerment Summit - YES Africa. Call for African NGOs (google.com)"
            fr="Sommet sur l'autonomisation des jeunes - YES Africa - Appel aux ONG africaines (google.com)"
            ar="قمة تمكين الشباب - YES Africa - دعوة للتعبير عن الاهتمام من قبل المنظمات غير الحكومية"
            pr="Cimeira da Capacitação dos Jovens - YES Africa - Apelo às ONG africanas (google.com)."
            sw="Mkutano wa Uwezeshaji Vijana - YES Africa -Wito kwa NGOs za Kiafrika (google.com)."
          />
        </button> */}
        <p className="font-medium">
          <TransText
            en="The submission deadline is 13 March 2025."
            fr="La date limite de soumission est le 13 mars 2025."
            ar="اخر موعد تقديم الطلبات هو 13 مارس 2025."
            pr="O prazo de submissão é 13 de março de 2025."
            sw="Tarehe ya mwisho ya kuwasilisha ni 13 Machi 2025."
          />
          {" "}
        </p>
      </div>

      {/* <a className="bg-alpha text-white px-3 py-2 w-fit rounded" href={pdfDocs[selectedLanguage]} download><TransText en="Download the file for more informations" fr="Téléchargez le document pour plus d'informations." ar="قم بتنزيل الملف لمزيد من المعلومات" pr="Baixe o arquivo para mais informações" sw="Pakua faili kwa maelezo zaidi." /> </a> */}
    </div>
  );
};

export default Description;
