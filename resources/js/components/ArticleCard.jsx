
import { Link } from "@inertiajs/react";
import TransText from "@/components/TransText";

const ArticleCard = ({ article , index }) => {
    const { selectedLanguage, IMAGEURL } = 'eng';
    const arrow = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${selectedLanguage == "ar" ? "rotate-180" : ""}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
        </svg>
    );

    return (
        <>
            <div
                className={`flex flex-col gap-2 lg:w-[calc(calc(100%-2.5rem)/3)] border rounded-lg shadow-sm ${selectedLanguage == "ar" ? "text-right" : ""
                    }`}
            >
                <img className="w-full h-[35vh] object-cover rounded-t-md" src={IMAGEURL + article.image} alt="" />
                <div className={`p-3 gap-3 flex flex-col ${selectedLanguage == "ar" ? "justify-end" : ""}`}>
                    {
                        article.title.en.length > 30 ? (
                            <h1 className="text-2xl font-bold">
                                <TransText ar={article.title.ar.substring(0, 30) + '...'} en={article.title.en.substring(0, 30) + '...'} />
                            </h1>
                        ) : (<h1 className="text-2xl font-bold">
                            <TransText en={article.title.en} ar={article.title.ar} />

                        </h1>)
                    }
                    <div
                        className={`flex text-sm text-muted-foreground gap-2 items-center ${selectedLanguage == "ar" ? "justify-end" : ""
                            }`}
                    >
                        <a href=""></a>
                        <div className="flex items-center gap-2">
                            {/* <p>{author}</p> */}
                            <div className="size-[0.325rem] bg-muted-foreground/75 rounded-full"> </div>
                            <p>{new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <div
                        className={`flex gap-3 flex-wrap font-medium text-xs ${selectedLanguage == "ar" ? "justify-end" : ""
                            }`}
                    >
                        {/* <p className="bg-[hsl(240,4.8%,95.9%)] px-3.5 py-1 rounded-xl">
              <TransText ar={tags[0].ar} en={tags[0].en} />
            </p>
            <p className="bg-[hsl(240,4.8%,95.9%)] px-3.5 py-1 rounded-xl">
              <TransText ar={tags[1].ar} en={tags[1].en}/>
            </p> */}
                    </div>
                    <p className="text-lg text-justify">

                        {
                            selectedLanguage == "ar" ?
                                <div dangerouslySetInnerHTML={{ __html: article.description.ar.length > 150 ? article.description.ar.slice(0, 150) + '...' : article.description.ar }} />
                                :
                                <div dangerouslySetInnerHTML={{ __html: article.description.en.length > 150 ? article.description.en.slice(0, 150) + '...' : article.description.en }} />
                        }


                        {/* {description.en.length > 149 ? (
              <TransText
                ar={description.ar.substring(0, 142)}
                en={description.en.substring(0, 142) + "..."}
              />
            ) : (
              <TransText ar={description.ar} en={description.en} />
            )} */}
                    </p>

                    <Link href={`/articles/${article.id}`} className={selectedLanguage === "ar" && "self-end"}>
                        <button
                            className={`bg-alpha flex border-2 text-white items-center gap-2 justify-center border-alpha hover:border-beta hover:bg-beta hover:text-white px-6 py-2.5 w-fit rounded-lg lg:font-medium ${selectedLanguage === "ar" && "flex-row-reverse"
                                }`}
                        >
                            <TransText ar="اقرأ المزيد" en="Read More" />
                            {arrow}
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ArticleCard;
