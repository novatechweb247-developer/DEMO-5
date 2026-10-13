import { createFileRoute } from "@tanstack/react-router";
import { CtaSection, EditorialGallery, PageHero, SectionHeading } from "@/components/site/sections";
import { defaultContent, pageMeta } from "@/content/site";
import { publishedContentQuery } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/site-content-context";

export const Route = createFileRoute("/gallery")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedContentQuery),
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.seo.gallery ?? defaultContent.seo.gallery,
      "/gallery",
      loaderData?.seo.ogImage,
    ),
  component: GalleryPage,
});

function GalleryPage() {
  const p = useSiteContent().galleryPage;
  return (
    <>
      <PageHero {...p.hero} />
      <section className="section-space">
        <div className="site-container">
          <SectionHeading eyebrow="SELECTED IMAGERY" title={p.title} description={p.description} />
          <div className="mt-12">
            <EditorialGallery />
          </div>
        </div>
      </section>
      <CtaSection title={p.ctaTitle} />
    </>
  );
}
