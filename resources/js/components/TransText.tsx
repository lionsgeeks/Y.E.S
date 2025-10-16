import React, { useEffect, useRef, useState } from "react";

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

  const [selectedLanguage, setSelectedLanguage] = useState<string>(readLang());

  useEffect(() => {
    const onChange = () => setSelectedLanguage(readLang());
    window.addEventListener("language:change", onChange as any);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("language:change", onChange as any);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const text = (props as any)[selectedLanguage] ? (props as any)[selectedLanguage] : (props as any)["en"];

  return (
    <span dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br />") }} />
  );
};

export default TransText;
