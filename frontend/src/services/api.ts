import { User } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function syncUserToBackend(user: User) {
    try {
        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Preparando para futuro middleware de auth
            },
            body: JSON.stringify({
                id: user.uid,
                email: user.email,
                name: user.displayName || "Usuário sem nome",
            }),
        });

        if (!response.ok) {
            console.error("Erro ao sincronizar usuário com backend:", await response.text());
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão com backend:", error);
        return null;
    }
}

export async function saveResume(uid: string, resumeData: any) {
    try {
        const response = await fetch(`${API_URL}/resumes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: uid,
                resumeId: resumeData.id, // Se já existir ID, manda para atualizar
                title: resumeData.title || "Meu Currículo",
                data: resumeData, // JSON completo
            }),
        });

        if (!response.ok) {
            console.error("Erro ao salvar currículo:", await response.text());
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao salvar:", error);
        return null;
    }
}

export async function getResumes(uid: string) {
    try {
        const response = await fetch(`${API_URL}/users/${uid}/resumes`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            console.error("Erro ao buscar currículos:", await response.text());
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao buscar currículos:", error);
        return [];
    }
}

export async function getResumeById(id: string) {
    try {
        const response = await fetch(`${API_URL}/resumes/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            console.error("Erro ao buscar currículo:", await response.text());
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao buscar currículo:", error);
        return null;
    }
}

export async function generateAiText(currentText: string, style: string, section?: string) {
    try {
        const response = await fetch(`${API_URL}/ai/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentText, style, section }),
        });

        if (!response.ok) {
            console.error("Erro na IA:", await response.text());
            throw new Error("Falha ao gerar texto");
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Erro ao chamar IA:", error);
        throw error;
    }
}
