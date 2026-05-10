import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder";

const isPlaceholder = supabaseUrl === "https://placeholder.supabase.co";

if (isPlaceholder) {
  console.warn("Supabase credentials missing. Check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // If it's a placeholder, provide a dummy fetch that fails instantly to avoid DNS/timeout lag
    fetch: isPlaceholder 
      ? () => Promise.resolve(new Response(JSON.stringify({ error: "Missing Supabase URL" }), { status: 400 }))
      : undefined
  }
});


