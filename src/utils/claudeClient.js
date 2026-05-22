import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function callClaude(message) {
  try {
    const { data, error } = await supabase.functions.invoke("call-claude", {
      body: { message },
    });

    if (error) {
      console.error("Erro ao chamar Claude:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Erro na chamada Claude:", error);
    throw error;
  }
}

export { supabase };