import heroStudio from "@/assets/demo-hero-studio.jpg";
import consultation from "@/assets/demo-consultation.jpg";
import space from "@/assets/demo-space.jpg";
import craft from "@/assets/demo-craft.jpg";

/**
 * Demo defaults for a fresh installation. The published database content always
 * takes priority; these values only fill fields that have never been saved.
 */

export type SitePath = "/" | "/about" | "/services" | "/gallery" | "/contact";
export const sitePaths: SitePath[] = ["/", "/about", "/services", "/gallery", "/contact"];

/** Bundled demo images. An image reference is either "demo:<key>" or an uploaded storage path. */
export const demoMedia = {
  studio: {
    src: heroStudio,
    alt: "Refined demonstration interior with an oak table and olive chair",
  },
  consultation: {
    src: consultation,
    alt: "Demonstration consultation workspace with natural material samples",
  },
  space: {
    src: space,
    alt: "Warm demonstration commercial interior with stone counter and greenery",
  },
  craft: { src: craft, alt: "Demonstration craftsperson carefully finishing a wooden vessel" },
} as const;

export type ImageRef = string;

/** Resolve an image reference (demo key or stored upload path) to a URL. */
export function imageUrl(ref: ImageRef | undefined | null): string {
  if (!ref) return demoMedia.studio.src;
  if (ref.startsWith("demo:")) {
    const key = ref.slice(5) as keyof typeof demoMedia;
    return (demoMedia[key] ?? demoMedia.studio).src;
  }
  return `/media/${ref}`;
}

/** Alt text for an image reference: demo media carries its own; uploads use the supplied fallback. */
export function imageAlt(ref: ImageRef | undefined | null, fallback = ""): string {
  if (ref?.startsWith("demo:")) {
    const key = ref.slice(5) as keyof typeof demoMedia;
    return fallback || (demoMedia[key] ?? demoMedia.studio).alt;
  }
  return fallback;
}

export const serviceIcons = [
  "message",
  "sparkles",
  "briefcase",
  "gem",
  "heart",
  "package",
] as const;
export const valueIcons = ["focus", "badge", "handshake", "compass"] as const;

