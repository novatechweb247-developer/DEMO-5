import { timingSafeEqual } from "crypto";

/** In-memory content storage fallback when database is not connected */
const inMemoryStore = new Map<string, { content: unknown; updated_at: string }>();

/** In-memory media storage fallback for uploaded assets */
export const inMemoryMedia = new Map<string, { buffer: Buffer; type: string }>();

/** Throws unless the supplied key matches the server-side admin access key. Defaults to "admin". */
export function assertAdminKey(key: string) {
  const expected = process.env["ADMIN_ACCESS_KEY"] || "admin";
  const a = Buffer.from(String(key ?? ""));
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Invalid admin key.");
}

export async function readRow(id: "draft" | "published") {
  try {
    const hasConfig =
      (process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"]) &&
      process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (hasConfig) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("site_content")
        .select("content, updated_at")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return data;
    }
  } catch (err) {
    console.warn("[Site Content] Supabase read failed — falling back to memory", err);
  }
  return inMemoryStore.get(id) ?? null;
}

export async function writeRow(id: "draft" | "published", content: unknown) {
  const row = { content, updated_at: new Date().toISOString() };
  inMemoryStore.set(id, row);
  try {
    const hasConfig =
      (process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"]) &&
      process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (hasConfig) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("site_content")
        .upsert({ id, content: content as never, updated_at: row.updated_at });
    }
  } catch (err) {
    console.warn("[Site Content] Supabase write failed — persisted in memory", err);
  }
}
