
import { Sparkles, FileText, Zap, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Header/Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full backdrop-blur-md bg-zinc-950/50 sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">CurriculoExpert</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Recursos</a>
          <a href="#templates" className="hover:text-white transition-colors">Modelos</a>
          <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
        </div>
        <Link
          href="/login"
          className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/10"
        >
          Entrar
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-8 animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            POTENCIALIZADO POR INTELIGÊNCIA ARTIFICIAL
          </div>

          <h1 className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-5xl md:text-7xl font-extrabold tracking-tight text-transparent leading-[1.1] mb-8">
            Seu próximo emprego <br /> começa com um CurriculoExpert.
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
            Esqueça as horas formatando. Nossa IA escreve, otimiza e organiza seu currículo nos padrões dos recrutadores mais exigentes do mundo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/editor"
              className="group relative flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-95"
            >
              Criar Currículo Grátis
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-8 py-4 text-lg font-semibold text-zinc-300 hover:bg-zinc-800/80 transition-all">
              Ver Modelos
            </button>
          </div>

          {/* Product Preview Mockup */}
          <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-900/50 p-4 backdrop-blur-xl shadow-2xl">
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div className="aspect-[16/9] w-full rounded-xl bg-zinc-950 overflow-hidden relative border border-white/5">
              {/* Simulated Editor UI */}
              <div className="absolute top-0 left-0 w-full h-12 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
              </div>
              <div className="flex h-full pt-12">
                <div className="w-48 border-r border-white/5 bg-zinc-900/40 p-4 flex flex-col gap-3">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                </div>
                <div className="flex-1 p-8 flex justify-center">
                  <div className="w-48 h-64 bg-white rounded-sm shadow-2xl flex flex-col p-4 gap-2">
                    <div className="h-3 w-1/2 bg-zinc-200 rounded" />
                    <div className="h-1 w-full bg-zinc-100 rounded" />
                    <div className="h-1 w-full bg-zinc-100 rounded" />
                    <div className="h-1 w-3/4 bg-zinc-100 rounded" />
                    <div className="mt-4 h-2 w-1/3 bg-zinc-300 rounded" />
                    <div className="h-1 w-full bg-zinc-100 rounded" />
                    <div className="h-1 w-full bg-zinc-100 rounded" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600/20 text-blue-400 border border-blue-500/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> IA otimizando resumo profissional...
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto w-full gap-12 flex flex-col">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Tudo o que você precisa para se destacar.</h2>
            <p className="text-zinc-400 text-lg">Criamos a ferramenta definitiva para quem leva a sério a carreira.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group">
              <Zap className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold mb-4">Escrita via IA</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">Gere descrições de cargos profissionais e resumos impactantes com apenas um clique.</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group">
              <Shield className="w-10 h-10 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold mb-4">ATS Compliant</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">Nossos modelos são otimizados para passar em todos os softwares de triagem (ATS) corporativos.</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group">
              <FileText className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold mb-4">Exportação PDF</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">Exportação em PDF de alta qualidade, garantindo que o layout nunca mude, independente de onde for aberto.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center mt-20">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="bg-zinc-700 p-1 rounded">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">CurriculoExpert</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 CurriculoExpert - Plataforma SaaS de Elite.</p>
        </div>
      </footer>
    </div>
  );
}
