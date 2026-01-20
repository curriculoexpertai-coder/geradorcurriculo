export interface ResumeData {
    id?: string;
    title: string;
    personalInfo: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone: string;
        location: string;
        website?: string;
        linkedin?: string;
    };
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
    languages: LanguageItem[];
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    period: string;
}

export interface LanguageItem {
    id: string;
    language: string;
    level: string;
}

export const initialResumeState: ResumeData = {
    title: "Meu Currículo",
    personalInfo: {
        fullName: "SEU NOME",
        jobTitle: "Cargo Pretendido",
        email: "email@exemplo.com",
        phone: "(11) 99999-9999",
        location: "São Paulo, SP"
    },
    summary: "Profissional apaixonado com mais de 5 anos de experiência...",
    experience: [
        {
            id: "1",
            role: "Senior Frontend Developer",
            company: "Empresa Exemplo",
            period: "2020 - Presente",
            description: "Liderou a equipe de desenvolvimento..."
        }
    ],
    education: [],
    skills: ["React", "TypeScript", "Node.js"],
    languages: [{ id: "1", language: "Português", level: "Nativo" }]
};
