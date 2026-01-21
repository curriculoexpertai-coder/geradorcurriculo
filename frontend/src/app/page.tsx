"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layout,
  FileText,
  Zap,
  Target,
  Menu,
  X,
  Check,
  Star,
  Brain,
  Rocket,
  Download,
  ShieldCheck,
  Briefcase,
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const RESUME_MODELS = [
  "resume_model_modern_blue.png",
  "resume_model_elegant_dark.png",
  "resume_model_creative_purple.png",
  "resume_model_minimalist_teal.png",
  "resume_model_executive_gold.png",
  "resume_model_minimalist_bw.png",
  "resume_model_startup_orange.png",
  "resume_model_academic_classic.png"
];

// Combine for a long carousel (24 items)
const ALL_MODELS = [
  ...RESUME_MODELS, ...RESUME_MODELS, ...RESUME_MODELS
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Auto-scroll logic for the carousel
    const carousel = carouselRef.current;
    let scrollInterval: NodeJS.Timeout;

    if (carousel && !isCarouselHovered) {
      scrollInterval = setInterval(() => {
        const { scrollLeft, offsetWidth, scrollWidth } = carousel;

        // Loop infinito simulado
        if (scrollLeft + offsetWidth >= scrollWidth - 100) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: 500, behavior: 'smooth' });
        }
      }, 2000);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isCarouselHovered]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- NAVBAR --- */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled ? "bg-white/80 backdrop-blur-md border-slate-200 py-3" : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CurriculoExpert</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Como Funciona</a>
            <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Benefícios</a>
            <a href="#precos" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Planos</a>
            <div className="h-4 w-px bg-slate-200" />
            <Link href="/login" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">Entrar</Link>
            <Button onClick={() => window.location.href = '/login'} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 font-semibold shadow-lg shadow-blue-600/20">
              Criar Grátis
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2">Como Funciona</a>
                <a href="#precos" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2">Planos</a>
                <Link href="/login" className="w-full bg-blue-600 text-white py-3 rounded-lg text-center font-bold">Criar Currículo Agora</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32">

        {/* --- 1. HERO SECTION (Redesigned for High Conversion) --- */}
        <section className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Left Side: Copy & Benefits */}
              <div className="flex-1 text-left">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="flex text-emerald-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    Excelente <span className="text-slate-900">4.9/5</span> ★ +5.000 avaliações
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]"
                >
                  Crie um currículo <br />
                  <span className="text-blue-600">profissional em minutos</span>
                </motion.h2>

                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 mb-10"
                >
                  {[
                    "Modelos criados por especialistas em RH",
                    "Dicas de escrita em tempo real com Inteligência Artificial",
                    "Baixe em Word ou PDF otimizado para ATS",
                    "Aumente suas chances de entrevista em até 3x"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-slate-600">
                      <div className="mt-1 bg-blue-100 rounded-full p-1 text-blue-600">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <Button
                    onClick={() => window.location.href = '/login'}
                    className="h-16 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold shadow-2xl shadow-blue-600/30 w-full sm:w-auto transition-all hover:scale-105 active:scale-95"
                  >
                    Criar meu currículo agora
                  </Button>
                </motion.div>

                <p className="mt-6 text-sm text-slate-400 font-medium italic">
                  Grátis para começar • Sem cartão de crédito • Modelos 2024
                </p>
              </div>

              {/* Right Side: EXTRAORDINARY Collaborative AI Editor Mockup */}
              <div className="flex-1 relative w-full lg:w-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mx-auto lg:ml-auto max-w-2xl w-full"
                >
                  {/* PULSATING Background Aura */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-16 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 blur-[120px] rounded-full -z-10"
                  />

                  {/* Premium Editor Mockup Window */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-[0_40px_120px_-20px_rgba(139,92,246,0.3)] overflow-hidden backdrop-blur-sm">
                    {/* Toolbar */}
                    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3 bg-white border border-slate-200/50 rounded-lg px-3 py-1.5 shadow-sm">
                          <span className="text-[11px] font-bold text-slate-700">Canva Sans</span>
                          <div className="w-px h-3 bg-slate-200" />
                          <span className="text-[11px] font-medium text-slate-500">14 px</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                          <div className="w-7 h-7 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold">AC</div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/20 cursor-pointer"
                        >
                          Compartilhar
                        </motion.div>
                      </div>
                    </div>

                    <div className="relative">
                      {/* THE MAIN MOCKUP IMAGE */}
                      <img
                        src="/canva_ai_editor_mockup.png"
                        alt="AI Resume Editor Interface"
                        className="w-full h-auto object-cover"
                      />

                      {/* LIVE EDITING CURSOR: DOMINIQUE */}
                      <motion.div
                        animate={{
                          x: [400, 380, 420, 400],
                          y: [280, 310, 290, 280]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 z-40 flex flex-col items-start pointer-events-none"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg scale-75">
                          <path d="M5.65376 12.3822L15.341 19.2056C16.891 20.2965 19 19.1873 19 17.2882V4.54589C19 2.50269 16.6339 1.41721 15.0877 2.75389L5.40049 11.1293C4.94522 11.5231 4.94273 12.2359 5.65376 12.3822Z" fill="#ec4899" />
                        </svg>
                        <div className="bg-[#ec4899] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg -mt-1 ml-4 whitespace-nowrap">
                          Dominique
                        </div>
                      </motion.div>

                      {/* AI GENERATING PULSE EFFECT */}
                      <motion.div
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-[57%] left-[10%] w-[35%] h-[12%] bg-purple-500/20 rounded-2xl pointer-events-none border-2 border-purple-400/30"
                      />
                    </div>
                  </div>

                  {/* HIGH-TECH FLOATING STATS */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -left-12 top-1/3 z-30 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-5 border border-slate-100 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
                      <Target className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Score Profissional</p>
                      <p className="text-2xl font-black text-slate-900">98<span className="text-purple-600">%</span></p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -bottom-6 right-10 z-30 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-medium">IA encontrou 8 melhorias</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 1.1 REAL MODELS CAROUSEL (Site Identity & Fixed Images) --- */}
        <section className="bg-slate-900 overflow-hidden border-t border-slate-800 pb-20">
          <div className="bg-gradient-to-b from-[#0e7490] to-slate-900 py-20 px-6 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-sans font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
              Crie um currículo que <span className="text-blue-400">fará você se destacar</span>
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium text-slate-200">
              Escolha entre modelos profissionais validados por recrutadores e conquiste sua próxima vaga.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 relative">
            {/* Carousel Container */}
            <div className="relative flex items-center justify-center py-10 group/carousel">

              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="absolute left-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-2xl rounded-full active:scale-95"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => {
                  carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="absolute right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-2xl rounded-full active:scale-95"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div
                ref={carouselRef}
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
                className="flex gap-10 overflow-x-auto no-scrollbar px-10 md:px-20 py-8 scroll-smooth"
              >
                {ALL_MODELS.map((img, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-[300px] md:w-[400px] relative group"
                  >
                    <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border-[6px] border-white transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 relative cursor-pointer">
                      <img src={`/${img}`} alt={`Modelo ${i}`} className="w-full h-auto select-none" />

                      {/* Interactive Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-6 backdrop-blur-[2px]">
                        <div className="bg-white p-4 rounded-full text-slate-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Search className="w-8 h-8" />
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = '/login';
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                        >
                          Usar este modelo
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. PAIN POINTS --- */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Você se identifica com isso?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Mail, text: "Envia dezenas de currículos e nunca recebe resposta." },
                { icon: Briefcase, text: "Sente que seu currículo não reflete seu real potencial." },
                { icon: Target, text: "Perde vagas boas por ter um CV genérico demais." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-lg text-slate-500 max-w-2xl mx-auto">
              O mercado mudou. Recrutadores usam robôs (ATS) para filtrar candidatos. <span className="text-slate-900 font-bold">Seu currículo atual pode estar sendo descartado automaticamente.</span>
            </p>
          </div>
        </section>

        {/* --- 3. SOLUTION --- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
                <CheckCircle2 className="w-3 h-3" /> A Solução Definitiva
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Inteligência Artificial que entende sua carreira.</h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Nossa tecnologia analisa sua trajetória e cria um currículo 100% personalizado para a vaga que você quer. Sem jargões vazios, com palavras-chave estratégicas.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Otimização automática para filtros ATS",
                  "Sugestões de texto baseadas em cargos reais",
                  "Modelos aprovados por especialistas de RH",
                  "Personalização para cada vaga em 1 clique"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button onClick={() => window.location.href = '/login'} className="bg-slate-900 text-white rounded-full px-8 py-6 text-lg">
                Experimentar Agora
              </Button>
            </div>
            <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
              {/* Visual Abstract representation of AI working */}
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">IA</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Analista de Carreira</p>
                      <p className="text-xs text-slate-500">Google Gemini Pro</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Online</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-600">
                    Analisei seu perfil. Para a vaga de "Product Manager", sugiro destacar sua liderança em projetos ágeis.
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg rounded-tr-none text-sm text-blue-900 font-medium">
                    Reescrevendo resumo profissional... ✨
                  </div>
                  <div className="p-4 border border-blue-100 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      "Líder de Produto com 5 anos de experiência em metodologias Ágeis (Scrum/Kanban), focado em maximizar ROI e reduzir churn..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. HOW IT WORKS --- */}
        <section id="como-funciona" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Como funciona</h2>
            <p className="text-slate-500 mb-16 max-w-2xl mx-auto">Três passos simples separam você do seu novo emprego. O processo é guiado e intuitivo.</p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Conector Line Desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10" />

              {[
                { step: 1, title: "Preencha seu Perfil", desc: "Informe suas experiências ou importe do LinkedIn.", icon: Layout },
                { step: 2, title: "Defina o Objetivo", desc: "Diga qual cargo você quer e a IA adapta o conteúdo.", icon: Target },
                { step: 3, title: "Baixe o PDF", desc: "Escolha um modelo premium e baixe pronto para enviar.", icon: Download }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:bg-transparent md:border-none md:shadow-none">
                  <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg mb-6 z-10">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.step}. {s.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. BENEFITS --- */}
        <section id="beneficios" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-slate-900">Prepare-se para receber mais propostas de entrevista.</h2>
                <p className="text-slate-500 text-lg">Pare de gastar horas formatando documentos no Word. Foque no conteúdo e deixe a apresentação conosco.</p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Destaque Imediato</h4>
                      <p className="text-slate-500">Seu currículo no topo da pilha com design profissional.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Confiança Profissional</h4>
                      <p className="text-slate-500">Sinta orgulho ao enviar seu currículo. Você merece se posicionar bem.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 flex items-center justify-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-all duration-700" />
                <div className="relative z-10 text-center">
                  <div className="text-6xl font-black mb-2 text-white">3x</div>
                  <p className="text-slate-300 font-medium">Mais chances de entrevista <br /> com currículo otimizado.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. AI DIFFERENTIALS --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Poder da Google Vertex AI</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Não usamos templates de texto genéricos. Nossa IA escreve conteúdo original, persuasivo e adaptado.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                { t: "Linguagem Estratégica", d: "Substitui termos fracos por verbos de ação e impacto." },
                { t: "Foco em Resultados", d: "A IA pergunta sobre métricas e números para quantificar seu sucesso." },
                { t: "Keyword Matching", d: "Analisa a descrição da vaga e insere as palavras-chave exatas." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                  <h3 className="font-bold text-xl mb-4 text-white">{item.t}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 7. PRICING (Psychological Strategy) --- */}
        <section id="precos" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Planos desenhados para sua carreira</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Escolha o plano ideal para seu momento profissional. Sem taxas escondidas.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 items-stretch pt-4">

              {/* --- PLANO FREE --- */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative transition-all hover:shadow-md">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Gratuito</h3>
                  <p className="text-slate-500 text-xs mt-1">Ideal para experimentar</p>
                </div>
                <div className="text-3xl font-black text-slate-900 mb-2">R$ 0</div>
                <p className="text-[10px] text-slate-400 font-medium mb-6">Para sempre</p>

                <Button onClick={() => window.location.href = '/login'} variant="outline" className="w-full rounded-full h-10 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 font-bold mb-4">
                  Começar grátis
                </Button>

                <ul className="space-y-3 flex-1 text-xs">
                  <li className="flex gap-2 text-slate-600"><Check className="w-4 h-4 text-slate-400 flex-shrink-0" /> 1 currículo com IA</li>
                  <li className="flex gap-2 text-slate-600"><Check className="w-4 h-4 text-slate-400 flex-shrink-0" /> Modelos básicos</li>
                  <li className="flex gap-2 text-slate-600"><Check className="w-4 h-4 text-slate-400 flex-shrink-0" /> Exportação PDF</li>
                  <li className="flex gap-2 text-slate-600 font-bold text-blue-600"><Check className="w-4 h-4 flex-shrink-0" /> Uso de IA limitado</li>
                </ul>
              </div>

              {/* --- PLANO PROFISSIONAL (New) --- */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col relative transition-all hover:shadow-md hover:border-blue-300">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Profissional</h3>
                  <p className="text-slate-500 text-xs mt-1">Melhor custo-benefício</p>
                </div>
                <div className="text-3xl font-black text-slate-900 mb-2">R$ 19,90</div>
                <p className="text-[10px] text-blue-600 font-bold mb-6 italic">Pagamento na hora • PIX, Débito ou Cartão</p>

                <Button onClick={() => window.location.href = '/login'} className="w-full rounded-full h-10 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold mb-4">
                  Escolher este
                </Button>

                <ul className="space-y-3 flex-1 text-xs">
                  <li className="flex gap-2 text-slate-900 font-medium"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> 2 modelos premium</li>
                  <li className="flex gap-2 text-slate-600"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Exportação PDF ilimitada</li>
                  <li className="flex gap-2 text-slate-900 font-bold"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> IA Ilimitada</li>
                  <li className="flex gap-2 text-slate-600"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Suporte prioritário</li>
                </ul>
              </div>

              {/* --- PLANO PREMIUM (Highlight) --- */}
              <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-2xl relative flex flex-col transform md:-translate-y-4 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">
                  COMPLETO
                </div>

                <div className="mb-6 mt-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Premium <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Acesso total a tudo</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-black text-slate-900">R$ 29</span>
                    <span className="text-slate-500 text-xs mb-1">/mês</span>
                  </div>
                  <p className="text-[10px] text-blue-600 font-bold italic">Assinatura Mensal • Cancele quando quiser</p>
                </div>

                <Button onClick={() => window.location.href = '/login'} className="w-full rounded-full h-10 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 mb-4 transition-transform hover:scale-105">
                  Assinar agora
                </Button>

                <div className="space-y-3 text-xs">
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-slate-900 font-bold"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Currículos Ilimitados</li>
                    <li className="flex gap-2 text-slate-700"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Todos os 8+ modelos</li>
                    <li className="flex gap-2 text-slate-700"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Otimização para filtros ATS</li>
                    <li className="flex gap-2 text-slate-700"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> PDF + DOCX (Editável)</li>
                    <li className="flex gap-2 text-slate-700"><Check className="w-4 h-4 text-blue-500 flex-shrink-0" /> Histórico de versões</li>
                  </ul>
                </div>
              </div>

              {/* --- PLANO B2B --- */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col relative text-white">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white">B2B / Times</h3>
                  <p className="text-slate-400 text-xs mt-1">Para empresas e RHs</p>
                </div>
                <div className="text-2xl font-black text-white mb-2">Sob Medida</div>
                <p className="text-[10px] text-slate-500 font-medium mb-6">Consulte condições</p>

                <Button onClick={() => window.location.href = 'mailto:vendas@curriculoexpert.com'} className="w-full rounded-full h-10 text-xs bg-white text-slate-900 hover:bg-slate-100 font-bold mb-4">
                  Falar com vendas
                </Button>

                <ul className="space-y-3 flex-1 text-xs">
                  <li className="flex gap-2 text-slate-300"><Check className="w-4 h-4 text-slate-500 flex-shrink-0" /> Múltiplos usuários</li>
                  <li className="flex gap-2 text-slate-300"><Check className="w-4 h-4 text-slate-500 flex-shrink-0" /> Painel administrativo</li>
                  <li className="flex gap-2 text-slate-300"><Check className="w-4 h-4 text-slate-500 flex-shrink-0" /> API de integração</li>
                  <li className="flex gap-2 text-slate-300"><Check className="w-4 h-4 text-slate-500 flex-shrink-0" /> Métricas e relatórios</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* --- 8. SOCIAL PROOF --- */}
        <section className="py-24 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Confiança de profissionais em</p>
            <div className="flex flex-wrap justify-center gap-10 opacity-40 grayscale mb-16">
              {/* Logos em texto para simplicidade e não quebrar imagens */}
              <h3 className="text-2xl font-black text-slate-700">GOOGLE</h3>
              <h3 className="text-2xl font-bold italic text-slate-700">Microsoft</h3>
              <h3 className="text-2xl font-bold text-slate-700">Spotify</h3>
              <h3 className="text-2xl font-bold text-slate-700 tracking-tighter">NuBank</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { msg: "Consegui meu emprego em 2 semanas. A IA melhorou muito meu resumo.", name: "André Silva", role: "Dev Junior" },
                { msg: "Os modelos são lindos e super profissionais. Vale cada centavo.", name: "Mariana Costa", role: "Marketing" },
                { msg: "Simples, rápido e direto ao ponto. Exatamente o que eu precisava.", name: "Carlos Eduardo", role: "Analista Financeiro" }
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl text-left border border-slate-100">
                  <div className="flex text-amber-400 mb-3 space-x-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4" fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 mb-4 text-sm font-medium">"{t.msg}"</p>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 9. FINAL CTA --- */}
        <section className="py-32 px-6 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Sua carreira merece um upgrade.</h2>
            <p className="text-lg text-slate-300 mb-10">Crie seu currículo profissional agora mesmo. Leva menos de 5 minutos.</p>
            <Button onClick={() => window.location.href = '/login'} className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-8 text-xl font-bold shadow-2xl shadow-blue-900/50 hover:scale-105 transition-transform">
              Criar meu currículo agora
            </Button>
            <p className="mt-6 text-sm text-slate-500">Grátis para começar. Cancele quando quiser.</p>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-16 border-t border-slate-200 bg-slate-50 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-900">
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold text-lg">CurriculoExpert</span>
            </div>
            <p>Acelerando carreiras com inteligência artificial.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-blue-600">Preços</a></li>
              <li><a href="/login" className="hover:text-blue-600">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Exemplos</a></li>
              <li><a href="#" className="hover:text-blue-600">Ajuda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-600">Termos</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 CurriculoExpert. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer" />
            <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
