import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Truck, Undo2, X } from "lucide-react";
import { Gallery } from "@/components/landing/Gallery";
import { OrderForm } from "@/components/landing/OrderForm";
import { ContactBar } from "@/components/landing/ContactBar";
import { YouTubeCard } from "@/components/landing/YouTubeCard";
import { product, site, specs } from "@/data/product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${product.name} | ${site.brand}` },
      {
        name: "description",
        content: `${product.subtitle} تسوق الآن من ${site.brand} مع الدفع عند الاستلام وشحن مجاني.`,
      },
      { property: "og:title", content: `${product.name} | ${site.brand}` },
      {
        property: "og:description",
        content: "بث مباشر على موبايلك، رؤية ليلية — الدفع عند الاستلام وشحن مجاني.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="mx-auto max-w-3xl px-4 py-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ember text-xs font-extrabold text-primary-foreground">
            e
          </span>
          <span className="truncate text-sm font-extrabold">{site.brand}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4">
        <Gallery />

        <div className="lux lux-gold gilt-line space-y-4 rounded-3xl p-5">
          <h1 className="text-2xl leading-tight sm:text-3xl">{product.name}</h1>

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-4xl font-extrabold text-ember">
              {product.price} <span className="text-base">{site.currency}</span>
            </span>
            <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
            <span className="rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
              خصم {discount}%
            </span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            {product.stockNote}
          </span>
        </div>

        <dl className="lux lux-royal gilt-line divide-y divide-border/60 overflow-hidden rounded-3xl">
          {specs.map((s) => (
            <div key={s.k} className="flex items-center justify-between px-5 py-3 text-sm">
              <dt className="text-muted-foreground">{s.k}</dt>
              <dd className="font-bold">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Truck, t: "شحن مجاني", c: "lux-emerald", i: "text-whatsapp" },
            { icon: Undo2, t: "استرجاع 14 يوم", c: "lux-sky", i: "text-facebook" },
            { icon: BadgeCheck, t: "ضمان سنة", c: "lux-rose", i: "text-primary" },
          ].map(({ icon: Icon, t, c, i }) => (
            <div key={t} className={`lux ${c} gilt-line rounded-2xl px-2 py-3`}>
              <Icon className={`mx-auto size-5 ${i}`} />
              <span className="mt-1 block text-xs font-bold">{t}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-2xl bg-ember px-6 py-4 text-base font-extrabold text-primary-foreground shadow-ember"
        >
          اطلب الآن — الدفع عند الاستلام
        </button>

        <YouTubeCard />
        <ContactBar />
      </main>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="shrink-0">
            <span className="block text-lg font-extrabold text-primary">
              {product.price} {site.currency}
            </span>
            <span className="block text-[10px] text-muted-foreground line-through">
              {product.oldPrice}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-2xl bg-ember px-4 py-3 text-center text-sm font-extrabold text-primary-foreground shadow-ember"
          >
            اطلب الآن
          </button>
        </div>
      </div>

      {/* Order sheet */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto p-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className="absolute left-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-secondary text-foreground"
              >
                <X className="size-4" />
              </button>
              <OrderForm />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
