import TransText from "@components/TransText";

import ArticleCard from "@components/ArticleCard";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const ArticlesPage = () => {
    const { selectedLanguage } = "en";

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("/articless");
                if (!res.ok) throw new Error("Failed to fetch articles");
                const data = await res.json();
                setArticles(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchArticles();
    }, []);


    return (
        <>
            <Navbar />
            {articles ? (
                <div className="">
                    <div
                        className={`w-full h-[50vh] relative text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center ${selectedLanguage === "ar" ? "text-right items-end" : ""
                            }`}
                        style={{
                            backgroundImage: `url('/assets/images/africa1.jpg')`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#53450ab5] via-50% to-alpha opacity-85"></div>

                        <h1 className="lg:text-5xl text-3xl px-3 font-bold relative z-10">
                            <TransText
                                en="Explore Our Latest Articles"
                                ar="استكشف أحدث مقالاتنا"
                                fr="Découvrez notre dernier articles"
                            />
                        </h1>

                        <p className="lg:text-4xl text-2xl px-3 lg:w-[70%] relative z-10">
                            <TransText
                                ar="اغمر نفسك في عالم من القصص المفيدة، والتحليلات المتخصصة، والرؤى المثيرة للتفكير"
                                en="Dive into a world of insightful stories, expert analysis, and thought-provoking perspectives."
                                fr="Plongez dans un univers d'histoires captivantes, d'analyses expertes et de perspectives enrichissantes."
                            />
                        </p>
                    </div>

                    <div className="flex justify-center lg:px-16 px-3">
                        <div className="flex flex-wrap lg:flex-row flex-col gap-5 py-6">
                            {articles.map((article, index) => (
                                <ArticleCard key={index} {...{ index, ...article }} />
                            ))}
                        </div>
                    </div>
               
                </div>
            ) : (
                <div>
                    <div className="w-full h-[50vh] bg-[#1f1f1f5a] animate-pulse"></div>
                    <div className="flex justify-center lg:px-16 px-3">
                        <div className="flex flex-wrap lg:flex-row flex-col gap-5 py-6">
                            <div className="lg:w-[29vw] w-[95vw] bg-[#1f1f1f5a] animate-pulse h-[55vh] border rounded-lg shadow-sm">
                            </div>
                            <div className="lg:w-[29vw] w-[95vw] bg-[#1f1f1f5a] animate-pulse h-[55vh] border rounded-lg shadow-sm">
                            </div>
                            <div className="lg:w-[29vw] w-[95vw] bg-[#1f1f1f5a] animate-pulse h-[55vh] border rounded-lg shadow-sm">
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ArticlesPage;
