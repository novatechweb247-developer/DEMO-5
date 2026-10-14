import { timingSafeEqual } from "crypto";

/** Persistent content operations must never silently fall back to server memory. */
function requireSupabaseConfig() {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) {
    throw new Error(
      "Persistent storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the server environment.",
    );
  }
}

/** Throws unless the supplied key matches the server-side admin access key. */
export function assertAdminKey(key: string) {
  const expected = process.env["ADMIN_ACCESS_KEY"];
  if (!expected) throw new Error("Admin access is not configured. Set ADMIN_ACCESS_KEY on the server.");
  const a = Buffer.from(String(key ?? ""));
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Invalid admin key.");
}

export async function readRow(id: "draft" | "published") {
  requireSupabaseConfig();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("site_content")
    .select("content, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Could not read ${id} content from persistent storage: ${error.message}`);
  return data;
}

export async function writeRow(id: "draft" | "published", content: unknown) {
  requireSupabaseConfig();
  const row = { content, updated_at: new Date().toISOString() };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ id, content: content as never, updated_at: row.updated_at });
  if (error) throw new Error(`Could not save ${id} content to persistent storage: ${error.message}`);
  return row;
}
