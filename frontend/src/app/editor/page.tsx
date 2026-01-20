"use client";

import React, { useState } from "react";
import {
    LayoutTemplate,
    Palette,
    Type,
    Download,
    ChevronLeft,
    Sparkles,
    Settings2,
    Plus,
    Trash2,
    X,
    GraduationCap,
    Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initialResumeState, ResumeData } from "@/types/resume";

// --- Components (Floating Panels) ---

const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => (
    <div className="group relative flex items-center">
        {children}
        <span className="absolute left-14 scale-0 transition-all rounded bg-zinc-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap border border-zinc-700">
            {text}
        </span>
    </div>
);

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const FONTS = [
    { name: 'Inter', class: 'font-sans' },
    { name: 'Serif', class: 'font-serif' },
    { name: 'Mono', class: 'font-mono' },
];

const COLORS = [
    { name: 'Blue', class: 'text-blue-600', border: 'border-blue-600', bg: 'bg-blue-50' },
    { name: 'Emerald', class: 'text-emerald-600', border: 'border-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Purple', class: 'text-purple-600', border: 'border-purple-600', bg: 'bg-purple-50' },
    { name: 'Amber', class: 'text-amber-600', border: 'border-amber-600', bg: 'bg-amber-50' },
    { name: 'Rose', class: 'text-rose-600', border: 'border-rose-600', bg: 'bg-rose-50' },
    { name: 'Zinc', class: 'text-zinc-900', border: 'border-zinc-900', bg: 'bg-zinc-100' },
];

interface SidebarProps {
    currentFont: string;
    currentColor: string;
    onFontChange: (font: string) => void;
    onColorChange: (color: string) => void;
}

const Sidebar = ({ currentFont, currentColor, onFontChange, onColorChange }: SidebarProps) => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 h-[80vh] w-16 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center py-6 gap-6 shadow-2xl z-20 print:hidden"
        >
            <div className="bg-blue-600/20 p-2 rounded-xl mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
            </div>

            <Tooltip text="Templates">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl">
                    <LayoutTemplate className="h-5 w-5" />
                </Button>
            </Tooltip>

            <Popover>
                <PopoverTrigger asChild>
                    <div>
                        <Tooltip text="Cores">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl">
                                <Palette className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                    </div>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-40 bg-zinc-900 border-zinc-800 p-2">
                    <div className="grid grid-cols-3 gap-2">
                        {COLORS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => onColorChange(c.name)}
                                className={cn(
                                    "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                                    c.class.replace('text-', 'bg-'), // Hack rápido para preview visual
                                    c.border,
                                    currentColor === c.name ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900" : ""
                                )}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <div>
                        <Tooltip text="Tipografia">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl">
                                <Type className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                    </div>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-40 bg-zinc-900 border-zinc-800 p-1">
                    <div className="flex flex-col gap-1">
                        {FONTS.map((f) => (
                            <Button
                                key={f.name}
                                variant="ghost"
                                onClick={() => onFontChange(f.class)}
                                className={cn(
                                    "text-white justify-start hover:bg-zinc-800",
                                    f.class
                                )}
                            >
                                {f.name}
                            </Button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <div className="flex-1" />

            <Tooltip text="Configurações">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl">
                    <Settings2 className="h-5 w-5" />
                </Button>
            </Tooltip>
        </motion.div>
    );
};

const TopBar = ({ onDownload }: { onDownload: () => void }) => {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="fixed top-0 left-0 right-0 h-16 bg-zinc-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-10 print:hidden"
        >
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" onClick={() => window.history.back()}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
                </Button>
                <div className="h-6 w-[1px] bg-white/10" />
                <h1 className="text-sm font-medium text-white/80">Currículo Senior Frontend Dev</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Salvo via Cloud</span>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 rounded-full p-1 pr-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                        AI
                    </div>
                    <span className="text-xs text-zinc-400">Assistant Ativo</span>
                </div>
                <Button size="sm" className="bg-white text-black hover:bg-zinc-200 gap-2" onClick={onDownload}>
                    <Download className="h-4 w-4" /> Download PDF
                </Button>
            </div>
        </motion.header>
    );
};

