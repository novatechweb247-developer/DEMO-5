import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaSection,
  DemoImage,
  EditorialGallery,
  SectionHeading,
  ServiceGrid,
  TextLink,
  ValuesGrid,
} from "@/components/site/sections";
import { HeroSlider } from "@/components/site/hero-slider";
import { defaultContent, pageMeta } from "@/content/site";
import { publishedContentQuery } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/site-content-context";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedContentQuery),
  head: ({ loaderData }) =>
    pageMeta(loaderData?.seo.home ?? defaultContent.seo.home, "/", loaderData?.seo.ogImage),
  component: HomePage,
});

function HomePage() {
  const c = useSiteContent();
  const h = c.home;
  const details = [
    { Icon: Phone, label: "PHONE", value: c.contact.phone },
    { Icon: Mail, label: "EMAIL", value: c.contact.email },
    { Icon: MapPin, label: "LOCATION", value: c.contact.address },
  ];
  return (
    <>
      <HeroSlider />
      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-20">
          <div className="relative min-h-[400px] overflow-hidden rounded-md sm:min-h-[560px]">
            <DemoImage image={h.editorial.image} className="absolute inset-0" />
          </div>
          <div>
            <SectionHeading
              eyebrow={h.editorial.eyebrow}
              title={h.editorial.title}
              description={h.editorial.body}
            />
            <div className="mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  {h.editorial.buttonLabel} <ArrowRight />
                </Link>
              </Button>
            </div>
            {h.editorial.quote && (
              <div className="mt-12 border-l-2 border-accent pl-5">
                <p className="font-serif text-xl leading-8 text-foreground">{h.editorial.quote}</p>
                <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                  {h.editorial.quoteLabel}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section-space bg-secondary">
        <div className="site-container">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={h.services.eyebrow}
              title={h.services.title}
              description={h.services.description}
            />
            <TextLink to="/services">View all services</TextLink>
          </div>
          <ServiceGrid limit={6} />
        </div>
      </section>
      <section className="section-space">
        <div className="site-container">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={h.gallery.eyebrow}
              title={h.gallery.title}
              description={h.gallery.description}
            />
            <TextLink to="/gallery">Explore the gallery</TextLink>
          </div>
          <EditorialGallery limit={4} />
        </div>
      </section>
      <section className="section-space bg-primary text-primary-foreground">
        <div className="site-container">
          <SectionHeading
            eyebrow={h.why.eyebrow}
            title={h.why.title}
            description={h.why.description}
          />
          <div className="mt-14 [&_article]:border-primary-foreground/20 [&_h3]:text-primary-foreground [&_p]:text-primary-foreground/68 [&_svg]:text-primary-foreground/80">
            <ValuesGrid />
          </div>
        </div>
      </section>
      <CtaSection />
      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={h.contact.eyebrow}
              title={h.contact.title}
              description={h.contact.description}
            />
            <dl className="mt-9 space-y-5">
              {details.map(({ Icon, label, value }) => (
                <div key={label} className="grid grid-cols-[auto_1fr] gap-4">
                  <Icon className="mt-1 size-5 text-accent-foreground" />
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-9" size="lg">
              <Link to="/contact">
                Contact Us <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-md sm:min-h-[520px]">
            <DemoImage image={h.contact.image} className="absolute inset-0" />
          </div>
        </div>
      </section>
    </>
  );
}
