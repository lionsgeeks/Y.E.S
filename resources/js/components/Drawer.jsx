import React from "react";
import TransText from "@components/TransText";

const Drawer = ({ openDrawer, setOpenDrawer }) => {
  const  selectedLanguage  = "en";
  return (
    <div
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
      className="bg-black/50 fixed inset-0  flex items-end z-50 overflow-hidden  duration-1000 "
    >
      <div className={`bg-white h-[50vh] lg:h-fit overflow-scroll w-full px-5 pt-3 pb-10 rounded-t-lg   `}>
        <h1 className="font-bold text-xl mb-2">
          <TransText
            ar="تقديم المنصة"
            fr="PRÉSENTATION DE LA PLATEFORME"
            en="PLATFORM PRESENTATION"
          />
        </h1>
        <p>
          <TransText
            en="YES Africa is the first continental platform dedicated to referencing and networking all stakeholders working for the socioeconomic inclusion of NEET (Neither in Education, Employment, nor Training) youth in Africa.
Our interactive platform presents a comprehensive mapping of Civil society organizations, institutions, donors, private companies, public bodies, UN agencies, and think tanks that contribute directly or indirectly to improving the living conditions and professional integration of African youth.
Through an intuitive interface based on an interactive map of Africa, YES Africa facilitates discovery, connection, and collaboration between different stakeholders in the youth ecosystem, creating a true networking and opportunity exchange hub at the continental scale."
            ar="نعم أفريقيا هي أول منصة قارية مخصصة لفهرسة وربط جميع الجهات الفاعلة التي تعمل من أجل الإدماج الاجتماعي والاقتصادي للشباب الذين لا يخضعون للتعليم أو التوظيف أو التدريب في أفريقيا.
تقدم منصتنا التفاعلية خريطة شاملة لمنظمات المجتمع المدني والمؤسسات والمانحين والشركات الخاصة والهيئات العامة ووكالات الأمم المتحدة ومراكز الفكر التي تساهم بشكل مباشر أو غير مباشر في تحسين ظروف المعيشة والإدماج المهني للشباب الأفريقي.
من خلال واجهة بديهية تعتمد على خريطة تفاعلية لأفريقيا، تسهل نعم أفريقيا الاكتشاف والاتصال والتعاون بين مختلف الجهات الفاعلة في النظام البيئي للشباب، مما يخلق مركزاً حقيقياً للتواصل وتبادل الفرص على النطاق القاري."
            fr="YES Africa est la première plateforme continentale dédiée au référencement et à la mise en réseau de tous les acteurs œuvrant pour l'inclusion socioéconomique des jeunes NEET (Neither in Education, Employment, nor Training) en Afrique.
Notre plateforme interactive présente une cartographie des organisations de la société civile, institutions, bailleurs de fonds, entreprises privées, organismes publics, agences des Nations Unies et think tanks qui contribuent directement ou indirectement à l'amélioration des conditions de vie et d'insertion professionnelle des jeunes africains.
Grâce à une interface intuitive basée sur une carte interactive de l'Afrique, YES Africa facilite la découverte, la connexion et la collaboration entre les différents acteurs de l'écosystème jeunesse, créant ainsi un véritable hub de networking et d'échange d'opportunités à l'échelle continentale."
          />
        </p>
        <h1 className="font-bold text-xl my-2">
          <TransText ar="الأهداف" fr="OBJECTIFS" en="OBJECTIVES " />
        </h1>
        <p>
          <TransText
            en="1. Map the African Youth Ecosystem Create an updated database of all stakeholders involved in youth socioeconomic inclusion programs across the African continent.
2. Facilitate Partnerships and Collaborations Develop a privileged networking space enabling organizations to connect, share experiences, and develop operational synergies.
3. Optimize Resource Allocation Avoid duplication of efforts by enabling better coordination between existing initiatives and identifying underserved geographical areas.
4. Promote Innovation and Best Practices Foster the exchange of innovative methodologies, effective tools, and success stories between different ecosystem stakeholders.
5. Strengthen Collective Impact Amplify the impact of individual interventions through a collaborative and coordinated approach at the continental scale.
6. Democratize Access to Opportunities Centralize information on programs, funding, and opportunities available for youth and organizations supporting them."
            ar="
1- رسم خريطة تفاعلية للفاعلين في مجال ادماج الشباب الافريقي إنشاء قاعدة بيانات شاملة ومحدثة لجميع الجهات الفاعلة المشاركة في برامج الإدماج الاجتماعي والاقتصادي للشباب عبر القارة الأفريقية.
2-  تسهيل الشراكات والتعاون تطوير مساحة تواصل مميزة تمكن المنظمات من التواصل وتبادل الخبرات وتطوير التآزر التشغيلي.
3-  تحسين تخصيص الموارد تجنب ازدواجية الجهود من خلال تمكين التنسيق الأفضل بين المبادرات الحالية وتحديد المناطق الجغرافية المحرومة من الخدمات.
4-  تعزيز الابتكار والممارسات الجيدة تعزيز تبادل المنهجيات المبتكرة والأدوات الفعالة وقصص النجاح بين مختلف أصحاب المصلحة في النظام البيئي.
5- تقوية التأثير الجماعي تضخيم تأثير التدخلات الفردية من خلال نهج تعاوني ومنسق على النطاق القاري.
6- إضفاء الطابع الديمقراطي على الوصول إلى الفرص مركزة المعلومات حول البرامج والتمويل والفرص المتاحة للشباب والمنظمات التي تدعمهم."
            fr="1. Cartographier l'Écosystème Jeunesse Africain Créer une base de données actualisée de tous les acteurs impliqués dans les programmes d'inclusion socioéconomique des jeunes à travers le continent africain.
2. Faciliter les Partenariats et Collaborations Développer un espace de networking privilégié permettant aux organisations de se connecter, partager leurs expériences et développer des synergies opérationnelles.
3. Optimiser l'Allocation des Ressources Éviter la duplication des efforts en permettant une meilleure coordination entre les initiatives existantes et en identifiant les zones géographiques sous-desservies.
4. Promouvoir l'Innovation et les Bonnes Pratiques Favoriser l'échange de méthodologies innovantes, d'outils efficaces et de success stories entre les différents acteurs de l'écosystème.
5. Renforcer l'Impact Collectif Amplifier l'impact des interventions individuelles par une approche collaborative et coordonnée à l'échelle continentale.
6. Démocratiser l'Accès aux Opportunités Centraliser l'information sur les programmes, financements et opportunités disponibles pour les jeunes et les organisations qui les accompagnent."
          />
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpenDrawer(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <TransText
              ar="الوصول إلى الواجهة"
              fr="Accéder à l'interface"
              en="Access Interface"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
