import React from "react";
import TransText from "@/components/TransText";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Link } from "@inertiajs/react";

const ArticlePage = ({ article, articles }) => {
  const { selectedLanguage } = 'en'; // use context for selected language

  return (
    <>
      <Navbar />

      {article && (
        <div
          className={`flex flex-col lg:flex-row justify-center p-8 lg:p-10 gap-10 ${selectedLanguage === "ar" ? "lg:flex-row-reverse text-right" : ""
            }`}
        >
          {/* Main Article */}
          <div className="lg:w-[70%] flex flex-col gap-6">
            <img
              className="rounded-lg h-[30rem] w-full object-cover shadow-md"
              src={article.image}
              alt={selectedLanguage === "ar" ? article.title.ar : article.title.en}
            />

            <h1 className="text-3xl font-bold leading-tight">
              <TransText en={article.title.en} ar={article.title.ar} />
            </h1>

            <div
              className="ProseMirror prose prose-lg border border-gray-200 rounded-md p-6"
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "ar"
                    ? article.description.ar
                    : article.description.en,
              }}
            />

            {/* Tags */}
            <div className="flex flex-col gap-3 mt-4">
              <h2 className="font-semibold text-xl">
                <TransText ar="الكلمات المفتاحية" en="Tags" />
              </h2>
              <div
                className={`flex flex-wrap gap-3 ${selectedLanguage === "ar" ? "justify-end" : ""
                  }`}
              >
                {selectedLanguage === "ar"
                  ? article.tags.ar.split("،").map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))
                  : article.tags.en.split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Popular Articles */}
          <div className="lg:w-[30%] flex flex-col gap-6">
            <h2 className="text-xl font-semibold">
              <TransText ar="الأكثر شعبية" en="Popular Posts" />
            </h2>

            {articles.map((e) => (
              <Link
                key={e.id}
                href={`/articles/${e.id}`}
                className="flex gap-4 p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={e.image}
                  alt={selectedLanguage === "ar" ? e.title.ar : e.title.en}
                  className="w-2/5 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col justify-between w-3/5">
                  <h3 className="font-bold text-sm leading-snug">
                    <TransText
                      en={
                        e.title.en.length > 30
                          ? e.title.en.substring(0, 30) + "..."
                          : e.title.en
                      }
                      ar={
                        e.title.ar.length > 30
                          ? e.title.ar.substring(0, 30) + "..."
                          : e.title.ar
                      }
                    />
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedLanguage === "ar"
                            ? e.description.ar.length > 80
                              ? e.description.ar.slice(0, 80) + "..."
                              : e.description.ar
                            : e.description.en.length > 80
                              ? e.description.en.slice(0, 80) + "..."
                              : e.description.en,
                      }}
                    />
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(e.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ArticlePage;
