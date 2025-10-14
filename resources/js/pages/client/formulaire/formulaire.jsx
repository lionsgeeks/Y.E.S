import Navbar from "@/components/navbar";
import Description from "./partials/description";
import Form from "./partials/form";
import Footer from "@/components/footer";

const Formulaire = () => {
  const { selectedLanguage, setSelectedLanguage } = "en";
  const formLanguages = [
    { language: "English", code: "en" },
    { language: "Français", code: "fr" },
    { language: "Português", code: "pr" },
    { language: "العربية", code: "ar" },
    { language: "Swahili", code: "sw" },
  ];
  return (
    <>
    <Navbar />
      <div className="flex gap-3 items-center justify-between lg:px-8 px-3 py-3 bg-gray-200">
        {formLanguages.map(({ language, code }, index) => (
          <button
            key={index}
            onClick={() => setSelectedLanguage(code)}
            className={`py-2 lg:w-[20%] w-[18%] lg:text-[16px] text-[10px] rounded font-medium hover:bg-alpha hover:text-white ${selectedLanguage === code ? "bg-alpha text-white" : "bg-white"
            }`}
          >
            {language}
          </button>
        ))}
      </div>
      <Description />
      <Footer />
    </>
  );
};

export default Formulaire;
