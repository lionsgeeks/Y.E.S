import React from "react";
import TransText from "@/components/TransText";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ArticleCard from "@/components/ArticleCard";
import HeroArticles from "./partials/heroArticles";

const ArticlesPage = ({ articles }) => {

    const { selectedLanguage } = 'eng'

    return (
        <>
            <Navbar />
            {
                articles ? (
                    <div className="">

                        <div className="flex justify-center lg:px-16 px-3">
                            <div className="flex flex-wrap lg:flex-row flex-col gap-5 py-6">
                                {articles.map((article, index) => (
                                    <ArticleCard key={index} article={article} />
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
            }
            <Footer />
        </>
    );
};

export default ArticlesPage;
