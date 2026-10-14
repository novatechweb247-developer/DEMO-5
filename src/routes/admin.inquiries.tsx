import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { adminListInquiries } from "@/lib/content.functions";
import { ADMIN_KEY_STORAGE } from "@/lib/site-content-context";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

type Inquiry = { id: number; name: string; email: string; phone: string | null; subject: string; message: string; status: string; created_at: string };
export const Route = createFileRoute("/admin/inquiries")({ component: AdminInquiriesPage });
function AdminInquiriesPage() {
  const list = useServerFn(adminListInquiries);
  const [key, setKey] = useState("");
  const [items, setItems] = useState<Inquiry[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
    setKey(saved);
    if (!saved) { setError("Sign in through the Admin Center first."); setBusy(false); return; }
    list({ data: { key: saved } }).then(r => setItems(r.inquiries as Inquiry[])).catch(e => setError(e instanceof Error ? e.message : "Could not load enquiries.")).finally(() => setBusy(false));
  }, []);
  return <main className="min-h-screen bg-secondary p-4 sm:p-8"><Toaster /><div className="mx-auto max-w-4xl rounded-md border bg-background p-5 sm:p-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">ADMIN CENTER</p><h1 className="mt-2 font-serif text-3xl">Booking & contact enquiries</h1><p className="mt-2 text-sm text-muted-foreground">Latest 200 submissions, loaded from persistent storage.</p></div><Button variant="outline" asChild><a href="/admin">Back to Admin</a></Button></div>
    {busy ? <p>Loading enquiries…</p> : error ? <p role="alert" className="rounded-md bg-destructive/10 p-4 text-sm">{error}</p> : items.length === 0 ? <p className="rounded-md border p-5 text-sm text-muted-foreground">No enquiries have been submitted yet.</p> : <div className="space-y-4">{items.map(item => <article key={item.id} className="rounded-md border p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h2 className="font-semibold">{item.subject}</h2><span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</span></div><p className="mt-2 text-sm">{item.name} · <a className="underline" href={`mailto:${item.email}`}>{item.email}</a>{item.phone ? ` · ${item.phone}` : ""}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6">{item.message}</p><p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Status: {item.status}</p></article>)}</div>}
  </div></main>;
}
