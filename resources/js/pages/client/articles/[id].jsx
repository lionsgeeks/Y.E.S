import React from "react";
import TransText from "@/components/TransText";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Link } from "@inertiajs/react";

const ArticlePage = ({ article, articles }) => {
  const { selectedLanguage } = 'en'; // use context for selected language
  const resolveImageSrc = (value) => {
    if (!value) return '';
    return /^https?:\/\//i.test(value) ? value : `/storage/${value}`;
  };
  const toArray = (val, sep) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(sep).map(t => t.trim()).filter(Boolean);
    return [];
  };
  const safe = (s) => (typeof s === 'string' ? s : '');
  const pickLang = (obj) => {
    if (obj && typeof obj === 'object') {
      return selectedLanguage === 'ar' ? (obj.ar ?? obj.en ?? '') : (obj.en ?? obj.ar ?? '');
    }
    return safe(obj);
  };
  const truncate = (s, n) => (safe(s).length > n ? safe(s).sucssbstring(0, n) + '...' : safe(s));

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
              src={"https://youthempowermentsummit.africa/storage/images/" + article.image}
              alt={pickLang(article.title)}
            />

            <h1 className="text-3xl font-bold leading-tight">
              <TransText en={safe(article.title?.en)} ar={safe(article.title?.ar)} />
            </h1>

            <div
              className="ProseMirror prose prose-lg border border-gray-200 rounded-md p-6"
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "ar"
                    ? safe(article.description?.ar)
                    : safe(article.description?.en),
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
                  ? toArray(article.tags?.ar, "،").map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))
                  : toArray(article.tags?.en, ",").map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                    >
                      {tag}
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

            {Array.isArray(articles) && articles.map((e) => (
              <Link
                key={e.id}
                href={`/articles/${e.id}`}
                className="flex gap-4 p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={"https://youthempowermentsummit.africa/storage/images/" + e.image}
                  alt={selectedLanguage === "ar" ? e.title.ar : e.title.en}
                  className="w-2/5 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col justify-between w-3/5">
                  <h3 className="font-bold text-sm leading-snug">
                    <TransText
                      en={truncate(e.title?.en, 30)}
                      ar={truncate(e.title?.ar, 30)}
                    />
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedLanguage === "ar"
                            ? truncate(e.description?.ar, 80)
                            : truncate(e.description?.en, 80),
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
