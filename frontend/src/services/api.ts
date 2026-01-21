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
            const errorText = await response.text();
            console.error("Erro ao sincronizar usuário com backend:", errorText);
            throw new Error(`Falha na sincronização: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão com backend:", error);
        throw error;
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
            const errorText = await response.text();
            console.error("Erro ao salvar currículo:", errorText);
            throw new Error(`Falha ao salvar: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao salvar:", error);
        throw error;
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
            const errorText = await response.text();
            console.error("Erro ao buscar currículos:", errorText);
            throw new Error(`Falha ao buscar currículos: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao buscar currículos:", error);
        throw error;
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
            const errorText = await response.text();
            console.error("Erro ao buscar currículo:", errorText);
            throw new Error(`Falha ao buscar currículo: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao buscar currículo:", error);
        throw error;
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

export async function updateUserProfile(uid: string, profileData: any) {
    try {
        const response = await fetch(`${API_URL}/users/${uid}/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao atualizar perfil:", errorText);
            throw new Error(`Falha ao atualizar perfil: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao atualizar perfil:", error);
        throw error;
    }
}

export async function getUserProfile(uid: string) {
    try {
        const response = await fetch(`${API_URL}/users/${uid}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao buscar perfil:", errorText);
            throw new Error(`Falha ao buscar perfil: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao buscar perfil:", error);
        throw error;
    }
}

export async function deleteResume(id: string) {
    try {
        const response = await fetch(`${API_URL}/resumes/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error('Falha ao deletar currículo');
        }

        return true;
    } catch (error) {
        console.error("Erro ao deletar:", error);
        throw error;
    }
}

export async function duplicateResume(id: string) {
    try {
        const response = await fetch(`${API_URL}/resumes/${id}/duplicate`, {
            method: "POST",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao duplicar currículo:", errorText);
            throw new Error(`Falha ao duplicar: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão ao duplicar:", error);
        throw error;
    }
}

export async function analyzeJob(resumeData: any, jobDescription: string) {
    try {
        const response = await fetch(`${API_URL}/ai/analyze-job`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ resumeData, jobDescription }),
        });

        if (!response.ok) {
            console.error("Erro ao analisar vaga:", await response.text());
            throw new Error("Falha na análise da IA");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao chamar Analisador de Vagas:", error);
        throw error;
    }
}

export async function generateCoverLetter(resumeData: any, jobDescription: string) {
    try {
        const response = await fetch(`${API_URL}/ai/generate-cover-letter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ resumeData, jobDescription }),
        });

        if (!response.ok) {
            console.error("Erro ao gerar carta:", await response.text());
            throw new Error("Falha na geração da carta pela IA");
        }

        const data = await response.json();
        return data.letter;
    } catch (error) {
        console.error("Erro ao gerar carta de apresentação:", error);
        throw error;
    }
}



