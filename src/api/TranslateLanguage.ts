import { TranslateResponse } from "../types/type";

const url = "https://api.mymemory.translated.net/get";

export const fetchTranslation = async (q: string, source: string, target: string): Promise<TranslateResponse> => {
  try {
    const response = await fetch(`${url}?q=${encodeURIComponent(q)}&langpair=${source}|${target}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Translation API error:", errorText);
      throw new Error("Translation failed");
    }
    const result = await response.json();
    return {
      translatedText: result.responseData.translatedText,
      detectedSourceLanguage: result.responseData.detectedSourceLanguage || source
    };
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
};

export const detectLanguage = async (q: string): Promise<string> => {
  const response = await fetch(`${url}?q=${encodeURIComponent(q)}&langpair=auto|en`);
  if (!response.ok) {
    throw new Error("Language detection failed");
  }
  const result = await response.json();
  return result.responseData.detectedSourceLanguage;
};
