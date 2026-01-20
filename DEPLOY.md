# Guia de Deploy - Gerador de Currículos IA

Este guia orienta como colocar sua aplicação no ar. O sistema é dividido em duas partes:
1.  **Frontend** (Next.js) -> Deploy na **Vercel**
2.  **Backend** (Node.js/Fastify) -> Deploy no **Render** (ou Railway)

---

## 🚀 1. Deploy do Backend (API)

O backend precisa subir primeiro, pois o frontend precisará da URL dele.

### Opção Recomendada: Render.com (Plano Gratuito disponível)

1.  Crie uma conta em [render.com](https://render.com).
2.  Clique em **"New +"** -> **"Web Service"**.
3.  Conecte seu repositório GitHub.
4.  Configure o serviço:
    *   **Root Directory:** `backend` (Importante!)
    *   **Environment:** Node
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
5.  **Variáveis de Ambiente (Environment Variables):**
    Adicione as seguintes chaves:
    *   `DATABASE_URL`: A string de conexão do seu banco PostgreSQL (Supabase/Neon/etc).
    *   `GEMINI_API_KEY`: Sua chave da API do Google Gemini.
    *   `JWT_SECRET`: Uma string aleatória segura para autenticação (se estiver usando).
6.  Clique em **Create Web Service**.
7.  Aguarde o deploy finalizar. O Render te dará uma URL (ex: `https://seu-backend.onrender.com`). **Copie essa URL.**

---

## 🎨 2. Deploy do Frontend (App)

### Vercel (Padrão para Next.js)

1.  Crie uma conta em [vercel.com](https://vercel.com).
2.  Clique em **"Add New..."** -> **"Project"**.
3.  Importe seu repositório GitHub.
4.  Configure o projeto:
    *   **Root Directory:** Clique em "Edit" e selecione a pasta `frontend`.
    *   **Framework Preset:** Next.js (deve detectar automaticamente).
5.  **Variáveis de Ambiente:**
    *   `NEXT_PUBLIC_API_URL`: Cole a URL do seu backend (ex: `https://seu-backend.onrender.com`). *Não coloque a barra no final*.
6.  Clique em **Deploy**.

---

## ✅ 3. Verificação Final

1.  Acesse a URL do seu frontend (ex: `https://seu-projeto.vercel.app`).
2.  Tente criar um currículo.
3.  Teste o botão de IA (✨). Se funcionar, significa que o Front falou com o Back, e o Back falou com o Google.
4.  Teste o salvamento (Login).

**Problemas Comuns:**
*   **Erro de CORS:** Se o backend bloquear o frontend, precisamos adicionar a URL da Vercel na lista de origens permitidas no `server.ts` do backend. Atualmente ele está com `origin: true` (permite tudo), o que é ok para testes, mas para produção idealmente você restringiria.
*   **Banco de Dados:** Certifique-se de que seu banco de dados aceita conexões externas (se estiver local não vai funcionar na nuvem). Use um serviço como Supabase ou Neon para o DB.
