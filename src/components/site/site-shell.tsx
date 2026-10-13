import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, MessageCircle, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { imageUrl, siteContent } from "@/content/site";
import { useIsPreview, useSiteContent } from "@/lib/site-content-context";

const navigation = siteContent.navigation;

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const { brand } = useSiteContent();
  return (
    <Link
      to="/"
      aria-label={`${brand.name} home`}
      className="group inline-flex min-w-0 items-center gap-3"
    >
      {brand.logo ? (
        <img
          src={imageUrl(brand.logo)}
          alt=""
          className="size-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-full border font-serif text-sm ${inverse ? "border-primary-foreground/35 text-primary-foreground" : "border-primary/30 text-primary"}`}
        >
          {brand.monogram}
        </span>
      )}
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate font-serif text-lg ${inverse ? "text-primary-foreground" : "text-foreground"}`}
        >
          {brand.name}
        </span>
        {brand.qualifier && (
          <span
            className={`block text-[0.64rem] font-semibold tracking-[0.18em] ${inverse ? "text-primary-foreground/70" : "text-muted-foreground"}`}
          >
            {brand.qualifier.toUpperCase()}
          </span>
        )}
      </span>
    </Link>
  );
}

export function Header() {
  const { brand } = useSiteContent();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-lg">
      <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Brand />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nav-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="lg">
            <Link to="/contact">{brand.ctaLabel}</Link>
          </Button>
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[88vw] max-w-sm border-border bg-background px-7 pt-8">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription className="pt-2">Site navigation</SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="mt-10 flex flex-col border-t border-border"
              >
                {navigation.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      className="border-b border-border py-5 font-serif text-2xl text-foreground"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild size="lg" className="mt-8 w-full">
                  <Link to="/contact">{brand.ctaLabel}</Link>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SocialLinks({ inverse = false }: { inverse?: boolean }) {
  const { socials } = useSiteContent();
  const items = [
    { name: "Instagram", href: socials.instagram, Icon: Instagram },
    { name: "Facebook", href: socials.facebook, Icon: Facebook },
    { name: "TikTok", href: socials.tiktok, Icon: Music2 },
    { name: "WhatsApp", href: socials.whatsapp, Icon: MessageCircle },
  ].filter((s) => s.href);
  return (
    <div className="flex flex-wrap gap-2" aria-label="Social links">
      {items.map(({ name, href, Icon }) => (
        <Button
          key={name}
          asChild
          variant="ghost"
          size="icon"
          className={`min-h-11 min-w-11 rounded-full ${inverse ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" : ""}`}
        >
          <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
            <Icon />
          </a>
        </Button>
      ))}
    </div>
  );
}

export function Footer() {
  const c = useSiteContent();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.7fr_.8fr_1fr] lg:py-20">
        <div className="max-w-sm">
          <Brand inverse />
          <p className="mt-6 text-sm leading-7 text-primary-foreground/72">{c.brand.description}</p>
          {c.footer.badge && (
            <p className="mt-4 inline-block border border-primary-foreground/20 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-primary-foreground/75">
              {c.footer.badge}
            </p>
          )}
        </div>
        <div>
          <h2 className="font-serif text-lg">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/72">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link className="transition-colors hover:text-primary-foreground" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg">Services</h2>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/72">
            {c.services.slice(0, 4).map((service, i) => (
              <li key={service.id || i}>
                <Link to="/services" hash={service.id}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg">Contact</h2>
          <div className="mt-5 space-y-3 text-sm leading-6 text-primary-foreground/72">
            <p>{c.contact.phone}</p>
            <p>{c.contact.email}</p>
            <p>{c.contact.address}</p>
          </div>
          <div className="mt-5">
            <SocialLinks inverse />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {c.brand.name}. {c.footer.copyright}
          </p>
          <p>{c.footer.notice}</p>
        </div>
      </div>
    </footer>
  );
}

function PreviewBanner() {
  const preview = useIsPreview();
  if (!preview) return null;
  return (
    <div
      role="status"
      className="bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
    >
      Draft preview — visitors still see the published version.
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
