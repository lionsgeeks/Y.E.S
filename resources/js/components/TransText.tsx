import React, { useEffect, useState } from "react";

interface TextProps {
  ar: string;
  fr: string;
  en: string;
  sw?: string;
  pr?: string;
}

const TransText: React.FC<TextProps> = (props) => {
  const allowedLanguages = ["ar", "fr", "en", "sw", "pr"] as const;

  const readLang = (): "ar" | "fr" | "en" | "sw" | "pr" => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("lang") || "en";
    return (allowedLanguages as readonly string[]).includes(saved)
      ? (saved as "ar" | "fr" | "en" | "sw" | "pr")
      : "en";
  };

  const [selectedLanguage, setSelectedLanguage] = useState<"ar" | "fr" | "en" | "sw" | "pr">(readLang());

  useEffect(() => {
    const onChange: EventListener = () => setSelectedLanguage(readLang());
    window.addEventListener("language:change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("language:change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [readLang]);

  const dictionary = props as unknown as Record<string, string>;
  const text = dictionary[selectedLanguage] ? dictionary[selectedLanguage] : dictionary["en"];

  return (
    <span dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} />
  );
};

export default TransText;
