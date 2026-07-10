-- Adiciona campo opcional de Instagram ao formulário de contato (gate) do
-- simulador, junto com nome, e-mail e WhatsApp.
--
-- NÃO aplicar sem revisar antes.

alter table public.leads
  add column if not exists instagram text;
