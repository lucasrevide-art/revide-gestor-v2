-- Execute este SQL no Supabase SQL Editor

-- Tabela de empresas
create table if not exists empresas (
  id bigserial primary key,
  nome text not null,
  cor text not null default '#3B82F6',
  created_at timestamptz default now()
);

-- Inserir empresas iniciais
insert into empresas (nome, cor) values
  ('Dzoom', '#FFFFFF'),
  ('4improvements', '#6366f1'),
  ('Revide', '#3B82F6')
on conflict do nothing;

-- Tabela de tarefas
create table if not exists tarefas (
  id bigserial primary key,
  titulo text not null,
  empresa_id bigint references empresas(id) on delete set null,
  prioridade text not null default 'normal' check (prioridade in ('urgente', 'normal', 'pode_esperar')),
  status text not null default 'a_fazer' check (status in ('a_fazer', 'em_andamento', 'feito')),
  data_inicio date,
  data_entrega date,
  descricao text,
  parent_task_id bigint references tarefas(id) on delete set null,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- Tabela de recorrências
create table if not exists recorrencias (
  id bigserial primary key,
  titulo text not null,
  empresa_id bigint references empresas(id) on delete set null,
  prioridade text not null default 'normal' check (prioridade in ('urgente', 'normal', 'pode_esperar')),
  tipo text not null check (tipo in ('diaria', 'semanal', 'mensal')),
  dia_semana integer check (dia_semana between 0 and 6),
  dia_mes integer check (dia_mes between 1 and 31),
  ativa boolean default true,
  criado_em timestamptz default now(),
  last_generated timestamptz
);

-- Tabela de objetivos do dia
create table if not exists objetivos_dia (
  id bigserial primary key,
  data date not null default current_date,
  tarefa_id bigint references tarefas(id) on delete cascade,
  ordem integer check (ordem between 1 and 4),
  completo boolean default false,
  criado_em timestamptz default now(),
  unique(data, tarefa_id)
);

-- Tabela de lembretes
create table if not exists lembretes (
  id bigserial primary key,
  titulo text not null,
  tempo_minutos integer not null,
  fire_at timestamptz not null,
  disparado boolean default false,
  criado_em timestamptz default now()
);

-- Habilitar Row Level Security (RLS) - opcional para uso pessoal
-- alter table empresas enable row level security;
-- alter table tarefas enable row level security;
-- alter table recorrencias enable row level security;
-- alter table objetivos_dia enable row level security;
-- alter table lembretes enable row level security;