export const defaultContent = {
  brand: {
    name: "The Good Company",
    qualifier: "Master Demo",
    monogram: "TG",
    description:
      "A polished demonstration business website, ready to be shaped around a real brand, service, and story.",
    logo: "",
    ctaLabel: "Get in Touch",
  },
  heroSlides: [
    {
      eyebrow: "MASTER BUSINESS DEMO",
      title: "Designed for the way you work and live.",
      description:
        "A considered foundation for businesses that value clarity, quality, and a memorable customer experience.",
      image: "demo:studio",
      imageAlt: demoMedia.studio.alt,
      primaryLabel: "Explore Services",
      primaryTo: "/services" as SitePath,
      secondaryLabel: "Discover Our Story",
      secondaryTo: "/about" as SitePath,
    },
    {
      eyebrow: "THOUGHTFUL FROM THE START",
      title: "Ideas shaped around what matters.",
      description:
        "From the first conversation to the final detail, this demo shows how a tailored service story can come to life.",
      image: "demo:consultation",
      imageAlt: demoMedia.consultation.alt,
      primaryLabel: "How We Help",
      primaryTo: "/services" as SitePath,
      secondaryLabel: "View Gallery",
      secondaryTo: "/gallery" as SitePath,
    },
    {
      eyebrow: "QUALITY IN EVERY DETAIL",
      title: "A better experience, beautifully delivered.",
      description:
        "Flexible content, elevated presentation, and a structure ready for a future business to make entirely its own.",
      image: "demo:space",
      imageAlt: demoMedia.space.alt,
      primaryLabel: "Start a Conversation",
      primaryTo: "/contact" as SitePath,
      secondaryLabel: "See Our Approach",
      secondaryTo: "/about" as SitePath,
    },
  ],
  home: {
    editorial: {
      eyebrow: "ABOUT OUR BUSINESS",
      title: "Considered service. Meaningful results.",
      body: "This is polished demonstration copy for a future business story. It shows how a clear introduction, warm tone, and strong visual identity can work together before real details are added.",
      image: "demo:consultation",
      buttonLabel: "Discover More",
      quote: "“A flexible place for a future business to express what it does best.”",
      quoteLabel: "DEMONSTRATION MESSAGE",
    },
    services: {
      eyebrow: "WHAT WE OFFER",
      title: "Services with purpose.",
      description:
        "A flexible service framework that can be adapted to a wide range of professional, creative, retail, or hospitality businesses.",
    },
    gallery: {
      eyebrow: "FEATURED WORK",
      title: "A closer look.",
      description:
        "A visual system designed to give future work, spaces, products, and moments room to breathe.",
    },
    why: {
      eyebrow: "WHY CHOOSE US",
      title: "The details shape the experience.",
      description:
        "These demonstration values provide a polished framework for the real strengths and principles of a future business.",
    },
    contact: {
      eyebrow: "VISIT OR CONNECT",
      title: "A clear way to get in touch.",
      description:
        "This contact preview demonstrates how future customers can quickly find the details they need. Every item is placeholder content.",
      image: "demo:space",
    },
  },
  cta: {
    title: "Let's create something great.",
    description:
      "This demonstration is ready to become a website shaped around a real business, audience, and ambition.",
  },
  services: [
    {
      id: "consultation",
      icon: "message",
      title: "Premium Consultation",
      short: "A focused first step for understanding needs, priorities, and the best path forward.",
      detail:
        "This demo service description can later be replaced with a real discovery process, consultation offer, or introductory appointment. It is structured to explain what customers can expect without making unsupported claims.",
      image: "demo:consultation",
    },
    {
      id: "solutions",
      icon: "sparkles",
      title: "Custom Solutions",
      short: "Thoughtfully shaped options designed around each customer and their specific goals.",
      detail:
        "Use this area for a tailored product, design, planning, or advisory service. The flexible format supports a clear overview, process details, and a future service-specific call to action.",
      image: "demo:studio",
    },
    {
      id: "professional",
      icon: "briefcase",
      title: "Professional Service",
      short: "A clear, dependable experience from the first conversation through completion.",
      detail:
        "This section demonstrates how a core professional service can be explained with confidence and clarity while leaving all real-world claims for the final business to provide.",
      image: "demo:space",
    },
    {
      id: "quality",
      icon: "gem",
      title: "Quality Products",
      short: "A refined presentation for products chosen with care and attention to detail.",
      detail:
        "Ideal for future retail, furniture, fashion, beauty, food, or lifestyle offerings. Replace the demo language and imagery with the real assortment when the business is ready.",
      image: "demo:craft",
    },
    {
      id: "support",
      icon: "heart",
      title: "Personalized Support",
      short: "Helpful guidance and attentive communication at every relevant stage.",
      detail:
        "A reusable space for aftercare, client support, concierge service, or an account relationship. The copy remains intentionally general until real support terms are supplied.",
      image: "demo:consultation",
    },
    {
      id: "delivery",
      icon: "package",
      title: "Reliable Delivery",
      short: "A straightforward way to explain fulfilment, handover, or service completion.",
      detail:
        "Future versions can add actual coverage areas, delivery timeframes, collection details, or appointment terms. No operational promise is implied by this demonstration content.",
      image: "demo:space",
    },
  ] as {
    id: string;
    icon: (typeof serviceIcons)[number];
    title: string;
    short: string;
    detail: string;
    image: ImageRef;
  }[],
  values: [
    {
      icon: "focus",
      title: "Attention to Detail",
      description:
        "Every touchpoint is considered, from the first impression to the finer finishing details.",
    },
    {
      icon: "badge",
      title: "Quality First",
      description:
        "A framework for showing a future business's standards without relying on empty superlatives.",
    },
    {
      icon: "handshake",
      title: "Personal Service",
      description:
        "A warm, human approach that makes space for real customer needs and preferences.",
    },
    {
      icon: "compass",
      title: "Reliable Experience",
      description:
        "Clear expectations, thoughtful communication, and a process customers can understand.",
    },
  ] as { icon: (typeof valueIcons)[number]; title: string; description: string }[],
  gallery: [
    { image: "demo:studio", title: "A Considered Setting", category: "Featured Demo" },
    { image: "demo:consultation", title: "The First Conversation", category: "Process Demo" },
    { image: "demo:space", title: "Room to Experience", category: "Space Demo" },
    { image: "demo:craft", title: "Made With Attention", category: "Detail Demo" },
    { image: "demo:consultation", title: "Materials & Ideas", category: "Editorial Demo" },
    { image: "demo:studio", title: "Quiet Confidence", category: "Lifestyle Demo" },
    { image: "demo:craft", title: "Finishing Touches", category: "Craft Demo" },
    { image: "demo:space", title: "A Warm Welcome", category: "Experience Demo" },
  ] as { image: ImageRef; title: string; category: string }[],
  about: {
    hero: {
      eyebrow: "ABOUT THE DEMO",
      title: "A strong foundation for a real business story.",
      description:
        "Complete, considered, and ready to be personalized—without pretending to represent an existing company.",
      image: "demo:consultation",
    },
    introEyebrow: "OUR INTRODUCTION",
    introTitle: "Built to become distinctly yours.",
    intro:
      "This master demonstration is designed to become a distinctive business website without changing its underlying structure. Real identity, story, imagery, and services can be added when the template is duplicated.",
    introSupport:
      "Every word, image, service, and detail is intentionally replaceable. The structure stays dependable while the identity becomes specific to the future business.",
    storyTitle: "A place for the real story to unfold.",
    story:
      "Every strong business has a point of view: why it began, who it serves, and what makes its approach meaningful. This demonstration gives that story a refined, readable home.\n\nThe final version can replace these paragraphs with an authentic founder story, company history, or concise overview—while keeping the visual rhythm and responsive structure intact.",
    storyImage: "demo:craft",
    valuesTitle: "Values made visible.",
    valuesDescription:
      "Replace these demonstration principles with the values that genuinely guide the future business.",
    visualImage1: "demo:studio",
    visualImage2: "demo:space",
    ctaTitle: "Ready for the real story?",
  },
  servicesPage: {
    hero: {
      eyebrow: "DEMONSTRATION SERVICES",
      title: "A flexible way to show how you help.",
      description:
        "Six adaptable service structures, ready for real offerings, images, and details when this master is duplicated.",
      image: "demo:space",
    },
    title: "Clear choices, confidently presented.",
    description:
      "Each demonstration service is drawn from one centralized source so future changes stay consistent everywhere.",
    ctaTitle: "Let's shape the right service experience.",
  },
  galleryPage: {
    hero: {
      eyebrow: "DEMONSTRATION GALLERY",
      title: "A visual story with room to breathe.",
      description:
        "An adaptable editorial gallery for future projects, products, spaces, services, or memorable moments.",
      image: "demo:studio",
    },
    title: "Details, spaces, and experiences.",
    description:
      "All imagery is original demonstration media and can be replaced from the Admin Center.",
    ctaTitle: "Have a project worth showing?",
  },
  contactPage: {
    hero: {
      eyebrow: "CONTACT THE DEMO",
      title: "Start with a simple conversation.",
      description:
        "A clear, welcoming contact experience ready to connect to real details and enquiry handling in a future phase.",
      image: "demo:craft",
    },
    title: "We'd like to hear from you.",
    description:
      "Every detail on this page is demonstration content. Replace it with verified business information before launch.",
    formTitle: "Tell us what you have in mind.",
  },
  contact: {
    phone: "+000 000 000 000",
    email: "hello@example.com",
    address: "Demo business location — replace before launch",
    hours: "Demo opening hours — replace before launch",
    whatsapp: "https://wa.me/000000000000",
  },
  socials: {
    instagram: "https://example.com",
    facebook: "https://example.com",
    tiktok: "https://example.com",
    whatsapp: "https://wa.me/000000000000",
  },
  footer: {
    badge: "DEMONSTRATION CONTENT",
    copyright: "Master demonstration only.",
    notice: "Replace all demo content before launch.",
  },
  seo: {
    ogImage: "",
    home: {
      title: "The Good Company — Master Business Website Demo",
      description:
        "A premium demonstration business website with adaptable services, gallery, about, and contact experiences.",
    },
    about: {
      title: "About — The Good Company Master Demo",
      description:
        "Explore the demonstration story, approach, and values created for this reusable business website foundation.",
    },
    services: {
      title: "Services — The Good Company Master Demo",
      description:
        "Browse adaptable demonstration services presented in a polished, reusable business website structure.",
    },
    gallery: {
      title: "Gallery — The Good Company Master Demo",
      description:
        "View a curated demonstration gallery designed to showcase future projects, products, spaces, or experiences.",
    },
    contact: {
      title: "Contact — The Good Company Master Demo",
      description:
        "See the demonstration contact experience, enquiry form, social links, and replaceable business details.",
    },
  },
};

