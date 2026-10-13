import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { PageHero, SectionHeading } from "@/components/site/sections";
import { SocialLinks } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/content/site";
const seo = siteContent.seo.contact;
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});
function ContactPage() {
  const [notice, setNotice] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(true);
  };
  const details = [
    { icon: Phone, label: "Demo phone", value: siteContent.contact.phone },
    { icon: Mail, label: "Demo email", value: siteContent.contact.email },
    { icon: MapPin, label: "Demo location", value: siteContent.contact.address },
    { icon: Clock3, label: "Demo hours", value: siteContent.contact.hours },
  ];
  return (
    <>
      <PageHero
        eyebrow="CONTACT THE DEMO"
        title="Start with a simple conversation."
        description="A clear, welcoming contact experience ready to connect to real details and enquiry handling in a future phase."
        image="craft"
      />
      <section className="section-space">
        <div className="site-container grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="GET IN TOUCH"
              title="We'd like to hear from you."
              description="Every detail on this page is demonstration content. Replace it with verified business information before launch."
            />
            <div className="mt-10 space-y-6">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-border pb-6"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                      {label.toUpperCase()}
                    </p>
                    <p className="mt-1 leading-6 text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                DEMO SOCIAL LINKS
              </p>
              <SocialLinks />
            </div>
            <Button asChild variant="outline" size="lg" className="mt-7">
              <a href={siteContent.contact.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> Demo WhatsApp
              </a>
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-9">
            <p className="eyebrow">SEND AN ENQUIRY</p>
            <h2 className="mt-3 font-serif text-3xl">Tell us what you have in mind.</h2>
            <form className="mt-8 space-y-6" onSubmit={submit} noValidate={false}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="h-12"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Share a few details about your enquiry"
                  className="min-h-36 resize-y"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Prepare Enquiry
              </Button>
              {notice && (
                <p
                  role="status"
                  className="rounded-md bg-secondary p-4 text-sm leading-6 text-secondary-foreground"
                >
                  Demo only: your details have not been sent or stored. Connect the final form to an
                  approved enquiry service before launch.
                </p>
              )}
              <p className="text-xs leading-5 text-muted-foreground">
                This form is a frontend demonstration and does not submit or permanently store
                information.
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="site-container">
          <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-border bg-secondary p-8 text-center">
            <div>
              <MapPin className="mx-auto size-8 text-accent-foreground" />
              <h2 className="mt-4 font-serif text-2xl">Map or location feature</h2>
              <p className="mx-auto mt-3 max-w-md leading-6 text-muted-foreground">
                A real map, directions link, or service-area graphic can be added after the verified
                business location is supplied.
              </p>
              <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                DEMONSTRATION PLACEHOLDER
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
