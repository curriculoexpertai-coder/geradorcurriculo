"use client";

import { useState, useEffect } from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    Sparkles,
    Terminal,
    Github,
    ArrowRight,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const { loginAsAdmin } = useAuth();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        if (mode === "register") {
            let strength = 0;
            if (password.length > 6) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            setPasswordStrength(strength);
        }
    }, [password, mode]);

    const handleAdminLogin = () => {
        loginAsAdmin();
        toast.success("Acesso liberado: Modo Administrador");
        router.push("/dashboard");
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Bem-vindo de volta!");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error("Ops! Erro ao acessar com Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("Que bom ver você de novo!");
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                toast.success("Conta criada com sucesso! Prepare-se para decolar.");
            }
            router.push("/dashboard");
        } catch (error: any) {
            const message = error.code === 'auth/email-already-in-use'
                ? "Este e-mail já está em uso."
                : "Credenciais inválidas. Tente novamente.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-500/30">
            {/* Background Architecture */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Brand Logo */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] mb-4"
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        CurriculoExpert
                    </h1>
                </div>

                <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl relative">
                    <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                    <div className="mb-8 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold mb-2">
                                    {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
                                </h2>
                                <p className="text-zinc-500 text-sm">
                                    {mode === "login"
                                        ? "Entre com suas credenciais para continuar."
                                        : "Junte-se a milhares de candidatos de elite."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <Button
                            variant="outline"
                            className="bg-white/5 border-white/5 hover:bg-white/10 text-white h-12 rounded-xl text-xs gap-2"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.27l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white/5 border-white/5 hover:bg-white/10 text-white h-12 rounded-xl text-xs gap-2"
                            disabled={true}
                        >
                            <Github className="h-4 w-4" /> Github
                        </Button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                            <span className="bg-[#09090b] px-3 text-zinc-600">Ou use e-mail</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {mode === "register" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2"
                                >
                                    <Label className="text-xs font-bold text-zinc-400">Nome Completo</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                        <Input
                                            type="text"
                                            placeholder="Ex: João Silva"
                                            className="bg-white/5 border-white/5 h-12 pl-10 rounded-xl focus:border-blue-500/50 transition-all"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required={mode === "register"}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-zinc-400">E-mail Corporativo</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                <Input
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="bg-white/5 border-white/5 h-12 pl-10 rounded-xl focus:border-blue-500/50 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-bold text-zinc-400">Senha</Label>
                                {mode === "login" && (
                                    <button type="button" className="text-[10px] text-blue-400 hover:text-blue-300 font-bold">Esqueceu a senha?</button>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/5 h-12 pl-10 pr-10 rounded-xl focus:border-blue-500/50 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {mode === "register" && (
                                <div className="space-y-2 pt-1">
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${passwordStrength}%`,
                                                backgroundColor: passwordStrength < 50 ? "#ef4444" : passwordStrength < 100 ? "#eab308" : "#22c55e"
                                            }}
                                            className="h-full"
                                        />
                                    </div>
                                    <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                                        <ShieldCheck className="h-3 w-3" />
                                        {passwordStrength < 50 ? "Senha fraca" : passwordStrength < 100 ? "Senha média" : "Senha forte de elite"}
                                    </p>
                                </div>
                            )}
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-lg shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
                            disabled={loading}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? "Processando..." : (mode === "login" ? "Acessar Plataforma" : "Criar Agora")}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </span>
                            {loading && (
                                <motion.div
                                    className="absolute inset-0 bg-white/10"
                                    animate={{ left: ["-100%", "100%"] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                        <button
                            type="button"
                            onClick={() => setMode(mode === "login" ? "register" : "login")}
                            className="text-center text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                            {mode === "login" ? (
                                <>Não tem uma conta? <span className="text-blue-400 font-bold ml-1">Assine agora</span></>
                            ) : (
                                <>Já possui uma conta? <span className="text-blue-400 font-bold ml-1">Entrar aqui</span></>
                            )}
                        </button>

                        <button
                            onClick={handleAdminLogin}
                            className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors"
                        >
                            <Terminal className="h-3 w-3" /> Acesso Administrador (Offline)
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> SSL Segura</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Dados Criptografados</span>
                </div>
            </motion.div>
        </div>
    );
}
