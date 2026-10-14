import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { mergeContent } from "@/content/site";
import { assertAdminKey, readRow, writeRow } from "./content.server";

const keySchema = z.object({ key: z.string().min(1).max(500) });

/** Public reads published content from the persistent database; never disguise storage failure as success. */
export const getPublishedContent = createServerFn({ method: "GET" }).handler(async () => {
  const row = await readRow("published");
  return mergeContent(row?.content ?? {});
});

export const publishedContentQuery = queryOptions({
  queryKey: ["site-content", "published"],
  queryFn: () => getPublishedContent(),
  staleTime: 30_000,
});

export const adminVerify = createServerFn({ method: "POST" })
  .inputValidator((d) => keySchema.parse(d))
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    return { ok: true };
  });

export const adminGetDraft = createServerFn({ method: "POST" })
  .inputValidator((d) => keySchema.parse(d))
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    const [draft, published] = await Promise.all([readRow("draft"), readRow("published")]);
    return {
      content: mergeContent(draft?.content ?? published?.content ?? {}),
      draftUpdatedAt: draft?.updated_at ?? null,
      publishedAt: published?.updated_at ?? null,
    };
  });

export const adminSaveDraft = createServerFn({ method: "POST" })
  .inputValidator((d) => keySchema.extend({ content: z.record(z.unknown()) }).parse(d))
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    const clean = mergeContent(data.content);
    await writeRow("draft", clean);
    return { ok: true, savedAt: new Date().toISOString() };
  });

export const adminPublish = createServerFn({ method: "POST" })
  .inputValidator((d) => keySchema.extend({ content: z.record(z.unknown()) }).parse(d))
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    const clean = mergeContent(data.content);
    await writeRow("draft", clean);
    await writeRow("published", clean);
    return { ok: true, publishedAt: new Date().toISOString() };
  });

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export const adminUpload = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    keySchema
      .extend({ name: z.string().max(200), type: z.string(), base64: z.string().max(8_000_000) })
      .parse(d),
  )
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    if (!ALLOWED.includes(data.type)) throw new Error("Unsupported image type.");
    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.length > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB.");
    const ext = (data.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 5);
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const supabaseUrl = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!supabaseUrl || !serviceKey) {
      throw new Error("Persistent media storage is not configured. Configure Supabase server environment variables first.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("site-media")
      .upload(path, bytes, { contentType: data.type, upsert: false });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
    return { path };
  });


const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().min(1).max(180),
  message: z.string().trim().min(1).max(5000),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!url || !serviceKey) throw new Error("Enquiry storage is not configured. Please try again later.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      status: "new",
    });
    if (error) throw new Error("We could not store your enquiry. Please try again.");
    return { ok: true };
  });

export const adminListInquiries = createServerFn({ method: "POST" })
  .inputValidator((d) => keySchema.parse(d))
  .handler(async ({ data }) => {
    assertAdminKey(data.key);
    const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!url || !serviceKey) throw new Error("Enquiry storage is not configured.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inquiries, error } = await supabaseAdmin
      .from("site_inquiries")
      .select("id, name, email, phone, subject, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(`Could not load enquiries: ${error.message}`);
    return { inquiries: inquiries ?? [] };
  });
