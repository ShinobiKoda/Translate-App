import { useState } from "react";
import arrowDown from "../assets/images/Expand_down.svg";

interface LanguageSelectorProps {
  type: 'source' | 'target';
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
  dropdownVisible: boolean;
  onDropdownToggle: () => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' }
];

const initialLanguages = languages.slice(0, 2);
const dropdownLanguages = languages.slice(2);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ type, selectedLang, onLanguageChange, dropdownVisible, onDropdownToggle }) => {
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleDropdownPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom, left: rect.left });
  };

  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang);
  };

  const handleDropdownLanguageChange = (lang: string) => {
    onLanguageChange(lang);
    onDropdownToggle(); // Close the dropdown
  };

  return (
    <div className="flex items-center gap-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
      {type === 'source' && <p className="hover:opacity-90">Detect Language</p>}
      {initialLanguages.map((lang) => (
        <button
          key={lang.code}
          className={`cursor-pointer hover:opacity-90 p-2 rounded-md ${selectedLang === lang.code ? 'bg-[#4d5562]' : ''}`}
          onClick={() => handleLanguageChange(lang.code)}
        >
          {lang.name}
        </button>
      ))}
      <button className={`flex gap-2 items-center cursor-pointer hover:opacity-90 p-2 rounded-md ${dropdownVisible || selectedLang !== '' ? 'bg-[#4d5562]' : ''}`} onClick={(e) => { onDropdownToggle(); handleDropdownPosition(e); }}>
        <span>{languages.find(lang => lang.code === selectedLang)?.name}</span>
        <img src={arrowDown} alt="arrow-down" />
      </button>
      {dropdownVisible && (
        <div className="absolute bg-[#1e2432cc] text-white rounded-md p-2 mt-2" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
          {dropdownLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left p-2 hover:opacity-90`}
              onClick={() => handleDropdownLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
