import { contacts } from "@/data/product";

/** لوجوهات التواصل الحقيقية (SVG) */
function WhatsAppLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
      <path d="M16.04 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.45 1.72 6.39L3.2 28.8l6.6-1.73a12.79 12.79 0 0 0 6.24 1.6h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.05-3.63Zm0 23.03h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.08-3.92-.25-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.63-10.66 10.63Zm5.84-7.96c-.32-.16-1.97-.97-2.27-1.08-.31-.11-.53-.17-.75.16-.22.32-.86 1.08-1.06 1.3-.19.22-.39.25-.71.09-.32-.16-1.36-.5-2.58-1.6a9.66 9.66 0 0 1-1.79-2.22c-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.56-.08-.16-.72-1.81-.99-2.47-.26-.65-.52-.56-.71-.57h-.64c-.22 0-.58.08-.88.4-.3.32-1.16 1.13-1.16 2.76s1.19 3.2 1.35 3.42c.16.22 2.31 3.7 5.63 5.05.79.34 1.4.54 1.88.7.79.25 1.51.21 2.08.13.63-.09 2.16-.88 2.47-1.74.3-.85.3-1.58.21-1.73-.08-.16-.29-.24-.61-.4Z" />
    </svg>
  );
}

function FacebookLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
      <path d="M29 16.09C29 8.87 23.18 3.02 16 3.02S3 8.87 3 16.09c0 6.52 4.75 11.93 10.97 12.9v-9.13h-3.3v-3.77h3.3v-2.88c0-3.28 1.94-5.09 4.91-5.09 1.43 0 2.92.26 2.92.26v3.22h-1.64c-1.61 0-2.12 1.01-2.12 2.05v2.44h3.6l-.58 3.77h-3.02V29C24.25 28.02 29 22.61 29 16.09Z" />
    </svg>
  );
}

function PhoneLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden {...props}>
      <path d="M11.06 4.5c.79 0 1.5.46 1.83 1.17l1.74 3.78a2 2 0 0 1-.4 2.26l-1.5 1.5c-.3.3-.37.75-.18 1.13a15.6 15.6 0 0 0 6.11 6.11c.38.2.83.12 1.13-.18l1.5-1.5a2 2 0 0 1 2.26-.4l3.78 1.74c.71.33 1.17 1.04 1.17 1.83v3.03A3.13 3.13 0 0 1 25.37 28C13.9 28 4.5 18.6 4.5 7.13 4.5 5.68 5.68 4.5 7.13 4.5h3.93Z" />
    </svg>
  );
}

const brands = {
  whatsapp: {
    Logo: WhatsAppLogo,
    ring: "text-whatsapp",
    chip: "bg-whatsapp/15 ring-1 ring-whatsapp/30",
    glow: "shadow-whatsapp/20",
  },
  facebook: {
    Logo: FacebookLogo,
    ring: "text-facebook",
    chip: "bg-facebook/15 ring-1 ring-facebook/30",
    glow: "shadow-facebook/20",
  },
  phone: {
    Logo: PhoneLogo,
    ring: "text-call",
    chip: "bg-call/15 ring-1 ring-call/30",
    glow: "shadow-call/20",
  },
} as const;

export function ContactBar() {
  return (
    <section className="lux lux-amber gilt-line overflow-hidden rounded-3xl">
      <div className="border-b border-border/60 px-5 py-4 text-center">
        <h2 className="text-base font-extrabold">{contacts.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{contacts.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3">
        {contacts.items.map((c) => {
          const brand = brands[c.id as keyof typeof brands] ?? brands.whatsapp;
          const { Logo } = brand;
          return (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-secondary/40 px-2 py-4 text-center transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg"
            >
              <span
                className={`grid size-11 place-items-center rounded-2xl ${brand.chip} ${brand.ring} shadow-lg ${brand.glow} transition-transform group-hover:scale-110`}
              >
                <Logo className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold">{c.label}</span>
                <span className="block truncate text-[10px] leading-tight text-muted-foreground">
                  {c.description}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
