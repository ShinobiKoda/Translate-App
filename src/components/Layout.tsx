import logo from "../assets/images/logo.svg";
import { useState } from "react";
import { TranslateResponse } from "../types/type";
import { fetchTranslation, detectLanguage } from "../api/TranslateLanguage";
import LanguageSelector from "./LanguageSelector";
import TextArea from "./TextArea";

const Layout = () => {
  const [value, setValue] = useState<string>("Hello, how are you?");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("fr");
  const [copyToast, setCopyToast] = useState<{
    original: boolean;
    translated: boolean;
  }>({ original: false, translated: false });

  const handleTranslate = async () => {
    if (value.trim() === "") {
      setTranslatedValue("Enter a text for translation");
      return;
    }
    const result: TranslateResponse = await fetchTranslation(
      value,
      sourceLang,
      targetLang
    );
    setTranslatedValue(result.translatedText);
    setSourceLang(result.detectedSourceLanguage);
  };

  const handleReverseTranslate = async () => {
    const result: TranslateResponse = await fetchTranslation(
      translatedValue,
      targetLang,
      sourceLang
    );
    setValue(result.translatedText);
    setSourceLang(result.detectedSourceLanguage);
  };

  const handleDetectLanguage = async (text: string) => {
    if (text.trim() === "") return;
    const detectedLang = await detectLanguage(text);
    setSourceLang(detectedLang);
  };

  const handleCopyText = (text: string, type: "original" | "translated") => {
    if (text.trim() === "") return;
    navigator.clipboard.writeText(text);
    setCopyToast((prev) => ({ ...prev, [type]: true }));
    setTimeout(
      () => setCopyToast((prev) => ({ ...prev, [type]: false })),
      2000
    );
  };

  const handleReadAloud = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div className="hero-img"> </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full mt-40">
        <div>
          <img src={logo} alt="Logo Image" />
        </div>
        <div className="w-full px-5 max-w-[1440px] flex flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
          <div className="bg-[#1e2432cc] text-white rounded-md p-5 w-full flex flex-col gap-8 border-[#4d5562] border">
            <LanguageSelector
              type="source"
              selectedLang={sourceLang}
              onLanguageChange={(lang) => setSourceLang(lang)}
            />
            <div className="w-full h-[1px] bg-[#363d4d]"></div>

            <TextArea
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleDetectLanguage(e.target.value);
              }}
              onCopy={(text) => handleCopyText(text, "original")}
              onReadAloud={(text) => handleReadAloud(text, sourceLang)}
              copyToast={copyToast.original}
              onTranslate={handleTranslate}
            />
          </div>
          <div className="bg-[#1e2432cc] text-white rounded-md p-5 w-full flex flex-col gap-8 border-[#4d5562] border">
            <LanguageSelector
              type="target"
              selectedLang={targetLang}
              onLanguageChange={(lang) => setTargetLang(lang)}
            />
            <div className="w-full h-[1px] bg-[#363d4d]"></div>
            <TextArea
              value={translatedValue}
              readOnly
              onCopy={(text) => handleCopyText(text, "translated")}
              onReadAloud={(text) => handleReadAloud(text, targetLang)}
              copyToast={copyToast.translated}
              onReverseTranslate={handleReverseTranslate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
