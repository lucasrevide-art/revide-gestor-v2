-- Habilita Row Level Security na tabela `leads` (supabase/simulador_schema.sql).
--
-- Essa tabela é diferente das do REVIDE Gestão: quem escreve nela não é
-- só o Lucas — é qualquer visitante anônimo do simulador público na
-- internet, sem login. Por isso a lógica aqui é assimétrica, de propósito:
--
--   • INSERT (criar um lead) fica ABERTO para o papel `anon` — é assim
--     que o simulador salva a resposta de quem preencheu o formulário.
--   • SELECT, UPDATE e DELETE NÃO têm nenhuma policy para `anon` — sem
--     policy, o Postgres bloqueia por padrão. Isso significa que a anon
--     key (pública, embutida no site) não consegue listar, ler, editar
--     nem apagar nenhum lead — nem o que ela mesma acabou de criar.
--
-- Resultado: qualquer um pode "jogar uma resposta pra dentro", mas só
-- quem acessa o banco com privilégio de admin (dono do projeto Supabase,
-- ou a service_role key) consegue ler a lista depois.
--
-- NÃO aplicar sem revisar antes.

alter table public.leads enable row level security;

create policy "leads: insercao publica (visitante do simulador)"
  on public.leads for insert
  to anon
  with check (true);

-- Nenhuma policy de SELECT, UPDATE ou DELETE para `anon` — de propósito.
-- Sem elas, essas operações ficam bloqueadas por padrão para a anon key.
