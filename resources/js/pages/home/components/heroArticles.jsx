import {  TransText } from "../../components";

const HeroArticles = () => {
  const {  selectedLanguage } = "en";

  return (
    <section className="mt-12 px-8 md:px-12 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24">
      <h1
        className={`text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none ${selectedLanguage === "ar" && "text-end"
          }`}
      >
        <TransText en="Latest Articles" ar="اخر المقالات" fr="Derniers Articles" />
      </h1>
      <br />
      <div className="flex items-center justify-around flex-col lg:flex-row gap-7">
        {/* {articles?.slice(0, 3).map((blog, index) => (
          <ArticleCard key={index} index={index} {...blog} />
        ))} */}
      </div>
    </section>
  );
};

export default HeroArticles;