import { useDebounce } from "@/hooks/useDebounce";
import { saveResume, getResumeById, generateAiText } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { AiAssistant } from "@/components/ui/ai-assistant";

import { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/ui/sortable-item";

// ... existing imports ...

interface ResumeCanvasProps {
    font: string;
    colorName: string;
}

const ResumeCanvas = forwardRef<HTMLDivElement, ResumeCanvasProps>(({ font, colorName }, ref) => {
    // Estado local do currículo
    const [resume, setResume] = useState<ResumeData>(initialResumeState);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("id");

    const handleAiGenerate = async (field: string, currentText: string, style: string, itemId?: string) => {
        toast.promise(
            generateAiText(currentText, style, field),
            {
                loading: 'A IA está reescrevendo seu texto...',
                success: (data: string) => {
                    if (field === 'summary') {
                        setResume(prev => ({ ...prev, summary: data }));
                    } else if (field === 'experience' && itemId) {
                        setResume(prev => ({
                            ...prev,
                            experience: prev.experience.map(e => e.id === itemId ? { ...e, description: data } : e)
                        }));
                    }
                    return 'Texto melhorado com sucesso!';
                },
                error: 'Erro ao gerar texto. Verifique sua conexão.'
            }
        );
    };

    // Load Resume on Mount
    useEffect(() => {
        if (resumeId) {
            setIsLoading(true);
            getResumeById(resumeId).then(data => {
                if (data && data.structureData) {
                    setResume({ ...data.structureData, id: data.id });
                }
            }).finally(() => setIsLoading(false));
        }
    }, [resumeId]);

    // Autosave Magic
    const debouncedResume = useDebounce(resume, 3000); // 3 seconds delay

    useEffect(() => {
        if (debouncedResume && user) {
            const save = async () => {
                const result = await saveResume(user.uid, debouncedResume);
                if (result) {
                    // Se o backend retornou um novo ID (criação), atualizamos nosso estado local
                    // para que o próximo save seja um UPDATE, não um CREATE
                    if (result.id && result.id !== resume.id) {
                        setResume(prev => ({ ...prev, id: result.id }));
                    }

                    toast.success("Salvo na nuvem", {
                        position: "bottom-right",
                        duration: 2000,
                        className: "bg-zinc-900 border border-zinc-800 text-white"
                    });
                }
            };
            save();
        }
    }, [debouncedResume, user]);

    // Função genérica para atualizar campos aninhados (ex: personalInfo.fullName)
    const updateInfo = (field: keyof typeof resume.personalInfo, value: string) => {
        setResume(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    // --- DnD Logic (Reordenar) ---
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setResume((prev) => {
                // Check if sorting Experience
                const oldExpIndex = prev.experience.findIndex(item => item.id === active.id);
                if (oldExpIndex !== -1) {
                    const newExpIndex = prev.experience.findIndex(item => item.id === over?.id);
                    return {
                        ...prev,
                        experience: arrayMove(prev.experience, oldExpIndex, newExpIndex)
                    };
                }

                // Check if sorting Education
                const oldEduIndex = prev.education.findIndex(item => item.id === active.id);
                if (oldEduIndex !== -1) {
                    const newEduIndex = prev.education.findIndex(item => item.id === over?.id);
                    return {
                        ...prev,
                        education: arrayMove(prev.education, oldEduIndex, newEduIndex)
                    };
                }

                return prev;
            });
        }
    };

    // --- CRUD Handlers ---

    const addExperience = () => {
        setResume(prev => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: crypto.randomUUID(),
                    role: "Novo Cargo",
                    company: "Nova Empresa",
                    period: "Presente",
                    description: "Descreva suas responsabilidades e conquistas..."
                }
            ]
        }));
    };

    const removeExperience = (id: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const addEducation = () => {
        setResume(prev => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: crypto.randomUUID(),
                    degree: "Novo Curso / Graduação",
                    institution: "Instituição de Ensino",
                    period: "Ano de Conclusão"
                }
            ]
        }));
    };

    const removeEducation = (id: string) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const addSkill = () => {
        setResume(prev => ({
            ...prev,
            skills: [...prev.skills, "Nova Competência"]
        }));
    };

    const removeSkill = (index: number) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...resume.skills];
        newSkills[index] = value;
        setResume(prev => ({ ...prev, skills: newSkills }));
    };

    // Derived Styles
    const activeColor = COLORS.find(c => c.name === colorName) || COLORS[0];

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="h-full w-full flex items-start justify-center overflow-y-auto pt-24 pb-20 px-8"
        >
            {/* The A4 Paper */}
            <div ref={ref} className={cn(
                "w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm relative group transition-all duration-300 selection:bg-blue-100 selection:text-blue-900 print:shadow-none print:w-full print:h-full print:absolute print:inset-0 print:m-0 print:rounded-none",
                font
            )}>

                {/* Visual Grid / Guides (Hidden by default, shown on hover/drag) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                    <div className={cn("h-full w-full grid grid-cols-12 gap-4 px-8 border-x", activeColor.border, "opacity-20")}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className={cn("h-full border-x", activeColor.border, "opacity-10")} />
                        ))}
                    </div>
                </div>

                {/* Content Placeholder (The CV) */}
                <div className="p-12 h-full flex flex-col text-zinc-900 relative">

                    {/* Page Limit Indicator */}
                    <div className="absolute top-[290mm] left-0 w-full border-b border-red-400 border-dashed opacity-50 pointer-events-none print:hidden flex items-end justify-end pr-2">
                        <span className="text-[10px] text-red-400 bg-white px-1">Fim da Página 1 (A4)</span>
                    </div>

                    <header className={cn(
                        "border-b-2 pb-8 mb-8 p-4 -mx-4 rounded-lg transition-colors cursor-text group/header relative",
                        activeColor.border,
                        `hover:${activeColor.bg}/50`
                    )}>
                        {/* Inline Edit Magic */}
                        <div className="absolute right-2 top-2 opacity-0 group-hover/header:opacity-100 flex gap-2">
                            <Button size="icon" variant="ghost" className="h-6 w-6"><Sparkles className={cn("h-3 w-3", activeColor.class)} /></Button>
                        </div>

                        <h1
                            className="text-4xl font-bold tracking-tight uppercase outline-none empty:before:content-['Nome'] empty:before:text-zinc-300"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateInfo("fullName", e.currentTarget.innerText)}
                        >
                            {resume.personalInfo.fullName}
                        </h1>
                        <p
                            className={cn("text-lg mt-2 font-medium outline-none", activeColor.class)}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateInfo("jobTitle", e.currentTarget.innerText)}
                        >
                            {resume.personalInfo.jobTitle}
                        </p>

                        <div className="flex gap-4 mt-4 text-sm text-zinc-600">
                            {/* ... contacts ... */}
                            <span className="flex items-center gap-1">
                                📍 <span contentEditable suppressContentEditableWarning onBlur={(e) => updateInfo("location", e.currentTarget.innerText)}>{resume.personalInfo.location}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                📧 <span contentEditable suppressContentEditableWarning onBlur={(e) => updateInfo("email", e.currentTarget.innerText)}>{resume.personalInfo.email}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                📱 <span contentEditable suppressContentEditableWarning onBlur={(e) => updateInfo("phone", e.currentTarget.innerText)}>{resume.personalInfo.phone}</span>
                            </span>
                        </div>
                    </header>

                    <div className="grid grid-cols-3 gap-8 flex-1">
                        {/* Left Column */}
                        <div className="col-span-2 space-y-8">
                            <section className={cn("p-4 -mx-4 rounded-lg transition-colors cursor-text relative group/section", `hover:${activeColor.bg}/50`)}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Resumo</h2>
                                    <div className="opacity-0 group-hover/section:opacity-100 transition-opacity">
                                        <AiAssistant onGenerate={(style) => handleAiGenerate('summary', resume.summary, style)} />
                                    </div>
                                </div>
                                <p
                                    className="text-sm leading-relaxed text-zinc-700 outline-none"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => setResume(prev => ({ ...prev, summary: e.currentTarget.innerText }))}
                                >
                                    {resume.summary}
                                </p>
                            </section>

                            <section className={cn("p-4 -mx-4 rounded-lg transition-colors cursor-text relative group/section", `hover:${activeColor.bg}/50`)}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" /> Experiência
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                        modifiers={[]}
                                    >
                                        <SortableContext
                                            items={resume.experience.map(e => e.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {resume.experience.map((exp) => (
                                                <SortableItem key={exp.id} id={exp.id}>
                                                    <div className="relative group/item hover:bg-black/5 p-2 rounded -ml-2 transition-colors">
                                                        {/* Delete Button */}
                                                        {/* Actions: AI + Delete */}
                                                        <div className="absolute right-2 top-2 opacity-0 group-hover/item:opacity-100 flex gap-1 print:hidden z-10 transition-all">
                                                            <div onPointerDown={(e) => e.stopPropagation()}>
                                                                <AiAssistant onGenerate={(style) => handleAiGenerate('experience', exp.description, style, exp.id)} />
                                                            </div>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                                                                className="p-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 transition-all cursor-pointer h-6 w-6 flex items-center justify-center"
                                                                title="Remover experiência"
                                                                onPointerDown={(e) => e.stopPropagation()}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                            </button>
                                                        </div>

                                                        <h3 className="font-bold outline-none text-zinc-800" contentEditable suppressContentEditableWarning
                                                            onBlur={(e) => {
                                                                const newExp = [...resume.experience];
                                                                const idx = newExp.findIndex(i => i.id === exp.id);
                                                                if (idx >= 0) {
                                                                    newExp[idx].role = e.currentTarget.innerText;
                                                                    setResume(prev => ({ ...prev, experience: newExp }));
                                                                }
                                                            }}
                                                        >{exp.role}</h3>

                                                        <div className={cn("text-sm font-medium mt-1 flex gap-1", activeColor.class)}>
                                                            <span
                                                                className="outline-none"
                                                                contentEditable
                                                                suppressContentEditableWarning
                                                                onBlur={(e) => {
                                                                    const newExp = [...resume.experience];
                                                                    const idx = newExp.findIndex(i => i.id === exp.id);
                                                                    if (idx >= 0) {
                                                                        newExp[idx].company = e.currentTarget.innerText;
                                                                        setResume(prev => ({ ...prev, experience: newExp }));
                                                                    }
                                                                }}
                                                            >
                                                                {exp.company}
                                                            </span>
                                                            <span>•</span>
                                                            <span
                                                                className="outline-none"
                                                                contentEditable
                                                                suppressContentEditableWarning
                                                                onBlur={(e) => {
                                                                    const newExp = [...resume.experience];
                                                                    const idx = newExp.findIndex(i => i.id === exp.id);
                                                                    if (idx >= 0) {
                                                                        newExp[idx].period = e.currentTarget.innerText;
                                                                        setResume(prev => ({ ...prev, experience: newExp }));
                                                                    }
                                                                }}
                                                            >
                                                                {exp.period}
                                                            </span>
                                                        </div>

                                                        <p className="mt-2 text-sm text-zinc-600 leading-relaxed outline-none" contentEditable suppressContentEditableWarning
                                                            onBlur={(e) => {
                                                                const newExp = [...resume.experience];
                                                                const idx = newExp.findIndex(i => i.id === exp.id);
                                                                if (idx >= 0) {
                                                                    newExp[idx].description = e.currentTarget.innerText;
                                                                    setResume(prev => ({ ...prev, experience: newExp }));
                                                                }
                                                            }}
                                                        >
                                                            {exp.description}
                                                        </p>
                                                    </div>
                                                </SortableItem>
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                </div>
                                <Button
                                    onClick={addExperience}
                                    variant="ghost"
                                    className="w-full mt-4 border-2 border-dashed border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 print:hidden"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Adicionar Experiência
                                </Button>
                            </section>

                            <section className={cn("p-4 -mx-4 rounded-lg transition-colors cursor-text relative group/section", `hover:${activeColor.bg}/50`)}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" /> Formação
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                        modifiers={[]}
                                    >
                                        <SortableContext
                                            items={resume.education.map(e => e.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {resume.education.map((edu) => (
                                                <SortableItem key={edu.id} id={edu.id}>
                                                    <div className="relative group/item hover:bg-black/5 p-2 rounded -ml-2 transition-colors">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                                                            className="absolute right-2 top-2 opacity-0 group-hover/item:opacity-100 p-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 transition-all print:hidden z-10 cursor-pointer"
                                                            title="Remover formação"
                                                            onPointerDown={(e) => e.stopPropagation()}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>

                                                        <h3 className="font-bold outline-none text-zinc-800" contentEditable suppressContentEditableWarning
                                                            onBlur={(e) => {
                                                                const newEdu = [...resume.education];
                                                                const idx = newEdu.findIndex(i => i.id === edu.id);
                                                                if (idx >= 0) {
                                                                    newEdu[idx].degree = e.currentTarget.innerText;
                                                                    setResume(prev => ({ ...prev, education: newEdu }));
                                                                }
                                                            }}
                                                        >
                                                            {edu.degree}
                                                        </h3>
                                                        <div className={cn("text-sm font-medium mt-1 flex gap-1", activeColor.class)}>
                                                            <span
                                                                className="outline-none"
                                                                contentEditable
                                                                suppressContentEditableWarning
                                                                onBlur={(e) => {
                                                                    const newEdu = [...resume.education];
                                                                    const idx = newEdu.findIndex(i => i.id === edu.id);
                                                                    if (idx >= 0) {
                                                                        newEdu[idx].institution = e.currentTarget.innerText;
                                                                        setResume(prev => ({ ...prev, education: newEdu }));
                                                                    }
                                                                }}
                                                            >
                                                                {edu.institution}
                                                            </span>
                                                            <span>•</span>
                                                            <span
                                                                className="outline-none"
                                                                contentEditable
                                                                suppressContentEditableWarning
                                                                onBlur={(e) => {
                                                                    const newEdu = [...resume.education];
                                                                    const idx = newEdu.findIndex(i => i.id === edu.id);
                                                                    if (idx >= 0) {
                                                                        newEdu[idx].period = e.currentTarget.innerText;
                                                                        setResume(prev => ({ ...prev, education: newEdu }));
                                                                    }
                                                                }}
                                                            >
                                                                {edu.period}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </SortableItem>
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                </div>
                                <Button
                                    onClick={addEducation}
                                    variant="ghost"
                                    className="w-full mt-4 border-2 border-dashed border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 print:hidden"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Adicionar Formação
                                </Button>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className={cn("space-y-8 p-4 rounded-lg h-fit", activeColor.bg)}>
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-zinc-400">Competências</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.map((skill, index) => (
                                        <div key={index} className="group/tag relative">
                                            <span
                                                className="bg-white px-2 py-1 rounded text-xs font-medium text-zinc-700 shadow-sm border border-zinc-200 outline-none focus:ring-1 focus:ring-blue-500 block min-w-[30px]"
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => updateSkill(index, e.currentTarget.innerText)}
                                            >
                                                {skill}
                                            </span>
                                            <button
                                                onClick={() => removeSkill(index)}
                                                className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/tag:opacity-100 transition-opacity hover:bg-red-600 print:hidden z-10"
                                            >
                                                <X className="h-2 w-2" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addSkill}
                                        className="px-2 py-1 rounded text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1 print:hidden"
                                    >
                                        <Plus className="h-3 w-3" /> Add
                                    </button>
                                </div>
                            </section>
                            {/* ... other sections ... */}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
ResumeCanvas.displayName = "ResumeCanvas";

export default function EditorPage() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [design, setDesign] = useState({
        font: 'font-sans',
        color: 'Blue'
    });

    const handlePrint = useReactToPrint({
        contentRef: resumeRef,
        documentTitle: `Curriculo-CVAI-${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: () => toast.success("Download do PDF iniciado!"),
    });

    return (
        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden selection:bg-blue-500/30" >
            {/* Background Effects */}
            < div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-20" />

            <div className="print:hidden">
                <Sidebar
                    currentFont={design.font}
                    currentColor={design.color}
                    onFontChange={(f) => setDesign(prev => ({ ...prev, font: f }))}
                    onColorChange={(c) => setDesign(prev => ({ ...prev, color: c }))}
                />
                <TopBar onDownload={handlePrint} />
            </div>

            <main className="pl-24 pr-4 h-screen pt-20 print:p-0 print:h-auto print:static">
                <Suspense fallback={<div className="text-white text-center pt-20">Carregando editor...</div>}>
                    <ResumeCanvas ref={resumeRef} font={design.font} colorName={design.color} />
                </Suspense>
            </main>
        </div >
    );
}
