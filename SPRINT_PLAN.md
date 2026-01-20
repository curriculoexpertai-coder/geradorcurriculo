# Planejamento de Sprints - CV.AI
*Metodologia: Ágil / Scrum (Iterativo-Incremental)*

Este documento define o roadmap de execução do projeto, dividido em Sprints de 1 a 2 semanas. Cada Sprint entrega um incremento de valor funcional.

**Controle de Versão:**
- Branch `main`: Produção (Estável).
- Branch `develop`: Integração de features.
- Branch `feature/nome-da-feature`: Desenvolvimento isolado.

---

## 🏁 Sprint 0: Setup & "Walking Skeleton" (Fundação)
**Objetivo:** Ter a aplicação rodando (Front + Back) com "Hello World" e infraestrutura básica pronta. Garantir que o pipeline de deploy e controle de versão estejam ativos.

- [x] **Configuração do Ambiente**
    - [x] Inicializar Git e estrutura de Monorepo (ou Repos separados).
    - [x] Setup do Next.js (Frontend) com Tailwind e Shadcn/UI.
    - [x] Setup do Fastify (Backend) com TypeScript.
- [ ] **Infraestrutura Cloud (Google Cloud)**
    - [ ] Configuração do projeto no GCP.
    - [ ] Setup inicial do Firebase Auth.
- **Entregável:** Aplicação rodando localmente e acessível com estrutura de pastas definida.

---

## 👤 Sprint 1: Identidade & Perfil do Usuário
**Objetivo:** Permitir que o usuário crie conta e salve seus dados básicos (Blocos de construção do currículo).

- [ ] **Autenticação**
    - [x] Contexto de Auth e Provider (Frontend).
    - [x] Página de Login (UI/UX Premium).
    - [x] Dashboard Inicial Protegido.
    - [ ] Configuração Firebase Admin (Backend).
- [ ] **Modelagem de Dados**
    - [x] Definir Schema do Banco (Prisma/PostgreSQL).
    - [x] Singleton do Prisma Client.
    - [x] Migrations e Tabelas Iniciais (Resolvido via SQL Direto no Supabase + Prisma Pull).
- [x] **Backend: API & Rotas**
    - [x] Criar rota `POST /users` (Criação de conta).
    - [x] Testar integração Front-Back (Via script de teste e AuthContext).
    - [x] Criar rota `GET /users/:id` (Perfil completo).
    - [x] Criar Models `Resume` (Prisma/Postgres).
    - [x] Criar rotas `POST /resumes` e `GET /resumes` (Salvar/Listar).
- [ ] **Gestão de Perfil**
    - [x] Formulário de Dados Pessoais (UI Criada).
    - [ ] Formulário de Experiência e Educação (CRUD básico).
- **Entregável:** Usuário loga e preenche seu "Perfil Mestre".

---

## 📄 Sprint 2: Core - O Editor de Currículo
**Objetivo:** O coração do produto. Transformar dados do perfil em um currículo visual.

- [ ] **Editor Visual**
    - [ ] Seleção de Template.
    - [ ] Preview em Tempo Real (React-PDF ou HTML-to-Print).
    - [ ] Drag & Drop de seções (Reordenar experiências).
- [ ] **Persistência**
    - [ ] Salvar rascunhos de currículos.
    - [ ] Versionamento simples (Currículo A, Currículo B).
- **Entregável:** Usuário cria um currículo visualmente agradável e pode visualizar o resultado.

---

## 🧠 Sprint 3: IA Generativa & Enhancers (O "Uau")
**Objetivo:** Integrar a inteligência do Gemini/Vertex AI para melhorar o conteúdo.

- [ ] **Integração Vertex AI**
    - [ ] Setup do cliente Vertex AI no Backend.
- [ ] **Features de IA**
    - [ ] "Magic Rewrite": Melhorar descrição de uma experiência.
    - [ ] "Gerar Resumo": Criar resumo com base nas experiências.
- [ ] **Feedback UI**
    - [ ] Loaders, Skeletons e tratamento de erro para chamadas de IA.
- **Entregável:** Botões mágicos de IA funcionando no editor.

---

## 🎯 Sprint 4: Matching de Vagas & Exportação Final
**Objetivo:** Fechar o ciclo de valor com a análise de vagas e o arquivo final.

- [ ] **Job Matching**
    - [ ] Input de descrição de vaga.
    - [ ] Algoritmo de similaridade (Embeddings).
    - [ ] Relatório de "Gap Analysis".
- [ ] **Exportação**
    - [ ] Geração de PDF de alta fidelidade.
    - [ ] Controle de limites (para planos Free).
- **Entregável:** Usuário valida currículo contra uma vaga e baixa o PDF.

---

## 🚀 Sprint 5: Polimento, Pagamentos e Launch
**Objetivo:** Preparar para o mundo real. Monetização e UX refina.

- [ ] **Monetização**
    - [ ] Integração Stripe (Checkout).
    - [ ] Controle de acesso Free vs Pro.
- [ ] **Landing Page**
    - [ ] Home page de alta conversão.
- [ ] **Observabilidade & SEO**
    - [ ] Logs e Analytics.
    - [ ] Meta tags e SEO técnico.
- **Entregável:** Produto pronto para Beta Público.