export type SiteContent = typeof defaultContent;
export type SectionKey = keyof SiteContent;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Stored content wins; defaults only fill fields that were never saved. Arrays are replaced whole. */
export function mergeContent(stored: unknown): SiteContent {
  const merge = (base: unknown, over: unknown): unknown => {
    if (over === undefined || over === null) return base;
    if (Array.isArray(base)) return Array.isArray(over) ? over : base;
    if (isObject(base) && isObject(over)) {
      const out: Record<string, unknown> = { ...base };
      for (const key of Object.keys(base)) out[key] = merge(base[key], over[key]);
      return out;
    }
    return typeof over === typeof base ? over : base;
  };
  const result = merge(defaultContent, stored) as SiteContent;
  // Hard rule: exactly three hero slides.
  const slides = [0, 1, 2].map((i) =>
    merge(defaultContent.heroSlides[i], result.heroSlides[i]),
  ) as SiteContent["heroSlides"];
  return { ...result, heroSlides: slides };
}

export function pageMeta(
  seo: { title: string; description: string },
  path: string,
  ogImage?: string,
) {
  const meta: Record<string, string>[] = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (ogImage && /^https:\/\//.test(ogImage))
    meta.push(
      { property: "og:image", content: ogImage },
      { name: "twitter:image", content: ogImage },
    );
  return { meta, links: [{ rel: "canonical", href: path }] };
}

// ---- Compatibility layer: public pages still read this static shape until they are wired to the database. ----
export const media = demoMedia;
export type MediaKey = keyof typeof demoMedia;
const key = (ref: string) => (ref.startsWith("demo:") ? ref.slice(5) : "studio") as MediaKey;
const d = defaultContent;
export const siteContent = {
  business: {
    name: d.brand.name,
    qualifier: d.brand.qualifier,
    shortName: "TGC",
    description: d.brand.description,
  },
  navigation: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ] as { label: string; to: SitePath }[],
  heroSlides: d.heroSlides.map((s) => ({
    eyebrow: s.eyebrow,
    title: s.title,
    description: s.description,
    image: key(s.image),
    primary: { label: s.primaryLabel, to: s.primaryTo },
    secondary: { label: s.secondaryLabel, to: s.secondaryTo },
  })),
  home: {
    intro: {
      eyebrow: d.home.editorial.eyebrow,
      title: d.home.editorial.title,
      body: d.home.editorial.body,
      image: key(d.home.editorial.image),
    },
    servicesIntro: d.home.services.description,
    galleryIntro: d.home.gallery.description,
  },
  services: d.services.map((s) => ({ ...s, image: key(s.image) })),
  values: d.values,
  gallery: d.gallery.map((g) => ({ ...g, image: key(g.image) })),
  about: {
    intro: d.about.intro,
    storyTitle: d.about.storyTitle,
    story: d.about.story.split("\n\n"),
  },
  contact: {
    ...d.contact,
    note: "All contact details shown are demonstration placeholders and must be replaced before launch.",
  },
  socials: [
    { name: "Instagram", href: d.socials.instagram, icon: "instagram" as const },
    { name: "Facebook", href: d.socials.facebook, icon: "facebook" as const },
    { name: "TikTok", href: d.socials.tiktok, icon: "music" as const },
    { name: "WhatsApp", href: d.socials.whatsapp, icon: "message-circle" as const },
  ],
  seo: d.seo,
};
