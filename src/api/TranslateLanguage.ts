import { TranslateResponse } from "../types/type";

const url = "https://api.mymemory.translated.net/get";

export const fetchTranslation = async (q: string, source: string, target: string): Promise<TranslateResponse> => {
  const response = await fetch(`${url}?q=${encodeURIComponent(q)}&langpair=${source}|${target}`);
  if (!response.ok) {
    throw new Error("Translation failed");
  }
  const result = await response.json();
  return {
    translatedText: result.responseData.translatedText,
    detectedSourceLanguage: source
  };
};

export const detectLanguage = async (q: string): Promise<string> => {
  const response = await fetch(`${url}?q=${encodeURIComponent(q)}&langpair=auto|en`);
  if (!response.ok) {
    throw new Error("Language detection failed");
  }
  const result = await response.json();
  return result.responseData.detectedSourceLanguage;
};
