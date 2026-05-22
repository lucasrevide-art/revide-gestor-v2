import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.20.0";

const cors_headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors_headers });
  }

  try {
    const { message } = await req.json();

    const client = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
    });

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return new Response(JSON.stringify(response), {
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