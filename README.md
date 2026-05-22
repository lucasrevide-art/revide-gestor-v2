# Revide — Gestão de Tarefas

Sistema pessoal de gestão de tarefas com Dashboard, integração Supabase e mensagens motivacionais via Claude API.

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie `.env.example` para `.env` e preencha a sua chave Claude:
```bash
cp .env.example .env
```

Edite `.env`:
```
VITE_SUPABASE_URL=https://ogxvuxbojwrfzjltofvi.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xc75e6oX-eJxcZ1mhNjyaQ_MNdpModb
ANTHROPIC_API_KEY=sk-ant-SUA_CHAVE_AQUI
```

### 3. Criar tabelas no Supabase
Acesse o [Supabase Dashboard](https://app.supabase.com) → SQL Editor → cole o conteúdo de `supabase/schema.sql` e execute.

### 4. Rodar localmente
```bash
npm run dev
```

Acesse: http://localhost:5173

---

## Deploy (Vercel)

1. Faça push para GitHub
2. Importe o repositório no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no painel Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
4. Deploy automático!

---

## Funcionalidades

- **Dashboard (Mission Control)**: saudação dinâmica, mensagem motivacional IA, alertas de prazo, objetivos do dia, lembretes com timer, progresso por empresa
- **Gestor de Tarefas**: CRUD completo, filtros por empresa/prioridade/status, busca, ciclo de status com um clique
- **Sidebar**: navegação entre seções, logo RV clicável
- **Mobile**: responsivo com menu hambúrguer

## Stack
- React 18 + Vite
- Supabase (PostgreSQL)
- Claude API (Haiku) — cache diário no localStorage
- Express (proxy local para Claude API)
