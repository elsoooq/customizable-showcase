import { useState } from "react";
import { product } from "@/data/product";

export function Gallery() {
  const [active, setActive] = useState(0);
  const current = product.gallery[active] ?? product.gallery[0]!;

  return (
    <div className="space-y-3">
      <div className="grain relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <img
          src={current.src}
          alt={current.alt}
          width={1280}
          height={1280}
          className="aspect-square w-full object-cover"
        />
        <span className="absolute right-4 top-4 rounded-full bg-ember px-3 py-1 text-xs font-bold text-primary-foreground">
          {product.badge}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.gallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={img.alt}
            className={`overflow-hidden rounded-2xl border transition-all ${
              i === active
                ? "border-primary shadow-ember"
                : "border-border opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
