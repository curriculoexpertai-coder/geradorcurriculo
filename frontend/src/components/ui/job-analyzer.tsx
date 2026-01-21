"use client";

import { useState } from "react";
import {
    Target,
    X,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Loader2,
    Sparkles,
    Search,
    Copy,
    Mail,
    Check
} from "lucide-react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { analyzeJob, generateCoverLetter } from "@/services/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResult {
    score: number;
    summary: string;
    pros: string[];
    cons: string[];
    missingKeywords: string[];
    suggestions: string[];
}

interface JobAnalyzerProps {
    resumeData: any;
    isOpen: boolean;
    onClose: () => void;
}

export function JobAnalyzer({ resumeData, isOpen, onClose }: JobAnalyzerProps) {
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [coverLetter, setCoverLetter] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            toast.error("Por favor, insira a descrição da vaga.");
            return;
        }

        setIsAnalyzing(true);
        try {
            const data = await analyzeJob(resumeData, jobDescription);
            setResult(data);
            toast.success("Análise concluída!");
        } catch (error) {
            toast.error("Erro ao analisar a vaga. Tente novamente.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleGenerateLetter = async () => {
        setIsGeneratingLetter(true);
        try {
            const letter = await generateCoverLetter(resumeData, jobDescription);
            setCoverLetter(letter);
            toast.success("Carta de apresentação gerada!");
        } catch (error) {
            toast.error("Erro ao gerar carta. Tente novamente.");
        } finally {
            setIsGeneratingLetter(false);
        }
    };

    const copyToClipboard = () => {
        if (coverLetter) {
            navigator.clipboard.writeText(coverLetter);
            setCopied(true);
            toast.success("Copiado para a área de transferência!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClose = () => {
        setResult(null);
        setCoverLetter(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/10 p-2 rounded-lg">
                            <Target className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Analisador de Vagas</h2>
                            <p className="text-xs text-zinc-400">Compare seu currículo com as exigências do mercado</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="text-zinc-400 hover:text-white">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {!result ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Search className="h-4 w-4" /> Descrição da Vaga
                                </label>
                                <Textarea
                                    placeholder="Cole aqui a descrição completa da vaga que você deseja analisar..."
                                    className="min-h-[300px] bg-zinc-950 border-zinc-800 text-zinc-200 focus:ring-blue-500/50"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analisando com IA...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Começar Análise
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Score Header */}
                            <div className="flex flex-col items-center text-center space-y-4 p-8 bg-zinc-950 rounded-2xl border border-zinc-800 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                                <div className="relative">
                                    <svg className="h-24 w-24 transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-zinc-800"
                                        />
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={251.2}
                                            strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                                            className="text-blue-500 transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                                        {result.score}%
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Match Score</h3>
                                    <p className="text-zinc-400 max-w-md mt-2">{result.summary}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-zinc-950 border-zinc-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold text-emerald-500 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" /> Pontos Fortes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {result.pros.map((pro, i) => (
                                            <p key={i} className="text-xs text-zinc-300 leading-relaxed">• {pro}</p>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-950 border-zinc-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold text-amber-500 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" /> O que falta
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {result.cons.map((con, i) => (
                                            <p key={i} className="text-xs text-zinc-300 leading-relaxed">• {con}</p>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Keywords & Suggestions */}
                            <div className="space-y-4">
                                <section>
                                    <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Palavras-chave faltantes</h4>
                                    <div className="flex flex-wrap gap-2 text-white">
                                        {result.missingKeywords.map((kw, i) => (
                                            <span key={i} className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-medium">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-3">
                                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                                        <ArrowRight className="h-4 w-4" /> Sugestões de Ajuste
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.suggestions.map((sug, i) => (
                                            <li key={i} className="text-xs text-zinc-300 flex gap-2">
                                                <span className="text-blue-500 font-bold">»</span> {sug}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* Cover Letter Section */}
                            {!coverLetter ? (
                                <Button
                                    onClick={handleGenerateLetter}
                                    disabled={isGeneratingLetter}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                >
                                    {isGeneratingLetter ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Escrevendo Carta...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="mr-2 h-5 w-5" />
                                            Gerar Carta de Apresentação
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-emerald-400" /> Carta de Apresentação Gerada
                                        </h4>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={copyToClipboard}
                                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 gap-2"
                                        >
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            {copied ? "Copiado!" : "Copiar Texto"}
                                        </Button>
                                    </div>
                                    <div className="p-6 bg-zinc-950 border border-emerald-500/20 rounded-2xl text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-serif italic shadow-inner max-h-[400px] overflow-y-auto">
                                        {coverLetter}
                                    </div>
                                </motion.div>
                            )}

                            <Button
                                variant="outline"
                                className="w-full border-zinc-800 text-zinc-400 hover:text-white h-12"
                                onClick={() => {
                                    setResult(null);
                                    setCoverLetter(null);
                                }}
                            >
                                Analisar outra vaga
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
