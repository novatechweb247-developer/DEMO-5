CREATE TABLE public.site_content (
  id text PRIMARY KEY CHECK (id IN ('draft', 'published')),
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published content"
ON public.site_content FOR SELECT
TO anon, authenticated
USING (id = 'published');

INSERT INTO public.site_content (id, content) VALUES ('draft', '{}'::jsonb), ('published', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;