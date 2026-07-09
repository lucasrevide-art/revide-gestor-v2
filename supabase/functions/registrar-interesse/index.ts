// Edge Function que registra a resposta de interesse de um lead do simulador
// (interesse_diagnostico / quer_call) depois que o registro já existe.
//
// A tabela `leads` não dá UPDATE para a anon key (de propósito, ver
// supabase/migrations/20260709010000_enable_rls_leads.sql) — visitante
// anônimo só pode criar o próprio lead, nunca editar linha nenhuma direto
// na tabela. Esta function é o único canal de escrita depois do insert:
// roda com a service_role key (que ignora RLS), mas só aceita e só grava
// exatamente estes 4 campos, de um lead por vez, e só se esse lead existir.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors_headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const INTERESSE_VALIDOS = ["sim", "talvez", "nao_e_momento"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors_headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...cors_headers, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const { leadId, interesseDiagnostico, querCall } = await req.json();

    if (typeof leadId !== "string" || !UUID_REGEX.test(leadId)) {
      return new Response(JSON.stringify({ error: "leadId inválido" }), {
        headers: { ...cors_headers, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!INTERESSE_VALIDOS.includes(interesseDiagnostico)) {
      return new Response(
        JSON.stringify({ error: "interesseDiagnostico inválido" }),
        {
          headers: { ...cors_headers, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    if (typeof querCall !== "boolean") {
      return new Response(JSON.stringify({ error: "querCall inválido" }), {
        headers: { ...cors_headers, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Confirma que o lead existe antes de atualizar — evita criar uma
    // linha nova ou mascarar um leadId que não corresponde a nada.
    const { data: leadExistente, error: erroBusca } = await supabase
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .maybeSingle();

    if (erroBusca) throw erroBusca;
    if (!leadExistente) {
      return new Response(JSON.stringify({ error: "Lead não encontrado" }), {
        headers: { ...cors_headers, "Content-Type": "application/json" },
        status: 404,
      });
    }

    const { error: erroUpdate } = await supabase
      .from("leads")
      .update({
        interesse_diagnostico: interesseDiagnostico,
        quer_call: querCall,
        etapa_atual: "cta_final",
        concluido: true,
      })
      .eq("id", leadId);

    if (erroUpdate) throw erroUpdate;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...cors_headers, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...cors_headers, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
