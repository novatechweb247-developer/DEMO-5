import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminGetDraft, publishedContentQuery } from "@/lib/content.functions";
import type { SiteContent } from "@/content/site";

export const ADMIN_KEY_STORAGE = "site-admin-key";

const Ctx = createContext<{ content: SiteContent; preview: boolean } | null>(null);

/** Public pages read published content; `?preview=draft` shows the draft to a signed-in admin. */
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { data } = useSuspenseQuery(publishedContentQuery);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const getDraft = useServerFn(adminGetDraft);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("preview") !== "draft") return;
    const key = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (!key) return;
    getDraft({ data: { key } })
      .then((r) => setDraft(r.content))
      .catch(() => undefined);
  }, [getDraft]);
  return (
    <Ctx.Provider value={{ content: draft ?? data, preview: !!draft }}>{children}</Ctx.Provider>
  );
}

export function useSiteContent() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return v.content;
}

export function useIsPreview() {
  return useContext(Ctx)?.preview ?? false;
}
