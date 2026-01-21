"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    PlusCircle,
    FileText,
    UserCircle,
    LogOut,
    Trash2,
    Copy,
    ChevronRight,
    Search,
    Clock,
    Layout
} from "lucide-react";
import { toast } from "sonner";
import { getResumes, deleteResume, duplicateResume } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [resumes, setResumes] = useState<any[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const fetchResumes = async () => {
        if (user) {
            const data = await getResumes(user.uid);
            setResumes(data || []);
            setIsInitialLoad(false);
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            fetchResumes();
        }
    }, [user, loading, router]);

    const handleDuplicate = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        toast.promise(duplicateResume(id), {
            loading: "Duplicando currículo...",
            success: (data) => {
                fetchResumes();
                return "Currículo duplicado!";
            },
            error: "Erro ao duplicar currículo."
        });
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Tem certeza que deseja excluir este currículo?")) return;

        toast.promise(deleteResume(id), {
            loading: "Excluindo currículo...",
            success: () => {
                setResumes(prev => prev.filter(r => r.id !== id));
                return "Currículo excluído!";
            },
            error: "Erro ao excluir currículo."
        });
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Saiu com sucesso!");
            router.push("/login");
        } catch (error: any) {
            toast.error("Erro ao sair: " + error.message);
        }
    };

    // Stats Calculations
    const totalResumes = resumes.length;
    const lastEdited = resumes.length > 0 ? new Date(resumes[0].updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '-';

    if (loading) return (
        <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#09090b] text-white selection:bg-blue-500/30 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

            {/* Navbar Simplified */}
            <nav className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">CurriculoExpert</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-zinc-500 mr-4 border-r border-white/5 pr-4">
                            <div className="flex flex-col items-end">
                                <span className="text-zinc-600">Plano Atual</span>
                                <span className="text-emerald-400">Pro (Trial)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pl-4">
                            <Button
                                variant="ghost"
                                onClick={handleSignOut}
                                className="h-9 w-9 p-0 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
                                <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-bold">
                                    {user?.email?.[0].toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Hero Section with Stats */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{user?.displayName?.split(' ')[0] || "Candidato"}</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Gerencie seus currículos, analise vagas e acompanhe sua jornada profissional em um só lugar.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white leading-none">{totalResumes}</p>
                                    <p className="text-xs text-zinc-500 font-medium">Currículos Criados</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white leading-none">{lastEdited}</p>
                                    <p className="text-xs text-zinc-500 font-medium">Última Edição</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">

                    {/* Sidebar Actions */}
                    <div className="space-y-4 sticky top-24">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/editor")}
                            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-lg shadow-blue-900/20"
                        >
                            <div className="relative bg-zinc-950/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center h-[180px] border border-white/10 transition-colors group-hover:bg-transparent">
                                <div className="bg-white/20 p-4 rounded-full shadow-inner mb-1 text-white">
                                    <PlusCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Criar Novo</h3>
                                    <p className="text-blue-100/80 text-xs mt-1">IA ou em Branco</p>
                                </div>
                            </div>
                        </motion.button>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => router.push("/dashboard/profile")}
                            className="cursor-pointer bg-zinc-900/40 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-colors group"
                        >
                            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                                <UserCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-white">Editar Perfil</h3>
                                <p className="text-xs text-zinc-500">Dados Pessoais</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-zinc-600 ml-auto group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </div>

                    {/* Resumes Grid/List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Layout className="h-5 w-5 text-zinc-500" />
                                Meus Currículos
                            </h2>
                            {/* Filter or Search could go here */}
                        </div>

                        <AnimatePresence mode="popLayout">
                            {resumes.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-zinc-900/20"
                                >
                                    <div className="h-24 w-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <FileText className="h-10 w-10 text-zinc-700" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Sua galeria está vazia</h3>
                                    <p className="text-zinc-500 max-w-sm mb-6">
                                        Comece criando seu primeiro currículo profissional. Nossa IA vai te ajudar em cada etapa.
                                    </p>
                                    <Button onClick={() => router.push("/editor")} variant="outline">Começar Agora</Button>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {resumes.map((resume: any, index: number) => (
                                        <motion.div
                                            key={resume.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-900/10"
                                        >
                                            <div onClick={() => router.push(`/editor?id=${resume.id}`)} className="cursor-pointer aspect-[210/297] bg-white relative overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                                                {/* Visual Preview Simulation - More Delicate */}
                                                <div className="absolute inset-6 space-y-3 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                                    <div className="flex gap-4 mb-6">
                                                        <div className="h-10 w-10 bg-black rounded-full" />
                                                        <div className="space-y-2 flex-1 pt-1">
                                                            <div className="h-2 w-2/3 bg-black rounded-sm" />
                                                            <div className="h-1.5 w-1/3 bg-black rounded-sm" />
                                                        </div>
                                                    </div>

                                                    <div className="h-1 w-full bg-black rounded-sm" />
                                                    <div className="h-1 w-full bg-black rounded-sm" />
                                                    <div className="h-1 w-5/6 bg-black rounded-sm" />

                                                    <div className="pt-4 space-y-2">
                                                        <div className="h-1.5 w-1/4 bg-black rounded-sm mb-2" />
                                                        <div className="h-1 w-full bg-black rounded-sm" />
                                                        <div className="h-1 w-full bg-black rounded-sm" />
                                                    </div>
                                                </div>

                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <div className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">
                                                                {resume.templateId || 'Modern'}
                                                            </div>
                                                            <h3 className="font-bold text-white text-lg leading-tight mb-1 truncate max-w-[200px]">
                                                                {resume.title}
                                                            </h3>
                                                            <p className="text-zinc-400 text-xs">
                                                                Editado em {new Date(resume.updatedAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                                            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions Overlay */}
                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2 pr-2">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-8 w-8 bg-zinc-900/80 backdrop-blur text-zinc-300 hover:text-white hover:bg-zinc-800"
                                                    onClick={(e) => handleDuplicate(e, resume.id)}
                                                    title="Duplicar"
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-8 w-8 bg-zinc-900/80 backdrop-blur text-zinc-300 hover:text-red-400 hover:bg-red-500/10"
                                                    onClick={(e) => handleDelete(e, resume.id)}
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Empregos Sugeridos (Mock) */}
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-zinc-300">
                                <Search className="h-4 w-4 text-emerald-500" />
                                Vagas que combinam com seu perfil
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">Senior Frontend Developer</h3>
                                            <p className="text-xs text-zinc-500">TechCorp Inc. • Remoto</p>
                                        </div>
                                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Match 98%</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">React</span>
                                        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">TypeScript</span>
                                        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">Next.js</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">Product Designer</h3>
                                            <p className="text-xs text-zinc-500">Creative Studio • São Paulo</p>
                                        </div>
                                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Match 85%</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">Figma</span>
                                        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">UI/UX</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
