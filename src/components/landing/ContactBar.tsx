import { Facebook, MessageCircle, Phone } from "lucide-react";
import { contacts } from "@/data/product";

const icons = {
  whatsapp: MessageCircle,
  facebook: Facebook,
  phone: Phone,
} as const;

export function ContactBar() {
  return (
    <section className="rounded-3xl border border-border bg-card p-4">
      <h2 className="mb-3 text-center text-sm font-extrabold">{contacts.title}</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {contacts.items.map((c) => {
          const Icon = icons[c.id as keyof typeof icons] ?? MessageCircle;
          return (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-4 py-3 transition-colors hover:border-primary"
            >
              <Icon className="size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-xs font-extrabold">{c.label}</span>
                <span className="block truncate text-[11px] text-muted-foreground" dir="ltr">
                  {c.value}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
