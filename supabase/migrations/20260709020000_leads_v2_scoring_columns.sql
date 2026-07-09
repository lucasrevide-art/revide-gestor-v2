-- A v2 do conteúdo do simulador (spec "Simulador — Atualização de
-- Conteúdo v2") remove o cálculo de gargalo secundário e estágio de
-- comunidade como conceitos separados: agora só existe o gargalo
-- dominante, e a leitura de audiência já está escrita dentro do texto
-- de cada um dos 4 resultados fixos.
--
-- A tabela `leads` ainda tem gargalo_secundario e estagio_comunidade
-- como NOT NULL (da v1). Sem esta migration, o insert de um novo lead
-- pelo simulador atualizado quebraria (violação de not null constraint),
-- porque o código não calcula mais esses dois valores.
--
-- Só torna as colunas opcionais, não apaga nada, pra não perder dado de
-- leads já capturados na v1. A partir de agora, novos leads gravam NULL
-- nesses dois campos.
--
-- NÃO aplicar sem revisar antes.

alter table public.leads
  alter column gargalo_secundario drop not null;

alter table public.leads
  alter column estagio_comunidade drop not null;
