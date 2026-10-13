import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaSection,
  DemoImage,
  PageHero,
  SectionHeading,
  ServiceGrid,
} from "@/components/site/sections";
import { defaultContent, pageMeta } from "@/content/site";
import { publishedContentQuery } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/site-content-context";

export const Route = createFileRoute("/services")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedContentQuery),
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.seo.services ?? defaultContent.seo.services,
      "/services",
      loaderData?.seo.ogImage,
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const c = useSiteContent();
  const p = c.servicesPage;
  return (
    <>
      <PageHero {...p.hero} />
      <section className="section-space">
        <div className="site-container">
          <SectionHeading eyebrow="SERVICE OVERVIEW" title={p.title} description={p.description} />
          <div className="mt-12">
            <ServiceGrid />
          </div>
        </div>
      </section>
      <section className="section-space bg-secondary">
        <div className="site-container space-y-20">
          {c.services.map((service, index) => (
            <article
              key={service.id || index}
              className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div
                className={`aspect-[4/3] overflow-hidden rounded-md ${index % 2 ? "lg:order-2" : ""}`}
              >
                <DemoImage image={service.image} alt={service.title} />
              </div>
              <div>
                <p className="eyebrow">SERVICE {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 font-serif text-4xl">{service.title}</h2>
                <p className="mt-5 leading-7 text-muted-foreground">{service.detail}</p>
                <Button asChild variant="outline" size="lg" className="mt-8">
                  <Link to="/contact">
                    Ask About This Service <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaSection title={p.ctaTitle} />
    </>
  );
}
