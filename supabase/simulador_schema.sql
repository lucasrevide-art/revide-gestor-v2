-- Execute este SQL no Supabase SQL Editor
-- Tabela do Simulador de Diagnóstico (Método Cruz)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contexto
  nicho text,
  nivel_consciencia text, -- 'mais_conteudo' | 'mais_estrategia' | 'diferenciacao_real' | 'nao_sei'

  -- respostas brutas (auditoria / futura análise)
  respostas jsonb not null, -- { "C1": 3, "C2": 2, "C3": 1, "R1": ..., ... }

  -- pontuação calculada
  score_clareza int not null,
  score_raiz int not null,
  score_universo int not null,
  score_zona_conversao int not null,
  score_comunidade int not null, -- soma U1+U2+U3

  gargalo_dominante text not null, -- 'clareza' | 'raiz' | 'universo' | 'zona_conversao'
  gargalo_secundario text not null,
  estagio_comunidade text not null, -- 'dispersa' | 'interessada' | 'inicial'

  -- gate
  nome text,
  email text,
  whatsapp text,
  gate_preenchido_em timestamptz,

  -- qualificação comercial
  interesse_diagnostico text, -- 'sim' | 'talvez' | 'nao_e_momento'
  quer_call boolean,
  call_agendada boolean default false,

  -- status do funil (útil pra funil incompleto / abandono)
  etapa_atual text not null default 'hook',
  concluido boolean not null default false
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_gargalo_dominante_idx on public.leads (gargalo_dominante);
create index if not exists leads_interesse_idx on public.leads (interesse_diagnostico);
