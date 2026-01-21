import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY not found in environment variables. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const MODEL_NAME = "gemini-1.5-flash";

export const generateText = async (prompt: string): Promise<string> => {
    // 1. Mock Mode (Fallback se não houver chave real ou se for "mock")
    if (!apiKey || apiKey === "mock") {
        console.warn("⚠️ Usando MOCK AI (Sem API Key válida detectada)");
        await new Promise(resolve => setTimeout(resolve, 1500));

        const originalTextMatch = prompt.match(/Texto original: "([^"]+)"/);
        const originalText = originalTextMatch ? originalTextMatch[1] : "Texto genérico";

        return `${originalText} (Versão Aprimorada pela IA Expert)`;
    }

    // 2. Real Mode (Google Gemini 1.5 Flash)
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1024,
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // Limpeza básica se a IA retornar aspas ou prefixos indesejados
        return text.replace(/^["']|["']$/g, '');

    } catch (error: any) {
        console.error("AI Generation Error:", error);

        // Caso a cota exceda ou erro de segurança, fallback amigável
        if (error.message?.includes("quota") || error.message?.includes("Safety")) {
            return "Não foi possível refinar este trecho agora. Por favor, tente novamente em instantes.";
        }

        throw new Error("Falha na comunicação com a inteligência artificial.");
    }
};
