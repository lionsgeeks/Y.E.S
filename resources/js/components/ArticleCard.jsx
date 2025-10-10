import { Link } from "@inertiajs/react"; // ✅ use Inertia’s Link
import TransText from "@components/TransText";

const ArticleCard = ({ index, id, image, title, description, created_at }) => {
  const selectedLanguage = "en"; // ✅ fixed (no destructuring)

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-6 ${selectedLanguage === "ar" ? "rotate-180" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );

  return (
    <div
      className={`flex flex-col gap-2 lg:w-[calc(calc(100%-2.5rem)/3)] border rounded-lg shadow-sm ${
        selectedLanguage === "ar" ? "text-right" : ""
      }`}
    >
      <img
        className="w-full h-[35vh] object-cover rounded-t-md"
        src={image}
        alt={title?.en || title?.ar}
      />

      <div
        className={`p-3 gap-3 flex flex-col ${
          selectedLanguage === "ar" ? "justify-end" : ""
        }`}
      >
        {/* ✅ Title */}
        {title?.en?.length > 30 ? (
          <h1 className="text-2xl font-bold">
            <TransText
              ar={title.ar.substring(0, 30) + "..."}
              en={title.en.substring(0, 30) + "..."}
            />
          </h1>
        ) : (
          <h1 className="text-2xl font-bold">
            <TransText en={title.en} ar={title.ar} />
          </h1>
        )}

        {/* ✅ Date */}
        <div
          className={`flex text-sm text-muted-foreground gap-2 items-center ${
            selectedLanguage === "ar" ? "justify-end" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="size-[0.325rem] bg-muted-foreground/75 rounded-full" />
            <p>
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* ✅ Description */}
        <div className="text-lg text-justify">
          {selectedLanguage === "ar" ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.ar.length > 150
                    ? description.ar.slice(0, 150) + "..."
                    : description.ar,
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.en.length > 150
                    ? description.en.slice(0, 150) + "..."
                    : description.en,
              }}
            />
          )}
        </div>

        {/* ✅ Read more button using Inertia link */}
        <Link
          href={route("articles.show", id)} // ✅ Laravel route name (e.g., Route::get('/articles/{id}', ...)->name('articles.show'))
          className={selectedLanguage === "ar" ? "self-end" : ""}
        >
          <button
            className={`bg-alpha flex border-2 text-white items-center gap-2 justify-center border-alpha hover:border-beta hover:bg-beta hover:text-white px-6 py-2.5 w-fit rounded-lg lg:font-medium ${
              selectedLanguage === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <TransText ar="اقرأ المزيد" en="Read More" />
            {arrow}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
