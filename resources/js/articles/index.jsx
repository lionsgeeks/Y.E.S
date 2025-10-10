import React from "react";
// import { useAppContext } from "../../context/AppContext";
import { ArticleCard } from "../../components";
import TransText from "@/components/TransText";

const ArticlesPage = () => {
    const { articles, selectedLanguage } = 'eng';

    console.log(articles);


    return (
        articles ? (
            <div className="">
                <div
                    className={`w-full h-[50vh]  relative -z-20 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/africa1.jpg')] ${selectedLanguage == "ar" ? "text-right items-end" : ""
                        }`}
                >
                    <div className="inset-0 absolute bg-gradient-to-r from-black via-[#53450ab5] via-50%  to-alpha opacity-85 -z-10"></div>
                    <h1 className="lg:text-5xl text-3xl px-3 font-bold ">
                        <TransText
                            en="Explore Our Latest Articles"
                            ar="استكشف أحدث مقالاتنا"
                            fr="Découvrez notre dernier articles"
                        />
                    </h1>
                    <p className="lg:text-4xl text-2xl px-3 lg:w-[70%] ">
                        <TransText
                            ar="اغمر نفسك في عالم من القصص المفيدة، والتحليلات المتخصصة، والرؤى المثيرة للتفكير"
                            en="Dive into a world of insightful stories, expert analysis, and
                      thought-provoking perspectives."
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
                <div className="flex justify-center gap-3 p-6">
                    <div className="flex justify-center items-center gap-1 py-2 font-bold rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>

                        <h1>Previous</h1>
                    </div>
                    <div className="flex gap-2">
                        {[1].map((e, i) => (
                            <div
                                key={i}
                                className="border-2 border-gray-200 flex justify-center items-center lg:size-[2.5vw] size-[8vw]  rounded-md"
                            >
                                {e}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center py-2 px-2 rounded-md items-center font-bold gap-1">
                        <p>Next</p>{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
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
        )
    );
};

export default ArticlesPage;
