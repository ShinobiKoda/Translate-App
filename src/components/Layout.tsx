import logo from "../assets/images/logo.svg";
import arrowDown from "../assets/images/Expand_down.svg";
import readAloud from "../assets/images/sound_max_fill.svg";
import copyText from "../assets/images/Copy.svg";
import translate from "../assets/images/Sort_alfa.svg";
import translateBtn from "../assets/images/Horizontal_top_left_main.svg";
import { useState } from "react";
import { TranslateResponse } from "../types/type";
import { fetchTranslation } from "../api/TranslateLanguage";

const Layout = () => {
  const [value, setValue] = useState<string>("Hello, how are you?");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("fr");
  const [copyToast, setCopyToast] = useState<{ original: boolean; translated: boolean }>({ original: false, translated: false });
  const [showSourceDropdown, setShowSourceDropdown] = useState<boolean>(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleTranslate = async () => {
    const result: TranslateResponse = await fetchTranslation(value, sourceLang, targetLang);
    setTranslatedValue(result.translatedText);
    setSourceLang(result.detectedSourceLanguage);
  };

  const handleReadAloud = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const handleCopyText = (text: string, type: 'original' | 'translated') => {
    navigator.clipboard.writeText(text);
    setCopyToast((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopyToast((prev) => ({ ...prev, [type]: false })), 2000);
  };

  const handleLanguageChange = async (lang: string, type: 'source' | 'target') => {
    if (type === 'source') {
      setSourceLang(lang);
      setShowSourceDropdown(false);
    } else {
      setTargetLang(lang);
      setShowTargetDropdown(false);
      const result: TranslateResponse = await fetchTranslation(value, sourceLang, lang);
      setTranslatedValue(result.translatedText);
    }
  };

  const handleDropdownPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom, left: rect.left });
  };

  const getLanguageName = (lang: string) => {
    const languages: { [key: string]: string } = {
      en: "English",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian"
    };
    return languages[lang] || lang;
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
            <div className="flex items-center gap-4 flex-wrap">
              <button className="cursor-pointer hover:opacity-90 p-2 rounded-md">
                Detect Language
              </button>
              <button className={`cursor-pointer hover:opacity-90 p-2 rounded-md ${sourceLang === 'en' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('en', 'source')}>
                English
              </button>
              <button className={`cursor-pointer hover:opacity-90 p-2 rounded-md ${sourceLang === 'fr' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('fr', 'source')}>
                French
              </button>
              <button className="flex gap-2 items-center cursor-pointer hover:opacity-90 p-2" onClick={(e) => { setShowSourceDropdown(!showSourceDropdown); handleDropdownPosition(e); }}>
                <span>{getLanguageName(sourceLang)}</span>
                <img src={arrowDown} alt="arrow-down" />
              </button>
              {showSourceDropdown && (
                <div className="absolute bg-[#1e2432cc] text-white rounded-md p-2 mt-2" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                  <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${sourceLang === 'de' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('de', 'source')}>German</button>
                  <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${sourceLang === 'it' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('it', 'source')}>Italian</button>
                  <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${sourceLang === 'pt' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('pt', 'source')}>Portuguese</button>
                  <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${sourceLang === 'ru' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('ru', 'source')}>Russian</button>
                </div>
              )}
            </div>
            <div className="w-full h-[1px] bg-[#363d4d]"></div>
            <div className="w-full">
              <textarea
                name="translate"
                id="translate"
                className="bg-transparent w-full border-none outline-none resize-none"
                rows={7}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></textarea>
            </div>
            <p className="w-full text-right">{value.length}/500</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={readAloud}
                  alt="read aloud"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                  onClick={() => handleReadAloud(value, sourceLang)}
                />
                <div className="relative">
                  <img
                    src={copyText}
                    alt="copyText"
                    className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                    onClick={() => handleCopyText(value, 'original')}
                  />
                  {copyToast.original && (
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs rounded py-1 px-2">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
              <button
                className="flex items-center border-white border-2 py-2 px-4 bg-[#273fa9] rounded-md cursor-pointer hover:opacity-90"
                onClick={handleTranslate}
              >
                <img src={translate} alt="Translate" />
                <span>Translate</span>
              </button>
            </div>
          </div>
          <div className="bg-[#1e2432cc] text-white rounded-md p-5 w-full flex flex-col gap-8 border-[#4d5562] border">
            <div className="flex items-center gap-3 justify-between flex-wrap">
              <div className="flex items-center gap-6">
                <button className={`cursor-pointer hover:opacity-90 p-2 rounded-md ${targetLang === 'en' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('en', 'target')}>
                  English
                </button>
                <button className={`cursor-pointer hover:opacity-90 p-2 rounded-md ${targetLang === 'fr' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('fr', 'target')}>
                  French
                </button>
                <button className="flex items-center cursor-pointer hover:opacity-90 p-2" onClick={(e) => { setShowTargetDropdown(!showTargetDropdown); handleDropdownPosition(e); }}>
                  <span>{getLanguageName(targetLang)}</span>
                  <img src={arrowDown} alt="arrow-down" />
                </button>
                {showTargetDropdown && (
                  <div className="absolute bg-[#1e2432cc] text-white rounded-md p-2 mt-2" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${targetLang === 'de' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('de', 'target')}>German</button>
                    <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${targetLang === 'it' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('it', 'target')}>Italian</button>
                    <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${targetLang === 'pt' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('pt', 'target')}>Portuguese</button>
                    <button className={`block w-full text-left p-2 hover:bg-[#4d5562] ${targetLang === 'ru' ? 'bg-[#4d5562]' : ''}`} onClick={() => handleLanguageChange('ru', 'target')}>Russian</button>
                  </div>
                )}
              </div>
              <div className="p-2 border-2 border-[#4d5562] rounded-md cursor-pointer hover:opacity-90">
                <img src={translateBtn} alt="Translate" />
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#363d4d]"></div>
            <div className="w-full">
              <textarea
                name="translate"
                id="translate"
                className="bg-transparent w-full border-none outline-none resize-none"
                rows={7}
                value={translatedValue}
                readOnly
              ></textarea>
            </div>
            <p className="w-full text-right">{translatedValue.length}/500</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={readAloud}
                  alt="read aloud"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                  onClick={() => handleReadAloud(translatedValue, targetLang)}
                />
                <div className="relative">
                  <img
                    src={copyText}
                    alt="copyText"
                    className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                    onClick={() => handleCopyText(translatedValue, 'translated')}
                  />
                  {copyToast.translated && (
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs rounded py-1 px-2">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
