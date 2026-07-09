-- Habilita Row Level Security nas tabelas de supabase/schema.sql que hoje
-- estão sem proteção nenhuma (qualquer request com a anon key consegue
-- ler/escrever/apagar qualquer linha, de qualquer tabela).
--
-- O app (REVIDE Gestão) não tem login — o navegador fala com o Supabase
-- sempre com a mesma anon key pública (VITE_SUPABASE_ANON_KEY). Por isso,
-- as policies abaixo não distinguem "usuários" entre si: elas replicam
-- exatamente as operações que o código do app já faz hoje em cada tabela,
-- e bloqueiam qualquer operação que o app nunca usa (ex: apagar uma
-- empresa, apagar um lembrete). Isso reduz o estrago que alguém com a
-- anon key em mãos consegue causar, mesmo sem adicionar autenticação.
--
-- NÃO aplicar sem revisar antes.

-- ─────────────────────────────────────────────────────────────
-- empresas — o app só lista (SELECT) e cria (INSERT) empresas.
-- Nunca edita nem apaga uma empresa existente.
-- ─────────────────────────────────────────────────────────────
alter table public.empresas enable row level security;

create policy "empresas: leitura publica do app"
  on public.empresas for select
  to anon
  using (true);

create policy "empresas: criacao pelo app"
  on public.empresas for insert
  to anon
  with check (true);

-- ─────────────────────────────────────────────────────────────
-- tarefas — o app lista, cria, edita (status, dados, recorrência)
-- e apaga tarefas.
-- ─────────────────────────────────────────────────────────────
alter table public.tarefas enable row level security;

create policy "tarefas: leitura publica do app"
  on public.tarefas for select
  to anon
  using (true);

create policy "tarefas: criacao pelo app"
  on public.tarefas for insert
  to anon
  with check (true);

create policy "tarefas: edicao pelo app"
  on public.tarefas for update
  to anon
  using (true)
  with check (true);

create policy "tarefas: exclusao pelo app"
  on public.tarefas for delete
  to anon
  using (true);

-- ─────────────────────────────────────────────────────────────
-- recorrencias — não é usada por nenhuma tela do app hoje (é uma
-- tabela para uma funcionalidade que ainda não foi construída;
-- a recorrência atual mora em colunas da própria tabela `tarefas`).
-- Habilitar RLS sem nenhuma policy bloqueia todo acesso via anon
-- key, sem risco de quebrar nada em uso.
-- ─────────────────────────────────────────────────────────────
alter table public.recorrencias enable row level security;

-- ─────────────────────────────────────────────────────────────
-- objetivos_dia — o app lista os objetivos do dia (com join em
-- tarefas), adiciona, marca como concluído (update) e remove
-- (delete) um objetivo.
-- ─────────────────────────────────────────────────────────────
alter table public.objetivos_dia enable row level security;

create policy "objetivos_dia: leitura publica do app"
  on public.objetivos_dia for select
  to anon
  using (true);

create policy "objetivos_dia: criacao pelo app"
  on public.objetivos_dia for insert
  to anon
  with check (true);

create policy "objetivos_dia: edicao pelo app"
  on public.objetivos_dia for update
  to anon
  using (true)
  with check (true);

create policy "objetivos_dia: exclusao pelo app"
  on public.objetivos_dia for delete
  to anon
  using (true);

-- ─────────────────────────────────────────────────────────────
-- lembretes — o app lista os lembretes pendentes, cria um novo
-- lembrete e marca como disparado (update). Nunca apaga uma linha
-- diretamente (dispensar = marcar disparado = true).
-- ─────────────────────────────────────────────────────────────
alter table public.lembretes enable row level security;

create policy "lembretes: leitura publica do app"
  on public.lembretes for select
  to anon
  using (true);

create policy "lembretes: criacao pelo app"
  on public.lembretes for insert
  to anon
  with check (true);

create policy "lembretes: edicao pelo app"
  on public.lembretes for update
  to anon
  using (true)
  with check (true);
