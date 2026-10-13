import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Compass,
  Focus,
  Gem,
  Handshake,
  HeartHandshake,
  MessageSquareText,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageAlt, imageUrl, type ImageRef, type SitePath } from "@/content/site";
import { useSiteContent } from "@/lib/site-content-context";
import { cn } from "@/lib/utils";

const icons = {
  message: MessageSquareText,
  sparkles: Sparkles,
  briefcase: BriefcaseBusiness,
  gem: Gem,
  heart: HeartHandshake,
  package: PackageCheck,
  focus: Focus,
  badge: BadgeCheck,
  handshake: Handshake,
  compass: Compass,
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export function DemoImage({
  image,
  alt,
  className,
  eager = false,
}: {
  image: ImageRef;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={imageUrl(image)}
      alt={imageAlt(image, alt)}
      width={1600}
      height={1072}
      loading={eager ? "eager" : "lazy"}
      className={cn("size-full object-cover", className)}
    />
  );
}

export function ServiceGrid({ limit }: { limit?: number }) {
  const c = useSiteContent();
  const services = limit ? c.services.slice(0, limit) : c.services;
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[service.icon] ?? Sparkles;
        return (
          <article
            key={service.id || index}
            id={service.id}
            className="group bg-card p-7 transition-colors hover:bg-secondary sm:p-8"
          >
            <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
              <Icon />
            </span>
            <p className="mt-7 text-xs font-semibold tracking-[0.16em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-card-foreground">{service.title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{service.short}</p>
            <Link
              to="/services"
              hash={service.id}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Learn more{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ValuesGrid() {
  const c = useSiteContent();
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {c.values.map((value, i) => {
        const Icon = icons[value.icon] ?? Focus;
        return (
          <article key={`${value.title}-${i}`} className="border-t border-border pt-6">
            <Icon className="size-6 text-accent-foreground" />
            <h3 className="mt-5 font-serif text-xl">{value.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageRef;
}) {
  return (
    <section className="relative isolate min-h-[430px] overflow-hidden bg-primary sm:min-h-[500px]">
      <DemoImage image={image} eager className="absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-page-overlay" />
      <div className="site-container flex min-h-[430px] items-end pb-14 pt-24 sm:min-h-[500px] sm:pb-20">
        <div className="max-w-3xl text-primary-foreground">
          <p className="text-xs font-semibold tracking-[0.22em] text-primary-foreground/75">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function CtaSection({ title, description }: { title?: string; description?: string }) {
  const c = useSiteContent();
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="site-container grid gap-8 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em]">YOUR NEXT STEP</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            {title || c.cta.title}
          </h2>
          <p className="mt-5 max-w-xl leading-7 opacity-80">{description || c.cta.description}</p>
        </div>
        <div className="flex flex-col gap-3 min-[420px]:flex-row">
          <Button asChild size="lg">
            <Link to="/contact">
              {c.brand.ctaLabel} <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-accent-foreground/30 bg-transparent"
          >
            <Link to="/services">View Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EditorialGallery({ limit }: { limit?: number }) {
  const c = useSiteContent();
  const items = limit ? c.gallery.slice(0, limit) : c.gallery;
  return (
    <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 sm:auto-rows-[300px] lg:grid-cols-3">
      {items.map((item, index) => (
        <figure
          key={`${item.title}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-md bg-muted",
            (index === 0 || index === 5) && "sm:row-span-2",
            index === 0 && "lg:col-span-2",
          )}
        >
          <DemoImage
            image={item.image}
            alt={item.title}
            className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-caption px-5 pb-5 pt-16 text-primary-foreground">
            <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-primary-foreground/70">
              {item.category.toUpperCase()}
            </p>
            <h3 className="mt-1 font-serif text-xl">{item.title}</h3>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function TextLink({ to, children }: { to: SitePath; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent-foreground"
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
