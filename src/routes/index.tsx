import { createFileRoute } from "@tanstack/react-router";
import {
  Battery,
  Bell,
  Eye,
  Minimize2,
  ShieldCheck,
  Star,
  Truck,
  Wifi,
  BadgeCheck,
  Undo2,
} from "lucide-react";
import { Gallery } from "@/components/landing/Gallery";
import { OrderForm } from "@/components/landing/OrderForm";
import { faqs, features, product, reviews, site, specs, steps } from "@/data/product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "كاميرا مراقبة صغيرة واي فاي HD | الدفع عند الاستلام" },
      {
        name: "description",
        content:
          "كاميرا مراقبة صغيرة بجودة HD ورؤية ليلية وبث مباشر على الموبايل. شحن مجاني لكل المحافظات والدفع عند الاستلام مع ضمان سنة.",
      },
      { property: "og:title", content: "كاميرا مراقبة صغيرة واي فاي HD" },
      {
        property: "og:description",
        content: "بث مباشر على موبايلك، رؤية ليلية، تنبيه حركة — الدفع عند الاستلام وشحن مجاني.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = { eye: Eye, wifi: Wifi, bell: Bell, battery: Battery, shrink: Minimize2, shield: ShieldCheck };

function Index() {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Top bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-ember text-sm font-extrabold text-primary-foreground">
              SS
            </span>
            <span className="min-w-0">
              <span className="block truncate font-extrabold">{site.brand}</span>
              <span className="block text-xs text-muted-foreground">{site.tagline}</span>
            </span>
          </div>
          <a
            href="#order"
            className="shrink-0 rounded-full border border-primary/50 px-4 py-2 text-xs font-bold text-primary"
          >
            اطلب الآن
          </a>
        </div>
      </header>

      {/* Hero + order */}
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <Gallery />
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: Truck, t: "شحن مجاني" },
                  { icon: Undo2, t: "استرجاع 14 يوم" },
                  { icon: BadgeCheck, t: "ضمان سنة" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="rounded-2xl border border-border bg-card px-2 py-3">
                    <Icon className="mx-auto size-5 text-primary" />
                    <span className="mt-1 block text-xs font-bold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                  <span className="size-2 animate-pulse rounded-full bg-primary" />
                  {product.stockNote}
                </span>
                <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">{product.name}</h1>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-extrabold text-ember">
                  {product.price} <span className="text-lg">{site.currency}</span>
                </span>
                <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
                <span className="rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
                  خصم {discount}%
                </span>
              </div>

              <ul className="grid gap-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <OrderForm />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl sm:text-3xl">ليه الكاميرا دي بالتحديد؟</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = icons[f.icon as keyof typeof icons] ?? Eye;
              return (
                <div
                  key={f.title}
                  className="rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-4 text-lg">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Steps */}
        <section className="border-y border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl sm:text-3xl">التشغيل في 4 خطوات</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="rounded-3xl border border-border bg-background p-5">
                  <span className="text-3xl font-extrabold text-primary/40">{s.n}</span>
                  <h3 className="mt-2 text-base">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs + reviews */}
        <section className="mx-auto max-w-6xl gap-10 px-4 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <h2 className="text-2xl sm:text-3xl">المواصفات</h2>
            <dl className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
              {specs.map((s) => (
                <div key={s.k} className="flex items-center justify-between px-5 py-3 text-sm">
                  <dt className="text-muted-foreground">{s.k}</dt>
                  <dd className="font-bold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-12 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl">تقييمات العملاء</h2>
            <div className="mt-6 grid gap-4">
              {reviews.map((r) => (
                <figure key={r.name} className="rounded-3xl border border-border bg-card p-5">
                  <div className="flex gap-1">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed">{r.text}</blockquote>
                  <figcaption className="mt-3 text-xs text-muted-foreground">
                    {r.name} — {r.city}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 pb-20">
          <h2 className="text-2xl sm:text-3xl">أسئلة شائعة</h2>
          <div className="mt-6 grid gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p className="font-bold text-foreground">{site.brand}</p>
        <p className="mt-1">
          للاستفسار: {site.phone} — {product.shipping}
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="shrink-0">
            <span className="block text-lg font-extrabold text-primary">
              {product.price} {site.currency}
            </span>
            <span className="block text-[10px] text-muted-foreground line-through">
              {product.oldPrice}
            </span>
          </span>
          <a
            href="#order"
            className="rounded-2xl bg-ember px-4 py-3 text-center text-sm font-extrabold text-primary-foreground shadow-ember"
          >
            اطلب الآن — الدفع عند الاستلام
          </a>
        </div>
      </div>
    </div>
  );
}
