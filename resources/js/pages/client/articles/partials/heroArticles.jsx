import { useEffect, useState, React } from "react";
import TransText from "@components/TransText";
import ArticleCard from "@/components/ArticleCard";

const HeroArticles = ({ articles }) => {
    const selectedLanguage = "en";

    return (
        <section className="w-full relative text-white">
            {/* Banner */}
            <div className={`w-full bg-muted-background relative h-[50vh] z-10 bg-no-repeat bg-cover bg-[url('/assets/images/africa5.jpg')] bg-[position:center_top_6%]`}>
                <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50% to-alpha opacity-85 -z-10"></div>
                <div className="max-w-7xl mx-auto lg:px-16 px-3 py-12 lg:py-20 flex flex-col items-start gap-4">
                    <h2 className="lg:text-5xl text-3xl font-bold">
                        <TransText
                            en="Explore Our Latest Articles"
                            ar="استكشف أحدث مقالاتنا"
                            fr="Découvrez notre dernier articles"
                        />
                    </h2>
                    <p className="lg:text-2xl text-lg lg:w-3/4 text-white/90">
                        <TransText
                            ar="اغمر نفسك في عالم من القصص المفيدة، والتحليلات المتخصصة، والرؤى المثيرة للتفكير"
                            en="Dive into a world of insightful stories, expert analysis, and thought-provoking perspectives."
                            fr="Plongez dans un univers d'histoires captivantes, d'analyses expertes et de perspectives enrichissantes."
                        />
                    </p>
                </div>
            </div>
 <div className="flex justify-center lg:px-16 px-3">
                            <div className="flex flex-wrap lg:flex-row flex-col gap-5 py-6 text-black">
                                {articles.slice(0,3).map((article, index) => (
                                    <ArticleCard key={index} article={article} />
                                ))}
                            </div>
                        </div>
        </section>
    );
};

export default HeroArticles;
