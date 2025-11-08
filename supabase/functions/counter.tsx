// supabase/functions/ping/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
serve(async (req)=>{
  // --- Step 1: Extract hostname from referer ---
  const ref = req.headers.get("referer") || "";
  const hostname = (()=>{
    try {
      return new URL(ref).hostname;
    } catch  {
      return "unknown";
    }
  })();
  // --- Step 2: Initialize Supabase client ---
  const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  // --- Step 3: Insert new event row ---
  const { error } = await supabase.from("sentinel_events").insert([
    {
      hostname
    }
  ]); // id + ts auto-populate in SQL
  if (error) console.error("Insert error:", error);
  // --- Step 4: Return success quickly ---
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store"
    }
  });
});
