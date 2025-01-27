import { TranslateResponse } from "../types/type";

const url = "https://libretranslate.com/translate";

export const fetchTranslation = async (data: { q: string; source: string; target: string; format: string }): Promise<TranslateResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Translation failed");
  }
  return response.json();
};
