# Revide — Gestão de Tarefas

Dashboard pessoal de tarefas em formato Kanban: crie, edite e arraste suas atividades entre colunas até "Finalizado". Tudo roda localmente e os dados ficam salvos no navegador (localStorage) — sem conta, sem banco de dados para configurar.

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. (Opcional) Mensagem motivacional com IA
A mensagem do dia no Dashboard usa a Claude API. Isso é totalmente opcional — sem chave configurada, aparece uma frase padrão no lugar.

```bash
cp .env.example .env
```

Edite `.env` e adicione sua chave:
```
ANTHROPIC_API_KEY=sk-ant-SUA_CHAVE_AQUI
```

### 3. Rodar localmente
```bash
npm run dev
```

Acesse: http://localhost:5173

---

## Funcionalidades

- **Gestor de Tarefas (Kanban)**: colunas "A fazer", "Em andamento" e "Finalizado" — arraste os cards entre elas. CRUD completo (criar, editar, excluir), filtros por empresa/prioridade, busca, tarefas recorrentes (diárias, semanais, dias específicos da semana)
- **Dashboard (Mission Control)**: saudação dinâmica, mensagem motivacional (IA opcional), alertas de prazo, objetivos do dia, lembretes com timer, progresso por empresa
- **Armazenamento local**: todos os dados (tarefas, empresas, lembretes, objetivos) ficam salvos no `localStorage` do navegador — nada sai da sua máquina
- **Mobile**: responsivo com menu hambúrguer

## Stack
- React 18 + Vite
- localStorage (sem backend/banco de dados)
- Claude API (Haiku, opcional) — proxy Express local (`server.js`) + cache diário no localStorage

## Observação
Como os dados ficam no `localStorage` do navegador, eles são por navegador/dispositivo (não sincronizam entre computadores) e podem ser perdidos se você limpar os dados do site. Para uso multi-dispositivo seria necessário voltar a um backend compartilhado — mas para uso pessoal em uma máquina isso mantém tudo simples, sem contas para gerenciar.
