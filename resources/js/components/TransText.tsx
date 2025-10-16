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

  const readLang = () => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("lang") || "en";
    return allowedLanguages.includes(saved as any) ? (saved as any) : "en";
  };

  const [selectedLanguage, setSelectedLanguage] = useState<"ar" | "fr" | "en" | "sw" | "pr">(readLang() as any);

  useEffect(() => {
    const onChange = () => setSelectedLanguage(readLang());
    window.addEventListener("language:change", onChange as EventListener);
    window.addEventListener("storage", onChange as EventListener);
    return () => {
      window.removeEventListener("language:change", onChange as EventListener);
      window.removeEventListener("storage", onChange as EventListener);
    };
  }, []); // readLang is stable within this module

  const dictionary = props as unknown as Record<string, string>;
  const text = dictionary[selectedLanguage] ? dictionary[selectedLanguage] : dictionary["en"];

  return (
    <span dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} />
  );
};

export default TransText;
