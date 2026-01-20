
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 font-sans text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />

      <main className="z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
          ✨ Sprint 0 Concluída: Infraestrutura Pronta
        </div>

        <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl">
          CV.AI
        </h1>

        <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
          Seu currículo potencializado por IA. A arquitetura está montada e os motores já estão aquecendo.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Frontend Rodando</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Next.js 15, Tailwind e Shadcn/UI configurados na porta 3000.</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
              🛠️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Backend Ativo</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Fastify & TypeScript servindo rotas na porta 3001.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="http://localhost:3001"
            target="_blank"
            className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Verificar API
          </a>
          <button
            disabled
            className="rounded-full border border-zinc-800 bg-zinc-950 px-8 py-3 font-semibold text-zinc-500"
          >
            Sprint 1 Em Breve
          </button>
        </div>
      </main>

      <footer className="absolute bottom-10 text-sm text-zinc-600">
        CV.AI - Plataforma SaaS de Elite
      </footer>
    </div>
  );
}
