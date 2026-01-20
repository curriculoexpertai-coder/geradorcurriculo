import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY not found in environment variables. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const generateText = async (prompt: string): Promise<string> => {
    // 1. Mock Mode (Fallback se não houver chave)
    if (!apiKey || apiKey === "mock") {
        console.warn("⚠️ Usando MOCK AI (Sem API Key detectada)");
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula latência de rede/IA

        // Extrai o texto original grosso modo do prompt para "modificá-lo"
        const originalTextMatch = prompt.match(/Texto original: "([^"]+)"/);
        const originalText = originalTextMatch ? originalTextMatch[1] : "Texto genérico";

        return `[✨ IA Resposta Simulada]: ${originalText} (Versão Aprimorada Profissional)`;
    }

    // 2. Real Mode (Google Gemini)
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate content");
    }
};
