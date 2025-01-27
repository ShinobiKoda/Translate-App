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
