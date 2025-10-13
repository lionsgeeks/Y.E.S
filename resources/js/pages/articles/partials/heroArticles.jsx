import { useEffect, useState, React } from "react";
import TransText from "@components/TransText";

const HeroArticles = () => {
  const selectedLanguage = "en";
  //   const [articles, setArticles] = useState([]);

  //   useEffect(() => {
  //     const fetchArticles = async () => {
  //       try {
  //         const res = await fetch("/articless");
  //         if (!res.ok) throw new Error("Failed to fetch articles");
  //         const data = await res.json();
  //         setArticles(data.data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     fetchArticles();
  //   }, []);
  // console.log(articles);

  // if (articles.length === 0) {
  //   return null;
  // }

  return (
    <div
      className={`w-full h-[50vh] bg-muted-background relative z-10 text-white lg:px-16 flex flex-col justify-center gap-3 bg-no-repeat bg-cover bg-center bg-[url('/assets/images/africa1.jpg')] `}
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
  );
};

export default HeroArticles;
