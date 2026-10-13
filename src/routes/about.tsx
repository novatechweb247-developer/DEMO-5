import { createFileRoute } from "@tanstack/react-router";
import {
  CtaSection,
  DemoImage,
  PageHero,
  SectionHeading,
  ValuesGrid,
} from "@/components/site/sections";
import { defaultContent, pageMeta } from "@/content/site";
import { publishedContentQuery } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/site-content-context";

export const Route = createFileRoute("/about")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedContentQuery),
  head: ({ loaderData }) =>
    pageMeta(loaderData?.seo.about ?? defaultContent.seo.about, "/about", loaderData?.seo.ogImage),
  component: AboutPage,
});

function AboutPage() {
  const a = useSiteContent().about;
  return (
    <>
      <PageHero {...a.hero} />
      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow={a.introEyebrow} title={a.introTitle} />
          <div>
            <p className="font-serif text-2xl leading-9 text-foreground sm:text-3xl sm:leading-10">
              {a.intro}
            </p>
            <p className="mt-6 leading-7 text-muted-foreground">{a.introSupport}</p>
          </div>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="site-container grid lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[660px]">
            <DemoImage image={a.storyImage} className="absolute inset-0" />
          </div>
          <div className="flex items-center px-0 py-14 sm:py-20 lg:px-16">
            <div>
              <p className="eyebrow">THE STORY</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{a.storyTitle}</h2>
              {a.story
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i} className="mt-6 leading-7 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="WHAT GUIDES THE WORK"
            title={a.valuesTitle}
            description={a.valuesDescription}
          />
          <div className="mt-14">
            <ValuesGrid />
          </div>
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="site-container">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden rounded-md">
              <DemoImage image={a.visualImage1} />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-md">
              <DemoImage image={a.visualImage2} />
            </div>
          </div>
        </div>
      </section>
      <CtaSection title={a.ctaTitle} />
    </>
  );
}
