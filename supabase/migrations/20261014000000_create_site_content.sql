-- Persistent source of truth for editable draft and published site content.
-- Server-side operations use the Supabase service role; no public table policies are added.
create table if not exists public.site_content (
  id text primary key check (id in ('draft', 'published')),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
