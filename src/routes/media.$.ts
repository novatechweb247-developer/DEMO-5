import { createFileRoute } from "@tanstack/react-router";
import { inMemoryMedia } from "@/lib/content.server";

export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^uploads\/[A-Za-z0-9._-]+$/.test(path))
          return new Response("Not found", { status: 404 });

        const cached = inMemoryMedia.get(path);
        if (cached) {
          return new Response(cached.buffer, {
            headers: {
              "content-type": cached.type || "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable",
              "x-content-type-options": "nosniff",
            },
          });
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.storage.from("site-media").download(path);
          if (error || !data) return new Response("Not found", { status: 404 });
          return new Response(data, {
            headers: {
              "content-type": data.type || "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable",
              "x-content-type-options": "nosniff",
            },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
