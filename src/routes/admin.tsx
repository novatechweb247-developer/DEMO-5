import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Upload, ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import {
  adminGetDraft,
  adminPublish,
  adminSaveDraft,
  adminUpload,
  adminVerify,
} from "@/lib/content.functions";
import { ADMIN_KEY_STORAGE } from "@/lib/site-content-context";
import { imageUrl, type SiteContent } from "@/content/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Center — Site Editor" },
      { name: "description", content: "Private editor for the website content." },
      { property: "og:title", content: "Admin Center — Site Editor" },
      { property: "og:description", content: "Private editor for the website content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "brand", label: "Brand" },
  { key: "heroSlides", label: "Hero slides" },
  { key: "home", label: "Home page" },
  { key: "services", label: "Services" },
  { key: "values", label: "Values" },
  { key: "gallery", label: "Gallery" },
  { key: "about", label: "About page" },
  { key: "servicesPage", label: "Services page" },
  { key: "galleryPage", label: "Gallery page" },
  { key: "contactPage", label: "Contact page" },
  { key: "contact", label: "Contact details" },
  { key: "socials", label: "Social links" },
  { key: "cta", label: "Call to action" },
  { key: "footer", label: "Footer" },
  { key: "seo", label: "SEO" },
];

const isImageKey = (k: string) => /image$|^logo$|^image\d?$|Image\d?$/i.test(k) && !/alt$/i.test(k);
const isLong = (k: string, v: string) =>
  v.length > 70 || /body|description|detail|story|intro|short/i.test(k);
const human = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [section, setSection] = useState<keyof SiteContent>("brand");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const verify = useServerFn(adminVerify);
  const getDraft = useServerFn(adminGetDraft);
  const save = useServerFn(adminSaveDraft);
  const publish = useServerFn(adminPublish);

  const load = async (k: string) => {
    const r = await getDraft({ data: { key: k } });
    setContent(r.content);
    setKey(k);
  };

  useEffect(() => {
    const k = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (k) load(k).catch(() => sessionStorage.removeItem(ADMIN_KEY_STORAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await verify({ data: { key: input } });
      sessionStorage.setItem(ADMIN_KEY_STORAGE, input);
      await load(input);
    } catch {
      toast.error("That access key is not valid.");
    } finally {
      setBusy(false);
    }
  };

  const run = async (kind: "save" | "publish") => {
    if (!key || !content) return;
    setBusy(true);
    try {
      if (kind === "save") await save({ data: { key, content } });
      else await publish({ data: { key, content } });
      setDirty(false);
      toast.success(kind === "save" ? "Draft saved." : "Published — the live site is updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (!key || !content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary px-4">
        <Toaster />
        <form
          onSubmit={signIn}
          className="w-full max-w-sm space-y-5 rounded-md border bg-background p-8"
        >
          <div>
            <p className="eyebrow">ADMIN CENTER</p>
            <h1 className="mt-2 font-serif text-3xl">Sign in</h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Access key</Label>
            <Input
              id="key"
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Checking…" : "Enter"}
          </Button>
        </form>
      </main>
    );
  }

  const update = (v: unknown) => {
    setContent({ ...content, [section]: v } as SiteContent);
    setDirty(true);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Toaster />
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <h1 className="font-serif text-xl">Admin Center</h1>
          <Button variant="outline" size="sm" asChild><a href="/admin/inquiries">View enquiries</a></Button>
          <span className="text-xs text-muted-foreground">
            {dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          <div className="ml-auto flex flex-wrap gap-2">
            <Button variant="outline" size="sm" disabled={busy} onClick={() => run("save")}>
              Save draft
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/?preview=draft" target="_blank" rel="noreferrer">
                Preview draft <ExternalLink />
              </a>
            </Button>
            <Button size="sm" disabled={busy} onClick={() => run("publish")}>
              Publish
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Sign out"
              onClick={() => {
                sessionStorage.removeItem(ADMIN_KEY_STORAGE);
                setKey(null);
                setContent(null);
              }}
            >
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="flex gap-1 overflow-x-auto lg:flex-col">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-sm ${section === s.key ? "bg-primary text-primary-foreground" : "hover:bg-background"}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <section className="min-w-0 rounded-md border bg-background p-5 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl">
            {SECTIONS.find((s) => s.key === section)?.label}
          </h2>
          <FieldEditor
            value={content[section]}
            onChange={update}
            adminKey={key}
            fixedLength={section === "heroSlides"}
            path={String(section)}
          />
        </section>
      </div>
    </div>
  );
}

function FieldEditor({
  value,
  onChange,
  adminKey,
  fixedLength,
  path,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  adminKey: string;
  fixedLength?: boolean;
  path: string;
}) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-4">
        {value.map((item, i) => (
          <div key={i} className="rounded-md border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                ITEM {i + 1}
              </span>
              {!fixedLength && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                >
                  <Trash2 /> Remove
                </Button>
              )}
            </div>
            <FieldEditor
              value={item}
              adminKey={adminKey}
              path={`${path}.${i}`}
              onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
            />
          </div>
        ))}
        {!fixedLength && value.length > 0 && (
          <Button
            variant="outline"
            onClick={() => onChange([...value, structuredClone(value[value.length - 1])])}
          >
            <Plus /> Add item
          </Button>
        )}
      </div>
    );
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return (
      <div className="space-y-5">
        {Object.entries(obj).map(([k, v]) => {
          const id = `${path}.${k}`;
          const set = (nv: unknown) => onChange({ ...obj, [k]: nv });
          if (typeof v === "string") {
            if (isImageKey(k))
              return (
                <ImageField
                  key={k}
                  id={id}
                  label={human(k)}
                  value={v}
                  onChange={set}
                  adminKey={adminKey}
                />
              );
            return (
              <div key={k} className="space-y-2">
                <Label htmlFor={id}>{human(k)}</Label>
                {isLong(k, v) ? (
                  <Textarea id={id} rows={4} value={v} onChange={(e) => set(e.target.value)} />
                ) : (
                  <Input id={id} value={v} onChange={(e) => set(e.target.value)} />
                )}
              </div>
            );
          }
          return (
            <fieldset key={k} className="space-y-3 border-t pt-5">
              <legend className="text-sm font-semibold">{human(k)}</legend>
              <FieldEditor value={v} onChange={set} adminKey={adminKey} path={id} />
            </fieldset>
          );
        })}
      </div>
    );
  }
  return null;
}

function ImageField({
  id,
  label,
  value,
  onChange,
  adminKey,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  adminKey: string;
}) {
  const upload = useServerFn(adminUpload);
  const [busy, setBusy] = useState(false);
  const onFile = async (file?: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }
    setBusy(true);
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      let bin = "";
      for (let i = 0; i < buf.length; i += 0x8000)
        bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      const r = await upload({
        data: { key: adminKey, name: file.name, type: file.type, base64: btoa(bin) },
      });
      onChange(r.path);
      toast.success("Image uploaded. Save or publish to keep it.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex flex-wrap items-center gap-4">
        {value ? (
          <img src={imageUrl(value)} alt="" className="h-20 w-28 rounded object-cover" />
        ) : (
          <div className="flex h-20 w-28 items-center justify-center rounded border border-dashed text-xs text-muted-foreground">
            None
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary">
          <Upload className="size-4" /> {busy ? "Uploading…" : "Replace"}
          <input
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={busy}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange("")}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
