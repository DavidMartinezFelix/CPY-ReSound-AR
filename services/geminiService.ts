import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductResponse = async (
  userMessage: string,
  productContext: string = "este producto"
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Eres un experto servicial sobre ${productContext}. 
        Mantén las respuestas concisas (menos de 50 palabras) y amigables.
        Responde siempre en Español.
        Si te preguntan sobre características de AR, explica que pueden ver el producto en su propio espacio usando la cámara.`,
      },
    });

    return response.text || "Tengo problemas para recuperar esa información en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Actualmente estoy fuera de servicio. Por favor inténtalo más tarde.";
  }
};