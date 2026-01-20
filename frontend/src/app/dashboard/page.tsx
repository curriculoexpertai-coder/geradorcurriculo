"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, UserCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { getResumes } from "@/services/api";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [resumes, setResumes] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            getResumes(user.uid).then(setResumes);
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Saiu com sucesso!");
            router.push("/login");
        } catch (error: any) {
            toast.error("Erro ao sair: " + error.message);
        }
    };

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
            Carregando...
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-zinc-400">Bem-vindo, {user?.displayName || user?.email}</p>
                    </div>
                    <Button variant="ghost" onClick={handleSignOut} className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </header>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        className="bg-zinc-900/40 border-zinc-800 hover:border-blue-500/50 transition-colors cursor-pointer group"
                        onClick={() => router.push("/editor")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-zinc-300">Novo Currículo</CardTitle>
                            <PlusCircle className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-zinc-500">Crie um novo currículo do zero ou use IA.</p>
                        </CardContent>
                    </Card>

                    <Card
                        className="bg-zinc-900/40 border-zinc-800 hover:border-blue-500/50 transition-colors cursor-pointer group"
                        onClick={() => router.push("/dashboard/profile")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-zinc-300">Meu Perfil</CardTitle>
                            <UserCircle className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-zinc-500">Mantenha seus dados profissionais atualizados.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Meus Currículos */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Meus Currículos</h2>
                    {resumes.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-zinc-800 p-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="bg-zinc-900 p-4 rounded-full">
                                <FileText className="h-8 w-8 text-zinc-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Nenhum currículo ainda</h3>
                                <p className="text-sm text-zinc-500 max-w-xs">
                                    Comece agora mesmo a criar seu currículo otimizado com IA.
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/editor")}>
                                Criar meu primeiro CV
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {resumes.map((resume: any) => (
                                <Card
                                    key={resume.id}
                                    className="bg-zinc-900/40 border-zinc-800 hover:border-blue-500/50 transition-colors cursor-pointer group"
                                    onClick={() => router.push(`/editor?id=${resume.id}`)}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium text-zinc-300 truncate">{resume.title}</CardTitle>
                                        <FileText className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-zinc-500">Atualizado há {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
