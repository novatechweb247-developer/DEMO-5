import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { imageAlt, imageUrl } from "@/content/site";
import { useSiteContent } from "@/lib/site-content-context";

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const slides = useSiteContent().heroSlides;
  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [active, slides.length]);
  const select = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      className="relative min-h-[680px] overflow-hidden bg-primary sm:min-h-[720px] lg:min-h-[calc(100svh-5rem)] lg:max-h-[900px]"
      aria-roledescription="carousel"
      aria-label="Featured slides"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${index === active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <img
            src={imageUrl(slide.image)}
            alt={imageAlt(slide.image, slide.imageAlt)}
            width={1600}
            height={1072}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 size-full object-cover transition-transform duration-[7000ms] motion-reduce:transition-none ${index === active ? "scale-[1.035]" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="site-container relative z-10 flex min-h-[680px] items-end pb-28 pt-24 sm:min-h-[720px] sm:items-center sm:pb-28 lg:min-h-[calc(100svh-5rem)] lg:max-h-[900px]">
            <div className="max-w-3xl text-primary-foreground">
              <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-primary-foreground/75">
                {slide.eyebrow}
              </p>
              {index === 0 ? (
                <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
              ) : (
                <h2 className="max-w-3xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h2>
              )}
              <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/82 sm:text-lg">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link to={slide.primaryTo}>
                    {slide.primaryLabel}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to={slide.secondaryTo}>{slide.secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="site-container absolute inset-x-0 bottom-7 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              type="button"
              onClick={() => select(index)}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={active === index}
              className={`h-1.5 rounded-full transition-all ${active === index ? "w-10 bg-primary-foreground" : "w-5 bg-primary-foreground/40 hover:bg-primary-foreground/70"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => select(active - 1)}
            aria-label="Previous slide"
          >
            <ArrowLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => select(active + 1)}
            aria-label="Next slide"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
